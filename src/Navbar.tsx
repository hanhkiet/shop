import { useEffect, useState } from "react"
import Cover from "./Cover"

function Navbar() {
  const [changeNavbarColor, setChangeNavbarColor] = useState(false)
  const [hoverNavbar, setHoverNavbar] = useState(false)
  console.log(hoverNavbar)
  useEffect(() => {
    
    const handleScroll = () => {
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
    });
  };

  return (
    <>
    <Cover />
        <nav className={`px-12 py-6 flex duration-300 justify-between text-sm font-light fixed top-0 left-0 right-0 ${changeNavbarColor ? 'bg-white text-neutral-600' : 'text-white'} hover:bg-white hover:text-neutral-600`}  onMouseOver={() => setHoverNavbar(true)} 
        onMouseLeave={() => setHoverNavbar(false)}>
            <ul className="uppercase hidden md:flex lg:flex">
              <li><a href="category.html">shop</a></li>
              <li className="pl-8"><a>kits</a></li>
              <li className="pl-8"><a href="tech.html">tech</a></li>
              <li className="pl-8"><a>explore</a></li>
            </ul>
            <ul className="uppercase flex md:hidden lg:hidden">
              <li><img src="https://cdn-icons-png.flaticon.com/512/6015/6015685.png" className={`h-5 mx-auto duration-300 ${changeNavbarColor || hoverNavbar ? '' : 'grayscale invert'}`} /></li>
              <li className="pl-8"><img src="https://media.discordapp.net/attachments/1026660684739653674/1089365167730602095/cart.png" className={`h-5 mx-auto duration-300 ${changeNavbarColor || hoverNavbar ? '' : 'grayscale invert'}`} /></li>
            </ul>
            <img src="https://cdn.shopify.com/s/files/1/0297/6293/files/Wings_ASRV_NEW_d5bba963-30a6-4d73-ba2e-68d1a8ea69c4_120x.png?v=1664577873" className={`mx-auto h-6 duration-300 ${changeNavbarColor || hoverNavbar ? '' : 'brightness-200'}`} />
            <ul className="capitalize font-light hidden md:flex lg:flex">
              <li><a href="account.html">account</a></li>
              <li className="pl-8"><a>search</a></li>
              <li className="pl-8"><a>cart({0})</a></li>
            </ul>
            <ul className="uppercase flex md:hidden lg:hidden">
              <li><img src="https://cdn-icons-png.flaticon.com/512/149/149852.png" className={`h-5 mx-auto duration-300 ${changeNavbarColor || hoverNavbar ? '' : 'grayscale invert'}`} /></li>
              {/* <li className="pl-8"><img src="https://cdn-icons-png.flaticon.com/512/419/419910.png" className={`h-5 mx-auto duration-300 ${changeNavbarColor || hoverNavbar ? '' : 'grayscale invert'}`} /></li> */}
              <li className="pl-8"><img src="https://media.discordapp.net/attachments/1026660684739653674/1089228771149762690/cart_has_product.png" className={`h-5 mx-auto duration-300 ${changeNavbarColor || hoverNavbar ? '' : 'grayscale invert'}`} /></li>
            </ul>
          </nav>

  {changeNavbarColor && (
    <button className="fixed bottom-5 right-5 h-16 w-16 rounded-full bg-blue-500 hover:bg-red-500 text-white" onClick={scrollToTop}><img src="https://cdn-icons-png.flaticon.com/512/608/608336.png" className="h-5 grayscale invert flex mx-auto" /></button>
  )}
    </>
  )
}

export default Navbar
