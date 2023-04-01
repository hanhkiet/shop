import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Cover from "./Cover"
import ProductCart from "./ProductCart"
import { CircularProgressbarWithChildren } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import axios from 'axios'

function Navbar() {
  const [changeNavbarColor, setChangeNavbarColor] = useState(false)
  const [customerNote, setCustomerNote] = useState("")
  const [hoverNavbar, setHoverNavbar] = useState(false)
  const [scrollPercentageChange, setScrollPercentageChange] = useState(0)
  const [showCart, setShowCart] = useState(false)
  const [showNote, setShowNote] = useState(false)
  const cartItems = 99
  

  useEffect(() => {
    const h = document.documentElement,
      b = document.body,
      st = 'scrollTop',
      sh = 'scrollHeight';

    const handleScroll = () => {
      setScrollPercentageChange((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100)
      if (window.scrollY >= 20) {
        setChangeNavbarColor(true)
      } else {
        setChangeNavbarColor(false)
      }
    }


    window.addEventListener('scroll', handleScroll)
    // window.addEventListener('mouseover', handleHover)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      // window.removeEventListener('mouseover', handleHover)
    }

  }, [])

  // This function will scroll the window to the top 
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // for smoothly scrolling
    })
  }

  const baseURL = "http://localhost:5500/src/static/data/productsData.json"
  const [post, setPost] = useState<any>();
  // console.log(post)
  useEffect(() => {
    axios.get(baseURL)
      .then((response) => {
        setPost(response.data)
      })
  }, [])

  const products = post
  return (
    <>
      <nav className={`z-40 px-6 py-6 flex duration-300 justify-between text-sm font-light top-0 left-0 right-0 ${changeNavbarColor || window.location.pathname != '/' ? 'bg-white text-neutral-600' : 'text-white'} ${window.location.pathname == '/' ? 'fixed' : 'sticky'} hover:bg-white hover:text-neutral-600`} onMouseOver={() => setHoverNavbar(true)}
        onMouseLeave={() => setHoverNavbar(false)}>
        <ul className="uppercase hidden md:flex lg:flex">
          <li><Link to="/category">shop</Link></li>
          <li className="pl-8"><Link to="/kits">kits</Link></li>
          <li className="pl-8"><Link to="/tech">tech</Link></li>
          <li className="pl-8"><Link to="/explore">explore</Link></li>
        </ul>
        <ul className="uppercase flex md:hidden lg:hidden">
          <li><img src="https://cdn-icons-png.flaticon.com/512/6015/6015685.png" className={`h-4 mx-auto duration-300 ${changeNavbarColor || window.location.pathname != '/' || hoverNavbar ? '' : 'grayscale invert'}`} /></li>
          <li className="pl-8"><img src="https://media.discordapp.net/attachments/1026660684739653674/1089365167730602095/cart.png" className={`h-4 mx-auto duration-300 ${changeNavbarColor || window.location.pathname != '/' || hoverNavbar ? '' : 'grayscale invert'}`} /></li>
        </ul>
        <Link to="/"><img src="https://cdn.shopify.com/s/files/1/0297/6293/files/Wings_ASRV_NEW_d5bba963-30a6-4d73-ba2e-68d1a8ea69c4_120x@2x.png?v=1664577873" className={`mx-auto h-5 duration-300 ${changeNavbarColor || window.location.pathname != '/' || hoverNavbar ? '' : 'brightness-200'}`} /></Link>
        <ul className="capitalize font-light hidden md:flex lg:flex">
          <li><Link to="/account">account</Link></li>
          <li className="pl-8"><Link to="/search">search</Link></li>
          <li className="pl-8"><span className="hover:cursor-pointer" onClick={() => setShowCart(true)}>cart({cartItems})</span></li>
        </ul>
        <ul className="uppercase flex md:hidden lg:hidden">
          <li><img src="https://cdn-icons-png.flaticon.com/512/149/149852.png" className={`h-4 mx-auto duration-300 ${changeNavbarColor || window.location.pathname != '/' || hoverNavbar ? '' : 'grayscale invert'}`} /></li>
          {/* <li className="pl-8"><img src="https://cdn-icons-png.flaticon.com/512/419/419910.png" className={`h-4 mx-auto duration-300 ${changeNavbarColor || window.location.pathname != '/' || hoverNavbar ? '' : 'grayscale invert'}`} /></li> */}
          <li className="pl-8">
            <div className="relative hover:cursor-pointer" onClick={() => setShowCart(true)}>
              <span className="absolute bottom-[2.5px] left-[10.7px] text-[4px] font-light text-white w-1 text-center">{cartItems}</span>
              <img src="https://media.discordapp.net/attachments/1026660684739653674/1089228771149762690/cart_has_product.png" className={`h-4 mx-auto duration-300 ${changeNavbarColor || window.location.pathname != '/' || hoverNavbar ? '' : 'grayscale invert'}`} />
            </div>
          </li>
        </ul>
      </nav>

      {changeNavbarColor && (
        <button className="fixed bottom-5 right-5 h-12 w-12 rounded-full bg-gray-500 hover:bg-gray-400 text-white z-50" onClick={scrollToTop}><CircularProgressbarWithChildren value={scrollPercentageChange}>
          {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
          <img src="https://cdn-icons-png.flaticon.com/512/608/608336.png" className="h-5 grayscale invert flex mx-auto" />
        </CircularProgressbarWithChildren></button>
      )}
      {showCart && (<div className="fixed right-0 w-[50%] h-screen top-0 z-50 bg-neutral-300">
        <div className="mt-1 border-b-[2px] border-indigo-500">
          <div className="h-16 flex justify-between mx-5">
            <div className="grid content-center font-light text-1xl">Cart ({cartItems})</div>
            <img onClick={() => setShowCart(false)} className="h-3 my-auto hover:cursor-pointer" src="https://cdn-icons-png.flaticon.com/512/2961/2961937.png" alt="" />
          </div>
        </div>
        <div className="productCartList h-[calc(100vh-80px-140px)] overflow-y-auto">
          {products.map((product: any) =>
            <ProductCart key={product.productId} name={product.name} image={product.image[1]} size={product.size[0]} price={product.price} />
          )}

        </div>
        <div className="h-[150px] absolute bottom-0 right-0 w-full z-50 border-t-[2px] border-indigo-500">
          <div className="m-5">
            <p onClick={() => setShowNote(true)} className="hover:cursor-pointer underline">{customerNote ? "Edit Order Note" : "Add Order Note"}</p>
            <p>Shipping & taxes calculated at checkout</p>
            <button className="w-full bg-black text-white mt-5 h-12 relative">
              <div className="flex flex-row align-top"><div className="basis-2/5 text-right">Checkout</div>
                <div className="basis-1/5 text-center leading-none relative">
                  <div className="align-top">.</div>
                </div>
                <div className="basis-2/5 text-left">${123} USD</div></div>
            </button>
          </div>
        </div>
        {showNote && (<div className="h-[250px] bg-white absolute bottom-0 right-0 w-full z-50 border-t-[2px] border-indigo-500">
          <div className="m-5">
            <div className="mb-5 flex justify-between">
              <div className="grid content-center font-light text-1xl">Edit Order Note</div>
              <img onClick={() => setShowNote(false)} className="h-3 my-auto hover:cursor-pointer" src="https://cdn-icons-png.flaticon.com/512/2961/2961937.png" alt="" />
            </div>
            <textarea value={customerNote} onChange={(e) => {setCustomerNote(e.target.value)}} className="resize-none focus:outline-none w-full h-24 p-3 border-[2px] border-indigo-500"></textarea>
            <button className="w-full bg-black text-white mt-5 h-12 relative">
              <div className="flex flex-row align-top"><div className="basis-2/5 text-right">Checkout</div>
                <div className="basis-1/5 text-center leading-none relative">
                  <div className="align-top">.</div>
                </div>
                <div className="basis-2/5 text-left">${123} USD</div></div>
            </button>
          </div>
        </div>)}
      </div>)}
    </>
  )
}

export default Navbar
