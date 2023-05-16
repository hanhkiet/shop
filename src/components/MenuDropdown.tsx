import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { setActiveMenu } from '../app/menuSlice';
import MenuDropDownItem from './MenuDropDownItem';

type Props = {
  onClickClose: () => void;
};

function MenuDropDown(props: Props) {
  const [dataItem, setDataItem] = useState<any>([]);
  const [megaMenuData, setMegaMenuData] = useState<any>([]);
  const API_MENUS_URL = import.meta.env.VITE_MENUS_API_URL;
  const API_MEGAMENUS_URL = import.meta.env.VITE_MEGAMENUS_API_URL;
  useEffect(() => {
    axios.get(API_MENUS_URL).then(response => {
      setDataItem([
        ...response.data,
        {
          name: 'account',
          url: '/auth/login',
        },
      ]);
    });
  }, []);
  useEffect(() => {
    axios.get(API_MEGAMENUS_URL).then(response => {
      setMegaMenuData(response.data);
    });
  }, []);
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
        {dataItem.map((item: any, index: any) => (
          <li key={index}>
            {megaMenuData.some((obj: any) => obj.menuId === item.id) ? (
              <MenuDropDownItem
                onMenuClick={() => handleMenuClick(item.name)}
                activeMenu={activeMenuStore}
                menuTitle={item.name}
                menuId={item.id}
              />
            ) : (
              <Link
                className="text-1xl grid h-16 cursor-pointer content-center border-b-2 border-gray-300 font-light uppercase hover:text-gray-500"
                to={item.url}
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
