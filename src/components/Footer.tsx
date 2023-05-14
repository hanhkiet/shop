import ListAllMenu from './ListAllMenu';
import SubscribeSection from './SubscribeSection';
import ConnectSection from './ConnectSection';

function Footer() {
  return (
    <>
      <footer className="h-full bg-gray-100 py-10 font-light text-gray-700">
        <ListAllMenu numOfCols={2}>
          <SubscribeSection />
          <ConnectSection />
        </ListAllMenu>
      </footer>
    </>
  );
}

export default Footer;
