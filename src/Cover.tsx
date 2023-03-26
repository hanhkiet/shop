function Cover() {

  return (
    <>
     <div className="relative">
        <video className= "" autoPlay loop muted src="https://cdn.shopify.com/videos/c/o/v/a1e944e243cd4e06b50e5eebd96d0d2f.mp4"></video>
        <div className="absolute  uppercase  bottom-10 mx-20">
          <h1 className="pb-2 text-3xl text-white font-bold">Spring '23 Collection</h1>
          <h3 className="text-white pb-3 font-light tracking-widest">The Art of Adaptation</h3>
          <button className="uppercase bg-white text-gray-500 tracking-widest text-sm px-9 py-3 hover:bg-gray-300 ">Shop Now</button>
          <button className="uppercase bg-neutral-600 text-white tracking-widest text-sm px-9 py-3 hover:bg-black mx-3">Editorial</button>
        </div>
      </div>
    </>
  )
}

export default Cover
