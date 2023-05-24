import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../app/store';

function AdminDashboard() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  if (!isAuthenticated)
    return <Navigate to="/auth/admin/login" replace={true} />;
  return (
    <div>
      <p>This is admin dashboard</p>
    </div>
  );
}

export default AdminDashboard;
