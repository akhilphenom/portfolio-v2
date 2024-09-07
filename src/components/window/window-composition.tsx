import { Button } from "@/components/ui/button"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Card } from "@/components/ui/card"
import { Maximize2Icon, Minimize2, X } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface IProps {
    children?: React.ReactNode
}

export default function WindowComposition({
    children
}: IProps) {
    const [showIcon, setShowIcon] = useState(false);
    const windowActionClass = `w-[10px] h-[10px] text-black transition-opacity ease-in-out duration-300`
    return (
        <div className="flex flex-col flex-1 shadow-lg bg-background rounded-lg">
            <header className="flex items-center h-10 px-3 border-b bg-card !rounded-t-lg window-drag-handle">
                <div
                    className="flex items-center gap-2"
                    onMouseEnter={() => setShowIcon(true)}
                    onMouseLeave={() => setShowIcon(false)}
                >
                    <Button variant="ghost" size="icon" className="rounded-full w-[18px] h-[18px] bg-red-500 hover:bg-red-600">
                        <X className={
                            cn(windowActionClass)
                        }
                            opacity={showIcon ? 1 : 0}
                        />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full w-[18px] h-[18px] bg-yellow-500 hover:bg-yellow-600">
                        <Minimize2 className={
                            cn(windowActionClass)
                        }
                            opacity={showIcon ? 1 : 0}
                        />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full w-[18px] h-[18px] bg-green-500 hover:bg-green-600">
                        <Maximize2Icon className={
                            cn(windowActionClass)
                        }
                            opacity={showIcon ? 1 : 0}
                        />
                    </Button>
                </div>
                <div className="ml-auto text-sm font-medium">Finder</div>
            </header>
            <div className="flex h-full flex-1">
                <nav className="w-64 border-r bg-card rounded-bl-lg">
                    <div className="p-4 space-y-2">
                        <Button variant="ghost" className="justify-start w-full gap-2">
                            <HomeIcon className="w-5 h-5" />
                            <span>Desktop</span>
                        </Button>
                        <Button variant="ghost" className="justify-start w-full gap-2">
                            <FolderIcon className="w-5 h-5" />
                            <span>Documents</span>
                        </Button>
                        <Button variant="ghost" className="justify-start w-full gap-2">
                            <DownloadIcon className="w-5 h-5" />
                            <span>Downloads</span>
                        </Button>
                        <Button variant="ghost" className="justify-start w-full gap-2">
                            <ImageIcon className="w-5 h-5" />
                            <span>Pictures</span>
                        </Button>
                        <Button variant="ghost" className="justify-start w-full gap-2">
                            <Music2Icon className="w-5 h-5" />
                            <span>Music</span>
                        </Button>
                        <Button variant="ghost" className="justify-start w-full gap-2">
                            <VideoIcon className="w-5 h-5" />
                            <span>Videos</span>
                        </Button>
                    </div>
                </nav>
                <div className="flex-1 p-4 space-y-4 flex flex-col">
                    <div className="flex items-center justify-between">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink>
                                        Desktop
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Documents</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                                <SearchIcon className="w-5 h-5" />
                            </Button>
                            <Button variant="ghost" size="icon">
                                <LayoutGridIcon className="w-5 h-5" />
                            </Button>
                            <Button variant="ghost" size="icon">
                                <ListIcon className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col min-h-0 flex-1 basis-0 overflow-scroll">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

function DownloadIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" x2="12" y1="15" y2="3" />
        </svg>
    )
}


function FolderIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
        </svg>
    )
}


function HomeIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    )
}


function ImageIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>
    )
}


function LayoutGridIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="7" height="7" x="3" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="14" rx="1" />
            <rect width="7" height="7" x="3" y="14" rx="1" />
        </svg>
    )
}


function ListIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="8" x2="21" y1="6" y2="6" />
            <line x1="8" x2="21" y1="12" y2="12" />
            <line x1="8" x2="21" y1="18" y2="18" />
            <line x1="3" x2="3.01" y1="6" y2="6" />
            <line x1="3" x2="3.01" y1="12" y2="12" />
            <line x1="3" x2="3.01" y1="18" y2="18" />
        </svg>
    )
}

function Music2Icon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="8" cy="18" r="4" />
            <path d="M12 18V2l7 4" />
        </svg>
    )
}


function SearchIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    )
}


function VideoIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
            <rect x="2" y="6" width="14" height="12" rx="2" />
        </svg>
    )
}