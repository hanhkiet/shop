import { useState, useEffect } from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function ScrollToTop() {
  const [scrollPercentageChange, setScrollPercentageChange] = useState(0);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  useEffect(() => {
    const h = document.documentElement,
      b = document.body,
      st = 'scrollTop',
      sh = 'scrollHeight';

    const handleScroll = () => {
      setScrollPercentageChange(
        ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100,
      );
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button
      className="fixed bottom-5 right-5 z-30 h-12 w-12 rounded-full bg-gray-500 text-white hover:bg-gray-400"
      onClick={scrollToTop}
      title="Click to return to top page"
    >
      <CircularProgressbarWithChildren value={scrollPercentageChange}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/608/608336.png"
          className="mx-auto flex h-5 grayscale invert"
          alt=""
        />
      </CircularProgressbarWithChildren>
    </button>
  );
}
