import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Link } from 'react-router-dom';

function Login() {
  const [zoom, setZoom] = useState(
    Math.round((window.devicePixelRatio / 1.25) * 100),
  );
  const handleZoom = () => {
    function onChange() {
      setZoom(Math.round((window.devicePixelRatio / 1.25) * 100));
    }
    matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`).addEventListener(
      'change',
      onChange,
      { once: true },
    );
  };
  handleZoom();

  const [showForgotPasswordSection, setShowForgotPasswordSection] =
    useState(false);

  return (
    <>
      {!showForgotPasswordSection && (
        <div
          className={`${
            isMobile
              ? 'h-[calc(100vh-68px)]'
              : 'md:h-[calc(100vh-68px)] lg:h-[calc(100vh-68px)]'
          } flex items-center justify-center`}
        >
          <form className="min-w-[30%] space-y-6 text-center">
            <h2 className="text-1xl font-extralight">Login</h2>
            <p className="text-sm font-light">
              Please enter your e-mail and password
            </p>
            <div className="space-y-4">
              <input
                className="block w-full border px-4 py-2 outline-none"
                type="email"
                placeholder="Email"
              />
              <div className="relative border">
                <input
                  className="block w-[calc(100%-100px)] px-4 py-2 outline-none"
                  type="password"
                  placeholder="Password"
                />
                <p
                  className="absolute top-3.5 right-3 w-[100px] cursor-pointer text-center text-xs font-extralight"
                  onClick={() =>
                    setShowForgotPasswordSection(!showForgotPasswordSection)
                  }
                >
                  Forgot password?
                </p>
              </div>
            </div>
            <button
              className="block w-full bg-neutral-800 py-3 text-sm font-light uppercase text-neutral-50"
              type="submit"
            >
              login
            </button>
            <p className="text-sm font-light">
              Don't have an account? <Link to="/register">Create one</Link>
            </p>
          </form>
        </div>
      )}

      {showForgotPasswordSection && (
        <div
          className={`${
            isMobile
              ? 'h-[calc(100vh-68px)]'
              : 'md:h-[calc(100vh-68px)] lg:h-[calc(100vh-68px)]'
          } flex items-center justify-center`}
        >
          <form className="min-w-[30%] space-y-6 text-center">
            <h2 className="text-1xl font-extralight">Recover password</h2>
            <p className="text-sm font-light">Please enter your email:</p>
            <div className="space-y-4">
              <input
                className="block w-full border px-4 py-2 outline-none"
                type="email"
                placeholder="Email"
              />
            </div>
            <button
              className="block w-full bg-neutral-800 py-3 text-sm font-light uppercase text-neutral-50"
              type="submit"
            >
              recover
            </button>
            <p className="text-sm font-light">
              Remember your password?{' '}
              <span
                className="cursor-pointer"
                onClick={() => setShowForgotPasswordSection(false)}
              >
                Back to login
              </span>
            </p>
          </form>
        </div>
      )}
    </>
  );
}

export default Login;
