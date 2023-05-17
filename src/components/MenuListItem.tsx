import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

type Props = {
  parentMegamenuId: any;
};

export default function MenuListItem(props: Props) {
  const [dataItem, setDataItem] = useState([]);
  const API_MEGAMENUS_URL = import.meta.env.VITE_MEGAMENUS_API_URL;
  useEffect(() => {
    axios.get(API_MEGAMENUS_URL).then(response => {
      setDataItem(response.data);
    });
  }, []);
  if (!dataItem) return <></>;
  return (
    <ul>
      {dataItem
        .filter((item: any) => item.parentMegamenuId == props.parentMegamenuId)
        .map((item: any, index) => (
          <li key={index}>
            <Link to={item.url} className="text-xs font-light hover:opacity-80">
              {item.name}
            </Link>
          </li>
        ))}
    </ul>
  );
}
