import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { setShowSearchBar } from '../app/searchSlice';

type Props = {
  checkNavbar: boolean;
};

function NavbarLogo(props: Props) {
  const location = useLocation();
  const dispatch = useDispatch();
  const handleClickLogo = () => {
    dispatch(setShowSearchBar(false));
    if (location.pathname == '/') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo(0, 0);
    }
  };
  return (
    <div className="flex items-center justify-center">
      <Link to="/" onClick={handleClickLogo}>
        <img
          src="https://cdn.shopify.com/s/files/1/0297/6293/files/Wings_ASRV_NEW_d5bba963-30a6-4d73-ba2e-68d1a8ea69c4_120x@2x.png?v=1664577873"
          className={`mx-auto h-5 duration-300 ${
            props.checkNavbar ? '' : 'brightness-200'
          }`}
          alt=""
        />
      </Link>
    </div>
  );
}

export default NavbarLogo;
