import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Address } from '../app/types';
import { useRefWithValidator } from '../hooks/useRefWithValidator';
import { cityRegex, nameRegex, phoneRegex, streetRegex } from '../utils/regex';
import { account_url } from '../utils/url';
import Modal from './Modal';

type Props = {
  address: Address;
  index: number;
  onClose: () => void;
};

const EditAddressModal = ({ address, index, onClose }: Props) => {
  const {
    isPrimary,
    recipientName,
    recipientPhone,
    street,
    district,
    city,
    uuid,
  } = address;

  const dispatch = useDispatch();
  const token = localStorage.getItem('accessToken');

  const {
    ref: recipientNameRef,
    error: recipientNameError,
    validate: validateRecipientName,
  } = useRefWithValidator(
    nameRegex,
    'Please enter a valid recipient name (e.g. John Doe)',
  );

  const {
    ref: recipientPhoneRef,
    error: recipientPhoneError,
    validate: validateRecipientPhone,
  } = useRefWithValidator(
    phoneRegex,
    'Please enter a valid recipient phone (e.g. 0123456789)',
  );

  const {
    ref: streetRef,
    error: streetError,
    validate: validateStreet,
  } = useRefWithValidator(
    streetRegex,
    'Please enter a valid street (e.g. 123 Street)',
  );

  const {
    ref: districtRef,
    error: districtError,
    validate: validateDistrict,
  } = useRefWithValidator(
    streetRegex,
    'Please enter a valid district (e.g. District 10)',
  );

  const {
    ref: cityRef,
    error: cityError,
    validate: validateCity,
  } = useRefWithValidator(
    cityRegex,
    'Please enter a valid city (e.g. Ho Chi Minh City)',
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isRecipientNameValid = validateRecipientName();
    const isRecipientPhoneValid = validateRecipientPhone();
    const isStreetValid = validateStreet();
    const isDistrictValid = validateDistrict();
    const isCityValid = validateCity();

    if (
      isRecipientNameValid &&
      isRecipientPhoneValid &&
      isStreetValid &&
      isDistrictValid &&
      isCityValid
    ) {
      const address = {
        recipientName: recipientNameRef.current?.value,
        recipientPhone: recipientPhoneRef.current?.value,
        street: streetRef.current?.value,
        district: districtRef.current?.value,
        city: cityRef.current?.value,
      } as Address;
      update(address).then(() => {
        onClose();
      });
    }
  };

  const update = async (address: Address) => {
    return axios.put(
      `${account_url}/addresses`,
      {
        ...address,
        addressId: uuid,
      },
      {
        headers: {
          Authorization: `Bearer ${token?.substring(1, token.length - 1)}`,
        },
      },
    );
  };

  return (
    <Modal onClose={onClose} className="flex items-center justify-center">
      <div className="w-96 space-y-3 p-6 text-center">
        <div className="space-y-2">
          <h2 className="text-2xl font-light lg:text-3xl">Edit address</h2>
          <p className="text-sm font-light lg:text-base">
            Please modify the information below
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 lg:gap-3">
          <div className="w-full space-y-1 text-left">
            <input
              ref={recipientNameRef}
              defaultValue={recipientName}
              className={`input-field w-full lg:text-base ${
                recipientNameError && 'border-red-500'
              }`}
              type="text"
              placeholder="Recipient name"
            />
            <p className="mx-1 text-xs text-red-500">
              {recipientNameError ?? <span></span>}
            </p>
          </div>
          <div className="w-full space-y-1 text-left">
            <input
              defaultValue={recipientPhone}
              ref={recipientPhoneRef}
              className={`input-field w-full lg:text-base ${
                recipientPhoneError && 'border-red-500'
              }`}
              type="text"
              placeholder="Recipient phone"
            />
            <p className="mx-1 text-xs text-red-500">
              {recipientPhoneError ?? <span></span>}
            </p>
          </div>
          <div className="w-full space-y-1 text-left">
            <input
              defaultValue={street}
              ref={streetRef}
              className={`input-field w-full lg:text-base ${
                streetError && 'border-red-500'
              }`}
              type="text"
              placeholder="Street"
            />
            <p className="mx-1 text-xs text-red-500">
              {streetError ?? <span></span>}
            </p>
          </div>
          <div className="w-full space-y-1 text-left">
            <input
              defaultValue={district}
              ref={districtRef}
              className={`input-field w-full lg:text-base ${
                districtError && 'border-red-500'
              }`}
              type="text"
              placeholder="District"
            />
            <p className="mx-1 text-xs text-red-500">
              {districtError ?? <span></span>}
            </p>
          </div>
          <div className="w-full space-y-1 text-left">
            <input
              defaultValue={city}
              ref={cityRef}
              className={`input-field w-full lg:text-base ${
                cityError && 'border-red-500'
              }`}
              type="text"
              placeholder="City"
            />
            <p className="mx-1 text-xs text-red-500">
              {cityError ?? <span></span>}
            </p>
          </div>
          <div className="flex w-full justify-end gap-3">
            <button className="button button-dark">save</button>
            <button className="button" onClick={onClose}>
              cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditAddressModal;
