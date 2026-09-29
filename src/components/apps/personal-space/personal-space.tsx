import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  BookText,
  Check,
  ListChecks,
  Lock,
  LogOut,
  Plus,
  StickyNote,
  Trash2,
} from 'lucide-react'
import { useGoogleAuth } from '@/lib/hooks/google-auth.hook'

/* -------------------------------------------------------------------------- */
/*  Personal Space                                                            */
/*                                                                            */
/*  A hub of private mini-apps (Journal, Notes, Problem Sheet) that are       */
/*  locked behind a Google login. When signed out, tiles show a lock badge    */
/*  and can't be opened. Data is persisted in localStorage, keyed per user.   */
/* -------------------------------------------------------------------------- */

type AppId = 'journal' | 'notes' | 'problemsheet'

type AppMeta = {
  id: AppId
  name: string
  description: string
  Icon: typeof BookText
  accent: string
}

/* --------------------------------- glyphs --------------------------------- */

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

/* --------------------------------- banner --------------------------------- */

function AuthBanner() {
  const { profile, isAuthenticated, loading, error, login, logout } = useGoogleAuth()

  if (isAuthenticated && profile) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-border bg-card/60 p-3">
        <img
          src={profile.picture}
          alt={profile.name}
          referrerPolicy="no-referrer"
          className="h-10 w-10 rounded-full ring-2 ring-border"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground">
            Welcome, {profile.given_name || profile.name}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            Your spaces are unlocked.
          </p>
        </div>
        <button
          onClick={logout}
          className="flex shrink-0 items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign out
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-4 sm:flex-row sm:items-center">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 rounded-lg bg-indigo-500/20 p-2 text-indigo-300">
          <Lock className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">
            These spaces are private
          </p>
          <p className="text-xs text-muted-foreground">
            Sign in with your Google account to unlock Journal, Notes and your
            Problem Sheet. Nothing is stored on a server.
          </p>
          {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
        </div>
      </div>
      <button
        onClick={() => login()}
        disabled={loading}
        className="flex shrink-0 items-center justify-center gap-2 rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium text-[#3c4043] shadow-sm transition-shadow hover:shadow disabled:cursor-not-allowed disabled:opacity-60 sm:ml-auto"
      >
        <GoogleGlyph className="h-4 w-4" />
        {loading ? 'Signing in…' : 'Continue with Google'}
      </button>
    </div>
  )
}

/* ---------------------------------- tiles --------------------------------- */

function AppTile({
  app,
  locked,
  shaking,
  onOpen,
}: {
  app: AppMeta
  locked: boolean
  shaking: boolean
  onOpen: () => void
}) {
  const { Icon } = app
  return (
    <motion.button
      onClick={onOpen}
      animate={shaking ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
      transition={{ duration: 0.4 }}
      className={`group relative flex flex-col items-start gap-2 rounded-2xl border border-border bg-card/50 p-4 text-left transition-colors hover:bg-card ${
        locked ? 'cursor-not-allowed' : 'cursor-pointer'
      }`}
    >
      {locked && (
        <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-background/90 text-muted-foreground ring-1 ring-border">
          <Lock className="h-3.5 w-3.5" />
        </span>
      )}
      <span
        className={`rounded-xl bg-background/70 p-2.5 ${app.accent} ${
          locked ? 'opacity-60' : ''
        }`}
      >
        <Icon className="h-6 w-6" />
      </span>
      <span className={`text-sm font-semibold text-foreground ${locked ? 'opacity-70' : ''}`}>
        {app.name}
      </span>
      <span className="text-xs text-muted-foreground">{app.description}</span>
    </motion.button>
  )
}

/* --------------------------------- shell ---------------------------------- */

export default function PersonalSpace() {
  const { profile, isAuthenticated, login } = useGoogleAuth()
  const [active, setActive] = useState<AppId | null>(null)
  const [shakeId, setShakeId] = useState<AppId | null>(null)

  if (active && isAuthenticated && profile) {
    
  }

  const onOpen = (id: AppId) => {
    if (!isAuthenticated) {
      setShakeId(id)
      setTimeout(() => setShakeId(null), 500)
      login()
      return
    }
    setActive(id)
  }

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <AuthBanner />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        //
      </div>
    </div>
  )
}
