function Cover() {
  return (
    <>
      <video
        className="relative -z-10 h-screen w-full object-cover"
        autoPlay
        loop
        muted
        src="https://cdn.shopify.com/videos/c/o/v/a1e944e243cd4e06b50e5eebd96d0d2f.mp4"
      ></video>
      <div className="absolute bottom-1/4 w-full text-center md:bottom-12 md:left-24 md:w-fit md:text-left">
        <h1 className="pb-2 text-2xl font-bold uppercase text-white md:text-3xl">
          Spring '23 Collection
        </h1>
        <h3 className="pb-3 text-xs font-light uppercase tracking-widest text-white md:text-sm">
          The Art of Adaptation
        </h3>
        <button className="button button-dark">SHOP NOW</button>
      </div>
    </>
  );
}

export default Cover;
