import { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { addAddress } from '../app/addressSlice';
import { AppDispatch } from '../app/store';
import { Address } from '../app/types';
import { useRefWithValidator } from '../hooks/useRefWithValidator';
import { cityRegex, nameRegex, phoneRegex, streetRegex } from '../utils/regex';
import Modal from './Modal';

type Props = {
  onClose: () => void;
};

const AddNewAddressModal = ({ onClose }: Props) => {
  const dispatch: AppDispatch = useDispatch();

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidRecipientName = validateRecipientName();
    const isValidRecipientPhone = validateRecipientPhone();
    const isValidStreet = validateStreet();
    const isValidDistrict = validateDistrict();
    const isValidCity = validateCity();

    if (
      isValidRecipientName &&
      isValidRecipientPhone &&
      isValidStreet &&
      isValidDistrict &&
      isValidCity
    ) {
      const address = {
        recipientName: recipientNameRef.current?.value,
        recipientPhone: recipientPhoneRef.current?.value,
        street: streetRef.current?.value,
        district: districtRef.current?.value,
        city: cityRef.current?.value,
      } as Address;

      dispatch(addAddress(address)).then(() => {
        onClose();
      });
    }
  };

  return (
    <Modal onClose={onClose} className="flex items-center justify-center">
      <div className="w-96 space-y-3 p-6 text-center">
        <div className="space-y-2">
          <h2 className="text-2xl font-light lg:text-3xl">Add new address</h2>
          <p className="text-sm font-light lg:text-base">
            Please enter the information below
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 lg:gap-3">
          <div className="w-full space-y-1 text-left">
            <input
              ref={recipientNameRef}
              className={`input-field w-full lg:text-base ${
                recipientNameError && 'border-red-500'
              }`}
              type="text"
              placeholder="Name"
            />
            <p className="mx-1 text-xs text-red-500">
              {streetError ?? <span></span>}
            </p>
          </div>
          <div className="w-full space-y-1 text-left">
            <input
              ref={recipientPhoneRef}
              className={`input-field w-full lg:text-base ${
                recipientPhoneError && 'border-red-500'
              }`}
              type="text"
              placeholder="Phone"
            />
            <p className="mx-1 text-xs text-red-500">
              {streetError ?? <span></span>}
            </p>
          </div>
          <div className="w-full space-y-1 text-left">
            <input
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
              ref={cityRef}
              className={`input-field w-full lg:text-base ${
                cityError && 'border-red-500'
              }`}
              type="text"
              placeholder="City"
            />
            <p className="mx-1 text-xs text-red-500">
              {districtError ?? <span></span>}
            </p>
          </div>
          <button className="button button-dark" type="submit">
            add new address
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default AddNewAddressModal;
