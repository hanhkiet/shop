import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import ListAllMenu from './ListAllMenu';
import { Collection, CollectionType, Menu } from '../app/types';

type Props = {
  menuId: number;
  className?: String;
  saleAppear: boolean;
};

export default function MegaMenu(props: Props) {
  const menus = useSelector((state: RootState) => state.menu.menus);
  const filteredData = menus.filter(
    (menu: Menu) => menu.id === props.menuId,
  )[0];
  return (
    <div
      className={`${props.className} fixed ${
        props.saleAppear ? `top-32` : `top-16`
      } left-0 z-30 hidden w-full bg-white px-6 py-6 uppercase text-neutral-600 drop-shadow-xl duration-300 md:hidden lg:flex`}
    >
      <ListAllMenu numOfCols={5}>
        <>
          {filteredData?.collectionTypes.map((item: CollectionType, index) => (
            <div key={index}>
              <div className="mb-5 font-bold">
                <Link to="/">{item.name}</Link>
              </div>
              <ul>
                {filteredData?.collectionTypes
                  .filter((items: CollectionType) => items.id == item.id)[0]
                  .collections.map((items: Collection, indexs) => (
                    <li key={indexs}>
                      <Link
                        to="/"
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
