import IMAGES from "@/Images/Images";
import { WINDOW_TYPES } from "@/lib/providers/window";

export const icons = [
    {
        name: 'Launchpad',
        link: 'assets/launchpad.png',
        redirect: false,
        url: () => {
            
        },
        window: WINDOW_TYPES.LAUNCHPAD,
        image: IMAGES.launchpad,
        href: null,
        active: false,
    },
    {
        name: 'Home',
        link: 'assets/home.png',
        redirect: false,
        url: '/',
        href: null,
        image: IMAGES.home,
        window: WINDOW_TYPES.LAUNCHPAD,
        active: true,
    },
    {
        name: 'Work Experience',
        link: 'assets/job.png',
        redirect: false,
        url: '/work-experience',
        window: WINDOW_TYPES.WORK_EXPERIENCE,
        image: IMAGES.job,
        href: null,
        active: false,
    },
    {
        name: 'Resume',
        link: 'assets/resume.png',
        redirect: true,
        url: null,
        image: IMAGES.resume,
        window: WINDOW_TYPES.RESUME,
        href: 'https://drive.google.com/file/d/1DHP90nn_uERFvz6jo4-BFV0dZeV8RLTW/view?usp=sharing',
        active: false,
    },
    {
        name: 'Projects',
        link: 'assets/project.png',
        redirect: false,
        url: '/projects',
        image: IMAGES.project,
        window: WINDOW_TYPES.PROJECTS,
        href: null,
        active: false,
    },
    {
        name: 'Github',
        link: 'assets/github.png',
        redirect: true,
        url: null,
        image: IMAGES.github,
        href: 'https://github.com/akhilphenom',
        window: WINDOW_TYPES.PROJECTS,
        active: false,
    },
    {
        name: 'LinkedIn',
        link: 'assets/linkedin.png',
        redirect: true,
        url: null,
        image: IMAGES.linkedin,
        href: 'https://www.linkedin.com/in/sai-akhil-katukam/',
        window: WINDOW_TYPES.LAUNCHPAD,
        active: false,
    },
    {
        name: 'Gmail',
        link: 'assets/gmail.png',
        redirect: true,
        url: null,
        image: IMAGES.gmail,
        href: `mailto:saiakhilk.katukam@gmail.com`,
        window: WINDOW_TYPES.GMAIL,
        active: false,
    },
]