import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MenuDropDown from '../components/MenuDropdown';
import ProductCard from '../components/ProductCard';
import { Product } from '../app/types';
import { useState } from 'react';
import ModalNavbar from '../modals/ModalNavbar';

function CategoryPage() {
  const filterMode = [
    'Featured',
    'Best selling',
    'Alphabetically, A-Z',
    'Alphabetically, Z-A',
    'Price, low to high',
    'Price, high to low',
    'Date, old to new',
    'Date, new to old',
  ];
  const [gridLarge, setGridLarge] = useState(3);
  const [gridSmall, setGridSmall] = useState(2);
  const [filterAppear, setFilterAppear] = useState(false);
  const [sortAppearLarge, setSortAppearLarge] = useState(false);
  const [sortAppearSmall, setSortAppearSmall] = useState(false);
  const text = "SPRING '23 COLLECTION";
  const words = text.split(' ');
  const lastWord = words.pop();
  const remainingText = words.join(' ');
  const products = useSelector((state: RootState) => state.product.products);
  const visible = useSelector((state: RootState) => state.cart.visible);
  const dispatch = useDispatch();
  return (
    <>
      <Navbar />
      <div className="mt-16 min-h-screen">
        <div className="relative">
          <img
            alt=""
            src="https://asrv.com/cdn/shop/files/Collection_banner_1800x.jpg"
            className="w-full"
          />
          <div className="absolute left-0 top-0 grid h-full w-full content-center">
            <p className="text-center text-3xl text-white">
              <span className="font-bold">{remainingText}</span>{' '}
              <span className="font-light">{lastWord}</span>
            </p>
          </div>
        </div>
        <div className="sticky left-0 top-16 z-20 flex flex-row-reverse border-b-2 border-gray-300 bg-white md:flex-row">
          <div className="basis-1/3 p-6 md:basis-1/12">
            <div className="flex justify-center gap-3 md:hidden">
              <button
                className={`grid h-5 w-5 content-center duration-300 ${
                  gridSmall === 1 ? `opacity-100` : `opacity-50`
                }`}
                title=""
                onClick={() => setGridSmall(1)}
              >
                <svg role="presentation" viewBox="0 0 36 36">
                  <rect fill="currentColor" width="36" height="36"></rect>
                </svg>
              </button>
              <button
                className={`grid h-5 w-5 content-center duration-300 ${
                  gridSmall === 2 ? `opacity-100` : `opacity-50`
                }`}
                title=""
                onClick={() => setGridSmall(2)}
              >
                <svg viewBox="0 0 36 36">
                  <path d="M21 36V21h15v15H21zm0-36h15v15H21V0zM0 21h15v15H0V21zM0 0h15v15H0V0z"></path>
                </svg>
              </button>
            </div>
            <div className="hidden justify-center gap-3 md:flex">
              <button
                className={`grid h-5 w-5 content-center duration-300 ${
                  gridLarge === 2 ? `opacity-100` : `opacity-50`
                }`}
                title=""
                onClick={() => setGridLarge(2)}
              >
                <svg viewBox="0 0 36 36">
                  <path d="M21 36V21h15v15H21zm0-36h15v15H21V0zM0 21h15v15H0V21zM0 0h15v15H0V0z"></path>
                </svg>
              </button>
              <button
                className={`grid h-5 w-5 content-center duration-300 ${
                  gridLarge === 3 ? `opacity-100` : `opacity-50`
                }`}
                title=""
                onClick={() => setGridLarge(3)}
              >
                <svg viewBox="0 0 36 36">
                  <path d="M28 36v-8h8v8h-8zm0-22h8v8h-8v-8zm0-14h8v8h-8V0zM14 28h8v8h-8v-8zm0-14h8v8h-8v-8zm0-14h8v8h-8V0zM0 28h8v8H0v-8zm0-14h8v8H0v-8zM0 0h8v8H0V0z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="hidden basis-0 border-x-2 border-gray-300 md:flex md:basis-full"></div>
          <div
            onClick={() => setSortAppearSmall(true)}
            className="flex basis-1/3 cursor-pointer justify-center gap-3 border-x-2 border-gray-300 p-6 md:basis-1/12 md:border-x-0"
          >
            Sort
            <div className="grid content-center">
              <svg
                className="grid h-3 w-3 content-center"
                role="presentation"
                viewBox="0 0 19 12"
              >
                <polyline
                  fill="none"
                  stroke="currentColor"
                  points="17 2 9.5 10 2 2"
                  fill-rule="evenodd"
                  stroke-width="2"
                  stroke-linecap="square"
                ></polyline>
              </svg>
            </div>
          </div>
          <div
            onClick={() => setFilterAppear(true)}
            className="flex basis-1/3 cursor-pointer justify-center border-l-2 border-gray-300 p-6 md:basis-1/12 lg:hidden"
          >
            Filter
          </div>
        </div>
        <div className="flex flex-row">
          <div className="hidden basis-0 lg:block lg:basis-2/12">
            <div className="sticky left-0 top-36 h-screen w-full overflow-y-auto">
              <MenuDropDown />
            </div>
          </div>
          <div
            className={`grid basis-full grid-cols-${gridSmall} lg:ml-5 lg:basis-10/12 md:grid-cols-${gridLarge}`}
          >
            {products.map((product: Product) => (
              <ProductCard
                key={product.uuid}
                id={product.uuid}
                name={product.name}
                price={product.price}
                imageOne={product.images[0]}
                imageTwo={product.images[1]}
              />
            ))}
          </div>
        </div>
      </div>
      <ModalNavbar
        isRight
        isShown={filterAppear}
        className={`flex justify-end ${
          filterAppear ? `visible` : `collapse`
        } duration-500`}
        onClose={() => setFilterAppear(false)}
      >
        <div className="mt-1 border-b-[2px] border-neutral-300">
          <div className="mx-5 flex h-16 justify-between">
            <div className="text-1xl grid content-center font-light capitalize">
              Filter
            </div>
            <img
              onClick={() => setFilterAppear(false)}
              className="my-auto h-3 hover:cursor-pointer"
              src="https://cdn-icons-png.flaticon.com/512/2961/2961937.png"
              alt=""
            />
          </div>
        </div>
        <div className="m-auto flex h-[85%] w-max items-center text-center">
          <p className="font-light">Your cart is empty</p>
        </div>
      </ModalNavbar>
      <ModalNavbar
        isBottom
        isShown={sortAppearSmall}
        className={`flex justify-end ${
          sortAppearSmall ? `visible` : `collapse`
        } duration-500`}
        onClose={() => {
          setSortAppearSmall(false);
        }}
      >
        <div className="mt-1 border-b-[2px] border-neutral-300">
          <div className="mx-5 flex h-16 justify-between">
            <div className="text-1xl grid content-center font-light capitalize">
              Sort
            </div>
            <img
              onClick={() => setSortAppearSmall(false)}
              className="my-auto h-3 hover:cursor-pointer"
              src="https://cdn-icons-png.flaticon.com/512/2961/2961937.png"
              alt=""
            />
          </div>
        </div>
        <div className="m-auto flex h-[85%] w-max items-center text-center">
          <ul className="grid gap-3">
            {filterMode.map((item: string) => (
              <li key={item} className="text-gray-500">
                <div>{item}</div>
              </li>
            ))}
          </ul>
        </div>
      </ModalNavbar>
      <Footer />
    </>
  );
}

export default CategoryPage;
