import { Outlet } from 'react-router-dom';
import NavbarAdmin from '../components/NavbarAdmin';

function AdminPage() {
  return (
    <>
      <NavbarAdmin />
      <div className="mt-20"><Outlet /></div>
    </>
  );
}

export default AdminPage;
