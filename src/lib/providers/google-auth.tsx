import { createContext, useCallback, useEffect, useState } from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import { api } from '@/lib/api'

/* -------------------------------------------------------------------------- */
/*  Shared Google auth state (backend session)                                */
/*                                                                            */
/*  Uses the Google auth-code flow: the popup returns a one-time `code` which */
/*  we hand to our backend. The backend verifies it, creates its own session, */
/*  and sets httpOnly cookies. The cookie is the source of truth — on load we */
/*  bootstrap the profile from GET /api/auth/me. Must live INSIDE             */
/*  <GoogleOAuthProvider>.                                                     */
/* -------------------------------------------------------------------------- */

export type GoogleProfile = {
  name: string
  email: string
  picture: string
  given_name?: string
  roles?: string[]
}

export interface GoogleAuthContextValue {
  profile: GoogleProfile | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
  login: () => void
  logout: () => void
}

const toProfile = (user: any): GoogleProfile => ({
  name: user?.name ?? user?.email ?? '',
  email: user?.email ?? '',
  picture: user?.picture ?? '',
  given_name: user?.name ? String(user.name).split(' ')[0] : undefined,
  roles: user?.roles ?? [],
})

export const GoogleAuthContext = createContext<GoogleAuthContextValue>({
  profile: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  login: () => {},
  logout: () => {},
})

export const GoogleAuthProvider = ({ children }) => {
  const [profile, setProfile] = useState<GoogleProfile | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Bootstrap: ask the backend who we are (cookie is the source of truth).
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await api.get('/api/auth/me')
        if (!cancelled && res.success && res.data?.user) {
          setProfile(toProfile(res.data.user))
        }
      } catch {
        /* not logged in — ignore */
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const start = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async ({ code }) => {
      setLoading(true)
      setError(null)
      try {
        const res = await api.post('/api/auth/google', { code })
        if (!res.success || !res.data?.user) {
          throw new Error(res.message || 'Login failed')
        }
        setProfile(toProfile(res.data.user))
      } catch (e) {
        setError((e as Error).message || 'Google sign-in failed. Please try again.')
      } finally {
        setLoading(false)
      }
    },
    onError: () => setError('Google sign-in failed. Please try again.'),
  })

  const login = useCallback(() => start(), [start])

  const logout = useCallback(async () => {
    try {
      await api.post('/api/auth/logout')
    } catch {
      /* clear locally regardless */
    }
    setProfile(null)
    setError(null)
  }, [])

  return (
    <GoogleAuthContext.Provider
      value={{
        profile,
        isAuthenticated: !!profile,
        loading,
        error,
        login,
        logout,
      }}
    >
      {children}
    </GoogleAuthContext.Provider>
  )
}
