import { Link } from 'react-router-dom';
import SubscribeSection from './SubscribeSection';
import ConnectSection from './ConnectSection';

function Footer() {
  return (
    <>
      <footer className="h-full bg-gray-100 py-10 font-light text-gray-700">
        <div className="container mx-auto overflow-x-auto text-center">
          <div className={`grid grid-cols-1 gap-6 md:grid-cols-2`}>
            <SubscribeSection />
            <ConnectSection />
          </div>
          <div className="mt-10">
            <Link
              onClick={() => window.scrollTo(0, 0)}
              to="/"
              className="font-[ASRV-Standard] font-bold uppercase text-gray-500 duration-300 hover:text-black"
            >
              COPYRIGHT © 2023 · (ASRV)
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
