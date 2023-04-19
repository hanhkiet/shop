import { useState } from 'react';
import { Link } from 'react-router-dom';
import CartContent from './CartContent';
import Modal from './Modal';

function Navbar() {
  const [showCart, setShowCart] = useState(false);
  const isModalOpen = showCart;

  return (
    <>
      <nav
        className={`fixed z-10 flex w-full p-6 text-sm font-light text-neutral-100 duration-300 hover:bg-white hover:text-neutral-600 ${
          isModalOpen ? 'pointer-events-none' : ''
        }`}
      >
        {/* Left navbar */}
        <ul className="hidden w-1/6 items-center justify-start gap-12 px-6 uppercase md:flex lg:flex">
          <li>
            <Link to="/category">shop</Link>
          </li>
          <li>
            <Link to="/kits">kits</Link>
          </li>
          <li>
            <Link to="/about">about</Link>
          </li>
        </ul>
        <div className="flex w-8/12 items-center justify-center">
          <Link to="/">
            <img
              src="https://cdn.shopify.com/s/files/1/0297/6293/files/Wings_ASRV_NEW_d5bba963-30a6-4d73-ba2e-68d1a8ea69c4_120x@2x.png?v=1664577873"
              className={`mx-auto h-5 duration-300 `}
            />
          </Link>
        </div>

        {/* Right navbar */}
        <ul className="flex w-1/6 items-center justify-end gap-12 px-6 font-light">
          <li className="capitalize">
            <Link to="/account">account</Link>
          </li>
          <li className="capitalize">search</li>
          <li>
            <button className="capitalize" onClick={() => setShowCart(true)}>
              cart
            </button>
          </li>
        </ul>
      </nav>

      {showCart && (
        <Modal className="w-1/6" onClose={() => setShowCart(false)}>
          <CartContent />
        </Modal>
      )}
    </>
  );
}

export default Navbar;
