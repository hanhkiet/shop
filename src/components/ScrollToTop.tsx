function ScrollToTop() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      className="fixed bottom-5 right-5 z-30 h-12 w-12 rounded-full bg-black text-white duration-300 hover:bg-gray-400"
      onClick={scrollToTop}
      title="Click to return to top page"
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/608/608336.png"
        className="mx-auto flex h-5 grayscale invert"
        alt=""
      />
    </button>
  );
}

export default ScrollToTop;
