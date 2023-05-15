import SubscribeSection from './SubscribeSection';
import ConnectSection from './ConnectSection';

function Footer() {
  return (
    <>
      <footer className="h-full bg-gray-100 py-10 font-light text-gray-700">
        <div className="container mx-auto overflow-x-auto">
          <div className={`grid grid-cols-1 gap-6 md:grid-cols-2`}>
            <SubscribeSection />
            <ConnectSection />
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
