import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { sendLogoutRequest } from '../app/authSlice';
import { AppDispatch, RootState } from '../app/store';
import OrderOverviewSection from '../components/OrderOverviewSection';

const AccountOverviewSection = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  if (!isAuthenticated) return <Navigate to="/auth/login" replace={true} />;

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { firstName, lastName } = useSelector(
    (state: RootState) => state.auth.user!,
  );

  const primaryAddress = useSelector((state: RootState) =>
    state.addresses.find(address => address.isPrimary),
  );

  const handleLogout = () => dispatch(sendLogoutRequest());

  return (
    <div className="flex-1 justify-center p-12 md:p-24 lg:flex">
      <div className="w-9/12 space-y-9">
        <div className="space-y-3 text-neutral-700">
          <h2 className="text-3xl font-light">My account</h2>
          <p className="text-md font-light">
            Welcome back, {firstName + ' ' + lastName}!
          </p>
          <button
            className="text-md font-light text-neutral-400 transition-colors hover:text-neutral-600"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
        <div className="flex flex-col justify-between gap-12 lg:flex-row lg:gap-20">
          <OrderOverviewSection />
          <div className="max-w-xs lg:basis-4/12">
            <p className="border-b border-b-neutral-200 pb-3 text-sm font-light capitalize text-neutral-500">
              primary address
            </p>
            <div className="py-6">
              {primaryAddress ? (
                <div className="space-y-2 text-neutral-600">
                  <p>{primaryAddress.recipientName}</p>
                  <p>{primaryAddress.recipientPhone}</p>
                  <p>
                    {primaryAddress.street}, {primaryAddress.district}
                  </p>
                  <p>{primaryAddress.city}</p>
                </div>
              ) : (
                <p className="text-sm italic text-neutral-400">
                  There's no primary address
                </p>
              )}
            </div>
            <button
              className="button button-dark"
              onClick={() => navigate('addresses')}
            >
              edit address
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountOverviewSection;
