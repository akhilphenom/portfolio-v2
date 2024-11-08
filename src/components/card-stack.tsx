import ICONS from "@/Images/Icons";
import { Card, CardStack } from "./ui/card-stack"
import { cn } from "@/lib/utils";

export const Cards = () => {
    
    const Image = ({src, width = 50, height = 50}: {src: any, width?: number, height?: number}) => (
        <div className={
            `!w-[${width}px]`
        }>
            <img src={src} 
            style={{
                width, height: height ? height : 'auto'
            }}
            className={
                `aspect-auto object-contain`
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
                    <Image src={ICONS.expo}/>
                    <Image src={ICONS.reactNative} width={175}/>
                    <Image src={ICONS.next} width={110}/>
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
                    <Image src={ICONS.angularmat}/>
                    <Image src={ICONS.framer} width={40}/>
                    <Image src={ICONS.lottie} width={40}/>
                </div>
            )
        },
        {
            id: 3,
            name: null,
            designation: '- Backend -',
            content: (
                <div className="flex flex-wrap gap-4 items-center justify-center" style={{
                    rowGap: '0.7rem'
                }}>
                    <Image src={ICONS.mongo} width={60}/>
                    <Image src={ICONS.express} width={60}/>
                    <Image src={ICONS.nodejs} width={70}/>
                    <Image src={ICONS.mysql} width={60}/>
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
                    <Image src={ICONS.java} height={50}/>
                    <Image src={ICONS.python}/>
                    <Image src={ICONS.golang}/>
                    <Image src={ICONS.sql}/>
                </div>
            )
        },
        {
            id: 5,
            name: null,
            designation: '- Cloud Services -',
            content: (
                <div className="flex flex-wrap gap-4 items-center justify-center">
                    <Image src={ICONS.lambda}/>
                    <Image src={ICONS.sqs}/>
                    <Image src={ICONS.dynamodb}/>
                    <Image src={ICONS.gateway}/>
                    <Image src={ICONS.heroku}/>
                    <Image src={ICONS.route53}/>
                    <Image src={ICONS.gc} width={160}/>
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