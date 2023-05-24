import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { addActiveMenuChild, removeActiveMenuChild } from '../app/menuSlice';
import MenuDropDownItemChild from './MenuDropDownItemChild';

type Props = {
  menuTitle: string;
  menuId: number;
  onMenuClick: (menu: string) => void;
  activeMenu: string | null;
};

function MenuDropDownItem(props: Props) {
  const menus = useSelector((state: RootState) => state.menu.menus);
  const filteredData = menus.filter((menu: any) => menu.id === props.menuId)[0];
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
        <img
          className="my-auto h-3 hover:cursor-pointer"
          src={
            props.activeMenu === props.menuTitle
              ? `https://cdn-icons-png.flaticon.com/512/43/43625.png`
              : `https://cdn-icons-png.flaticon.com/512/748/748113.png`
          }
          alt=""
        />
      </div>
      {props.activeMenu === props.menuTitle && (
        <ul className="pl-5 uppercase">
          {filteredData.collectionTypes.map((item: any, index: any) => (
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
      )}
    </div>
  );
}

export default MenuDropDownItem;
