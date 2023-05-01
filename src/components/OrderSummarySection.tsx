const OrderSummarySection = () => {
  return (
    <div className="flex w-10/12 basis-1/3 flex-col items-center gap-4 bg-neutral-100 p-6">
      <h2 className="text-xl">Order summary</h2>
      <div className="flex flex-col gap-3">
        <div className="flex max-w-md items-center gap-4">
          <div>
            <img
              className="rounded"
              src="//cdn.shopify.com/s/files/1/0297/6293/products/0757Tank_SpaceGrey_small.jpg?v=1681235597"
              alt=""
            />
          </div>
          <div className="basis-full">
            <p className="text-md">
              0757. Silver-Lite™ 2.0 Cutoff Tank - Space Grey
            </p>
            <p className="text-xs">XS</p>
          </div>
          <div>$58</div>
        </div>
        <div className="flex max-w-md items-center gap-4">
          <div>
            <img
              className="rounded"
              src="//cdn.shopify.com/s/files/1/0297/6293/products/0757Tank_SpaceGrey_small.jpg?v=1681235597"
              alt=""
            />
          </div>
          <div className="basis-full">
            <p className="text-md">
              0757. Silver-Lite™ 2.0 Cutoff Tank - Space Grey
            </p>
            <p className="text-xs">XS</p>
          </div>
          <div>$58</div>
        </div>
      </div>
      <div className="flex w-full max-w-md justify-between border-t border-neutral-300 py-3">
        <p className="text-md">Total</p>
        <p>$58</p>
      </div>
    </div>
  );
};

export default OrderSummarySection;
