import { Link } from 'react-router-dom';
import { MegaMenuData } from '../app/types';
import ListAllMenu from './ListAllMenu';
import MenuListItem from './MenuListItem';

type Props = {
  menu: MegaMenuData[];
  className?: String;
};

export default function MegaMenu({ menu, className }: Props) {
  return (
    <div
      className={`${className} fixed top-16 left-0 z-30 hidden w-full bg-white px-6 py-6 uppercase text-neutral-600 drop-shadow-xl duration-300 md:hidden lg:flex`}
    >
      <ListAllMenu numOfCols={5}>
        <>
          {menu.map((item: MegaMenuData, index) => (
            <div key={index}>
              <div className="mb-5 font-bold">
                <Link to="/">{item.name}</Link>
              </div>
              <MenuListItem items={item.megaMenuItems || []} />
            </div>
          ))}
        </>
      </ListAllMenu>
    </div>
  );
}
