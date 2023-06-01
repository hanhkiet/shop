import { useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { RootState } from '../app/store';
import { Address } from '../app/types';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function AccountPage() {
  const { isAuthenticated } = useSelector((state: RootState) => state.account);
  const navigate = useNavigate();

  if (!isAuthenticated) return <Navigate to="/auth/login" replace={true} />;
  const addresses = [] as Address[];

  return (
    <div className="flex min-h-screen flex-col justify-between">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default AccountPage;
