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
    role: 'SDE-II',
    company: 'Microsoft · Link to Windows Platform Founding Team',
    location: 'Hyderabad, India',
    start: 'Sep 2026',
    end: 'Present',
    kind: 'present',
    summary:
      'Building seamless and reliable Windows onboarding experiences for Link to Windows.',
    highlights: [
      'Drove the implementation and rollout of PC Auto Registration during Windows setup, designed to register approximately 60 million PCs annually while eliminating password-entry friction from a funnel with roughly 70% user drop-off.',
      'Owned Windows setup integration for MSA Account Transfer on Android, enabling QR-based account and password transfer during device onboarding and driving controlled experiment ramps toward full production readiness.',
      'Implemented Minimalism Onboarding, moving device trust establishment from a synchronous to an asynchronous architecture across client and service layers, improving platform reliability by 3.5% and onboarding completion by 10%.',
      'Earned runner-up recognition at Hackathon 2026 for building and presenting an innovative product solution.',
    ],
    stack: [
      'C++',
      'C#',
      'Windows OOBE',
      'Azure',
      'React',
      'TypeScript',
      'Android',
      'Experimentation',
    ],
  },
  {
    id: 'microsoft-se',
    role: 'SDE-I',
    company: 'Microsoft · Link to Windows Platform Founding Team',
    location: 'Hyderabad, India',
    start: 'Apr 2025',
    end: 'Sep 2026',
    kind: 'past',
    summary:
      'Owned platform modernization, authentication, reliability, and cost-efficiency initiatives across Link to Windows services and onboarding experiences.',
    highlights: [
      'Led end-to-end Entra eSTS Automatic Key Rollover adoption across 14 platform services, resolving certificate, authentication, and deployment failures through a phased rollout.',
      'Modernized the Windows SCOOBE Phone Pairing experience from planning through retail rollout, migrating legacy Knockout and WinJS pages to React 18, TypeScript 5.8, ES2022, Fluent UI, and WebView2.',
      'Delivered approximately $500K in annualized COGS savings through Azure Monitor sampling and telemetry optimization.',
      'Retired RPS ticket-based authentication in favor of OAuth 2.0 for SFI compliance and contributed to first-party application rollouts redirecting legacy-device traffic to Entra.',
      'Migrated Nightwatch integration tests across 14 microservices from the deprecated Falcon SDK to Cosmic TestSDK, improving test reliability and long-term maintainability.',
      'Served as DRI for a Sev1 incident affecting 16.1 million devices and multiple Sev2 incidents, tracing root causes within the hour and coordinating mitigations to restore service health.',
      'Built DcgMcp, an AI-assisted developer tool that exposed platform workflows through MCP and helped drive SWE Agent adoption across the engineering team.',
    ],
    stack: [
      'C#',
      '.NET',
      'Azure',
      'React',
      'TypeScript',
      'Kusto',
      'OAuth 2.0',
      'OpenTelemetry',
      'Cosmic TestSDK',
      'MCP',
    ],
  },
  {
    id: 'inncircles-senior',
    role: 'Senior Product Developer',
    company: 'Inncircles Technologies',
    location: 'Hyderabad, India',
    start: 'Jul 2024',
    end: 'Apr 2025',
    kind: 'past',
    summary: 'Full-stack development, leading feature delivery for a construction-tech startup.',
    highlights: [
      'Introduced Vitest for API integration testing, using its fast bundling and selective database mocking to execute tests reliably in isolation.',
      'Managed team infrastructure by provisioning servers and configuring AWS CloudWatch monitoring and Bitbucket automation bots.',
      'Worked independently as a critical engineering resource while leading teams of four developers from feature development through deployment, ensuring timelines, thorough code reviews, refactoring, and maintainable code quality.',
    ],
    stack: [
      'React',
      'Node.js',
      'TypeScript',
      'AWS',
      'CloudWatch',
      'Vitest',
      'Bitbucket',
      'Docker',
    ],
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
      'Replaced mxGraph with a custom mind-map tool capable of handling more than 15,000 nodes, improving usability for site engineers.',
      'Built a React Native image editor with Skia and Reanimated 2, reducing editing-cycle time by 25% and enabling direct image uploads from the mobile app.',
      'Decoupled a shared framework into individual construction projects, completing extensive migrations and validations while recovering 10% missing data from audit logs.',
      'Created an EJS-based PDF template framework for contractor work-order cash flows, processing jobs asynchronously with Puppeteer and headless Chromium on AWS Lambda and reducing printery workload by about 80%.',
    ],
    stack: [
      'React',
      'React Native',
      'Node.js',
      'D3.js',
      'Skia',
      'Reanimated',
      'MongoDB',
      'Redis',
      'AWS Lambda',
      'Puppeteer',
      'EJS',
    ],
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
      'Built an Angular CDK drag-and-drop module for generating dynamic tables from grid templates, enabling engineers to create hundreds of table logs through a reusable plug-and-play system.',
      'Designed an ngx-graph tree interface that gave engineers a clear view of work status across project locations.',
      'Used responsive CSS, Flexbox, and reusable Angular component patterns across approximately 30% of the codebase to deliver adaptive pages for multiple projects.',
    ],
    stack: ['Angular', 'Angular CDK', 'TypeScript', 'ngx-graph', 'HTML', 'CSS', 'Flexbox'],
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
