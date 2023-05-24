import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { setActiveMenu } from '../app/menuSlice';
import MenuDropDownItem from './MenuDropDownItem';
import { Menu } from '../app/types';

type Props = {
  onClickClose: () => void;
};

function MenuDropDown(props: Props) {
  const menus = useSelector((state: RootState) => state.menu.menus);

  const activeMenuStore = useSelector(
    (state: RootState) => state.menu.activeMenu,
  );
  const dispatch = useDispatch();
  const handleMenuClick = (menu: string | null) => {
    dispatch(setActiveMenu(menu === activeMenuStore ? null : menu));
  };
  return (
    <div className="z-50 m-5">
      <img
        onClick={props.onClickClose}
        className="mb-5 h-3 hover:cursor-pointer"
        src="https://cdn-icons-png.flaticon.com/512/2961/2961937.png"
        alt=""
      />
      <ul>
        {menus.map((item: Menu, index: any) => (
          <li key={index}>
            {item.collectionTypes.length > 0 ? (
              <MenuDropDownItem
                onMenuClick={() => handleMenuClick(item.name)}
                activeMenu={activeMenuStore}
                menuTitle={item.name}
                menuId={item.id}
              />
            ) : (
              <Link
                className="text-1xl grid h-16 cursor-pointer content-center border-b-2 border-gray-300 font-light uppercase hover:text-gray-500"
                to="/"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MenuDropDown;
