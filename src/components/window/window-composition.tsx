import { Button } from "@/components/ui/button"
import { Maximize2Icon, Minimize2, X } from "lucide-react"
import { useCallback, useState } from "react"
import { cn } from "@/lib/utils"
import { WINDOW_TYPES, WINDOW_TYPES_NAMES } from "@/lib/providers/window"
import { useWindows } from "@/lib/hooks/windows.hook"

interface IProps {
    name: WINDOW_TYPES,
    children?: React.ReactNode
}

export default function WindowComposition({
    name: windowName,
    children
}: IProps) {
    const [showIcon, setShowIcon] = useState(false);
    const { windows, rearrangeWindows, setWindowState, setDisableDragging, setWindowDimensions } = useWindows();

    const windowActionClass = `w-[10px] h-[10px] text-black transition-opacity ease-in-out duration-300`

    const bringToFront = useCallback(() => {
        const opened = [...windows].filter(item => item.opened)
        const closed = [...windows].filter(item => !item.opened)
        const index = opened.findIndex(({ name }) => name == windowName);
        if (index < 0) {
            console.error('Window Type bug')
            return;
        }
        const rearrangedArray = [...closed,...opened.slice(0, index), ...opened.slice(index + 1), opened[index]].map((item, index) => ({
            ...item,
            zIndex: !item.opened ? -1 : 99 + windows.length + index
        }));
        rearrangeWindows(rearrangedArray)
    }, [windows])

    const mouseLeaveRoutine = () => {
        setDisableDragging(windowName, false)
        setShowIcon(false)
    }
    
    const closeWindow = () => {
        setWindowState(windowName, false)
    }

    const expandWindow = () => {
        setWindowDimensions(windowName, {
            x: 0,
            y: 0,
            width: '100vw',
            height: '100vh'
        })
    }

    const minimizeWindow = () => {
        setWindowDimensions(windowName, {
            x: 0,
            y: 0,
            width: 400,
            height: 400
        })
    }

    const WindowActions = () => (
        <>
            <Button variant="ghost" size="icon" className="rounded-full w-[18px] h-[18px] bg-red-500 hover:bg-red-600"
            onClick={closeWindow}>
                <X className={
                    cn(windowActionClass)
                }
                    opacity={showIcon ? 1 : 0}
                />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full w-[18px] h-[18px] bg-yellow-500 hover:bg-yellow-600"
            onClick={minimizeWindow}>
                <Minimize2 className={
                    cn(windowActionClass)
                }
                    opacity={showIcon ? 1 : 0}
                />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full w-[18px] h-[18px] bg-green-500 hover:bg-green-600"
            onClick={expandWindow}
            >
                <Maximize2Icon className={
                    cn(windowActionClass)
                }
                    opacity={showIcon ? 1 : 0}
                />
            </Button>
        </>
    )

    return (
        <div className="flex flex-col flex-1 shadow-lg bg-background rounded-lg">
            <header className="flex items-center h-10 px-3 border-b bg-card !rounded-t-lg">
                <div
                    className="flex items-center gap-2"
                    onMouseEnter={() => {
                        // setDisableDragging(windowName, true)
                        setShowIcon(true)
                    }}
                    // onMouseLeave={mouseLeaveRoutine}
                >
                    <WindowActions/>
                </div>
                <div className="w-full h-full window-drag-handle flex flex-col cursor-move" onClick={bringToFront} 
                // onMouseEnter={mouseLeaveRoutine}
                >
                    <div className="flex items-center justify-center flex-1 font-mono text-sm pr-6 select-none text-blue-800">
                        {WINDOW_TYPES_NAMES[windowName]}
                    </div>
                </div>
            </header>
            <div className="flex h-full flex-1" onClick={bringToFront}>
                <div className="flex-1 p-4 space-y-4 flex flex-col">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
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