import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Address } from '../app/types';
import EditAddressModal from '../modals/EditAddressModal';
import YesNoDialogModal from '../modals/YesNoDialogModal';
import { account_url } from '../utils/url';

type Props = {
  index: number;
  address: Address;
};

const AddressCard = ({ index, address }: Props) => {
  const { isPrimary, recipientName, recipientPhone, street, district, city } =
    address;
  const dispatch = useDispatch();

  const token = localStorage.getItem('accessToken');

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDelete = () => {
    axios
      .delete(`${account_url}/addresses`, {
        data: {
          addressId: address.uuid,
        },
        headers: {
          Authorization: `Bearer ${token?.substring(1, token.length - 1)}`,
        },
      })
      .then(() => {
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

export default AddressCard;
