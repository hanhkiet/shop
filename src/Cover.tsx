function Cover() {

  return (
    <>
      <video className="relative object-cover w-full h-screen" autoPlay loop muted src="https://cdn.shopify.com/videos/c/o/v/a1e944e243cd4e06b50e5eebd96d0d2f.mp4"></video>
      <div className="absolute w-full h-screen opacity-0 top-0"></div>
      <div className="relative uppercase bottom-24 md:bottom-36 lg:bottom-36 sm:mx-0 md:mx-20 lg:mx-20 text-center md:text-left lg:text-left w-full md:w-max lg:w-max">
        <h1 className="pb-2 md:text-3xl lg:text-3xl text-white font-bold text-xs">Spring '23 Collection</h1>
        <h3 className="text-white md:text-1xl lg:text-1xl pb-3 font-light tracking-widest text-xs">The Art of Adaptation</h3>
        <div className="flex justify-between md:justify-start lg:justify-start mx-5 md:mx-0 lg:mx-0">
          <button className="uppercase bg-white text-gray-500 tracking-widest text-xs px-5 py-3 hover:bg-gray-300"><span>Shop Now</span></button>
          <button className="uppercase bg-neutral-600 text-white tracking-widest text-xs px-5 py-3 hover:bg-black mx-0 md:mx-3 lg:mx-3"><span>Editorial</span></button>
        </div>
      </div>
    </>
  )
}

export default Cover
