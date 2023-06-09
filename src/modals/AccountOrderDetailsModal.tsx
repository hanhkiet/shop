import axios from 'axios';
import { useEffect, useState } from 'react';
import { Order, OrderDetail } from '../app/types';
import Modal from './Modal';

type Props = {
  order: Order;
  onClose: () => void;
};

const AccountOrderDetailModal = ({ order, onClose }: Props) => {
  const [data, setData] = useState<OrderDetail[]>([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_CUSTOMER_ORDER_API_URL}/${order.uuid}`, {
        withCredentials: true,
      })
      .then(res => {
        setData(res.data as OrderDetail[]);
      });
  }, []);

  return (
    <Modal onClose={onClose} className="flex items-center justify-center">
      <div className="flex-1 justify-center p-12">
        <div className="space-y-9 text-neutral-700">
          <div className="space-y-6">
            <h2 className="text-3xl font-light">Order details</h2>
          </div>
          <div className="space-y-6">
            <h3 className="text-xl font-light">Order #{order.uuid}</h3>
            <div className="space-y-3">
              <div className="flex justify-between gap-x-10">
                <span className="font-light">Order date</span>
                <span className="font-light">{order.createdAt.toString()}</span>
              </div>
              <div className="flex justify-between gap-x-10">
                <span className="font-light">Order status</span>
                <span className="font-light">{order.status}</span>
              </div>
              <div className="flex justify-between gap-x-10">
                <span className="font-light">Order address</span>
                <span className="font-light">
                  {order.address.street}, {order.address.district},{' '}
                  {order.address.city}
                </span>
              </div>
              <div className="flex justify-between gap-x-10">
                <span className="font-light">Total price</span>
                <span className="font-light">{order.totalPrice}</span>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-xl font-light">Order items</h3>
            <table className="w-full table-auto rounded border border-neutral-400 text-center">
              <thead>
                <tr>
                  <th className="border border-neutral-400 p-2">ID</th>
                  <th className="border border-neutral-400 p-2">Name</th>
                  <th className="border border-neutral-400 p-2">Price</th>
                  <th className="border border-neutral-400 p-2">Quantity</th>
                  <th className="border border-neutral-400 p-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-neutral-400 p-2">
                      {item.uuid}
                    </td>
                    <td className="border border-neutral-400 p-2">
                      {item.name}
                    </td>
                    <td className="border border-neutral-400 p-2">
                      {item.price}
                    </td>
                    <td className="border border-neutral-400 p-2">
                      {item.quantity}
                    </td>
                    <td className="border border-neutral-400 p-2">
                      {item.price * item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AccountOrderDetailModal;
