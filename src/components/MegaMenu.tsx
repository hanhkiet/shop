import { useState, useEffect } from "react"
import ListAllMenu from "./ListAllMenu"
import MenuList from "./MenuList"
import MenuListItem from "./MenuListItem"
import axios from 'axios'

type Props = {
    itemMenuType: String,
    className?: String
}

export default function MegaMenu(props: Props) {

    const [dataItem, setDataItem] = useState([])
    const baseURL = "http://localhost:5500/src/static/data/menu.json"
    useEffect(() => {
        axios.get(baseURL).then(response => {
            setDataItem(response.data);
        });
    }, []);
    return (
        <div className={`${props.className} transition-opacity opacity-0 fixed top-[68px] left-0 z-50 w-full p-6 text-neutral-600 bg-white border-t border-neutral-300 drop-shadow-xl`}>
            <ListAllMenu numOfCols={4}>
                {dataItem.filter((item: any) => item.type === props.itemMenuType).map((item: any) => (
                    <MenuList key={item.menuId} menuItemTitle={item.menuItemTitle}>
                        <MenuListItem itemData={item.data} />
                    </MenuList>
                ))}


            </ListAllMenu>
        </div>
    )
}
