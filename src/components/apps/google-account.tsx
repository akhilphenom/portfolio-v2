import { useState } from 'react'
import { googleLogout, useGoogleLogin } from '@react-oauth/google'

/* -------------------------------------------------------------------------- */
/*  Google Account app                                                        */
/*                                                                            */
/*  Uses the OAuth provider already configured in App.tsx                     */
/*  (GoogleOAuthProvider + VITE_GOOGLE_OAUTH_CLIENTID). Visitors can sign in  */
/*  with their Google account; we exchange the access token for their basic   */
/*  profile (name, email, picture) via the Google userinfo endpoint.         */
/* -------------------------------------------------------------------------- */

type GoogleProfile = {
  name: string
  email: string
  picture: string
  given_name?: string
}

function GoogleGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  )
}

export default function GoogleAccount() {
  const [profile, setProfile] = useState<GoogleProfile | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        if (!res.ok) throw new Error('userinfo request failed')
        setProfile((await res.json()) as GoogleProfile)
      } catch {
        setError('Could not load your Google profile. Please try again.')
      } finally {
        setLoading(false)
      }
    },
    onError: () => setError('Google sign-in failed. Please try again.'),
  })

  const logout = () => {
    googleLogout()
    setProfile(null)
    setError(null)
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 px-6 py-8 text-center">
      {profile ? (
        <div className="flex w-full max-w-xs flex-col items-center gap-4 rounded-2xl border border-border bg-card/60 p-6 shadow-sm">
          <img
            src={profile.picture}
            alt={profile.name}
            referrerPolicy="no-referrer"
            className="h-20 w-20 rounded-full ring-2 ring-border"
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold text-foreground">{profile.name}</p>
            <p className="text-sm text-muted-foreground">{profile.email}</p>
          </div>
          <p className="text-xs text-muted-foreground">
            You're signed in with Google. Nothing is stored — this stays in your
            browser session.
          </p>
          <button
            onClick={logout}
            className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Sign out
          </button>
        </div>
      ) : (
        <div className="flex w-full max-w-xs flex-col items-center gap-5">
          <GoogleGlyph className="h-14 w-14" />
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-foreground">
              Sign in with Google
            </h2>
            <p className="text-sm text-muted-foreground">
              Use your Google account to say hello. I only read your name, email
              and profile photo — nothing is saved.
            </p>
          </div>
          <button
            onClick={() => login()}
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-border bg-white px-4 py-2.5 text-sm font-medium text-[#3c4043] shadow-sm transition-shadow hover:shadow disabled:cursor-not-allowed disabled:opacity-60"
          >
            <GoogleGlyph className="h-5 w-5" />
            {loading ? 'Signing in…' : 'Continue with Google'}
          </button>
          {error && <p className="text-xs text-destructive">{error}</p>}
        </div>
      )}
    </div>
  )
}
