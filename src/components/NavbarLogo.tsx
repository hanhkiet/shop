import { Link } from 'react-router-dom';

function NavbarLogo() {
  return (
    <div className="flex w-2/12 items-center justify-center">
      <Link to="/manager">
        <img
          src="https://cdn.shopify.com/s/files/1/0297/6293/files/Wings_ASRV_NEW_d5bba963-30a6-4d73-ba2e-68d1a8ea69c4_120x@2x.png?v=1664577873"
          className="mx-auto h-5 duration-300"
          alt=""
        />
      </Link>
    </div>
  );
}

export default NavbarLogo;
