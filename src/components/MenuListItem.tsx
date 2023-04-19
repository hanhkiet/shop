import { Link } from 'react-router-dom'

type Props = {
    itemData: Array<String>,
}

export default function MenuListItem(props: Props) {
    return (
        <ul>
            {props.itemData.map((item, index) => (
                <li key={index}>
                    <Link to="/" className="font-light hover:opacity-80 text-xs">
                        {item}
                    </Link>
                </li>
            ))}
        </ul>
    )
}
