import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

type Props = {
  menuTitle: string;
  parentMegamenuId: number;
  onMenuClick: (menu: string) => void;
  activeMenu: Array<string>;
};

function MenuDropDownItemChild(props: Props) {
  const [dataItem, setDataItem] = useState([]);
  const API_MEGAMENUS_URL = import.meta.env.VITE_MEGAMENUS_API_URL;
  useEffect(() => {
    axios.get(API_MEGAMENUS_URL).then(response => {
      setDataItem(response.data);
    });
  }, []);
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
        <img
          className="my-auto h-3 hover:cursor-pointer"
          src={
            props.activeMenu.includes(props.menuTitle)
              ? `https://cdn-icons-png.flaticon.com/512/43/43625.png`
              : `https://cdn-icons-png.flaticon.com/512/748/748113.png`
          }
          alt=""
        />
      </div>
      {props.activeMenu.includes(props.menuTitle) && (
        <>
          <ul className="pl-5">
            <div
              className={`pl-5 ${
                dataItem.filter(
                  (item: any) =>
                    item.parentMegamenuId == props.parentMegamenuId,
                ).length > 1
                  ? `border-l-2 border-gray-300`
                  : ``
              }`}
            >
              {dataItem
                .filter(
                  (item: any) =>
                    item.parentMegamenuId == props.parentMegamenuId,
                )
                .map((item: any, index) => (
                  <li
                    key={index}
                    className="cursor-pointer text-xs hover:text-gray-500"
                  >
                    <Link to={item.url}>{item.name}</Link>
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
