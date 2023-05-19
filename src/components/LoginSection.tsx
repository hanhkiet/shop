import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { sendLoginRequest } from '../app/authSlice';
import { AppDispatch } from '../app/store';
import { LoginDataActionPayload } from '../app/types';
import { useRefWithValidator } from '../hooks/useRefWithValidator';
import { emailRegex, passwordRegex } from '../utils/regex';

const LoginSection = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    ref: emailRef,
    error: emailError,
    validate: validateEmail,
  } = useRefWithValidator(
    emailRegex,
    'Please enter a valid email address (e.g. abcd@gmail.com)',
  );

  const {
    ref: passwordRef,
    error: passwordError,
    validate: validatePassword,
  } = useRefWithValidator(
    passwordRegex,
    'Please enter a valid password (min 6 characters)',
  );

  const [message, setMessage] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidEmail = validateEmail();
    const isValidPassword = validatePassword();

    if (isValidEmail && isValidPassword) {
      const payload = {
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      } as LoginDataActionPayload;

      dispatch(sendLoginRequest(payload));
    }
  };

  return (
    <>
      {' '}
      <div className="space-y-2">
        <h2 className="text-2xl font-light lg:text-3xl">Login</h2>
        <p className="text-sm font-light lg:text-base">
          Please enter your e-mail and password
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 lg:gap-3">
        <div className="w-full space-y-1 text-left">
          <input
            ref={emailRef}
            className={`input-field w-full lg:text-base ${
              emailError && 'border-red-500'
            }`}
            type="email"
            placeholder="Email"
          />
          <p className="mx-1 text-xs text-red-500">
            {emailError ?? <span></span>}
          </p>
        </div>
        <div className="w-full space-y-1 text-left">
          <input
            ref={passwordRef}
            className={`input-field w-full lg:text-base ${
              passwordError && 'border-red-500'
            }`}
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
      <p className="text-sm font-light lg:text-base">
        Don't have an account? <Link to="/auth/register">Register</Link>
      </p>
      {message && <p className="text-sm text-red-500">{message}</p>}
    </>
  );
};

export default LoginSection;
