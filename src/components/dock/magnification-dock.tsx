import { motion, MotionValue, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { memo, useRef } from 'react'
import { icons } from './icons';
import { Hint } from '../shared/hint';

function AppIconComponent ({ index, item, mouseX }) {
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
    return (
        <motion.div 
        key={index}
        ref={ref}
        style={{ width }}
        className='aspect-square w-11'
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
        className='flex flex-row items-center gap-4 justify-center bg-gray-700 px-5 py-2 rounded-xl'>
            {icons.map((item, index)=>(
                <AppIcon mouseX={mouseX} index={index} item={item} key={index}/>
            ))}
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