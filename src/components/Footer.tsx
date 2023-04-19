import { Link } from 'react-router-dom';
import DownloadApp from './DownloadApp';
import ListAllMenu from './ListAllMenu';
import MenuList from './MenuList';
import SubscribeSection from './SubscribeSection';
import ConnectSection from './ConnectSection';
import MenuListItem from './MenuListItem';

function Footer() {
  const menuItems1 = ['MANUFACTURING', 'DISCOUNTS', 'PRIVACY POLICY', 'TERMS OF SERVICE', 'ACCESSIBILITY STATEMENT']
  const menuItems2 = ['HELP CENTER', 'SHIPPING', 'RETURNS', 'CONTACT', 'WHOLESALE REQUEST']
  return (
    <>
      <footer className="py-10 h-full bg-gray-100">
        <ListAllMenu numOfCols={4}>
          <MenuList menuItemTitle='INFO'>
            <MenuListItem itemData={menuItems1} />
          </MenuList>
          <MenuList menuItemTitle='HELP'>
            <MenuListItem itemData={menuItems2} />
          </MenuList>
          <MenuList menuItemTitle='SUBSCRIBE'>
            <SubscribeSection />
          </MenuList>
          <MenuList menuItemTitle='CONNECT'>
            <ConnectSection />
          </MenuList>
        </ListAllMenu>
      </footer>
    </>
  );
}

export default Footer;
