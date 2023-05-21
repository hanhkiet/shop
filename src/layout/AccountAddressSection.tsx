import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { RootState } from '../app/store';
import AddressCard from '../components/AddressCard';
import AddNewAddressModal from '../modals/AddNewAddressModal';

const AccountAddressSection = () => {
  const addresses = useSelector((state: RootState) => state.addresses);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {isModalOpen && (
        <AddNewAddressModal onClose={() => setIsModalOpen(false)} />
      )}

      <div className="flex-1 justify-center p-12 md:p-24 lg:flex">
        <div className="w-9/12 space-y-9 text-neutral-700">
          <div className="space-y-6 ">
            <Link
              to="/account"
              className="text-sm font-light text-neutral-400 transition-colors before:mr-3 before:content-['<'] hover:text-neutral-600"
            >
              Back to account
            </Link>
            <h2 className="text-3xl font-light">My addresses</h2>
            <button
              className="button button-dark"
              onClick={() => setIsModalOpen(true)}
            >
              add new address
            </button>
          </div>
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
            {addresses.map((address, index) => (
              <AddressCard key={address.uuid} index={index} address={address} />
            ))}
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default AccountAddressSection;
