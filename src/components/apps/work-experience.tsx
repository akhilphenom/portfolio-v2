import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type TimelineKind = 'present' | 'past' | 'upcoming'

export type ExperienceEntry = {
  id: string
  role: string
  company: string
  location?: string
  start: string
  end: string
  kind: TimelineKind
  summary?: string
  highlights?: string[]
  stack?: string[]
}

/**
 * Edit this array to update the work history. Order top → bottom = most recent → oldest.
 * `kind: 'present'` renders a pulsing node, `'upcoming'` renders a dashed future node.
 */
export const EXPERIENCES: ExperienceEntry[] = [
  {
    id: 'microsoft-se2',
    role: 'Software Engineer 2',
    company: 'Microsoft',
    location: 'Hyderabad, India',
    start: 'Aug 2026',
    end: 'Upcoming',
    kind: 'upcoming',
    summary:
      'Stepping up to Software Engineer 2 on the CXE Platform team.',
  },
  {
    id: 'microsoft-se',
    role: 'Software Engineer',
    company: 'Microsoft · CXE Platform',
    location: 'Hyderabad, India',
    start: 'Apr 2025',
    end: 'Present',
    kind: 'present',
    summary:
      'Founding member of the IDC platform team owning critical DCG services for Windows onboarding and Nano connections.',
    highlights: [
      'Took end-to-end ownership of the Cloud Relay Service — resolved a multi-region pod crashloop, added a fallback mechanism, and held weekly deployment cadence and compliance.',
      'Led fleet-wide Auto Key Rollover (AKR) across all IDC-owned DCG services to 100% production rollout, retiring legacy certificate-based encryption.',
      'Sole owner of the Nightwatch test migration across 14 microservices, replacing the deprecated Falcon SDK with Cosmic TestSDK.',
      'Drove ~$0.5M in annualized COGS savings through telemetry optimization during the OpenTelemetry migration.',
      'Mitigated a Sev1 impacting 16.1M devices and multiple Sev2 incidents as DRI, tracing root causes within the hour.',
      'Led MSA OAuth v2 token migration for Phone Pairing in Windows OOBE/SCOOBE, and built AI tooling (DcgMcp) driving SWE Agent adoption.',
    ],
    stack: ['C#', '.NET', 'Azure', 'Kusto', 'Geneva', 'OpenTelemetry'],
  },
  {
    id: 'inncircles-senior',
    role: 'Senior Product Developer',
    company: 'Inncircles Technologies',
    location: 'Hyderabad, India',
    start: 'Jul 2024',
    end: 'Mar 2025',
    kind: 'past',
    summary: 'Full-stack development, leading feature delivery for a construction-tech startup.',
    highlights: [
      'Led a team of 4 developers from feature development through deployment, driving code reviews and refactoring for code quality.',
      'Introduced the Vitest framework for isolated API integration testing with selective database mocking.',
      "Managed the team's infrastructure — provisioning servers, configuring CloudWatch and Bitbucket bots.",
    ],
    stack: ['React', 'Node.js', 'AWS', 'Vitest'],
  },
  {
    id: 'inncircles-product',
    role: 'Product Developer',
    company: 'Inncircles Technologies',
    location: 'Hyderabad, India',
    start: 'Jul 2022',
    end: 'Jul 2024',
    kind: 'past',
    summary: 'Owned high-impact features end-to-end across web and mobile.',
    highlights: [
      'Rebuilt an interactive workflow module with D3.js and panzoom.js, reducing operational effort by 80%.',
      'Overhauled the mxGraph library into a custom mind-map tool handling 15,000+ nodes.',
      'Built a mobile image editor with Skia and Reanimated 2, cutting edit-cycle time by 25%.',
      'Delivered serverless PDF generation on AWS Lambda (headless Chromium + Puppeteer), cutting printery workload ~80%.',
    ],
    stack: ['React', 'React Native', 'D3.js', 'AWS Lambda', 'Node.js'],
  },
  {
    id: 'inncircles-intern',
    role: 'Product Development Intern',
    company: 'Inncircles Technologies',
    location: 'Hyderabad, India',
    start: 'Jan 2022',
    end: 'Jun 2022',
    kind: 'past',
    summary: 'First engineering role, building reusable UI systems.',
    highlights: [
      'Built a drag-and-drop module with Angular CDK for generating dynamic tables from grid templates.',
      'Designed a static tree UI with ngx-graph to visualize work statuses across project locations.',
      'Improved component reusability across ~30% of the codebase with a disciplined Flexbox/box-model approach.',
    ],
    stack: ['Angular', 'TypeScript', 'SCSS'],
  },
]

const nodeStyles: Record<TimelineKind, string> = {
  present: 'bg-green-600 border-green-600',
  past: 'bg-slate-400 border-slate-400',
  upcoming: 'bg-background border-green-600 border-dashed',
}

function Node({ kind }: { kind: TimelineKind }) {
  return (
    <span className="relative flex h-3.5 w-3.5 shrink-0 items-center justify-center">
      {kind === 'present' && (
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500/60" />
      )}
      <span
        className={cn(
          'relative inline-flex h-3.5 w-3.5 rounded-full border-2',
          nodeStyles[kind],
        )}
      />
    </span>
  )
}

function Chip({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-border bg-muted/60 px-2 py-0.5 text-[10px] font-medium tracking-wide text-muted-foreground">
      {label}
    </span>
  )
}

export default function WorkExperience() {
  return (
    <div className="mx-auto w-full max-w-2xl px-1 pb-6">
      <header className="mb-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-green-700">
          Career
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          Work Experience
        </h1>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          A timeline of the roles and milestones that shaped my journey so far.
        </p>
      </header>

      <ol className="relative ml-1.5 border-l border-border/70">
        {EXPERIENCES.map((exp, index) => (
          <motion.li
            key={exp.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 0.45,
              delay: index * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative mb-9 pl-6 last:mb-0"
          >
            <span className="absolute -left-[9px] top-1">
              <Node kind={exp.kind} />
            </span>

            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="font-mono text-[11px] tracking-wide text-muted-foreground">
                {exp.start} — {exp.end}
              </span>
              {exp.kind === 'present' && (
                <span className="rounded-full bg-green-700 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                  Now
                </span>
              )}
              {exp.kind === 'upcoming' && (
                <span className="rounded-full border border-green-700 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-green-700">
                  Next
                </span>
              )}
            </div>

            <h3 className="mt-1.5 text-base font-semibold leading-snug text-foreground">
              {exp.role}
            </h3>
            <p className="text-sm font-medium text-green-700">
              {exp.company}
              {exp.location && (
                <span className="text-muted-foreground"> · {exp.location}</span>
              )}
            </p>

            {exp.summary && (
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {exp.summary}
              </p>
            )}

            {exp.highlights && exp.highlights.length > 0 && (
              <ul className="mt-2.5 space-y-1.5">
                {exp.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-sm leading-relaxed text-foreground/80"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-green-600/70" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}

            {exp.stack && exp.stack.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {exp.stack.map((s) => (
                  <Chip key={s} label={s} />
                ))}
              </div>
            )}
          </motion.li>
        ))}
      </ol>
    </div>
  )
}
