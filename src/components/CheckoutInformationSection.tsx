import { useState } from 'react';
import { Link } from 'react-router-dom';

function CheckoutInformationSection() {
  const [checked, setChecked] = useState(true);
  return (
    <div className="w-full">
      {/* <div className="relative rounded border">
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 transform bg-white px-3 font-[Mulish] font-bold">
          Express checkout
        </span>
        <div className="mt-3 flex flex-row justify-between gap-3 p-3">
          <button className="basis-1/2 rounded bg-purple-700 p-3 opacity-90 duration-300 hover:opacity-100">
            <img
              className="mx-auto h-5 brightness-0 grayscale invert"
              src="https://media.discordapp.net/attachments/1026660684739653674/1114027864422088794/shop-pay.png"
              // src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Transparent.png"
            />
          </button>
          <button className="basis-1/2 rounded bg-yellow-500 opacity-90 duration-300 hover:opacity-100">
            <img
              className="mx-auto h-5"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2560px-PayPal.svg.png"
            />
          </button>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between p-3 text-center">
        <div className="h-px w-full basis-6/12 bg-gray-500"></div>
        <div className="basis-1/12 text-xs uppercase text-gray-500">OR</div>
        <div className="h-px w-full basis-6/12 bg-gray-500"></div>
      </div> */}
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
        <div className="flex gap-3">
          <input
            onClick={() => setChecked(!checked)}
            type="checkbox"
            id="email-offers"
            name="email-offers"
            value="Bike"
            checked={checked}
          />
          <label htmlFor="email-offers">Email me with news and offers</label>
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="p-3 text-xl">Shipping address</h2>
        <div className="space-y-6 p-3">
          <div className="group relative rounded border p-3">
            <label htmlFor="address" className="absolute -top-3 bg-white px-1">
              Country/region
            </label>
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
          <div className="grid flex-row justify-between gap-3 lg:flex">
            <div className="relative basis-1/2 rounded border p-3">
              <label
                htmlFor="first-name"
                className="absolute -top-3 bg-white px-1"
              >
                First name
              </label>
              <input type="text" className="w-full px-2 outline-none" />
            </div>
            <div className="relative basis-1/2 rounded border p-3">
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
            <label
              htmlFor="apartment"
              className="absolute -top-3 bg-white px-1"
            >
              Apartment, suite, etc. (optional)
            </label>
            <input type="text" className="w-full px-2 outline-none" />
          </div>
          <div className="grid flex-row justify-between gap-3 lg:flex">
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
                Postal code (optional)
              </label>
              <input type="text" className="w-full px-2 outline-none" />
            </div>
          </div>
          <div className="relative rounded border p-3">
            <label htmlFor="phone" className="absolute -top-3 bg-white px-1">
              Phone
            </label>
            <input type="text" className="w-full px-2 outline-none" />
          </div>
          <div className="flex gap-3">
            <input type="checkbox" id="offers" name="offers" value="Bike" />
            <label htmlFor="offers">Text me with news and offers</label>
          </div>
          <p className="mx-5 text-left text-gray-500">
            If this box is unchecked, your number will only be used if the
            courier has issues locating your address and will not be used for
            marketing purposes.
          </p>
          <div className="flex flex-row gap-2">
            <Link to="/cart" className="w-full p-2">
              {'< '}Return to cart
            </Link>
            <Link className="w-full" to="/checkout/shipping">
              <button className="button button-dark w-full normal-case">
                Continue to shipping
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutInformationSection;
