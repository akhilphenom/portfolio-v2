import { motion } from 'framer-motion';
import WobbleCard from './shared/wobble-card';

function HeroSection() {
    return (
        <>
            <div className='absolute w-full top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'>
                <div className='w-[300px] mx-auto'>
                    <WobbleCard/>
                </div>
                <motion.h1
                initial={{ opacity: 0.5, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                }}
                className="mt-8 bg-gradient-to-br from-slate-300 to-white py-4 bg-clip-text text-center 
                text-2xl tracking-tight text-transparent md:text-5xl font-thin select-none"
                >
                    <p className='mb-4 tracking-tight'>
                        Hello, Welcome <span className='mix-blend-color-dodge' style={{ color: 'initial'}}>👋</span><br/>
                    </p>
                    <p>
                        <span className='mr-3'>
                            My name is
                        </span>
                        <span 
                        className='font-extralight tracking-normal mix-blend-color-dodge bg-green-700 text-white rounded-md shadow-md pl-3 pr-3 pb-1'
                        >
                            Sai Akhil Katukam
                        </span>
                    </p>
                </motion.h1>
            </div>
        </>
    )
}

export default HeroSection
