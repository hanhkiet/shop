import { useDispatch, useSelector } from 'react-redux';
import {
  addActiveMenuChild,
  removeActiveMenuChild,
} from '../app/collectionSlice';
import { RootState } from '../app/store';
import { Collection } from '../app/types';
import { Link } from 'react-router-dom';

type Props = {
  menuTitle: string;
  menuId: number;
  onMenuClick: (menu: string) => void;
  activeMenu: string | null;
  type: string;
};

function MenuDropDownItem(props: Props) {
  const collections = useSelector(
    (state: RootState) => state.collection.collections,
  );
  const activeMenuChildStore = useSelector(
    (state: RootState) => state.collection.activeMenuChild,
  );
  const arrFeatured = ["SPRING '23 COLLECTION", "WINTER '22 COLLECTION"];
  const arrTops = [
    'TANKS',
    'SHORT SLEEVES',
    'LONG SLEEVES',
    'HOODIES',
    'OUTERWEAR',
  ];
  const arrBottoms = ['SHORTS', 'TECH JOGGERS', 'LEGGINGS'];
  const arrMenuItems = [arrFeatured, arrTops, arrBottoms];
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
        className="flex h-16 justify-between uppercase hover:text-gray-500"
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
        <ul className="pl-5">
          {collections
            .filter(
              (item: Collection) =>
                item.type.toLowerCase() === props.type.toLowerCase(),
            )
            .map((item: Collection, index) => (
              <Link
                key={index}
                to={`/collections/${item.name
                  .replace(/\W+/gi, '-')
                  .toLowerCase()}`}
              >
                <li
                  className={`cursor-pointer ${
                    arrMenuItems[props.menuId].length > 1
                      ? `border-l-2 border-gray-300`
                      : ``
                  } pl-5 text-xs hover:text-gray-500`}
                >
                  {item.name}
                </li>
              </Link>
            ))}
        </ul>
      </ul>
      <div className="h-0.5 w-full bg-gray-300"></div>
    </div>
  );
}

export default MenuDropDownItem;
