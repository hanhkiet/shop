import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MenuDropDown from '../components/MenuDropdown';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { CategoryProduct } from '../app/types';
import { useState } from 'react';
import ModalNavbar from '../modals/ModalNavbar';

function CategoryPage() {
  const { name } = useParams<{ name: string }>();
  const categoryProducts = useSelector(
    (state: RootState) => state.categoryProduct.categoryProduct,
  );
  const categoryProduct =
    name === 'all'
      ? categoryProducts
      : categoryProducts.filter(
          (prod: CategoryProduct) =>
            prod.productCollection.name.replace(/\W+/gi, '-').toLowerCase() ===
            name,
        );
  if (!categoryProduct || !categoryProducts) return <></>;
  const filterMode = [
    'Default',
    'Alphabetically, A-Z',
    'Alphabetically, Z-A',
    'Price, low to high',
    'Price, high to low',
  ];
  const [filterChosen, setFilterChosen] = useState(0);
  const [gridLarge, setGridLarge] = useState(3);
  const [gridSmall, setGridSmall] = useState(2);
  const [filterAppear, setFilterAppear] = useState(false);
  const [sortAppearSmall, setSortAppearSmall] = useState(false);
  const [ourProducts, setOurProducts] = useState(categoryProduct);
  const sortProductsAtoZ = () => {
    const sortedProducts = [...ourProducts].sort((a, b) =>
      a.product.name.localeCompare(b.product.name),
    );
    setOurProducts(sortedProducts);
  };
  const sortProductsZtoA = () => {
    const sortedProducts = [...ourProducts].sort((a, b) =>
      b.product.name.localeCompare(a.product.name),
    );
    setOurProducts(sortedProducts);
  };
  const sortLowToHighPrice = () => {
    const sortedProducts = [...ourProducts].sort(
      (a, b) => a.product.price - b.product.price,
    );
    setOurProducts(sortedProducts);
  };
  const sortHighToLowPrice = () => {
    const sortedProducts = [...ourProducts].sort(
      (a, b) => b.product.price - a.product.price,
    );
    setOurProducts(sortedProducts);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 2;
  const totalPages = Math.ceil(ourProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = ourProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };
  return (
    <>
      <Navbar />
      <div className="mt-16 min-h-screen">
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
          <div className="hidden basis-0 lg:block lg:basis-3/12">
            <div className="sticky left-0 top-36 h-screen w-full overflow-y-auto">
              <MenuDropDown />
            </div>
          </div>
          <div className={`basis-full lg:ml-5 lg:basis-9/12`}>
            <div
              className={`grid grid-cols-${gridSmall} md:grid-cols-${gridLarge}`}
            >
              {currentProducts.map((item: CategoryProduct) => (
                <ProductCard
                  key={item.product.uuid}
                  id={item.product.uuid}
                  name={item.product.name}
                  price={item.product.price}
                  imageOne={item.product.images[0]}
                  imageTwo={item.product.images[1]}
                />
              ))}
            </div>
            <div className="flex flex-row justify-center">
              {currentPage > 1 && (
                <svg
                  onClick={() => {
                    setCurrentPage(currentPage - 1);
                    window.scrollTo(0, 0);
                  }}
                  className={`m-5 h-3 w-3 cursor-pointer`}
                  role="presentation"
                  viewBox="0 0 11 18"
                >
                  <path
                    d="M9.5 1.5L1.5 9l8 7.5"
                    stroke="currentColor"
                    fill="none"
                  ></path>
                </svg>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                pageNumber => (
                  <button
                    className={`${
                      pageNumber === currentPage ? `font-bold` : `font-light`
                    }`}
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    style={{ margin: '0.5rem' }}
                    disabled={pageNumber === currentPage}
                  >
                    {pageNumber}
                  </button>
                ),
              )}
              {currentPage <= currentProducts.length && (
                <svg
                  onClick={() => {
                    setCurrentPage(currentPage + 1);
                    window.scrollTo(0, 0);
                  }}
                  className={`m-5 h-3 w-3 cursor-pointer`}
                  role="presentation"
                  viewBox="0 0 11 18"
                >
                  <path
                    d="M1.5 1.5l8 7.5-8 7.5"
                    stroke="currentColor"
                    fill="none"
                  ></path>
                </svg>
              )}
            </div>
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
            {filterMode.map((item: string, index) => (
              <li
                onClick={() => {
                  setFilterChosen(index);
                  setSortAppearSmall(false);
                  if (index === 0) setOurProducts(categoryProduct);
                  if (index === 1) sortProductsAtoZ();
                  if (index === 2) sortProductsZtoA();
                  if (index === 3) sortLowToHighPrice();
                  if (index === 4) sortHighToLowPrice();
                }}
                key={item}
                className={`cursor-pointer text-gray-700 ${
                  index === filterChosen ? `font-bold` : `font-light`
                }`}
              >
                {item}
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
