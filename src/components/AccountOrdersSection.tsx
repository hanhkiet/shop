import { Link, Outlet } from 'react-router-dom';
import data from '../static/data/orders.json';

const AccountOrdersSection = () => {
  return (
    <>
      <Outlet />
      <div className="flex-1 justify-center p-12 md:p-24">
        <div className="space-y-9 text-neutral-700">
          <div className="space-y-6">
            <Link
              to="/account"
              className="text-sm font-light text-neutral-400 transition-colors before:mr-3 before:content-['<'] hover:text-neutral-600"
            >
              Back to account
            </Link>
            <h2 className="text-3xl font-light">My orders</h2>
          </div>

          <table className="w-full table-auto rounded border border-neutral-400 text-center">
            <thead>
              <tr>
                <th className="border border-neutral-400 p-2">ID</th>
                <th className="border border-neutral-400 p-2">Order date</th>
                <th className="border border-neutral-400 p-2">Address</th>
                <th className="border border-neutral-400 p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map(order => (
                <tr key={order.order_id}>
                  <td className="border border-neutral-400 p-2">
                    <Link
                      className="underline underline-offset-2 transition-all hover:text-neutral-400 hover:no-underline"
                      to={`${order.order_id}`}
                    >{`#000${order.order_id}`}</Link>
                  </td>
                  <td className="border border-neutral-400 p-2">
                    {order.order_date}
                  </td>
                  <td className="border border-neutral-400 p-2">
                    {order.order_address}
                  </td>
                  <td className="border border-neutral-400 p-2 capitalize">
                    {order.order_status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AccountOrdersSection;
