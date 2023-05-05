const PaymentSection = () => {
  return (
    <div className="flex basis-2/3 flex-col items-center gap-3 px-6 py-3">
      <nav className="flex gap-2 text-neutral-500">
        <a href="/cart">Cart</a>
        <span>/</span>
        <a href="/checkout/information">Information</a>
        <span>/</span>
        <span className="text-neutral-800">Payment</span>
      </nav>
      <div className="flex w-full max-w-md flex-col gap-6 lg:max-w-xl">
        <fieldset className="rounded border p-3">
          <legend>Shipping method</legend>
          <div className="flex gap-3">
            <input type="radio" id="cod" value={'cod'} />
            <label htmlFor="">COD</label>
          </div>

          <div className="flex gap-3">
            <input type="radio" id="cod3" value={'cod2'} />
            <label htmlFor="">COD</label>
          </div>

          <div className="flex gap-3">
            <input type="radio" id="cod3" value={'cod3'} />
            <label htmlFor="">COD</label>
          </div>
        </fieldset>
        <div className="flex flex-col gap-2">
          <button className="button button-dark w-full">Complete order</button>
          <button className="w-full p-2">{`< Return to information`}</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;
