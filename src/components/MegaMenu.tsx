import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ListAllMenu from './ListAllMenu';
import MenuListItem from './MenuListItem';
import axios from 'axios';

type Props = {
  menuId: number;
  className?: String;
};

export default function MegaMenu(props: Props) {
  const [dataItem, setDataItem] = useState([]);
  const [filteredDataItem, setFilteredDataItem] = useState([]);
  const API_MEGAMENUS_URL = import.meta.env.VITE_MEGAMENUS_API_URL;
  useEffect(() => {
    axios.get(API_MEGAMENUS_URL).then(response => {
      setDataItem(response.data);
    });
  }, []);
  useEffect(() => {
    if (
      dataItem.some(
        (item: any) =>
          item.menuId === props.menuId && item.parentMegamenuId === null,
      )
    ) {
      const filteredItems = dataItem.filter(
        (item: any) =>
          item.menuId === props.menuId && item.parentMegamenuId === null,
      );
      setFilteredDataItem(filteredItems);
    }
  }, [dataItem, props.menuId]);
  return (
    <div
      className={`${props.className} fixed top-16 left-0 z-30 hidden w-full bg-white px-6 py-6 uppercase text-neutral-600 drop-shadow-xl duration-300 md:hidden lg:flex`}
    >
      <ListAllMenu numOfCols={5}>
        <>
          {filteredDataItem.map((item: any, index) => (
            <div key={index}>
              <div className="mb-5 font-bold">
                <Link to={item.url}>{item.name}</Link>
              </div>
              <MenuListItem parentMegamenuId={item.id} />
            </div>
          ))}
        </>
      </ListAllMenu>
    </div>
  );
}
