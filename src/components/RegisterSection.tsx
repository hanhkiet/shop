import { FormEvent } from 'react';
import { useFieldValidator } from '../hooks/useFieldValidator';
import { emailRegex, nameRegex, passwordRegex } from '../utils/regex';

const RegisterSection = () => {
  const {
    ref: firstNameRef,
    error: firstNameError,
    validate: validateFirstName,
  } = useFieldValidator(nameRegex, 'Please enter a valid first name');
  const {
    ref: lastNameRef,
    error: lastNameError,
    validate: validateLastName,
  } = useFieldValidator(nameRegex, 'Please enter a valid last name');
  const {
    ref: emailRef,
    error: usernameError,
    validate: validateEmail,
  } = useFieldValidator(
    emailRegex,
    'Please enter a valid email address (e.g. abcd@gmail.com)',
  );
  const {
    ref: passwordRef,
    error: passwordError,
    validate: validatePassword,
  } = useFieldValidator(
    passwordRegex,
    'Please enter a valid password (min 6 characters)',
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    validateFirstName();
    validateLastName();
    validateEmail();
    validatePassword();
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
            className="input-field w-full required:border-red-500 invalid:border-red-500 lg:text-base"
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
            className="input-field w-full required:border-red-500 invalid:border-red-500 lg:text-base"
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
            className="input-field w-full required:border-red-500 invalid:border-red-500 lg:text-base"
            type="email"
            placeholder="Email"
          />
          <p className="mx-1 text-xs text-red-500">
            {usernameError ?? <span></span>}
          </p>
        </div>
        <div className="w-full space-y-1 text-left">
          <input
            ref={passwordRef}
            className="input-field w-full required:border-red-500 lg:text-base"
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
    </>
  );
};

export default RegisterSection;
