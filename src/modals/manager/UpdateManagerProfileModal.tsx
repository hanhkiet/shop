import { FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendUpdateProfileRequest } from '../../app/manager/managerSlice';
import { AppDispatch, RootState } from '../../app/store';
import { Manager } from '../../app/types';
import { useRefWithValidator } from '../../hooks/useRefWithValidator';
import { nameRegex } from '../../utils/regex';
import Modal from '../Modal';

type Props = {
  onClose: () => void;
};

const UpdateManagerProfileModal = ({ onClose }: Props) => {
  const { username, firstName, lastName } = useSelector(
    (state: RootState) => state.manager.manager!,
  );
  const dispatch: AppDispatch = useDispatch();

  const {
    ref: firstNameRef,
    error: firstNameError,
    validate: validateFirstName,
  } = useRefWithValidator(
    nameRegex,
    'Please enter a valid first name (e.g. John)',
  );

  const {
    ref: lastNameRef,
    error: lastNameError,
    validate: validateLastName,
  } = useRefWithValidator(
    nameRegex,
    'Please enter a valid last name (e.g. Doe)',
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isFirstNameValid = validateFirstName();
    const isLastNameValid = validateLastName();

    if (isFirstNameValid && isLastNameValid) {
      const payload = {
        username,
        firstName: firstNameRef.current?.value,
        lastName: lastNameRef.current?.value,
      } as Manager;

      dispatch(sendUpdateProfileRequest(payload)).then(() => {
        onClose();
      });
    }
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="w-full space-y-1 text-left">
            <input
              ref={firstNameRef}
              defaultValue={firstName}
              className={`input-field w-full lg:text-base ${
                firstNameError && 'border-red-500'
              }`}
              type="text"
              placeholder="First name"
            />
            <p className="mx-1 text-xs text-red-500">
              {firstNameError ?? <span></span>}
            </p>
          </div>

          <div className="w-full space-y-1 text-left">
            <input
              ref={lastNameRef}
              defaultValue={lastName}
              className={`input-field w-full lg:text-base ${
                lastNameError && 'border-red-500'
              }`}
              type="text"
              placeholder="Last name"
            />
            <p className="mx-1 text-xs text-red-500">
              {lastNameError ?? <span></span>}
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

export default UpdateManagerProfileModal;
