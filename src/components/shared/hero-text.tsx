import { cn } from '@/lib/utils';
import React from 'react'

interface IProps {
    label: string;
    className?: string
}

function HeroText({
    label, className
}: IProps) {
  return (
    <div className={
        cn(
            "mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-xl font-medium tracking-tight text-transparent md:text-2xl",
            className
        )
    }>
        {label}
    </div>
  )
}

export default HeroText
