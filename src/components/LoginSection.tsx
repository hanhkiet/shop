import { FormEvent, useRef, useState } from 'react';
import { emailRegex } from '../utils/regex';

const LoginSection = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = emailRef.current?.value;

    if (email && emailRegex.test(email)) {
      setUsernameError('');
    } else {
      setUsernameError(
        'Please enter a valid email address (e.g. abcd@gmail.com)',
      );
    }

    const password = passwordRef.current?.value;
    if (password && password.length >= 6) {
      setPasswordError('');
    } else {
      setPasswordError('Please enter a valid password (min 6 characters)');
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 w-3/4 -translate-x-1/2 -translate-y-1/2 space-y-6 rounded-lg bg-white p-6 text-center md:w-7/12 lg:static lg:flex lg:h-screen lg:translate-x-0 lg:translate-y-0 lg:flex-col lg:justify-center lg:space-y-8 lg:rounded-none lg:px-12">
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
            className="input-field w-full required:border-red-500 invalid:border-red-500 lg:text-base"
            type="email"
            placeholder="Email"
          />
          <p className="mx-1 text-xs text-red-500">{usernameError ?? ' '}</p>
        </div>
        <div className="w-full space-y-1 text-left">
          <input
            ref={passwordRef}
            className="input-field w-full required:border-red-500 lg:text-base"
            type="password"
            placeholder="Password"
          />
          <p className="mx-1 text-xs text-red-500">{passwordError ?? ' '}</p>
        </div>
        <button className="button button-dark" type="submit">
          login
        </button>
      </form>
      <p className="text-sm font-light lg:text-base">
        Don't have an account? <a href="">Create one</a>
      </p>
    </div>
  );
};

export default LoginSection;
