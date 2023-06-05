import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendDeleteAddressRequest } from '../app/addressSlice';
import { AppDispatch } from '../app/store';
import { Address } from '../app/types';
import EditAddressModal from '../modals/EditAddressModal';
import YesNoDialogModal from '../modals/YesNoDialogModal';

type Props = {
  index: number;
  address: Address;
};

const AddressCard = ({ index, address }: Props) => {
  const { uuid, recipientName, recipientPhone, street, district, city } =
    address;

  const dispatch: AppDispatch = useDispatch();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <>
      {isDeleteModalOpen && (
        <YesNoDialogModal
          onYes={() =>
            dispatch(sendDeleteAddressRequest(uuid)).then(() =>
              setIsDeleteModalOpen(false),
            )
          }
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
          {`Address ${index + 1}`}
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
