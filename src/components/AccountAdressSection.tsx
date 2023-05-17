import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { deleteAddress } from '../app/addressSlice';
import { RootState } from '../app/store';
import { Address } from '../app/types';
import AddNewAddressModal from '../modals/AddNewAddressModal';
import EditAddressModal from '../modals/EditAddressModal';
import YesNoDialogModal from '../modals/YesNoDialogModal';
import { api_url } from '../utils/url';

type Props = {
  index: number;
  address: Address;
};

const AddressItem = ({ index, address }: Props) => {
  const { isPrimary, recipientName, recipientPhone, street, district, city } =
    address;
  const dispatch = useDispatch();

  const token = localStorage.getItem('accessToken');

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDelete = () => {
    axios
      .delete(`${api_url}/account/addresses`, {
        data: {
          addressId: address.uuid,
        },
        headers: {
          Authorization: `Bearer ${token?.substring(1, token.length - 1)}`,
        },
      })
      .then(() => {
        dispatch(deleteAddress(index));
        setIsDeleteModalOpen(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      {isDeleteModalOpen && (
        <YesNoDialogModal
          onYes={() => handleDelete()}
          onClose={() => setIsDeleteModalOpen(false)}
          title="Delete address"
          description="Are you sure you want to delete this address?"
        ></YesNoDialogModal>
      )}

      {isEditModalOpen && (
        <EditAddressModal
          address={address}
          index={index}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}

      <div className="space-y-6">
        <p className="border-b border-b-neutral-200 pb-3 text-sm font-light capitalize text-neutral-500">
          {isPrimary ? 'primary address' : `address ${index + 1}`}
        </p>
        <div className="space-y-3 font-light">
          <p>{recipientName}</p>
          <p>{recipientPhone}</p>
          <p>
            {street}, {district}
          </p>
          <p>{city}</p>
          <div className="flex gap-3">
            <button
              className="capitalize underline underline-offset-4 transition-all hover:text-neutral-500 hover:no-underline"
              onClick={() => setIsEditModalOpen(true)}
            >
              edit
            </button>
            <button
              className="capitalize underline underline-offset-4 transition-all hover:text-neutral-500 hover:no-underline"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const AccountAdressSection = () => {
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
              <AddressItem key={address.uuid} index={index} address={address} />
            ))}
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default AccountAdressSection;
