import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { addActiveMenuChild, removeActiveMenuChild } from '../app/menuSlice';
import MenuDropDownItemChild from './MenuDropDownItemChild';
import { CollectionType, Menu } from '../app/types';

type Props = {
  menuTitle: string;
  menuId: number;
  onMenuClick: (menu: string) => void;
  activeMenu: string | null;
};

function MenuDropDownItem(props: Props) {
  const menus = useSelector((state: RootState) => state.menu.menus);
  const filteredData = menus.filter(
    (menu: Menu) => menu.id === props.menuId,
  )[0];
  const activeMenuChildStore = useSelector(
    (state: RootState) => state.menu.activeMenuChild,
  );
  const dispatch = useDispatch();
  const handleMenuClick = (menuId: string, menuChild: string) => {
    if (activeMenuChildStore.includes(menuChild)) {
      dispatch(
        removeActiveMenuChild(
          activeMenuChildStore[activeMenuChildStore.indexOf(menuId)],
        ),
      );
      dispatch(removeActiveMenuChild(menuChild));
    } else {
      if (activeMenuChildStore.includes(menuId)) {
        dispatch(
          removeActiveMenuChild(
            activeMenuChildStore[activeMenuChildStore.indexOf(menuId) + 1],
          ),
        );
        dispatch(
          removeActiveMenuChild(
            activeMenuChildStore[activeMenuChildStore.indexOf(menuId)],
          ),
        );
      }
      dispatch(addActiveMenuChild(menuId));
      dispatch(addActiveMenuChild(menuChild));
    }
  };
  return (
    <div className="cursor-pointer">
      <div
        className="flex h-16 justify-between border-b-2 border-gray-300 uppercase hover:text-gray-500"
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
              props.activeMenu === props.menuTitle
                ? `collapse rotate-90 opacity-0`
                : `visible -rotate-0 opacity-100`
            }`}
            src={`https://cdn-icons-png.flaticon.com/512/43/43625.png`}
            alt=""
          />
          <img
            className={`h-3 duration-300 ${
              props.activeMenu === props.menuTitle ? `rotate-0` : `-rotate-90`
            } hover:cursor-pointer`}
            src={`https://cdn-icons-png.flaticon.com/512/43/43625.png`}
            alt=""
          />
        </div>
      </div>
      <ul
        className={`pl-5 uppercase ${
          props.activeMenu === props.menuTitle
            ? `visible h-full py-5 opacity-100`
            : `collapse h-0 py-0 opacity-0`
        } duration-100`}
      >
        {filteredData.collectionTypes.map((item: CollectionType, index) => (
          <MenuDropDownItemChild
            key={index}
            onMenuClick={() =>
              handleMenuClick(filteredData.id.toString(), item.name)
            }
            activeMenu={activeMenuChildStore}
            menuTitle={item.name}
            menuParentId={props.menuId}
            parentMegamenuId={item.id}
          />
        ))}
      </ul>
    </div>
  );
}

export default MenuDropDownItem;
