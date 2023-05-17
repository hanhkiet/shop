import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { loadAddresses } from '../app/addressSlice';
import { RootState } from '../app/store';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useAuth } from '../hooks/useAuth';
import { api_url } from '../utils/url';

function AccountPage() {
  const { isAuthenticated } = useAuth();
  const addresses = useSelector((state: RootState) => state.addresses);

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  useEffect(() => {
    if (addresses.length > 0) return;

    axios
      .get(`${api_url}/addresses`)
      .then(res => {
        loadAddresses(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex min-h-screen flex-col justify-between">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default AccountPage;
