import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cover from './Cover';
import ProductCart from './ProductCart';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios';
import { RemoveScrollBar } from 'react-remove-scroll-bar';
import Product from './Product';
import Loading from './Loading';

function Navbar() {
  const [changeNavbarColor, setChangeNavbarColor] = useState(false);
  const [customerNote, setCustomerNote] = useState('');
  const [hoverNavbar, setHoverNavbar] = useState(false);
  const [scrollPercentageChange, setScrollPercentageChange] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [zoom, setZoom] = useState(
    Math.round((window.devicePixelRatio / 1.25) * 100),
  );
  const [searchLetters, setSearchLetters] = useState('');
  const handleZoom = () => {
    console.log(zoom)
    function onChange() {
      setZoom(Math.round((window.devicePixelRatio / 1.25) * 100));
    }
    matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`).addEventListener(
      'change',
      onChange,
      { once: true },
    );
  };
  handleZoom();
  const handleSearchShow = () => {
    setShowSearchBar(!showSearchBar);
    setChangeNavbarColor(true);
  };
  useEffect(() => {
    const h = document.documentElement,
      b = document.body,
      st = 'scrollTop',
      sh = 'scrollHeight';

    const handleScroll = () => {
      setScrollPercentageChange(
        ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100,
      );
      if (window.scrollY >= 20) {
        setChangeNavbarColor(true);
      } else {
        setChangeNavbarColor(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // window.addEventListener('mouseover', handleHover)

    return () => {
      window.removeEventListener('scroll', handleScroll);
      // window.removeEventListener('mouseover', handleHover)
    };
  }, []);

  // This function will scroll the window to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // for smoothly scrolling
    });
  };

  const cartItems = 99;

  const baseURL = 'http://localhost:5500/src/static/data/productsData.json';
  const [post, setPost] = useState<any>();
  // console.log(post)
  useEffect(() => {
    axios.get(baseURL).then(response => {
      setPost(response.data);
    });
  }, []);

  const products = post;
  const listItems = products ? (
    <div className="grid h-96 grid-cols-1 overflow-y-auto md:grid-cols-2 lg:grid-cols-3">
      {products.slice(0, 3).map((product: any) => (
        <Product
          onClick={() => {
            setSearchLetters('');
            setShowSearchBar(false);
            setChangeNavbarColor(false);
            setHoverNavbar(false);
          }}
          key={product.productId}
          name={product.name}
          price={product.price}
          imageOne={product.image[0]}
          imageTwo={product.image[1]}
          size={product.size}
        />
      ))}
    </div>
  ) : (
    <Loading />
  );

  return (
    <>
      <nav
        className={`top-0 left-0 right-0 z-40 flex justify-between px-6 py-6 text-sm font-light duration-300 ${changeNavbarColor || window.location.pathname != '/'
          ? 'bg-white text-neutral-600'
          : 'text-white'
          } ${window.location.pathname == '/' ? 'fixed' : 'sticky'
          } hover:bg-white hover:text-neutral-600`}
        onMouseOver={() => setHoverNavbar(true)}
        onMouseLeave={() => setHoverNavbar(false)}
      >
        <ul className="hidden uppercase md:flex lg:flex">
          <li>
            <Link to="/category">shop</Link>
          </li>
          <li className="pl-8">
            <Link to="/kits">kits</Link>
          </li>
          <li className="pl-8">
            <Link to="/tech">tech</Link>
          </li>
          <li className="pl-8">
            <Link to="/explore">explore</Link>
          </li>
        </ul>
        <ul className="flex uppercase md:hidden lg:hidden">
          <li>
            <img
              src="https://cdn-icons-png.flaticon.com/512/6015/6015685.png"
              className={`mx-auto h-4 duration-300 ${changeNavbarColor ||
                window.location.pathname != '/' ||
                hoverNavbar
                ? ''
                : 'grayscale invert'
                }`}
            />
          </li>
          <li className="pl-8">
            <img
              src="https://media.discordapp.net/attachments/1026660684739653674/1089365167730602095/cart.png"
              className={`mx-auto h-4 duration-300 ${changeNavbarColor ||
                window.location.pathname != '/' ||
                hoverNavbar
                ? ''
                : 'grayscale invert'
                }`}
            />
          </li>
        </ul>
        <Link to="/">
          <img
            src="https://cdn.shopify.com/s/files/1/0297/6293/files/Wings_ASRV_NEW_d5bba963-30a6-4d73-ba2e-68d1a8ea69c4_120x@2x.png?v=1664577873"
            className={`mx-auto h-5 duration-300 ${changeNavbarColor ||
              window.location.pathname != '/' ||
              hoverNavbar
              ? ''
              : 'brightness-200'
              }`}
          />
        </Link>
        <ul className="hidden font-light capitalize md:flex lg:flex">
          <li>
            <Link to="/login">account</Link>
          </li>
          <li className="pl-8 hover:cursor-pointer" onClick={handleSearchShow}>
            search
          </li>
          <li className="pl-8">
            <span
              className="hover:cursor-pointer"
              onClick={() => setShowCart(true)}
            >
              cart({cartItems})
            </span>
          </li>
        </ul>
        <ul className="flex uppercase md:hidden lg:hidden">
          <li>
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149852.png"
              onClick={handleSearchShow}
              className={`hover:cursor-pointer mx-auto h-4 duration-300 ${changeNavbarColor ||
                window.location.pathname != '/' ||
                hoverNavbar
                ? ''
                : 'grayscale invert'
                }`}
            />
          </li>
          {/* <li className="pl-8"><img src="https://cdn-icons-png.flaticon.com/512/419/419910.png" className={`h-4 mx-auto duration-300 ${changeNavbarColor || window.location.pathname != '/' || hoverNavbar ? '' : 'grayscale invert'}`} /></li> */}
          <li className="pl-8">
            <div
              className="relative hover:cursor-pointer"
              onClick={() => setShowCart(true)}
            >
              <span className="absolute bottom-[2.5px] left-[10.7px] w-1 text-center text-[4px] font-light text-white">
                {/* {cartItems} */}
              </span>
              <img
                src="https://media.discordapp.net/attachments/1026660684739653674/1089228771149762690/cart_has_product.png"
                className={`mx-auto h-4 duration-300 ${changeNavbarColor ||
                  window.location.pathname != '/' ||
                  hoverNavbar
                  ? ''
                  : 'grayscale invert'
                  }`}
              />
            </div>
          </li>
        </ul>
        {showSearchBar && (
          <div className="absolute top-[68px] left-0 z-50 w-screen bg-white p-6 text-neutral-600">
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
                  setShowSearchBar(false);
                  setChangeNavbarColor(false);
                  setHoverNavbar(false);
                }}
                className="my-auto h-3 hover:cursor-pointer"
                src="https://cdn-icons-png.flaticon.com/512/2961/2961937.png"
                alt=""
              />
            </div>
            {searchLetters && (
              <div className="mx-5 my-10">
                <div className="mb-5 border-b-[2px] border-indigo-500 pb-2">
                  <div className="flex justify-between">
                    {searchLetters ? <p>{999} results</p> : <p>Products</p>}
                    {searchLetters ? (
                      <Link
                        to="/category"
                        onClick={() => setShowSearchBar(false)}
                      >
                        View all
                      </Link>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                {searchLetters ? (
                  <>{listItems}</>
                ) : (
                  <p>No results could be found</p>
                )}
              </div>
            )}
          </div>
        )}
      </nav>

      {changeNavbarColor && (
        <button
          className="fixed bottom-5 right-5 z-50 h-12 w-12 rounded-full bg-gray-500 text-white hover:bg-gray-400"
          onClick={scrollToTop}
        >
          <CircularProgressbarWithChildren value={scrollPercentageChange}>
            {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
            <img
              src="https://cdn-icons-png.flaticon.com/512/608/608336.png"
              className="mx-auto flex h-5 grayscale invert"
            />
          </CircularProgressbarWithChildren>
        </button>
      )}
      {showCart && (
        <div className="fixed right-0 top-0 z-50 h-screen w-[50%] bg-neutral-300">
          <RemoveScrollBar />
          <div className="mt-1 border-b-[2px] border-indigo-500">
            <div className="mx-5 flex h-16 justify-between">
              <div className="text-1xl grid content-center font-light">
                Cart ({cartItems})
              </div>
              <img
                onClick={() => setShowCart(false)}
                className="my-auto h-3 hover:cursor-pointer"
                src="https://cdn-icons-png.flaticon.com/512/2961/2961937.png"
                alt=""
              />
            </div>
          </div>
          {!products && (
            <div className="m-auto flex h-[50%] w-max items-center text-center">
              Your cart is empty 👢
            </div>
          )}
          {products && (
            <>
              <div className="productCartList h-[calc(100vh-80px-140px)] overflow-y-auto">
                {products.map((product: any) => (
                  <ProductCart
                    key={product.productId}
                    name={product.name}
                    image={product.image[1]}
                    size={product.size[0]}
                    price={product.price}
                  />
                ))}
              </div>
              <div className="absolute bottom-0 right-0 z-50 h-[150px] w-full border-t-[2px] border-indigo-500 bg-white">
                <div className="m-5">
                  <p
                    onClick={() => setShowNote(true)}
                    className="underline hover:cursor-pointer"
                  >
                    {customerNote ? 'Edit Order Note' : 'Add Order Note'}
                  </p>
                  <p>Shipping & taxes calculated at checkout</p>
                  <button className="relative mt-5 h-12 w-full bg-black text-white">
                    <div className="flex flex-row align-top">
                      <div className="basis-2/5 text-right">Checkout</div>
                      <div className="relative basis-1/5 text-center leading-none">
                        <div className="align-top">.</div>
                      </div>
                      <div className="basis-2/5 text-left">${123} USD</div>
                    </div>
                  </button>
                </div>
              </div>
            </>
          )}
          {showNote && (
            <div className="absolute bottom-0 right-0 z-50 h-[250px] w-full border-t-[2px] border-indigo-500 bg-white">
              <div className="m-5">
                <div className="mb-5 flex justify-between">
                  <div className="text-1xl grid content-center font-light">
                    Edit Order Note
                  </div>
                  <img
                    onClick={() => setShowNote(false)}
                    className="my-auto h-3 hover:cursor-pointer"
                    src="https://cdn-icons-png.flaticon.com/512/2961/2961937.png"
                    alt=""
                  />
                </div>
                <textarea
                  value={customerNote}
                  onChange={e => {
                    setCustomerNote(e.target.value);
                  }}
                  className="h-24 w-full resize-none border-[2px] border-indigo-500 p-3 focus:outline-none"
                ></textarea>
                <button className="relative mt-5 h-12 w-full bg-black text-white">
                  <div className="flex flex-row align-top">
                    <div className="basis-2/5 text-right">Checkout</div>
                    <div className="relative basis-1/5 text-center leading-none">
                      <div className="align-top">.</div>
                    </div>
                    <div className="basis-2/5 text-left">${123} USD</div>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Navbar;
