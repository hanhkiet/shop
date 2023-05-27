import { Link } from 'react-router-dom';

export default function NavbarLeftAdmin() {
  const dataItem = [
    {
      name: 'BUSINESS',
      url: '/admin/business',
    },
    {
      name: 'DESIGN',
      url: '/admin/design',
    },
  ];
  return (
    <>
      <ul className="flex w-1/6 items-center justify-start gap-6 uppercase md:flex lg:hidden">
        <li className="navbar-list">
          <img src="https://cdn-icons-png.flaticon.com/512/6015/6015685.png" />
        </li>
      </ul>
      <ul
        className={`hidden w-1/6 items-center justify-start gap-12 px-6 uppercase duration-300 md:hidden lg:flex `}
      >
        {dataItem.map((item: any, index: any) => (
          <li key={index}>
            <div className={`navbar-list z-50`}>
              <Link to={item.url}>{item.name}</Link>
            </div>
            <div
              className={`relative left-0 bottom-0.5 z-50 bg-black py-px duration-300 `}
            ></div>
          </li>
        ))}
      </ul>
    </>
  );
}
