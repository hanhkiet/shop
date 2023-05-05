import { Link, useNavigate } from 'react-router-dom';
import data from '../static/data/orders.json';

const AccountOverviewSection = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 justify-center p-12 md:p-24 lg:flex">
      <div className="w-9/12 space-y-9">
        <div className="space-y-3 text-neutral-700">
          <h2 className="text-3xl font-light">My account</h2>
          <p className="text-md font-light">Welcome back, [First name]!</p>
          <button className="text-md font-light text-neutral-400 transition-colors hover:text-neutral-600">
            Log out
          </button>
        </div>
        <div className="flex flex-col justify-between gap-12 lg:flex-row lg:gap-20">
          <div className="max-w-3xl lg:basis-8/12">
            <p className="border-b border-b-neutral-200 pb-3 text-sm font-light capitalize text-neutral-500">
              my orders
            </p>
            <div className="text-center text-neutral-600">
              <div className="py-3">
                <table className="w-full table-auto rounded border border-neutral-400">
                  <thead>
                    <tr>
                      <th className="border border-neutral-400 p-2">ID</th>
                      <th className="border border-neutral-400 p-2">
                        Order date
                      </th>
                      <th className="border border-neutral-400 p-2">Address</th>
                      <th className="border border-neutral-400 p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((order, index) => (
                      <tr key={order.order_id}>
                        <td className="border border-neutral-400 p-2 text-sm">
                          {`#000${order.order_id}`}
                        </td>
                        <td className="border border-neutral-400 p-2 text-sm">
                          {order.order_date}
                        </td>
                        <td className="border border-neutral-400 p-2 text-sm">
                          {order.order_address}
                        </td>
                        <td className="border border-neutral-400 p-2 text-sm capitalize">
                          {order.order_status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Link
                to="orders"
                className="underline underline-offset-4 transition-all hover:no-underline"
              >
                View more
              </Link>
            </div>
          </div>
          <div className="max-w-xs lg:basis-4/12">
            <p className="border-b border-b-neutral-200 pb-3 text-sm font-light capitalize text-neutral-500">
              primary address
            </p>
            <div className="py-6">
              <div className="space-y-2 text-neutral-600">
                <p>[First name] [Last name]</p>
                <p>Viet Nam</p>
              </div>
            </div>
            <button
              className="button button-dark"
              onClick={() => navigate('addresses')}
            >
              edit address
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountOverviewSection;
