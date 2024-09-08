import { Card, CardStack } from "./ui/card-stack"

export const Cards = () => {
    const items: Card[] = [
        {
            id: 1,
            name: 'Sai Akhil Katukam',
            designation: 'Senior Product Developer',
            content: (
                <div>
                    Content is here
                </div>
            )
        },
        {
            id: 2,
            name: 'Sree Sayi Hrudai',
            designation: 'Product Developer',
            content: (
                <div>
                    Content is here
                </div>
            )
        },
        {
            id: 3,
            name: 'Sai Akhil Katukam',
            designation: 'Senior Product Developer',
            content: (
                <div>
                    Content is here
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