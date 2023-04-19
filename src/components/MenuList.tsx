import { ReactNode } from 'react'

type Props = {
    key?: Number,
    menuItemTitle: string,
    children: ReactNode
}

export default function MenuList(props: Props) {
    return (
        <div className="mx-10 text-center md:text-left lg:text-left">
            <h2 className="mb-5 font-bold uppercase">{props.menuItemTitle}</h2>
            {props.children}
        </div>
    )
}
