import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function NoPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Navbar />
      <div className="object-fit grid h-screen content-center">
        <div className="relative grid h-[300px] w-full content-center">
          <img
            className="mx-auto brightness-0"
            src="https://cdn.shopify.com/s/files/1/0297/6293/files/ASRV-Wings-47x40.png?v=1628017603"
          />
          <div className="center mt-10 text-center">
            <a className="mx-100 bg-slate-700 p-5 text-center text-5xl font-bold text-white">
              DSG - 0404
            </a>
          </div>
          <img
            src="https://cdn.shopify.com/s/files/1/0297/6293/files/only-those-who-risk-are-occasionally-on-the-wrong-page.png"
            className="mx-auto mt-10"
          />
        </div>
        <div className="absolute top-0 h-[300px] w-full opacity-0"></div>
        <div className="p-10 text-center">
          <Link
            to="/"
            className="bg-black px-5 py-3 font-bold text-white hover:opacity-80"
          >
            BACK TO HOMEPAGE
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default NoPage;
