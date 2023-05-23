import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import ListAllMenu from './ListAllMenu';

type Props = {
  menuId: number;
  className?: String;
};

export default function MegaMenu(props: Props) {
  const menus = useSelector((state: RootState) => state.menu.menus);
  const filteredData = menus.filter((menu: any) => menu.id === props.menuId)[0];
  return (
    <div
      className={`${props.className} fixed top-16 left-0 z-30 hidden w-full bg-white px-6 py-6 uppercase text-neutral-600 drop-shadow-xl duration-300 md:hidden lg:flex`}
    >
      <ListAllMenu numOfCols={5}>
        <>
          {filteredData?.megaMenus.map((item: any, index: any) => (
            <div key={index}>
              <div className="mb-5 font-bold">
                <Link to={item.url}>{item.name}</Link>
              </div>
              <ul>
                {filteredData?.megaMenus
                  .filter((items: any) => items.id == item.id)[0]
                  .megaMenuItems.map((items: any, indexs) => (
                    <li key={indexs}>
                      <Link
                        to={items.url}
                        className="text-xs font-light hover:opacity-80"
                      >
                        {items.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </>
      </ListAllMenu>
    </div>
  );
}
