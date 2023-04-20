import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function AccountPage() {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default AccountPage;
