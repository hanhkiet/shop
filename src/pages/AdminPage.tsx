import { Outlet } from 'react-router-dom';
import NavbarAdmin from '../components/NavbarAdmin';

function AdminPage() {
  return (
    <>
      <NavbarAdmin />
      <Outlet />
    </>
  );
}

export default AdminPage;
