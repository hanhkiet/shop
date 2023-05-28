import { FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { sendLoginRequest } from '../app/managerSlice';
import { AppDispatch, RootState } from '../app/store';
import { LoginDataActionPayload } from '../app/types';
import ManagerNavbar from '../components/ManagerNavbar';
import { useRefWithValidator } from '../hooks/useRefWithValidator';
import Modal from '../modals/Modal';
import { nameRegex, passwordRegex } from '../utils/regex';

function ManagerPage() {
  const { isAuthenticated } = useSelector((state: RootState) => state.manager);
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

  if (!isAuthenticated) {
    return (
      <>
        <Modal className="flex items-center justify-center" onClose={() => {}}>
          <div className="space-y-6 p-12 text-center">
            <div className="space-y-3">
              <h2 className="text-2xl font-light lg:text-3xl">
                Login as Manager
              </h2>
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
        <img
          className="-z-10 h-screen w-full object-cover"
          src="https://i.shgcdn.com/39e62f8f-e1a5-45e7-a573-91b95a8e0425/-/format/auto/-/preview/3000x3000/-/quality/lighter/"
          alt=""
        />
      </>
    );
  }

  return (
    <>
      <ManagerNavbar />
      <div className="mt-20">
        <Outlet />
      </div>
    </>
  );
}

export default ManagerPage;
