import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Link } from 'react-router-dom';
import { Collection, CollectionType, Menu } from '../app/types';

type Props = {
  menuTitle: string;
  parentMegamenuId: number;
  onMenuClick: (menu: string) => void;
  activeMenu: Array<string>;
  menuParentId: number;
};

function MenuDropDownItemChild(props: Props) {
  const menus = useSelector((state: RootState) => state.menu.menus);
  const filteredData = menus.filter(
    (menu: Menu) => menu.id === props.menuParentId,
  )[0];
  const filteredDataChild = filteredData.collectionTypes.filter(
    (item: CollectionType) => item.id === props.parentMegamenuId,
  )[0];
  return (
    <li className="cursor-pointer">
      <div
        className="flex h-16 justify-between hover:text-gray-500"
        onClick={() => {
          props.onMenuClick(props.menuTitle);
        }}
      >
        <div className="text-1xl grid content-center font-light">
          {props.menuTitle}
        </div>
        <div className="grid content-center">
          <img
            className={`relative left-0 top-3 h-3 duration-300 hover:cursor-pointer ${
              props.activeMenu.includes(props.menuTitle)
                ? `collapse rotate-90 opacity-0`
                : `visible -rotate-0 opacity-100`
            }`}
            src={`https://cdn-icons-png.flaticon.com/512/43/43625.png`}
            alt=""
          />
          <img
            className={`h-3 duration-300 ${
              props.activeMenu.includes(props.menuTitle)
                ? `rotate-0`
                : `-rotate-90`
            } hover:cursor-pointer`}
            src={`https://cdn-icons-png.flaticon.com/512/43/43625.png`}
            alt=""
          />
        </div>
      </div>
      {props.activeMenu.includes(props.menuTitle) && (
        <>
          <ul className="pl-5">
            <div className="border-l-2 border-gray-300 pl-5">
              {filteredDataChild.collections.map((item: Collection, index) => (
                <li
                  key={index}
                  className="cursor-pointer text-xs hover:text-gray-500"
                >
                  <Link to="/">{item.name}</Link>
                </li>
              ))}
            </div>
          </ul>
        </>
      )}
    </li>
  );
}

export default MenuDropDownItemChild;
