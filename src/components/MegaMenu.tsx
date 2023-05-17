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
  const API_MEGAMENUS_URL = import.meta.env.VITE_MEGAMENUS_API_URL;
  useEffect(() => {
    axios.get(API_MEGAMENUS_URL).then(response => {
      setDataItem(response.data);
    });
  }, []);
  return (
    <div
      className={`${props.className} fixed top-[68px] left-0 z-50 w-full border-t border-neutral-300 bg-white p-6 uppercase text-neutral-600 opacity-0 drop-shadow-xl transition-opacity`}
    >
      <ListAllMenu numOfCols={5}>
        <>
          {dataItem
            .filter(
              (item: any) =>
                item.menuId == props.menuId && item.parentMegamenuId == null,
            )
            .map((item: any, index) => (
              <div key={index}>
                <Link to={item.url}>
                  <h2 className="mb-5 font-bold">{item.name}</h2>
                </Link>
                <MenuListItem parentMegamenuId={item.id} />
              </div>
            ))}
        </>
      </ListAllMenu>
    </div>
  );
}
