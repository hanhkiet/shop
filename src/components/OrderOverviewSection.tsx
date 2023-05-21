import { Link } from 'react-router-dom';
import data from '../static/data/orders.json';

const OrderOverviewSection = () => {
  return (
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
                <th className="border border-neutral-400 p-2">Order date</th>
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
  );
};

export default OrderOverviewSection;
