import { FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendUpdatePasswordRequest } from '../app/customer/accountSlice';
import { AppDispatch, RootState } from '../app/store';
import { Credentials } from '../app/types';
import { useRefWithValidator } from '../hooks/useRefWithValidator';
import { passwordRegex } from '../utils/regex';
import Modal from './Modal';

type Props = {
  onClose: () => void;
};

const ChangePasswordModal = ({ onClose }: Props) => {
  const username = useSelector(
    (state: RootState) => state.account.user?.username,
  );
  const dispatch: AppDispatch = useDispatch();

  const {
    ref: oldPasswordRef,
    error: oldPasswordError,
    validate: validateOldPassword,
  } = useRefWithValidator(
    passwordRegex,
    'Please enter a valid password (e.g. Abc123)',
  );

  const {
    ref: newPasswordRef,
    error: newPasswordError,
    validate: validateNewPassword,
  } = useRefWithValidator(
    passwordRegex,
    'Please enter a valid password (e.g. Abc123)',
  );

  const {
    ref: confirmPasswordRef,
    error: confirmPasswordError,
    validate: validateConfirmPassword,
  } = useRefWithValidator(
    (value: string) => value === newPasswordRef.current?.value,
    'Passwords do not match',
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isOldPasswordValid = validateOldPassword();
    const isNewPasswordValid = validateNewPassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    if (isOldPasswordValid && isNewPasswordValid && isConfirmPasswordValid) {
      const oldCredentials = {
        username,
        password: oldPasswordRef.current?.value,
      } as Credentials;

      const newCredentials = {
        username,
        password: newPasswordRef.current?.value,
      } as Credentials;

      dispatch(
        sendUpdatePasswordRequest({ oldCredentials, newCredentials }),
      ).then(() => {
        onClose();
      });
    }
  };

  return (
    <Modal onClose={handleSubmit} className="flex items-center justify-center">
      <div className="w-96 space-y-3 p-6 text-center">
        <h2 className="text-2xl font-light lg:text-3xl">Change password</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="w-full space-y-1 text-left">
            <input
              ref={oldPasswordRef}
              className={`input-field w-full lg:text-base ${
                oldPasswordError && 'border-red-500'
              }`}
              type="password"
              placeholder="Old password"
            />
            <p className="mx-1 text-xs text-red-500">
              {oldPasswordError ?? <span></span>}
            </p>
          </div>

          <div className="w-full space-y-1 text-left">
            <input
              ref={newPasswordRef}
              className={`input-field w-full lg:text-base ${
                newPasswordError && 'border-red-500'
              }`}
              type="password"
              placeholder="New password"
            />
            <p className="mx-1 text-xs text-red-500">
              {newPasswordError ?? <span></span>}
            </p>
          </div>

          <div className="w-full space-y-1 text-left">
            <input
              ref={confirmPasswordRef}
              className={`input-field w-full lg:text-base ${
                confirmPasswordError && 'border-red-500'
              }`}
              type="password"
              placeholder="Confirm password"
            />
            <p className="mx-1 text-xs text-red-500">
              {confirmPasswordError ?? <span></span>}
            </p>
          </div>

          <div className="flex w-full justify-end gap-3">
            <button className="button button-dark">change</button>
            <button className="button" onClick={onClose}>
              cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ChangePasswordModal;
