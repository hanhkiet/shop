import { Link, useLocation } from 'react-router-dom';
import SubscribeSection from './SubscribeSection';
import ConnectSection from './ConnectSection';

function Footer() {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const handleClickFooter = () => {
    if (location.pathname == '/') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo(0, 0);
    }
  };
  return (
    <>
      <footer className="h-full bg-gray-100 py-10 font-light text-gray-700">
        <div className="container mx-auto overflow-x-auto text-center">
          <div className={`grid grid-cols-1 gap-6 md:grid-cols-2`}>
            <SubscribeSection />
            <ConnectSection />
          </div>
          <div className="mt-10 flex justify-center gap-3">
            <a
              target="_blank"
              href="https://www.trustpilot.com/review/asrv.com"
            >
              <span className="font-bold">Excellent</span>
            </a>
            <a
              target="_blank"
              href="https://www.trustpilot.com/review/asrv.com"
            >
              <img
                alt=""
                className="h-6"
                src="https://media.discordapp.net/attachments/1026660684739653674/1110605447976718478/TruspilotStars.png"
              />
            </a>
            <a
              target="_blank"
              href="https://www.trustpilot.com/review/asrv.com"
            >
              <img
                alt=""
                className="h-6"
                src="https://media.discordapp.net/attachments/1026660684739653674/1110605525760102581/TruspilotLogo.png"
              />
            </a>
          </div>
          <div className="mt-10">
            <Link
              onClick={handleClickFooter}
              to="/"
              className="font-[ASRV-Standard] font-bold uppercase text-gray-500 duration-300 hover:text-black"
            >
              COPYRIGHT © {currentYear} · (ASRV)
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
