const CheckoutInformationSection = () => {
  return (
    <div className="flex basis-2/3 flex-col items-center gap-3 px-6 py-3">
      <nav className="flex gap-2 text-neutral-500">
        <a href="/cart">Cart</a>
        <span>/</span>
        <span className="text-neutral-800">Information</span>
        <span>/</span>
        <span>Payment</span>
      </nav>
      <div className="w-full max-w-md lg:max-w-xl">
        <div>
          <h2 className="text-xl">Contact information</h2>
          <div className="p-3">
            <p className="text-neutral-600">
              <span>HUYNH ANH KIET</span>
              <span> </span>
              <span>(huynhanhkiet179@gmail.com)</span>
            </p>
            <button className="text-neutral-800 hover:text-neutral-600">
              Log out
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl">Shipping address</h2>
          <div className="space-y-6 p-3">
            <div className="group relative rounded border p-3">
              <label
                htmlFor="address"
                className="absolute -top-3 bg-white px-1"
              >
                Address
              </label>
              <select
                name="address"
                id="address"
                className="w-full space-y-2 bg-white px-1 outline-none"
              >
                <option className="p-1" value="1">
                  Use a new address
                </option>
                <option value="2">164 Nguyen Van Thuong, TP.HCM</option>
              </select>
            </div>
            <div className="relative rounded border p-3">
              <label
                htmlFor="first-name"
                className="absolute -top-3 bg-white px-1"
              >
                First name
              </label>
              <input type="text" className="w-full px-2 outline-none" />
            </div>
            <div className="relative rounded border p-3">
              <label
                htmlFor="last-name"
                className="absolute -top-3 bg-white px-1"
              >
                Last name
              </label>
              <input type="text" className="w-full px-2 outline-none" />
            </div>
            <div className="relative rounded border p-3">
              <label
                htmlFor="address"
                className="absolute -top-3 bg-white px-1"
              >
                Address
              </label>
              <input type="text" className="w-full px-2 outline-none" />
            </div>
            <div className="relative rounded border p-3">
              <label
                htmlFor="apartment"
                className="absolute -top-3 bg-white px-1"
              >
                Apartment,... (optional)
              </label>
              <input type="text" className="w-full px-2 outline-none" />
            </div>
            <div className="relative rounded border p-3">
              <label htmlFor="city" className="absolute -top-3 bg-white px-1">
                City
              </label>
              <input type="text" className="w-full px-2 outline-none" />
            </div>
            <div className="relative rounded border p-3">
              <label htmlFor="phone" className="absolute -top-3 bg-white px-1">
                Phone
              </label>
              <input type="text" className="w-full px-2 outline-none" />
            </div>
            <div className="flex flex-col gap-2">
              <button className="button button-dark w-full">
                Continue to payment
              </button>
              <button className="w-full p-2">{`< Return to cart`}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutInformationSection;
