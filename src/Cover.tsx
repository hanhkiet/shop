function Cover() {
  return (
    <>
      <video
        className="relative h-screen w-full object-cover"
        autoPlay
        loop
        muted
        src="https://cdn.shopify.com/videos/c/o/v/a1e944e243cd4e06b50e5eebd96d0d2f.mp4"
      ></video>
      <div className="absolute top-0 h-screen w-full opacity-0"></div>
      <div className="relative bottom-24 w-full text-center uppercase sm:mx-0 md:bottom-36 md:mx-20 md:w-max md:text-left lg:bottom-36 lg:mx-20 lg:w-max lg:text-left">
        <h1 className="pb-2 text-xs font-bold text-white md:text-3xl lg:text-3xl">
          Spring '23 Collection
        </h1>
        <h3 className="md:text-1xl lg:text-1xl pb-3 text-xs font-light tracking-widest text-white">
          The Art of Adaptation
        </h3>
        <div className="mx-5 flex justify-between md:mx-0 md:justify-start lg:mx-0 lg:justify-start">
          <button className="bg-white px-5 py-3 text-xs uppercase tracking-widest text-gray-500 hover:bg-gray-300">
            <span>Shop Now</span>
          </button>
          <button className="mx-0 bg-neutral-600 px-5 py-3 text-xs uppercase tracking-widest text-white hover:bg-black md:mx-3 lg:mx-3">
            <span>Editorial</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Cover;
