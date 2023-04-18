import LoginSection from '../components/LoginSection';

function AccountPage() {
  return (
    <div className="relative lg:flex">
      <img
        className="-z-10 h-screen w-full object-cover lg:w-8/12"
        src="https://i.shgcdn.com/39e62f8f-e1a5-45e7-a573-91b95a8e0425/-/format/auto/-/preview/3000x3000/-/quality/lighter/"
        alt=""
      />
      <LoginSection />
    </div>
  );
}

export default AccountPage;
