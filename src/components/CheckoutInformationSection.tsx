import { useState } from 'react';
import { Link } from 'react-router-dom';

function CheckoutInformationSection() {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div className="w-full">
      <div className="flex flex-row justify-between p-3">
        <h2 className="text-xl">Contact information</h2>
        <span>
          <span className="text-gray-500">Already have an account?</span>{' '}
          <Link to="/auth/login">Log in</Link>
        </span>
      </div>
      <div className="space-y-6 p-3">
        <div className="relative rounded border p-3">
          <label htmlFor="first-name" className="absolute -top-3 bg-white px-1">
            Email
          </label>
          <input type="Email" className="w-full px-2 outline-none" />
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="p-3 text-xl">Shipping address</h2>
        <div className="space-y-6 p-3">
          <div className="group relative rounded border p-3">
            <label htmlFor="address" className="absolute -top-3 bg-white px-1">
              Country/region
            </label>
            <div className='absolute top-0 right-10 h-full grid items-center'><div className='h-[50%] w-px bg-gray-300'></div></div>
            <select
              name="address"
              id="address"
              className="w-full space-y-2 bg-white px-1 outline-none"
            >
              <option className="p-1" value="1">
                Vietnam
              </option>
              <option value="2">United States</option>
            </select>
          </div>
          <div className="grid grid-cols-1 flex-row justify-between gap-3 lg:flex">
            <div className="relative basis-full rounded border p-3 lg:basis-1/2">
              <label
                htmlFor="first-name"
                className="absolute -top-3 bg-white px-1"
              >
                First name
              </label>
              <input type="text" className="w-full px-2 outline-none" />
            </div>
            <div className="relative basis-full rounded border p-3 lg:basis-1/2">
              <label
                htmlFor="last-name"
                className="absolute -top-3 bg-white px-1"
              >
                Last name
              </label>
              <input type="text" className="w-full px-2 outline-none" />
            </div>
          </div>
          <div className="relative rounded border p-3">
            <label htmlFor="address" className="absolute -top-3 bg-white px-1">
              Address
            </label>
            <input type="text" className="w-full px-2 outline-none" />
          </div>
          <div className="relative rounded border p-3">
            <label htmlFor="district" className="absolute -top-3 bg-white px-1">
              District
            </label>
            <input type="text" className="w-full px-2 outline-none" />
          </div>
          <div className="grid grid-cols-1 flex-row justify-between gap-3 lg:flex">
            <div className="relative basis-1/2 rounded border p-3">
              <label htmlFor="city" className="absolute -top-3 bg-white px-1">
                City
              </label>
              <input type="text" className="w-full px-2 outline-none" />
            </div>
            <div className="relative basis-1/2 rounded border p-3">
              <label
                htmlFor="postal-code"
                className="absolute -top-3 bg-white px-1"
              >
                Phone
              </label>
              <input
                type="text"
                className="relative w-full px-2 outline-none"
              />
              <div
                className="absolute top-3 right-3"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  className="h-5 w-5 cursor-pointer opacity-70"
                  src="https://www.freepnglogos.com/uploads/question-mark-png/big-question-mark-makgeolli-mamas-papas-27.png"
                  alt=""
                />
                <div
                  className={`${
                    isHovered ? 'visible opacity-100' : 'collapse opacity-0'
                  } absolute bottom-9 -right-10 z-50 w-56 rounded bg-gray-700 p-2 text-center text-white duration-300 lg:-right-24`}
                >
                  <span className="relative z-50">
                    In case we need to contact you about your order
                  </span>
                  <div className="absolute -bottom-2 left-40 z-40 lg:left-[calc(96px+8px)]">
                    <div className="h-6 w-6 rotate-45 transform bg-gray-700" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutInformationSection;
