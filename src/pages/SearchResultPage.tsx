import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Product } from '../app/types';
import ModalNavbar from '../modals/ModalNavbar';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

function SearchResultPage() {
  const filterMode = ['Relevance', 'Price, low to high', 'Price, high to low'];
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [originalProducts, setOriginalProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [remaining, setRemaining] = useState<number>(0);
  const query = useSelector((state: RootState) => state.search.query);
  const dispatch = useDispatch();
  useEffect(() => {
    if (query.length > 0) {
      axios
        .get(`${import.meta.env.VITE_PRODUCTS_API_URL}/search`, {
          params: { query },
        })
        .then(res => {
          setProducts(res.data);
          setOriginalProducts(res.data);
          setTotal(res.data.total);
        });
    } else {
      setProducts([]);
    }
  }, [query]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_PRODUCTS_API_URL}/search`, {
        params: { query, page: Math.floor((total * 4) / 40) },
      })
      .then(res => {
        setRemaining(res.data.length);
      });
  }, [total]);
  const [filterChosen, setFilterChosen] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortAppearSmall, setSortAppearSmall] = useState(false);
  const [gridLarge, setGridLarge] = useState(3);
  const [gridSmall, setGridSmall] = useState(2);
  const sortLowToHighPrice = () => {
    setCurrentPage(1);
    const sortedProducts = products.sort((a, b) => a.price - b.price);
    setProducts(sortedProducts);
  };
  const sortHighToLowPrice = () => {
    setCurrentPage(1);
    const sortedProducts = products.sort((a, b) => b.price - a.price);
    setProducts(sortedProducts);
  };
  const numberOfResults = useSelector(
    (state: RootState) => state.search.numberOfResults,
  );
  const searchTitle = `${numberOfResults} results for ${searchParams.get('q')}`;
  return (
    <>
      <Navbar />
      <div className="mt-16">
        <div className="grid items-center border-b-2 border-gray-300 p-6 text-center font-[ASRV-Standard] text-gray-700 lg:hidden">
          {searchTitle}
        </div>
        <div className="sticky left-0 top-16 z-20 flex flex-row-reverse border-b-2 border-gray-300 bg-white md:flex-row">
          <div className="basis-1/2 p-6 md:basis-1/12">
            <div className="flex justify-center gap-3">
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
            <div className="hidden justify-center gap-3">
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
          <div className="hidden basis-0 items-center border-x-2 border-gray-300 text-center font-[ASRV-Standard] uppercase text-gray-700 md:grid md:basis-full">
            <p className="hidden lg:block">{searchTitle}</p>
          </div>
          <div
            onClick={() => setSortAppearSmall(true)}
            className="flex basis-1/2 cursor-pointer justify-center gap-3 border-r-2 border-gray-300 p-6 md:basis-1/12 md:border-x-0"
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
        </div>
        <div
          className={`grid grid-cols-${gridSmall} md:grid-cols-${gridLarge}`}
        >
          {products.map((item: Product) => (
            <ProductCard
              key={item.uuid}
              id={item.uuid}
              name={item.name}
              imageOne={item.images[0]}
              imageTwo={item.images[1]}
              price={item.price}
            />
          ))}
        </div>
      </div>
      <Footer />
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
                  if (index === 0) setProducts(originalProducts);
                  if (index === 1) sortLowToHighPrice();
                  if (index === 2) sortHighToLowPrice();
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
    </>
  );
}

export default SearchResultPage;
