import IMAGES from "@/Images/Images"
import { useState } from "react"

interface IProps {
    className?: string
}

export default function WobbleCard({}: IProps) {
    const images = [IMAGES.jeep, IMAGES.wild]
    const pickRandom = () => {
        return images[Math.floor(Math.random() * images.length)]
    }
    const [image, setImage] = useState(images[1]);
    const changeImage = () => {
        setImage(images[0])
    }
    return (
        <div className="relative group">
            <div className="w-full rounded-full overflow-hidden shadow-2xl" onClick={changeImage}>
                <img
                    src={image}
                    alt="Image"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover transition-all animate-focusFromBlur duration-500 group-hover:brightness-100 group-hover:scale-105 group-hover:rotate-[2deg] animate-wobble"
                    style={{ aspectRatio: 1, objectFit: "cover" }}
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 rounded-full group-hover:from-transparent group-hover:to-black/50 transition-all duration-300" />
        </div>
    )
}