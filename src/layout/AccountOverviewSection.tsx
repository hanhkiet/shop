import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendLogoutRequest } from '../app/customer/accountSlice';
import { AppDispatch, RootState } from '../app/store';
import OrderOverviewSection from '../components/OrderOverviewSection';
import ChangePasswordModal from '../modals/ChangePasswordModal';
import UpdateProfileModal from '../modals/UpdateProfileModal';

const AccountOverviewSection = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { firstName, lastName } = useSelector(
    (state: RootState) => state.account.user!,
  );

  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);
  const [isUpdateProfileModalOpen, setIsUpdateProfileModalOpen] =
    useState(false);

  const handleLogout = () => dispatch(sendLogoutRequest());

  return (
    <>
      {isChangePasswordModalOpen && (
        <ChangePasswordModal
          onClose={() => setIsChangePasswordModalOpen(false)}
        />
      )}

      {isUpdateProfileModalOpen && (
        <UpdateProfileModal
          onClose={() => setIsUpdateProfileModalOpen(false)}
        />
      )}

      <div className="flex-1 justify-center p-12 md:p-24 lg:flex">
        <div className="w-9/12 space-y-9">
          <div className="space-y-3 text-neutral-700">
            <h2 className="text-3xl font-light">My account</h2>
            <p className="text-md font-light">
              Welcome back, {firstName + ' ' + lastName}!
            </p>
            <div className="flex gap-6">
              <button
                className="text-md font-light text-neutral-400 transition-colors hover:text-neutral-600"
                onClick={handleLogout}
              >
                Log out
              </button>
              <button
                className="text-md font-light text-neutral-400 transition-colors hover:text-neutral-600"
                onClick={() => setIsUpdateProfileModalOpen(true)}
              >
                Update profile
              </button>
              <button
                className="text-md font-light text-neutral-400 transition-colors hover:text-neutral-600"
                onClick={() => setIsChangePasswordModalOpen(true)}
              >
                Change password
              </button>
              <button
                className="text-md font-light text-neutral-400 transition-colors hover:text-neutral-600"
                onClick={() => navigate('addresses')}
              >
                Edit address
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-12 lg:flex-row lg:gap-20">
            <OrderOverviewSection />
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountOverviewSection;
