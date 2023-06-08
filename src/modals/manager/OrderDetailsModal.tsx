import axios from 'axios';
import { useEffect, useState } from 'react';
import { Order, OrderDetail } from '../../app/types';
import Modal from '../Modal';

type Props = {
  order: Order;
  onClose: () => void;
};
const OrderDetailsModal = ({ order, onClose }: Props) => {
  const [data, setData] = useState<OrderDetail[]>([]);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_MANAGER_STORAGE_API_URL}/orders/${order.uuid}`,
        {
          withCredentials: true,
        },
      )
      .then(res => {
        setData(res.data as OrderDetail[]);
      });
  }, []);

  return (
    <Modal onClose={onClose} className="flex items-center justify-center">
      <div className="w-[40rem] space-y-3 p-6">
        <div className="space-y-2">
          <h2 className="text-3xl">Order</h2>
          <p className="text-2xl font-light lg:text-xl">#{order.uuid}</p>
          <p className="text-sm lg:text-base">{order.address.recipientName}</p>
          <p className="text-sm lg:text-base">{order.address.recipientPhone}</p>
          <p className="text-sm lg:text-base">{order.status}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl">Details</h3>
          {data.map((item, index) => (
            <div key={index} className="flex justify-between">
              <div>
                <p className="text-sm lg:text-base">{item.name}</p>
                <p>Size: {item.size}</p>
              </div>
              <p className="text-sm lg:text-base">Qty: {item.quantity}</p>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default OrderDetailsModal;
