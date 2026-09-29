import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { WINDOW_TYPES } from '@/lib/providers/window'
import { useWindowControls } from '@/lib/hooks/window-controls.hook'

/* -------------------------------------------------------------------------- */
/*  Link registry — edit URLs here. Placeholders marked TODO.                 */
/* -------------------------------------------------------------------------- */

type LinkDef = {
  label: string
  url: string
  description: string
}

const LINKS: Record<string, LinkDef> = {
  github: {
    label: 'GitHub',
    url: 'https://github.com/akhilphenom',
    description: 'Open-source work, side projects and experiments.',
  },
  linkedin: {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/sai-akhil-katukam/',
    description: 'Professional profile, experience and connections.',
  },
  resume: {
    label: 'Résumé',
    url: 'https://drive.google.com/file/d/1DEuca2y_Gwwt_ZkyKtjqVo9sQo7gH8bZ/view?usp=sharing',
    description: 'My latest résumé (PDF).',
  },
  youtube: {
    // TODO: replace with your YouTube channel URL
    label: 'YouTube',
    url: 'https://youtube.com/',
    description: 'Videos and recordings (link coming soon).',
  },
  instagram: {
    // TODO: replace with your Instagram profile URL
    label: 'Instagram',
    url: 'https://instagram.com/',
    description: 'Life beyond code (link coming soon).',
  },
}

const EMAIL = 'saiakhilk.katukam@gmail.com'

/* -------------------------------------------------------------------------- */
/*  Presentational bits                                                       */
/* -------------------------------------------------------------------------- */

function Link({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-sky-400 underline decoration-sky-400/40 underline-offset-2 hover:text-sky-300"
    >
      {children}
    </a>
  )
}

function LinkCard({ id }: { id: string }) {
  const link = LINKS[id]
  return (
    <div className="leading-relaxed">
      <span className="text-emerald-400">{link.label}</span>
      <span className="text-zinc-500"> → </span>
      <Link href={link.url}>{link.url}</Link>
      <div className="text-zinc-400">{link.description}</div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Command definitions                                                       */
/* -------------------------------------------------------------------------- */

type CommandResult = { output: ReactNode; clear?: boolean }

const COMMAND_LIST: { name: string; help: string }[] = [
  { name: 'help', help: 'List all available commands.' },
  { name: 'about', help: 'A short introduction about me.' },
  { name: 'github', help: 'Open my GitHub profile.' },
  { name: 'linkedin', help: 'Open my LinkedIn profile.' },
  { name: 'youtube', help: 'Open my YouTube channel.' },
  { name: 'instagram', help: 'Open my Instagram profile.' },
  { name: 'resume', help: 'View my résumé (PDF).' },
  { name: 'email', help: 'Get my email address.' },
  { name: 'socials', help: 'Show all my social links at once.' },
  { name: 'whoami', help: 'Print the current user.' },
  { name: 'clear', help: 'Clear the terminal screen.' },
]

const COMMAND_NAMES = COMMAND_LIST.map((c) => c.name)

function runCommand(raw: string): CommandResult {
  const cmd = raw.trim().toLowerCase()

  if (cmd === '') return { output: null }

  if (LINKS[cmd]) return { output: <LinkCard id={cmd} /> }

  switch (cmd) {
    case 'help':
      return {
        output: (
          <div className="leading-relaxed">
            <div className="text-zinc-400">Available commands:</div>
            <div className="mt-1 grid grid-cols-[7rem_1fr] gap-x-2">
              {COMMAND_LIST.map((c) => (
                <div key={c.name} className="contents">
                  <span className="text-emerald-400">{c.name}</span>
                  <span className="text-zinc-300">{c.help}</span>
                </div>
              ))}
            </div>
            <div className="mt-2 text-zinc-500">
              Tip: use <span className="text-emerald-400">Tab</span> to
              autocomplete and <span className="text-emerald-400">↑ / ↓</span>{' '}
              for history.
            </div>
          </div>
        ),
      }

    case 'about':
      return {
        output: (
          <div className="max-w-xl leading-relaxed text-zinc-300">
            <p>
              Hi, I'm{' '}
              <span className="text-emerald-400">Sai Akhil Katukam</span> — a
              Software Engineer at Microsoft on the CXE Platform team, based in
              Hyderabad, India.
            </p>
            <p className="mt-2">
              I build reliable services at scale and love full-stack product
              engineering — from React front-ends to .NET services and cloud
              infrastructure. Type <span className="text-emerald-400">help</span>{' '}
              to explore, or <span className="text-emerald-400">socials</span> to
              find me around the web.
            </p>
          </div>
        ),
      }

    case 'email':
      return {
        output: (
          <div>
            <Link href={`mailto:${EMAIL}`}>{EMAIL}</Link>
            <div className="text-zinc-400">Drop me a line anytime.</div>
          </div>
        ),
      }

    case 'socials':
      return {
        output: (
          <div className="space-y-2">
            {['github', 'linkedin', 'youtube', 'instagram', 'resume'].map(
              (id) => (
                <LinkCard key={id} id={id} />
              ),
            )}
          </div>
        ),
      }

    case 'whoami':
      return { output: <span className="text-zinc-300">guest</span> }

    case 'clear':
      return { output: null, clear: true }

    default:
      return {
        output: (
          <span className="text-red-400">
            command not found: {raw.trim()}. Type{' '}
            <span className="text-emerald-400">help</span> for a list of
            commands.
          </span>
        ),
      }
  }
}

/* -------------------------------------------------------------------------- */
/*  Terminal                                                                  */
/* -------------------------------------------------------------------------- */

type HistoryLine = { command: string; output: ReactNode }

const PROMPT = (
  <>
    <span className="text-emerald-400">guest@akhil</span>
    <span className="text-zinc-500">:</span>
    <span className="text-sky-400">~</span>
    <span className="text-zinc-500">$</span>
  </>
)

const BANNER: ReactNode = (
  <div className="text-zinc-400">
    <pre className="whitespace-pre font-mono text-emerald-400/90 text-[11px] leading-tight sm:text-xs">
      {String.raw` __ _ _    _         _ 
 _ _ _  |  \ ' | |__(_)_ __ ' |
| ' \ / | () |   | / / | | ' |  
|_||_|  |___|_|  |_\_\_|_|_||_|`}
    </pre>
    <p className="mt-2">
      Welcome to Akhil's terminal. Type{' '}
      <span className="text-emerald-400">help</span> to get started.
    </p>
  </div>
)

/* -------------------------------------------------------------------------- */
/*  Standalone window chrome                                                  */
/* -------------------------------------------------------------------------- */

function TrafficLights({
  onClose,
  onMinimize,
  onMaximize,
}: {
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
}) {
  const stop =
    (fn: () => void) => (e: React.MouseEvent) => {
      e.stopPropagation()
      fn()
    }
  return (
    <div
      className="group flex items-center gap-2"
      onMouseDown={(e) => e.stopPropagation()}
    >
      <button
        aria-label="Close"
        onClick={stop(onClose)}
        className="flex h-3 w-3 items-center justify-center rounded-full bg-[#ff5f57] text-[8px] font-bold leading-none text-black/60 hover:brightness-95"
      >
        <span className="opacity-0 group-hover:opacity-100">✕</span>
      </button>
      <button
        aria-label="Minimize"
        onClick={stop(onMinimize)}
        className="flex h-3 w-3 items-center justify-center rounded-full bg-[#febc2e] text-[8px] font-bold leading-none text-black/60 hover:brightness-95"
      >
        <span className="opacity-0 group-hover:opacity-100">–</span>
      </button>
      <button
        aria-label="Maximize"
        onClick={stop(onMaximize)}
        className="flex h-3 w-3 items-center justify-center rounded-full bg-[#28c840] text-[8px] font-bold leading-none text-black/60 hover:brightness-95"
      >
        <span className="opacity-0 group-hover:opacity-100">+</span>
      </button>
    </div>
  )
}

export default function Terminal({ name }: { name: WINDOW_TYPES }) {
  const { close, minimize, maximize, bringToFront } = useWindowControls(name)

  const [lines, setLines] = useState<HistoryLine[]>([
    { command: '', output: BANNER },
  ])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const focusInput = useCallback(() => inputRef.current?.focus(), [])

  useEffect(() => {
    focusInput()
  }, [focusInput])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [lines])

  const submit = useCallback(
    (raw: string) => {
      const { output, clear } = runCommand(raw)
      if (clear) {
        setLines([])
      } else {
        setLines((prev) => [...prev, { command: raw, output }])
      }
      if (raw.trim()) setHistory((prev) => [...prev, raw])
      setHistoryIndex(null)
      setInput('')
    },
    [],
  )

  const autocomplete = useCallback(() => {
    const token = input.trim().toLowerCase()
    if (!token) return
    const matches = COMMAND_NAMES.filter((c) => c.startsWith(token))
    if (matches.length === 1) {
      setInput(matches[0])
    } else if (matches.length > 1) {
      setLines((prev) => [
        ...prev,
        {
          command: input,
          output: (
            <span className="text-zinc-400">{matches.join('   ')}</span>
          ),
        },
      ])
    }
  }, [input])

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submit(input)
      return
    }
    if (e.key === 'Tab') {
      e.preventDefault()
      autocomplete()
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (!history.length) return
      const next =
        historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(next)
      setInput(history[next])
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex === null) return
      const next = historyIndex + 1
      if (next >= history.length) {
        setHistoryIndex(null)
        setInput('')
      } else {
        setHistoryIndex(next)
        setInput(history[next])
      }
      return
    }
    if ((e.key === 'l' || e.key === 'k') && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      setLines([])
    }
  }

  const rendered = useMemo(
    () =>
      lines.map((line, i) => (
        <div key={i} className="mb-1">
          {line.command !== '' && (
            <div className="flex gap-2">
              <span className="shrink-0">{PROMPT}</span>
              <span className="text-zinc-100">{line.command}</span>
            </div>
          )}
          {line.output && <div className="mt-0.5">{line.output}</div>}
        </div>
      )),
    [lines],
  )

  return (
    <div
      onMouseDown={bringToFront}
      className="flex h-full w-full flex-1 flex-col overflow-hidden rounded-xl border border-white/10 bg-zinc-950/95 font-mono text-[13px] text-zinc-200 shadow-2xl ring-1 ring-black/40 backdrop-blur-xl"
    >
      <header className="window-drag-handle flex h-9 shrink-0 cursor-move items-center bg-zinc-900/80 px-3">
        <TrafficLights
          onClose={close}
          onMinimize={minimize}
          onMaximize={maximize}
        />
        <div className="pointer-events-none flex-1 select-none text-center text-xs font-medium text-zinc-400">
          guest@akhil — zsh
        </div>
        <div className="w-[52px]" />
      </header>

      <div
        onClick={focusInput}
        className="flex min-h-0 flex-1 flex-col"
      >
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-3">
          {rendered}
          <div className="flex gap-2">
            <span className="shrink-0">{PROMPT}</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              className="flex-1 bg-transparent text-zinc-100 caret-emerald-400 outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
