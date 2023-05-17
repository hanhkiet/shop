export default function SubscribeSection() {
  return (
    <div className="mx-10 grid justify-items-center">
      <h2 className="mb-5 font-bold uppercase">SUBSCRIBE</h2>
      <p>For early access to the latest releases.</p>
      <div className="sm:flex sm:justify-center">
        <form className="w-full">
          <div className="flex items-center border-b border-neutral-500 py-2">
            <input
              className="mr-3 w-full appearance-none border-none bg-transparent py-1 px-2 leading-tight text-gray-700 focus:outline-none"
              type="text"
              placeholder="Email address"
              aria-label="Full name"
            />
            <button
              className="flex-shrink-0 rounded border-4 border-neutral-700 bg-neutral-700 py-1 px-2 text-sm text-white hover:border-black hover:bg-black"
              type="button"
            >
              SUBSCRIBE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
