import { FormEvent, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as orderSlice from '../app/orderSlice';
import { AppDispatch, RootState } from '../app/store';
import { useRefWithValidator } from '../hooks/useRefWithValidator';
import {
  cityRegex,
  emailRegex,
  nameRegex,
  phoneRegex,
  streetRegex,
} from '../utils/regex';

function CheckoutInformationSection() {
  const [isHovered, setIsHovered] = useState(false);
  const countries = ['Vietnam', 'United States'];
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const emailOrder = useSelector((state: RootState) => state.order.emailOrder);
  const countryOrder = useSelector(
    (state: RootState) => state.order.countryOrder,
  );
  const firstNameOrder = useSelector(
    (state: RootState) => state.order.firstNameOrder,
  );
  const lastNameOrder = useSelector(
    (state: RootState) => state.order.lastNameOrder,
  );
  const addressOrder = useSelector(
    (state: RootState) => state.order.addressOrder,
  );
  const districtOrder = useSelector(
    (state: RootState) => state.order.districtOrder,
  );
  const cityOrder = useSelector((state: RootState) => state.order.cityOrder);
  const phoneOrder = useSelector((state: RootState) => state.order.phoneOrder);
  const dispatch: AppDispatch = useDispatch();
  const countryIndex = useSelector(
    (state: RootState) => state.order.countryIndex,
  );
  useEffect(() => {
    dispatch(orderSlice.setCountryOrder(countries[countryIndex]));
  }, []);
  const {
    ref: emailRef,
    error: emailError,
    validate: validateEmail,
  } = useRefWithValidator(
    emailRegex,
    'Please enter a valid email address (e.g. abcd@gmail.com)',
  );
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
    ref: streetRef,
    error: streetError,
    validate: validateStreet,
  } = useRefWithValidator(
    streetRegex,
    'Please enter a valid street (e.g. 123 Street)',
  );
  const {
    ref: districtRef,
    error: districtError,
    validate: validateDistrict,
  } = useRefWithValidator(
    streetRegex,
    'Please enter a valid district (e.g. District 10)',
  );
  const {
    ref: cityRef,
    error: cityError,
    validate: validateCity,
  } = useRefWithValidator(
    cityRegex,
    'Please enter a valid city (e.g. Ho Chi Minh City)',
  );
  const {
    ref: recipientPhoneRef,
    error: recipientPhoneError,
    validate: validateRecipientPhone,
  } = useRefWithValidator(
    phoneRegex,
    'Please enter a valid recipient phone (e.g. 0123456789)',
  );
  const navigate = useNavigate();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidEmail = validateEmail();
    const isValidFirstName = validateFirstName();
    const isValidLastName = validateLastName();
    const isValidStreet = validateStreet();
    const isValidDistrict = validateDistrict();
    const isValidCity = validateCity();
    const isValidRecipientPhone = validateRecipientPhone();

    if (
      isValidEmail &&
      isValidFirstName &&
      isValidLastName &&
      isValidStreet &&
      isValidDistrict &&
      isValidCity &&
      isValidRecipientPhone
    ) {
      navigate('/checkout/shipping');
    }
  };
  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="flex flex-row justify-between p-3">
        <h2 className="text-xl">Contact information</h2>
        <span>
          <span className="text-gray-500">Already have an account?</span>{' '}
          <Link to="/auth/login">Log in</Link>
        </span>
      </div>
      <div className="p-3">
        <div
          className={`relative rounded border p-3 ${
            emailError && 'border-red-500'
          }`}
        >
          <label htmlFor="Email" className="absolute -top-3 bg-white px-1">
            Email
          </label>
          <input
            ref={emailRef}
            type="Email"
            className="w-full px-2 outline-none"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              dispatch(orderSlice.setEmailOrder(event.target.value))
            }
            value={emailOrder}
          />
        </div>
        <p className="mx-1 mt-1 text-xs text-red-500">
          {emailError ?? <span></span>}
        </p>
      </div>
      <div className="space-y-2">
        <h2 className="p-3 text-xl">Shipping address</h2>
        <div className="space-y-6 p-3">
          <div className="group relative rounded border p-3">
            <label htmlFor="address" className="absolute -top-3 bg-white px-1">
              Country/region
            </label>
            <div className="absolute top-0 right-10 grid h-full items-center">
              <div className="h-[50%] w-px bg-gray-300"></div>
            </div>
            <select
              name="address"
              id="address"
              className="w-full space-y-2 bg-white px-1 outline-none"
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                dispatch(orderSlice.setCountryOrder(event.target.value));
                dispatch(
                  orderSlice.setCountryIndex(event.target.selectedIndex),
                );
              }}
              value={countryOrder}
            >
              {countries.map((item: string) => (
                <option className="p-1" value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 flex-row justify-between gap-3 lg:flex">
            <div className="basis-full lg:basis-1/2">
              <div
                className={`relative rounded border p-3 ${
                  firstNameError && 'border-red-500'
                }`}
              >
                <label
                  htmlFor="first-name"
                  className="absolute -top-3 bg-white px-1"
                >
                  First name
                </label>
                <input
                  type="text"
                  className="w-full px-2 outline-none"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch(orderSlice.setFirstNameOrder(event.target.value))
                  }
                  ref={firstNameRef}
                  value={firstNameOrder}
                />
              </div>
              <p className="mx-1 mt-1 text-xs text-red-500">
                {firstNameError ?? <span></span>}
              </p>
            </div>
            <div className="basis-full lg:basis-1/2">
              <div
                className={`relative rounded border p-3 ${
                  lastNameError && 'border-red-500'
                }`}
              >
                <label
                  htmlFor="last-name"
                  className="absolute -top-3 bg-white px-1"
                >
                  Last name
                </label>
                <input
                  type="text"
                  className="w-full px-2 outline-none"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch(orderSlice.setLastNameOrder(event.target.value))
                  }
                  ref={lastNameRef}
                  value={lastNameOrder}
                />
              </div>
              <p className="mx-1 mt-1 text-xs text-red-500">
                {lastNameError ?? <span></span>}
              </p>
            </div>
          </div>
          <div>
            <div
              className={`relative rounded border p-3 ${
                streetError && 'border-red-500'
              }`}
            >
              <label
                htmlFor="address"
                className="absolute -top-3 bg-white px-1"
              >
                Address
              </label>
              <input
                type="text"
                className="w-full px-2 outline-none"
                ref={streetRef}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(orderSlice.setAddressOrder(event.target.value))
                }
                value={addressOrder}
              />
            </div>
            <p className="mx-1 mt-1 text-xs text-red-500">
              {streetError ?? <span></span>}
            </p>
          </div>
          <div>
            <div
              className={`relative rounded border p-3 ${
                districtError && 'border-red-500'
              }`}
            >
              <label
                htmlFor="district"
                className="absolute -top-3 bg-white px-1"
              >
                District
              </label>
              <input
                type="text"
                ref={districtRef}
                className="w-full px-2 outline-none"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(orderSlice.setDistrictOrder(event.target.value))
                }
                value={districtOrder}
              />
            </div>
            <p className="mx-1 mt-1 text-xs text-red-500">
              {districtError ?? <span></span>}
            </p>
          </div>
          <div className="grid grid-cols-1 flex-row justify-between gap-3 lg:flex">
            <div className="basis-1/2">
              <div
                className={`relative rounded border p-3 ${
                  cityError && 'border-red-500'
                }`}
              >
                <label htmlFor="city" className="absolute -top-3 bg-white px-1">
                  City
                </label>
                <input
                  ref={cityRef}
                  type="text"
                  className="w-full px-2 outline-none"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch(orderSlice.setCityOrder(event.target.value))
                  }
                  value={cityOrder}
                />
              </div>
              <p className="mx-1 mt-1 text-xs text-red-500">
                {cityError ?? <span></span>}
              </p>
            </div>
            <div className="basis-1/2">
              <div
                className={`relative rounded border p-3 ${
                  recipientPhoneError && 'border-red-500'
                }`}
              >
                <label
                  htmlFor="postal-code"
                  className="absolute -top-3 bg-white px-1"
                >
                  Phone
                </label>
                <input
                  ref={recipientPhoneRef}
                  type="text"
                  className="relative w-full px-2 outline-none"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch(orderSlice.setPhoneOrder(event.target.value))
                  }
                  value={phoneOrder}
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
              <p className="mx-1 mt-1 text-xs text-red-500">
                {recipientPhoneError ?? <span></span>}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20 flex w-full flex-row gap-2 lg:mt-auto">
        <Link to="/cart" className="w-full p-2">
          {'< '}Return to cart
        </Link>
        <button
          type="submit"
          className="button w-full bg-gray-900 normal-case text-white duration-300 hover:bg-black"
        >
          Continue to shipping
        </button>
      </div>
    </form>
  );
}

export default CheckoutInformationSection;
