import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  Code2,
  Github,
  ImageIcon,
  Monitor,
  Move,
  Sparkles,
} from 'lucide-react'

type Project = {
  name: string
  eyebrow: string
  description: string
  href: string
  technologies: string[]
  icon: typeof Move
  accent: string
  glow: string
}

const PROJECTS: Project[] = [
  {
    name: 'Portfolio V2',
    eyebrow: 'Interactive portfolio',
    description:
      'A desktop-inspired personal portfolio with resizable app windows, a launchpad, terminal, project gallery, notification center, and macOS-style dock.',
    href: 'https://github.com/akhilphenom/portfolio-v2',
    technologies: ['React', 'TypeScript', 'Vite', 'Framer Motion'],
    icon: Monitor,
    accent: 'from-emerald-500/25 via-teal-500/10 to-transparent',
    glow: 'bg-emerald-400',
  },
  {
    name: 'Miracle',
    eyebrow: 'Collaborative workspace',
    description:
      'A real-time visual collaboration platform for shared boards, mind maps, planning, and subscription-based team workspaces.',
    href: 'https://github.com/akhilphenom/miracle',
    technologies: ['Next.js', 'Liveblocks', 'Clerk', 'Zustand'],
    icon: Sparkles,
    accent: 'from-violet-500/25 via-indigo-500/10 to-transparent',
    glow: 'bg-violet-400',
  },
  {
    name: 'Pan & Zoom React Native',
    eyebrow: 'Mobile interaction',
    description:
      'A reusable gesture-driven canvas for React Native with smooth pinch-to-zoom, panning, double-tap controls, and intelligent boundary handling.',
    href: 'https://github.com/akhilphenom/pan-zoom-react-native',
    technologies: ['React Native', 'Reanimated', 'Gesture Handler', 'TypeScript'],
    icon: Move,
    accent: 'from-cyan-500/25 via-blue-500/10 to-transparent',
    glow: 'bg-cyan-400',
  },
  {
    name: 'Image Editor',
    eyebrow: 'Creative tooling',
    description:
      'A mobile-first image editing experience with freehand drawing, text, pan and zoom, undo/redo history, clearing, and image export.',
    href: 'https://github.com/akhilphenom/image-editor',
    technologies: ['React Native', 'Skia', 'Reanimated', 'Expo'],
    icon: ImageIcon,
    accent: 'from-fuchsia-500/25 via-rose-500/10 to-transparent',
    glow: 'bg-fuchsia-400',
  },
  {
    name: 'Phenomenal Grind',
    eyebrow: 'Developer productivity',
    description:
      'A focused daily system for competitive programming, problem tracking, system-design practice, journaling, and connected notes.',
    href: 'https://github.com/akhilphenom/phenomenal-grind',
    technologies: ['React', 'Vite', 'CodeMirror', 'Node.js'],
    icon: Code2,
    accent: 'from-amber-500/25 via-orange-500/10 to-transparent',
    glow: 'bg-amber-400',
  },
]

export default function Projects() {
  return (
    <div className="mx-auto w-full max-w-5xl px-1 pb-6">
      <header className="mb-7">
        <div className="flex items-center gap-2 text-green-700">
          <Github className="h-3.5 w-3.5" />
          <p className="font-mono text-[11px] uppercase tracking-[0.3em]">
            Selected work
          </p>
        </div>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          Projects built to solve real problems.
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Experiments and products spanning mobile gestures, creative tools,
          collaborative canvases, and developer productivity.
        </p>
        <p className="mt-3 max-w-2xl border-l-2 border-green-700/50 pl-3 text-xs leading-relaxed text-muted-foreground">
          All projects shown here were built without AI assistance. Latest updates to them were AI assisted. My
          vibe-coded projects are private and intentionally not included.
        </p>
      </header>

      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns:
            'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
        }}
      >
        {PROJECTS.map((project, index) => {
          const Icon = project.icon

          return (
            <motion.a
              key={project.name}
              href={project.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{
                duration: 0.45,
                delay: index * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -4 }}
              className="group relative isolate min-h-64 overflow-hidden rounded-2xl border border-border/80 bg-card p-5 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-foreground/20 hover:shadow-xl"
              aria-label={`Open ${project.name} on GitHub`}
            >
              <div
                className={`absolute inset-0 -z-20 bg-gradient-to-br ${project.accent}`}
              />
              <div
                className={`absolute -right-16 -top-16 -z-10 h-40 w-40 rounded-full ${project.glow} opacity-10 blur-3xl transition-opacity duration-300 group-hover:opacity-25`}
              />

              <div className="flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-background/70 shadow-sm backdrop-blur">
                    <Icon className="h-5 w-5 text-foreground" />
                  </div>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/60 text-muted-foreground transition-colors duration-300 group-hover:border-foreground/30 group-hover:text-foreground">
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>

                <div className="mt-6 flex-1">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    {project.eyebrow}
                  </p>
                  <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-foreground">
                    {project.name}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {project.description}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-border/80 bg-background/55 px-2.5 py-1 text-[10px] font-medium text-muted-foreground backdrop-blur"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          )
        })}
      </div>

      <a
        href="https://github.com/akhilphenom"
        target="_blank"
        rel="noreferrer"
        className="group mt-5 flex items-center justify-center gap-2 rounded-xl border border-dashed border-border px-4 py-3 text-xs font-medium text-muted-foreground transition-colors hover:border-foreground/30 hover:bg-muted/40 hover:text-foreground"
      >
        <Github className="h-3.5 w-3.5" />
        Explore all repositories
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    </div>
  )
}
