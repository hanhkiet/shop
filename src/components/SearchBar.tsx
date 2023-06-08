import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RemoveScrollBar } from 'react-remove-scroll-bar';
import { Link } from 'react-router-dom';
import {
  setNumberOfResults,
  setQuery,
  setShowSearchBar,
} from '../app/searchSlice';
import Loading from './Loading';
import axios from 'axios';
import { Product } from '../app/types';
import ProductCard from './ProductCard';
import { RootState } from '../app/store';

function SearchBar() {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        dispatch(setShowSearchBar(false));
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [remaining, setRemaining] = useState<number>(0);
  const query = useSelector((state: RootState) => state.search.query);
  const dispatch = useDispatch();
  useEffect(() => {
    if (query.length > 0) {
      axios
        .get(`${import.meta.env.VITE_PRODUCTS_API_URL}/search/preview`, {
          params: { query },
        })
        .then(res => {
          setProducts(res.data.products);
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
  useEffect(() => {
    dispatch(setNumberOfResults(Math.floor((total * 4) / 40) * 40 + remaining));
    console.log(Math.floor((total * 4) / 40) * 40 + remaining);
  }, [total, remaining]);
  const listItems = products ? (
    <div className="grid h-full grid-cols-1 overflow-y-auto md:grid-cols-2 lg:grid-cols-4">
      {products.slice(0, 4).map((product: Product) => (
        <ProductCard
          onClick={() => {
            dispatch(setShowSearchBar(false));
            dispatch(setQuery(''));
          }}
          id={product.uuid}
          key={product.uuid}
          name={product.name}
          price={product.price}
          imageOne={product.images[0]}
          imageTwo={product.images[1]}
          catalogs={product.catalogs}
        />
      ))}
    </div>
  ) : (
    <Loading />
  );
  return (
    <>
      <div
        onClick={() => dispatch(setShowSearchBar(false))}
        className="absolute top-16 left-0 z-10 h-screen w-screen bg-black p-6 text-neutral-600 opacity-60"
      ></div>
      <div className="absolute top-16 left-0 z-20 w-screen bg-white p-6 text-neutral-600">
        <RemoveScrollBar />
        <div className="mx-5 flex justify-between">
          <div className="text-1xl grid w-full content-center font-light">
            <div className="flex justify-between">
              <img
                className="my-auto h-3"
                src="https://cdn-icons-png.flaticon.com/512/54/54481.png"
                alt=""
              />
              <div className="mx-5 w-full">
                <div className="flex items-center py-2">
                  <input
                    autoFocus
                    value={query}
                    onChange={e => {
                      dispatch(setQuery(e.target.value.trim()));
                    }}
                    className="mr-3 w-full appearance-none border-none bg-transparent py-1 px-2 leading-tight text-gray-700 focus:outline-none"
                    type="text"
                    placeholder="Search..."
                    aria-label="Search product(s)"
                  />
                </div>
              </div>
            </div>
          </div>
          <img
            onClick={() => dispatch(setShowSearchBar(false))}
            className="my-auto h-3 hover:cursor-pointer"
            src="https://cdn-icons-png.flaticon.com/512/2961/2961937.png"
            alt=""
          />
        </div>
        {query && (
          <div className="my-15 mx-5">
            <div className="mb-5 border-b border-gray-500 pb-2">
              <div className="flex justify-between">
                {products.length > 0 ? (
                  <p>{Math.floor((total * 4) / 40) * 40 + remaining} results</p>
                ) : (
                  <p>Products</p>
                )}
                {products.length > 0 ? (
                  <Link
                    to={`/search?q=${query}`}
                    onClick={() => {
                      dispatch(setShowSearchBar(false));
                    }}
                  >
                    View all
                  </Link>
                ) : (
                  <></>
                )}
              </div>
            </div>
            {products.length > 0 ? (
              <>{listItems}</>
            ) : (
              <p>No results could be found</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default SearchBar;
