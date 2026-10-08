import { Bell, BookOpen, FolderGit2, Monitor } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const notifications = [
  {
    title: 'Desktop Only Compatible',
    description:
      'This portfolio is currently designed and optimized for desktop browsers.',
    status: 'Now',
    icon: Monitor,
    color: 'bg-blue-400/15 text-blue-300',
  },
  {
    title: 'Projects will be updated',
    description:
      'More project details and case studies will be added as they are ready.',
    status: 'Upcoming',
    icon: FolderGit2,
    color: 'bg-violet-400/15 text-violet-300',
  },
  {
    title: 'Blogspot coming soon',
    description:
      'A dedicated space for engineering notes, learnings, and technical writing.',
    status: 'Planned',
    icon: BookOpen,
    color: 'bg-amber-400/15 text-amber-300',
  },
]

export default function NotificationHub() {
  const [isOpen, setIsOpen] = useState(false)
  const [now, setNow] = useState(() => new Date())
  const hubRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const clockInterval = window.setInterval(() => setNow(new Date()), 30_000)

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (
        hubRef.current &&
        !hubRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', closeOnOutsideClick)
    window.addEventListener('keydown', closeOnEscape)

    return () => {
      window.clearInterval(clockInterval)
      document.removeEventListener('mousedown', closeOnOutsideClick)
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [])

  const time = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
  return (
    <div
      ref={hubRef}
      className="fixed left-1/2 top-4 z-[10000] -translate-x-1/2"
    >
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex h-10 items-center justify-center gap-3 rounded-xl border border-white/20 bg-black/45 px-4 text-white shadow-lg backdrop-blur-xl hover:bg-black/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        aria-label="Open notification center"
        aria-expanded={isOpen}
        aria-controls="notification-center"
      >
        <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
          <Bell className="h-4 w-4" strokeWidth={1.5} />
          <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-blue-400" />
        </span>
        <span className="flex items-center text-sm font-extralight leading-none text-sky-300 drop-shadow-md">
          {time}
        </span>
      </button>

      {isOpen && (
        <section
          id="notification-center"
          className="absolute left-1/2 top-full mt-3 w-[calc(100vw-2rem)] max-w-sm -translate-x-1/2 overflow-hidden rounded-2xl border border-white/15 bg-slate-950/85 text-white shadow-2xl backdrop-blur-2xl"
        >
          <header className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div>
              <h2 className="text-sm font-semibold">Notifications</h2>
              <p className="mt-0.5 text-[11px] text-white/55">
                Portfolio updates
              </p>
            </div>
            <span className="h-2 w-2 rounded-full bg-blue-400" />
          </header>

          <div>
            {notifications.map((notification) => {
              const Icon = notification.icon

              return (
                <article
                  key={notification.title}
                  className="border-b border-white/10 px-4 py-3.5 last:border-b-0"
                >
                  <div className="flex gap-3">
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${notification.color}`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-xs font-semibold leading-5">
                          {notification.title}
                        </h3>
                        <span className="shrink-0 text-[10px] text-white/45">
                          {notification.status}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[11px] leading-4 text-white/60">
                        {notification.description}
                      </p>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}
