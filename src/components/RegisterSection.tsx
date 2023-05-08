import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useRefWithValidator } from '../hooks/useRefWithValidator';
import { emailRegex, nameRegex, passwordRegex } from '../utils/regex';

const RegisterSection = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const {
    ref: firstNameRef,
    error: firstNameError,
    validate: validateFirstName,
  } = useRefWithValidator(nameRegex, 'Please enter a valid first name');
  const {
    ref: lastNameRef,
    error: lastNameError,
    validate: validateLastName,
  } = useRefWithValidator(nameRegex, 'Please enter a valid last name');
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
    setMessage('');

    const isValidFirstName = validateFirstName();
    const isValidLastName = validateLastName();
    const isValidEmail = validateEmail();
    const isValidPassword = validatePassword();

    // console.log(firstNameRef.current?.value ?? '');
    // console.log(lastNameRef.current?.value ?? '');
    // console.log(emailRef.current?.value ?? '');
    // console.log(passwordRef.current?.value ?? '');

    if (
      isValidFirstName &&
      isValidLastName &&
      isValidEmail &&
      isValidPassword
    ) {
      register(
        firstNameRef.current?.value ?? '',
        lastNameRef.current?.value ?? '',
        emailRef.current?.value ?? '',
        passwordRef.current?.value ?? '',
      )
        .then(() => navigate('/account'))
        .catch(error => setMessage(error.message));
    }
  };

  return (
    <>
      <div className="space-y-2">
        <h2 className="text-2xl font-light lg:text-3xl">Register</h2>
        <p className="text-sm font-light lg:text-base">
          Please fill in the information below
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 lg:gap-3">
        <div className="w-full space-y-1 text-left">
          <input
            ref={firstNameRef}
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
          register
        </button>
      </form>
      {message && <p className="text-sm text-red-500">{message}</p>}
    </>
  );
};

export default RegisterSection;
