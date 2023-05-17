import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../modals/Modal';

const AccountOrderDetailSection = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  return (
    <Modal onClose={() => navigate(-1)} className="items-center justify-center">
      <div className="flex-1 justify-center p-12">
        <div className="space-y-9 text-neutral-700">
          <div className="space-y-6">
            <h2 className="text-3xl font-light">Order details</h2>
          </div>
          <div className="space-y-6">
            <h3 className="text-xl font-light">Order #000{orderId}</h3>
            <div className="space-y-3">
              <div className="flex justify-between gap-x-10">
                <span className="font-light">Order date</span>
                <span className="font-light">21-04-2023</span>
              </div>
              <div className="flex justify-between gap-x-10">
                <span className="font-light">Order status</span>
                <span className="font-light">Pending</span>
              </div>
              <div className="flex justify-between gap-x-10">
                <span className="font-light">Order address</span>
                <span className="font-light">
                  164 Nguyen Van Thuong, Ho Chi Minh City
                </span>
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
                <tr>
                  <td className="border border-neutral-400 p-2">1</td>
                  <td className="border border-neutral-400 p-2">Product 1</td>
                  <td className="border border-neutral-400 p-2">$10.00</td>
                  <td className="border border-neutral-400 p-2">1</td>
                  <td className="border border-neutral-400 p-2">$10.00</td>
                </tr>
                <tr>
                  <td className="border border-neutral-400 p-2">2</td>
                  <td className="border border-neutral-400 p-2">Product 2</td>
                  <td className="border border-neutral-400 p-2">$20.00</td>
                  <td className="border border-neutral-400 p-2">2</td>
                  <td className="border border-neutral-400 p-2">$40.00</td>
                </tr>
                <tr>
                  <td className="border border-neutral-400 p-2">3</td>
                  <td className="border border-neutral-400 p-2">Product 3</td>
                  <td className="border border-neutral-400 p-2">$30.00</td>
                  <td className="border border-neutral-400 p-2">3</td>
                  <td className="border border-neutral-400 p-2">$90.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AccountOrderDetailSection;
