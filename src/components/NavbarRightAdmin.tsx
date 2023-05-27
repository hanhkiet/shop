import { Link } from 'react-router-dom';

function NavbarRightAdmin() {
  const dataItem = [
    {
      name: 'account',
      url: '/admin',
    },
    {
      name: 'logout',
      url: '/',
    },
  ];
  return (
    <>
      <ul
        className={`flex w-1/6 items-center justify-end gap-6 uppercase md:flex lg:hidden `}
      >
        <li>
          <img
            alt=""
            src="https://cdn-icons-png.flaticon.com/512/7542/7542245.png"
            className={`mx-auto h-4 cursor-pointer duration-300`}
          />
        </li>
      </ul>
      <ul
        className={`hidden w-1/6 items-center justify-end gap-12 px-6 font-light duration-300 md:hidden lg:flex `}
      >
        <li className="capitalize">
          <Link to="/admin">account</Link>
        </li>
        <li className="navbar-list capitalize hover:cursor-pointer">
          <Link to="/">Logout</Link>
        </li>
      </ul>
    </>
  );
}

export default NavbarRightAdmin;
