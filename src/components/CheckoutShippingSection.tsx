import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setShippingIndex, setShippingPrice } from '../app/orderSlice';
import { RootState } from '../app/store';

function CheckoutShippingSection() {
  const shippingMethod = [
    {
      name: 'FedEx International Economy®',
      deliveryTimeFrame: '6 to 10 business days',
      price: 52.37,
    },
    {
      name: 'FedEx International Priority®',
      deliveryTimeFrame: '3 to 5 business days',
      price: 58.61,
    },
  ];

  const emailOrder = useSelector((state: RootState) => state.order.emailOrder);
  const streetOrder = useSelector(
    (state: RootState) => state.order.streetOrder,
  );
  const addressOrder = useSelector(
    (state: RootState) => state.order.addressOrder,
  );
  const districtOrder = useSelector(
    (state: RootState) => state.order.districtOrder,
  );
  const cityOrder = useSelector((state: RootState) => state.order.cityOrder);
  const shippingPrice = useSelector(
    (state: RootState) => state.order.shippingPrice,
  );
  const shippingIndex = useSelector(
    (state: RootState) => state.order.shippingIndex,
  );
  const dispatch = useDispatch();
  const handleRadioClick = (index: number) => {
    dispatch(setShippingIndex(index));
    dispatch(setShippingPrice(shippingMethod[index].price));
  };
  useEffect(() => {
    dispatch(setShippingPrice(shippingMethod[shippingIndex].price));
  }, []);
  return (
    <div className="w-full">
      <div className="relative grid gap-3 rounded border p-3">
        <div className="flex flex-row">
          <div className="basis-2/12 text-gray-500">Contact</div>
          <div className="basis-9/12">{emailOrder}</div>
          <div className="grid basis-1/12 items-center text-sm">
            <Link to="/checkout/information">Change</Link>
          </div>
        </div>
        <div className="h-px w-full bg-gray-300"></div>
        <div className="flex flex-row">
          <div className="basis-2/12 text-gray-500">Ship to</div>
          <div className="basis-9/12">
            {streetOrder + ', ' + districtOrder + ', ' + cityOrder}
          </div>
          <div className="grid basis-1/12 items-center text-sm">
            <Link to="/checkout/information">Change</Link>
          </div>
        </div>
      </div>
      <h2 className="py-3 text-xl">Shipping method</h2>
      <div className="relative grid rounded border">
        {shippingMethod.map((item: any, index) => (
          <>
            <label
              htmlFor={item.name}
              className="flex cursor-pointer flex-row justify-between p-3"
              onClick={() => handleRadioClick(index)}
            >
              <div className="flex gap-3">
                <div className="mt-1 grid items-start">
                  <input
                    className="cursor-pointer"
                    type="radio"
                    id="economy"
                    value={item.price}
                    name="shipping_method"
                    checked={index === shippingIndex}
                  />
                </div>
                <div className="grid">
                  <p>{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.deliveryTimeFrame}
                  </p>
                </div>
              </div>
              <p className="text-right font-[Mulish] font-bold">
                ${item.price}
              </p>
            </label>
            {index < shippingMethod.length - 1 && (
              <div className="h-px w-full bg-gray-300"></div>
            )}
          </>
        ))}
      </div>
    </div>
  );
}

export default CheckoutShippingSection;
