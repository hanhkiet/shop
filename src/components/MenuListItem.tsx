import { Link } from 'react-router-dom';
import { MegaMenuItem } from '../app/types';

type Props = {
  items: MegaMenuItem[];
};

export default function MenuListItem({ items }: Props) {
  return (
    <ul>
      {items.map((item: MegaMenuItem, index) => (
        <li key={index}>
          <Link to={item.url} className="text-xs font-light hover:opacity-80">
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
