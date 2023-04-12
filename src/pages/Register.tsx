import { isMobile } from 'react-device-detect';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <div
      className={`${
        isMobile
          ? 'h-[calc(100vh-68px)]'
          : 'md:h-[calc(100vh-68px)] lg:h-[calc(100vh-68px)]'
      } flex items-center justify-center`}
    >
      <form className="min-w-[20%] space-y-6 text-center">
        <h2 className="text-1xl font-extralight">Register</h2>
        <p className="text-sm font-light">Please fill the information below</p>
        <div className="space-y-4">
          <input
            className="block w-full border px-4 py-2 outline-none"
            type="text"
            placeholder="First name"
          />
          <input
            className="block w-full border px-4 py-2 outline-none"
            type="text"
            placeholder="Last name"
          />
          <input
            className="block w-full border px-4 py-2 outline-none"
            type="email"
            placeholder="Email"
          />
          <input
            className="block w-full border px-4 py-2 outline-none"
            type="password"
            placeholder="Password"
          />
        </div>
        <button
          className="block w-full bg-neutral-800 py-3 text-sm font-light uppercase text-neutral-50"
          type="submit"
        >
          create my account
        </button>
        <p className="text-sm font-light">
          Already have an account? <Link to="/login">Back to login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
