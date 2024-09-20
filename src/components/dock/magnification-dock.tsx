import { motion, MotionValue, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { memo, useCallback, useRef } from 'react'
import { icons } from './icons';
import { Hint } from '../shared/hint';
import { useWindows } from '@/lib/hooks/windows.hook';

function AppIconComponent ({ index, item, mouseX }) {
    const { addWindow, windows, setWindowState, setDisableDragging, setWindowZIndex } = useWindows();
    const ref = useRef<HTMLDivElement>(null)!;
    const distance = useTransform(mouseX, (value: MotionValue) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return Number(value) - (bounds.x + bounds.width/2)
    })

    const widthSync = useTransform(distance, [-200, 0, 200], [44, 70, 44])
    const width = useSpring(widthSync, {
        damping: 12,
        mass: 0.5,
        stiffness: 150,
    })

    const onClick = () => {
        item.href ? window.open(item.href, "_blank") : openWindow()
    }

    const openWindow = useCallback(() => {
        if(windows.find(({ name }) => name == item.window)) {
            setWindowZIndex(item.window, 99+ windows.length + 1)
            if(item.opened) {
                return;
            }
            setWindowState(item.window, true)
            setDisableDragging(item.window, false)
        } else {
            addWindow(item.window, {
                x: 150,
                y: 150,
                width: 400,
                height: 400,
            })
            setWindowZIndex(item.window, 99 + windows.length + 1)
        }
    }, [item, addWindow, windows])

    return (
        <motion.div 
        key={index}
        ref={ref}
        style={{ width }}
        className='aspect-square w-11'
        onClick={onClick}
        >
            <Hint label={item.name}>
                <img src={item.image}/>
            </Hint>
        </motion.div>
    )
}

function DockComponent () {
    const mouseX: MotionValue = useMotionValue(Number.MAX_SAFE_INTEGER)
    return (
        <motion.div 
        onMouseMove={e => mouseX.set(e.pageX)}
        onMouseLeave={_ => mouseX.set(Number.MAX_SAFE_INTEGER)}
        className='flex flex-row items-center gap-4 justify-center px-5 py-2 rounded-xl max-h-[75px] shadow-md'
        style={{
            background: '#ffffff24'
        }}
        >
            { icons.map((item, index) => <AppIcon mouseX={mouseX} index={index} item={item} key={index}/>) }
        </motion.div>
    )
}

const AppIcon = memo(AppIconComponent)
const Dock = memo(DockComponent)

export const MagnificationDock = () => {
    return (
        <div className='absolute translate-x-[-50%] bottom-5 left-[50%]'>
            <Dock/>
        </div>
    )
}