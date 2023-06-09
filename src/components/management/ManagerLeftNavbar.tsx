import { Link } from 'react-router-dom';

export default function ManagerLeftNavbar() {
  const menuItem = [
    {
      name: 'ORDERS',
      pathname: 'orders',
    },
    {
      name: 'STORAGE',
      pathname: 'storage',
    },
  ];

  return (
    <ul className="hidden w-1/6 items-center justify-start gap-12 px-6 uppercase duration-300 md:hidden lg:flex">
      {menuItem.map((item: any, index: number) => (
        <li key={index}>
          <div className="navbar-list z-50">
            <Link to={item.pathname}>{item.name}</Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
