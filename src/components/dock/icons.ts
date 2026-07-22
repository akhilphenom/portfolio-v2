import IMAGES from "@/Images/Images";
import { WINDOW_TYPES } from "@/lib/providers/window";

export interface DockIcon {
    name: string;
    image: string;
    window: WINDOW_TYPES;
    link?: string;
    url?: string | null;
    href?: string | null;
    redirect?: boolean;
    minimizeAll?: boolean;
    opened?: boolean;
    /**
     * Whether this app renders in the dock. Every app is always available in
     * the launchpad; this flag only controls dock visibility.
     */
    showInDock?: boolean;
}

export const icons: DockIcon[] = [
    {
        name: 'Launchpad',
        link: 'assets/launchpad.png',
        window: WINDOW_TYPES.LAUNCHPAD,
        image: IMAGES.launchpad,
        href: null,
        showInDock: true,
    },
    {
        name: 'Home',
        link: 'assets/home.png',
        url: '/',
        href: null,
        image: IMAGES.home,
        window: WINDOW_TYPES.LAUNCHPAD,
        minimizeAll: true,
        showInDock: true,
    },
    {
        name: 'Work Experience',
        link: 'assets/job.png',
        redirect: false,
        url: '/work-experience',
        window: WINDOW_TYPES.WORK_EXPERIENCE,
        image: IMAGES.job,
        href: null,
        showInDock: true,
    },
    {
        name: 'Terminal',
        link: 'assets/terminal.svg',
        redirect: false,
        url: '/terminal',
        window: WINDOW_TYPES.TERMINAL,
        image: IMAGES.terminal,
        href: null,
        showInDock: true,
    },
    {
        name: 'Resume',
        link: 'assets/resume.png',
        redirect: true,
        url: null,
        image: IMAGES.resume,
        window: WINDOW_TYPES.RESUME,
        href: 'https://drive.google.com/file/d/1DEuca2y_Gwwt_ZkyKtjqVo9sQo7gH8bZ/view?usp=sharing',
        showInDock: true,
    },
    {
        name: 'Projects',
        link: 'assets/project.png',
        redirect: false,
        url: '/projects',
        image: IMAGES.project,
        window: WINDOW_TYPES.PROJECTS,
        href: null,
        showInDock: true,
    },
    {
        name: 'Github',
        link: 'assets/github.png',
        redirect: true,
        url: null,
        image: IMAGES.github,
        href: 'https://github.com/akhilphenom',
        window: WINDOW_TYPES.PROJECTS,
        showInDock: true,
    },
    {
        name: 'LinkedIn',
        link: 'assets/linkedin.png',
        redirect: true,
        url: null,
        image: IMAGES.linkedin,
        href: 'https://www.linkedin.com/in/sai-akhil-katukam/',
        window: WINDOW_TYPES.LAUNCHPAD,
        showInDock: true,
    },
    {
        name: 'Gmail',
        link: 'assets/gmail.png',
        redirect: true,
        url: null,
        image: IMAGES.gmail,
        href: `mailto:saiakhilk.katukam@gmail.com`,
        window: WINDOW_TYPES.GMAIL,
        showInDock: true,
    },
]