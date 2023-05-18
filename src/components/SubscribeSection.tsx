import { useState } from 'react';

export default function SubscribeSection() {
  const subscribeMessage = 'You have been subscribed to our newsletter.';
  const [showSubscribeMessage, setShowSubscribeMessage] = useState(false);

  return (
    <div className="mx-10 grid justify-items-center">
      <h2 className="mb-3 font-bold uppercase">SUBSCRIBE</h2>
      <p className="mb-3">For early access to the latest releases.</p>
      {!showSubscribeMessage && (
        <div className="sm:flex sm:justify-center">
          <form className="w-full">
            <div className="flex items-center border-b border-neutral-500 py-2">
              <input
                className="mr-3 w-full appearance-none border-none bg-transparent py-1 px-2 leading-tight text-gray-700 focus:outline-none"
                type="email"
                placeholder="Email address"
                aria-label="Email address"
              />
              <button
                onClick={() => setShowSubscribeMessage(true)}
                className="flex-shrink-0 rounded border-4 border-neutral-700 bg-neutral-700 py-1 px-2 text-sm text-white hover:border-black hover:bg-black"
                type="button"
              >
                SUBSCRIBE
              </button>
            </div>
          </form>
        </div>
      )}
      {showSubscribeMessage && (
        <div className="w-max bg-green-200 p-4 text-green-700">
          <div className="flex justify-between">
            <div className="grid content-center text-sm font-light">
              {subscribeMessage}
            </div>
            <img
              onClick={() => setShowSubscribeMessage(false)}
              className="my-auto ml-3 h-3 hover:cursor-pointer"
              src="https://cdn-icons-png.flaticon.com/512/2961/2961937.png"
              alt=""
            />
          </div>
        </div>
      )}
    </div>
  );
}
