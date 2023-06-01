import { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { sendLoginRequest } from '../app/accountSlice';
import { AppDispatch } from '../app/store';
import { LoginDataActionPayload } from '../app/types';
import { useRefWithValidator } from '../hooks/useRefWithValidator';
import { nameRegex, passwordRegex } from '../utils/regex';
import Modal from './Modal';

const ManagerLoginModal = () => {
  const dispatch: AppDispatch = useDispatch();

  const {
    ref: usernameRef,
    error: usernameError,
    validate: validateUsername,
  } = useRefWithValidator(
    nameRegex,
    'Please enter a valid username (e.g. john_doe)',
  );

  const {
    ref: passwordRef,
    error: passwordError,
    validate: validatePassword,
  } = useRefWithValidator(
    passwordRegex,
    'Please enter a valid password (min 6 characters)',
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = validateUsername();
    const password = validatePassword();

    if (username && password) {
      const payload = {
        username: usernameRef.current?.value,
        password: passwordRef.current?.value,
      } as LoginDataActionPayload;

      dispatch(sendLoginRequest(payload));
    }
  };

  return (
    <Modal className="flex items-center justify-center" onClose={() => {}}>
      <div className="space-y-6 p-12 text-center">
        <div className="space-y-3">
          <h2 className="text-2xl font-light lg:text-3xl">Login as Manager</h2>
          <p className="text-sm font-light lg:text-base">
            Please enter your username and password
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 space-y-2 lg:gap-3"
        >
          <div className="w-full space-y-1 text-left">
            <input
              ref={usernameRef}
              className={`input-field w-full lg:text-base `}
              type="text"
              placeholder="Username"
            />
            <p className="mx-1 text-xs text-red-500">
              {usernameError ?? <span></span>}
            </p>
          </div>
          <div className="w-full space-y-1 text-left">
            <input
              ref={passwordRef}
              className={`input-field 'border-red-500' } w-full
                  lg:text-base`}
              type="password"
              placeholder="Password"
            />
            <p className="mx-1 text-xs text-red-500">
              {passwordError ?? <span></span>}
            </p>
          </div>
          <button className="button button-dark" type="submit">
            login
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ManagerLoginModal;
