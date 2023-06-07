import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { RemoveScrollBar } from 'react-remove-scroll-bar';
import { Link } from 'react-router-dom';
import { setShowSearchBar } from '../app/searchSlice';

function SearchBar() {
  const [searchLetters, setSearchLetters] = useState('');
  const dispatch = useDispatch();
  return (
    <>
      <div className="absolute top-16 left-0 z-50 h-screen w-screen bg-black p-6 text-neutral-600 opacity-60"></div>
      <div className="absolute top-16 left-0 z-50 w-screen bg-white p-6 text-neutral-600">
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
                <form className="w-full">
                  <div className="flex items-center py-2">
                    <input
                      autoFocus
                      value={searchLetters}
                      onChange={e => {
                        setSearchLetters(e.target.value);
                      }}
                      className="mr-3 w-full appearance-none border-none bg-transparent py-1 px-2 leading-tight text-gray-700 focus:outline-none"
                      type="text"
                      placeholder="Search..."
                      aria-label="Search product(s)"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <img
            onClick={() => {
              //   setShowSearchBar(false);
              //   setChangeNavbarColor(false);
              //   setHoverNavbar(false);
              dispatch(setShowSearchBar(false));
            }}
            className="my-auto h-3 hover:cursor-pointer"
            src="https://cdn-icons-png.flaticon.com/512/2961/2961937.png"
            alt=""
          />
        </div>
        {searchLetters && (
          <div className="mx-5 my-10">
            <div className="mb-5 border-b-[2px] border-gray-500 pb-2">
              <div className="flex justify-between">
                {searchLetters ? <p>{999} results</p> : <p>Products</p>}
                {searchLetters ? (
                  <Link
                    to="/category"
                    onClick={() => {
                      //   setShowSearchBar(false);
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
            {searchLetters ? (
              //   <>{listItems}</>
              <>{''}</>
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
