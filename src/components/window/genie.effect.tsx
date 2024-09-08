import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWindows } from '@/lib/hooks/windows.hook'
import { Window } from '@/lib/providers/window'

interface IProps {
    name: Window['name'],
    children: React.ReactNode
}

export default function Genie({
    name: windowName, children
}: IProps) {
    const { windows, setWindowState, getWindow } = useWindows();
    const [isOpen, setIsOpen] = useState(false)

    const modalVariants = {
        initial: {
            scaleY: 0,
            scaleX: 0.5,
            y: '100%',
            opacity: 0,
            clipPath: 'polygon(50% 100%, 0% 100%, 100% 100%)',
        },
        animate: {
            scaleY: 1,
            scaleX: 1,
            y: 0,
            opacity: 1,
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            transition: {
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1], // Custom easing function for a more macOS-like feel
            },
        },
        exit: {
            scaleY: 0,
            scaleX: 0.5,
            y: '100%',
            opacity: 0,
            clipPath: 'polygon(50% 100%, 0% 100%, 100% 100%)',
            transition: {
                duration: 0.5,
                ease: [0.7, 0, 0.84, 0], // Custom easing function for closing animation
            },
        },
    }

    useEffect(() => {
        const window = getWindow(windowName);
        setIsOpen(window.opened)
    }, [windows])

    useEffect(() => {
        const window = getWindow(windowName);
        setIsOpen(window.opened)
        return () => setIsOpen(false)
    }, [])

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="flex-1 flex"
                    variants={modalVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    onClick={(e) => e.stopPropagation()}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    )
}