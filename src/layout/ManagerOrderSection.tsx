import {
  faChevronDown,
  faChevronUp,
  faCircleInfo,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Order } from '../app/types';
import OrderDetailsModal from '../modals/manager/OrderDetailsModal';

const data = [
  {
    uuid: '1',
    address: {
      recipientName: 'Nguyen Van A',
      recipientPhone: '0123456789',
      street: '123 Nguyen Van A',
      district: 'Quan 1',
      city: 'TP HCM',
    },
    status: 'PENDING',
    paymentMethod: 'COD',
    createdAt: new Date('2021-09-01'),
    totalPrice: 100,
  },
  {
    uuid: '2',
    address: {
      recipientName: 'Nguyen Van A',
      recipientPhone: '0123456789',
      street: '123 Nguyen Van A',
      district: 'Quan 1',
      city: 'TP HCM',
    },
    status: 'PENDING',
    paymentMethod: 'COD',
    createdAt: new Date('2021-09-01'),
    totalPrice: 100,
  },
  {
    uuid: '3',
    address: {
      recipientName: 'Nguyen Van A',
      recipientPhone: '0123456789',
      street: '123 Nguyen Van A',
      district: 'Quan 1',
      city: 'TP HCM',
    },
    status: 'PENDING',
    paymentMethod: 'COD',
    createdAt: new Date('2021-09-01'),
    totalPrice: 100,
  },
  {
    uuid: '1',
    address: {
      recipientName: 'Nguyen Van A',
      recipientPhone: '0123456789',
      street: '123 Nguyen Van A',
      district: 'Quan 1',
      city: 'TP HCM',
    },
    status: 'DELIVERING',
    paymentMethod: 'COD',
    createdAt: new Date('2021-09-01'),
    totalPrice: 100,
  },
  {
    uuid: '1',
    address: {
      recipientName: 'Nguyen Van A',
      recipientPhone: '0123456789',
      street: '123 Nguyen Van A',
      district: 'Quan 1',
      city: 'TP HCM',
    },
    status: 'DELIVERED',
    paymentMethod: 'COD',
    createdAt: new Date('2021-09-01'),
    totalPrice: 100,
  },
  {
    uuid: '2',
    address: {
      recipientName: 'Nguyen Van A',
      recipientPhone: '0123456789',
      street: '123 Nguyen Van A',
      district: 'Quan 1',
      city: 'TP HCM',
    },
    status: 'DELIVERED',
    paymentMethod: 'COD',
    createdAt: new Date('2021-09-01'),
    totalPrice: 100,
  },
  {
    uuid: '1',
    address: {
      recipientName: 'Nguyen Van A',
      recipientPhone: '0123456789',
      street: '123 Nguyen Van A',
      district: 'Quan 1',
      city: 'TP HCM',
    },
    status: 'CANCELLED',
    paymentMethod: 'COD',
    createdAt: new Date('2021-09-01'),
    totalPrice: 100,
  },
] as Order[];
function ManagerOrderSection() {
  const [data, setData] = useState<Order[]>([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_MANAGER_STORAGE_API_URL}/orders`, {
        withCredentials: true,
      })
      .then(res => {
        setData(res.data as Order[]);
      });
  }, []);

  const handleMoveUp = (order: Order) => {
    const status = order.status;
    let newStatus = status;

    switch (status) {
      case 'DELIVERING':
        newStatus = 'PENDING';
        break;
      case 'DELIVERED':
        newStatus = 'DELIVERING';
      default:
        break;
    }

    axios
      .put(
        `${import.meta.env.VITE_MANAGER_STORAGE_API_URL}/orders/${
          order.uuid
        }/${newStatus}`,
        {},
        {
          withCredentials: true,
        },
      )
      .then(res => {
        setData(data.map(d => (d.uuid === order.uuid ? res.data : d)));
      });
  };

  const handleMoveDown = (order: Order) => {
    const status = order.status;
    let newStatus = status;

    switch (status) {
      case 'PENDING':
        newStatus = 'DELIVERING';
        break;
      case 'DELIVERING':
        newStatus = 'DELIVERED';
        break;
      default:
        break;
    }

    axios
      .put(
        `${import.meta.env.VITE_MANAGER_STORAGE_API_URL}/orders/${
          order.uuid
        }/${newStatus}`,
        {},
        {
          withCredentials: true,
        },
      )
      .then(res => {
        setData(data.map(d => (d.uuid === order.uuid ? res.data : d)));
      });
  };

  const handleCancel = (order: Order) => {
    axios
      .put(
        `${import.meta.env.VITE_MANAGER_STORAGE_API_URL}/orders/${
          order.uuid
        }/CANCELLED`,
        {},
        {
          withCredentials: true,
        },
      )
      .then(res => {
        setData(data.map(d => (d.uuid === order.uuid ? res.data : d)));
      });
  };

  return (
    <>
      <div className="p-3 text-center">
        <h1 className="text-4xl text-neutral-600">Orders</h1>
      </div>
      <div className="mx-auto max-w-screen-xl space-y-6 p-6">
        <OrderSection
          title="pending"
          orders={data.filter(d => d.status === 'PENDING')}
          handleMoveUp={handleMoveUp}
          handleMoveDown={handleMoveDown}
          handleCancel={handleCancel}
        />
        <OrderSection
          title="delivering"
          orders={data.filter(d => d.status === 'DELIVERING')}
          handleMoveUp={handleMoveUp}
          handleMoveDown={handleMoveDown}
          handleCancel={handleCancel}
        />
        <OrderSection
          title="delivered"
          orders={data.filter(d => d.status === 'DELIVERED')}
          handleMoveUp={handleMoveUp}
          handleMoveDown={handleMoveDown}
          handleCancel={handleCancel}
        />
        <OrderSection
          title="cancelled"
          orders={data.filter(d => d.status === 'CANCELLED')}
          handleMoveUp={handleMoveUp}
          handleMoveDown={handleMoveDown}
          handleCancel={handleCancel}
        />
      </div>
    </>
  );
}

export default ManagerOrderSection;

type OrderSectionProps = {
  title: string;
  orders: Order[];
  handleMoveUp: (order: Order) => void;
  handleMoveDown: (order: Order) => void;
  handleCancel: (order: Order) => void;
};
const OrderSection = ({
  title,
  orders,
  handleMoveUp,
  handleMoveDown,
  handleCancel,
}: OrderSectionProps) => {
  return (
    <div>
      <h2 className="text-2xl uppercase text-neutral-600">{title}</h2>
      <div className="mt-3 grid grid-cols-4 gap-3">
        {orders.map(order => (
          <OrderCard
            order={order}
            key={order.uuid}
            onUp={() => handleMoveUp(order)}
            onDown={() => handleMoveDown(order)}
            onCancel={() => handleCancel(order)}
          />
        ))}
      </div>
    </div>
  );
};

type OrderCardProps = {
  order: Order;
  onUp?: () => void;
  onDown?: () => void;
  onCancel?: () => void;
};
const OrderCard = ({ order, onUp, onDown, onCancel }: OrderCardProps) => {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  return (
    <>
      {isDetailsModalOpen && (
        <OrderDetailsModal
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
          {order.status !== 'DELIVERED' && order.status !== 'CANCELLED' && (
            <button onClick={onDown}>
              <FontAwesomeIcon
                className="rounded border border-neutral-500 p-3 hover:bg-neutral-300"
                icon={faChevronDown}
              />
            </button>
          )}
          {order.status !== 'PENDING' && order.status !== 'CANCELLED' && (
            <button onClick={onUp}>
              <FontAwesomeIcon
                className="rounded border border-neutral-500 p-3 hover:bg-neutral-300"
                icon={faChevronUp}
              />
            </button>
          )}

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
                onClick={() => {}}
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
