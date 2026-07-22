import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { icons } from './dock/icons'
import { useWindows } from '@/lib/hooks/windows.hook'
import { WINDOW_TYPES } from '@/lib/providers/window'

type DockIcon = (typeof icons)[number]

const getDefaultSize = (window: WINDOW_TYPES) => {
  switch (window) {
    case WINDOW_TYPES.WORK_EXPERIENCE:
      return { width: 760, height: 620 }
    case WINDOW_TYPES.TERMINAL:
      return { width: 680, height: 460 }
    default:
      return { width: 400, height: 400 }
  }
}

const containerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.25, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } },
}

const gridVariants = {
  initial: { scale: 1.12, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
  exit: { scale: 1.12, opacity: 0, transition: { duration: 0.2, ease: [0.7, 0, 0.84, 0] } },
}

export default function Launchpad() {
  const {
    windows,
    addWindow,
    setWindowState,
    setWindowZIndex,
    setDisableDragging,
  } = useWindows()

  const [query, setQuery] = useState('')

  const launchpad = windows.find((w) => w.name === WINDOW_TYPES.LAUNCHPAD)
  const isOpen = !!launchpad?.opened

  const close = () => setWindowState(WINDOW_TYPES.LAUNCHPAD, false)

  const apps = useMemo(
    () => icons.filter((i) => i.name !== 'Launchpad' && i.name !== 'Home'),
    [],
  )

  const filtered = useMemo(
    () => apps.filter((i) => i.name.toLowerCase().includes(query.trim().toLowerCase())),
    [apps, query],
  )

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) setQuery('')
  }, [isOpen])

  const openApp = (item: DockIcon) => {
    if (item.href) {
      window.open(item.href, '_blank')
      close()
      return
    }
    const existing = windows.find((w) => w.name === item.window)
    if (existing) {
      setWindowState(item.window, true)
      setDisableDragging(item.window, false)
      setWindowZIndex(item.window, 99 + windows.length + 1)
    } else {
      addWindow(item.window, {
        x: 150,
        y: 150,
        ...getDefaultSize(item.window),
      })
      setWindowZIndex(item.window, 99 + windows.length + 1)
    }
    close()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center bg-black/40 backdrop-blur-2xl"
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={close}
        >
          <div
            className="mt-12 mb-10 w-full max-w-md px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative mx-auto flex items-center">
              <Search className="pointer-events-none absolute left-3 h-4 w-4 text-white/60" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className="w-full rounded-lg bg-white/15 py-2 pl-9 pr-3 text-center text-sm text-white placeholder-white/50 outline-none backdrop-blur-md focus:bg-white/20"
              />
            </div>
          </div>

          <motion.div
            className="flex-1 w-full overflow-y-auto px-8 pb-16"
            variants={gridVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto grid max-w-5xl grid-cols-4 gap-x-8 gap-y-10 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7">
              {filtered.map((item) => (
                <button
                  key={item.name}
                  onClick={() => openApp(item)}
                  className="group flex select-none flex-col items-center gap-2 focus:outline-none"
                >
                  <div className="flex h-[74px] w-[74px] items-center justify-center overflow-hidden rounded-[22px] shadow-lg transition-transform duration-200 group-hover:scale-110 group-active:scale-95">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                      draggable={false}
                    />
                  </div>
                  <span className="max-w-[84px] truncate text-center text-xs font-medium text-white drop-shadow">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="mt-10 text-center text-sm text-white/60">
                No results for “{query}”
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
