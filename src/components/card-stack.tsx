import ICONS from "@/Images/Icons";
import { Card, CardStack } from "./ui/card-stack"
import { cn } from "@/lib/utils";

export const Cards = () => {
    
    const Image = ({src, width = 50}: {src: any, width?: number}) => (
        <div className={
            `w-[${width}px]`
        }>
            <img src={src} className={
                cn(
                    "aspect-auto object-contain !h-[60px]",
                    width && `!w-[${width}px]`
                )
            }/>
        </div>
    )

    const items: Card[] = [
        {
            id: 1,
            name: '',
            designation: '- Frontend -',
            content: (
                <div className="flex flex-wrap gap-4 items-center justify-center">
                    <Image src={ICONS.angular}/>
                    <Image src={ICONS.react}/>
                    <Image src={ICONS.next}/>
                    <Image src={ICONS.reactNative} width={61}/>
                </div>
            )
        },
        {
            id: 2,
            name: '',
            designation: '- Styling -',
            content: (
                <div className="flex flex-wrap gap-4 items-center justify-center">
                    <Image src={ICONS.html}/>
                    <Image src={ICONS.css}/>
                    <Image src={ICONS.scss}/>
                    <Image src={ICONS.tailwindcss}/>
                    <Image src={ICONS.shadcn}/>
                </div>
            )
        },
        {
            id: 3,
            name: null,
            designation: '- Backend -',
            content: (
                <div className="flex flex-wrap gap-4 items-center justify-center">
                    <Image src={ICONS.mongo}/>
                    <Image src={ICONS.express}/>
                    <Image src={ICONS.nodejs}/>
                    <Image src={ICONS.sql}/>
                    <Image src={ICONS.redis}/>
                </div>
            )
        },
        {
            id: 4,
            name: null,
            designation: '- Languages -',
            content: (
                <div className="flex flex-wrap gap-4 items-center justify-center">
                    <Image src={ICONS.js}/>
                    <Image src={ICONS.ts}/>
                    <Image src={ICONS.cpp}/>
                    <Image src={ICONS.java}/>
                    <Image src={ICONS.python}/>
                </div>
            )
        },
    ]
    return (
        <div className="absolute right-5 top-1/4 translate-y-[-50%]">
            <CardStack items={items}/>
        </div>
    )
}