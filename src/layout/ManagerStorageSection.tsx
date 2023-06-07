import { Link, Outlet, useLocation } from 'react-router-dom';

function ManagerStorageSection() {
  const location = useLocation();

  return (
    <>
      <div className="p-3 text-center">
        <h1 className="text-4xl text-neutral-600">Storage</h1>
      </div>
      <div className="flex justify-center p-3">
        <ul className="flex flex-row gap-3 uppercase text-neutral-500">
          <li
            className={`${
              location.pathname === '/manager/storage/collections'
                ? 'text-neutral-400 underline underline-offset-4'
                : ''
            }`}
          >
            <Link
              to="/manager/storage/collections"
              className="hover:text-neutral-400"
            >
              Collections
            </Link>
          </li>
          <li
            className={`${
              location.pathname === '/manager/storage/products'
                ? 'text-neutral-400 underline underline-offset-4'
                : ''
            }`}
          >
            <Link
              to="/manager/storage/products"
              className="hover:text-neutral-400"
            >
              Products
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </>
  );
}

export default ManagerStorageSection;
