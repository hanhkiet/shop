import { useDispatch, useSelector } from 'react-redux';
import { setActiveMenu } from '../app/collectionSlice';
import { RootState } from '../app/store';
import { CollectionType } from '../app/types';
import MenuDropDownItem from './MenuDropDownItem';

type Props = {
  onClickClose?: () => void;
  className?: string;
};

function MenuDropDown(props: Props) {
  const arrMenu = ['FEATURED', 'TOPS', 'BOTTOMS'] as CollectionType[];
  const activeMenuStore = useSelector(
    (state: RootState) => state.collection.activeMenu,
  );
  const dispatch = useDispatch();
  const handleMenuClick = (menu: string | null) => {
    dispatch(setActiveMenu(menu === activeMenuStore ? null : menu));
  };
  return (
    <div className={`z-50 m-5 ${props.className}`}>
      <img
        onClick={props.onClickClose}
        className="mb-5 block h-3 hover:cursor-pointer lg:hidden"
        src="https://cdn-icons-png.flaticon.com/512/2961/2961937.png"
        alt=""
      />
      <ul>
        {arrMenu.map((item: CollectionType, index) => (
          <li key={index}>
            <MenuDropDownItem
              onMenuClick={() => handleMenuClick(item)}
              activeMenu={activeMenuStore}
              menuTitle={item}
              menuId={arrMenu.indexOf(item)}
              type={item.toLowerCase() as CollectionType}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MenuDropDown;
