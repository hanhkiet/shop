import { faCircleInfo, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Order } from '../app/types';
import AccountOrderDetailModal from '../modals/AccountOrderDetailsModal';
import YesNoDialogModal from '../modals/YesNoDialogModal';

const OrderOverviewSection = () => {
  const [data, setData] = useState<Order[]>([]);

  useEffect(() => {
    axios
      .get(`localhost:8080/api/v1/customers/orders`, {
        withCredentials: true,
      })
      .then(res => {
        setData(res.data);
      });
  }, []);

  if (data.length === 0) return null;

  const handleCancel = (order: Order) => {
    axios
      .put(
        `localhost:8080/api/v1/customers/orders/${order.uuid}/cancel`,
        {},
        {
          withCredentials: true,
        },
      )
      .then(res => {
        setData(data.map(o => (o.uuid === order.uuid ? res.data : o)));
      });
  };

  return (
    <div className="max-w-3xl lg:basis-8/12">
      <p className="border-b border-b-neutral-200 pb-3 text-sm font-light capitalize text-neutral-500">
        my orders
      </p>
      <div>
        <OrderSection
          title="Pending"
          orders={data.filter(o => o.status === 'PENDING')}
        />

        <OrderSection
          title="Delivering"
          orders={data.filter(o => o.status === 'DELIVERING')}
        />

        <OrderSection
          title="Delivered"
          orders={data.filter(o => o.status === 'DELIVERED')}
        />

        <OrderSection
          title="CANCELLED"
          orders={data.filter(o => o.status === 'CANCELLED')}
        />
      </div>
    </div>
  );
};

export default OrderOverviewSection;

type OrderSectionProps = {
  title: string;
  orders: Order[];
  handleCancel?: (order: Order) => void;
};
const OrderSection = ({ title, orders, handleCancel }: OrderSectionProps) => {
  return (
    <div>
      <h2 className="text-2xl uppercase text-neutral-600">{title}</h2>
      <div className="mt-3 grid grid-cols-4 gap-3">
        {orders.map(order => (
          <OrderCard
            order={order}
            key={order.uuid}
            onCancel={handleCancel ? () => handleCancel(order) : undefined}
          />
        ))}
      </div>
    </div>
  );
};

type OrderCardProps = {
  order: Order;
  onCancel?: () => void;
};
const OrderCard = ({ order, onCancel }: OrderCardProps) => {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  return (
    <>
      {isCancelModalOpen && (
        <YesNoDialogModal
          title="Cancel order"
          description="Are you sure you want to cancel this order?"
          onYes={onCancel ? onCancel : () => {}}
          onClose={() => setIsCancelModalOpen(false)}
        />
      )}

      {isDetailsModalOpen && (
        <AccountOrderDetailModal
          order={order}
          onClose={() => setIsDetailsModalOpen(false)}
        />
      )}

      <div
        key={order.uuid}
        className={`group relative cursor-pointer rounded border p-4 ${
          order.status === 'CANCELLED' ? 'bg-gray-200' : ''
        }`}
      >
        <div className="absolute inset-0 flex h-full w-full bg-black opacity-0 transition-opacity group-hover:opacity-5"></div>
        <div className="absolute inset-0 z-10 hidden items-center justify-center gap-3 px-3 group-hover:flex">
          <button>
            <FontAwesomeIcon
              onClick={() => setIsDetailsModalOpen(true)}
              icon={faCircleInfo}
              className="rounded border border-neutral-500 p-3 hover:bg-neutral-300"
            />
          </button>
          {order.status !== 'CANCELLED' && (
            <button onClick={onCancel}>
              <FontAwesomeIcon
                onClick={() => setIsCancelModalOpen(true)}
                className="rounded border border-red-600 p-3 hover:bg-red-300"
                icon={faTrash}
                style={{ color: '#d10000' }}
              />
            </button>
          )}
        </div>
        <div className="space-y-2 transition group-hover:opacity-10">
          <p className="text-xl">{order.address.recipientName}</p>
          <p className="text-sm">#{order.uuid}</p>
          <p className="text-lg">{order.address.recipientPhone}</p>
          <p>{`${order.address.street}, ${order.address.district}, ${order.address.city}`}</p>
          <p>{order.createdAt.toString()}</p>
          <p>Total: ${order.totalPrice}</p>
        </div>
      </div>
    </>
  );
};
