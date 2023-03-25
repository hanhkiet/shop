import { useEffect, useState } from "react"

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

  return (
    <>
      <div className="">
        <video className= "relative" autoPlay muted loop src="https://cdn.shopify.com/videos/c/o/v/a1e944e243cd4e06b50e5eebd96d0d2f.mp4"></video>

        <nav className={`px-12 py-6 flex duration-300 justify-between  text-sm font-light fixed top-0 left-0 right-0 ${changeNavbarColor ? 'bg-white text-neutral-600' : 'text-white'} hover:bg-white hover:text-neutral-600`}  onMouseOver={() => setHoverNavbar(true)} 
        onMouseLeave={() => setHoverNavbar(false)}>
            <ul className="uppercase flex">
              <li><a href="category.html">shop</a></li>
              <li className="pl-8"><a>kits</a></li>
              <li className="pl-8"><a href="tech.html">tech</a></li>
              <li className="pl-8"><a>explore</a></li>
            </ul>
            <img src="https://cdn.shopify.com/s/files/1/0297/6293/files/Wings_ASRV_NEW_d5bba963-30a6-4d73-ba2e-68d1a8ea69c4_120x.png?v=1664577873" className={`justify-self-center text-3xl duration-300 ${changeNavbarColor || hoverNavbar ? '' : 'brightness-200 invert-0'}`} />
            <ul className="capitalize flex font-light ">
              <li><a href="account.html">account</a></li>
              <li className="pl-8"><a>search</a></li>
              <li className="pl-8"><a>cart(0)</a></li>
            </ul>
          </nav>
    </div>
    </>
  )
}

export default Navbar
