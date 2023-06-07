import { Link } from 'react-router-dom';
import ListAllMenu from './ListAllMenu';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Collection } from '../app/types';

type Props = {
  menuId: number;
  className?: String;
  saleAppear: boolean;
  type: string;
};

export default function MegaMenu(props: Props) {
  const collections = useSelector(
    (state: RootState) => state.collection.collections,
  );
  return (
    <div
      className={`${props.className} fixed ${
        props.saleAppear ? `top-32` : `top-16`
      } left-0 z-30 hidden w-full bg-white px-6 py-6 uppercase text-neutral-600 drop-shadow-xl duration-300 md:hidden lg:flex`}
    >
      <ListAllMenu numOfCols={5}>
        <>
          {collections
            .filter((item: Collection) => item.type === props.type)
            .map((item: Collection, index) => (
              <div key={index}>
                <div className="mb-5 font-[avenir-next] text-xs font-bold">
                  <Link
                    to={`/collections/${item.name
                      .replace(/\W+/gi, '-')
                      .toLowerCase()}`}
                  >
                    {item.name}
                  </Link>
                </div>
              </div>
            ))}
        </>
      </ListAllMenu>
    </div>
  );
}
