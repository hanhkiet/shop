import { Link } from 'react-router-dom';

const AddressItem = () => {
  return (
    <div className="space-y-6">
      <p className="border-b border-b-neutral-200 pb-3 text-sm font-light capitalize text-neutral-500">
        primary address
      </p>
      <div className="space-y-3 font-light">
        <p>[First name] [Last name]</p>
        <p>164 Nguyen Van Thuong, Binh Thanh</p>
        <p>Ho Chi Minh City</p>
        <div className="flex gap-3">
          <button className="capitalize underline underline-offset-4 transition-all hover:text-neutral-500 hover:no-underline">
            edit
          </button>
          <button className="capitalize underline underline-offset-4 transition-all hover:text-neutral-500 hover:no-underline">
            delete
          </button>
        </div>
      </div>
    </div>
  );
};

const AccountAdressSection = () => {
  return (
    <div className="flex-1 justify-center p-12 md:p-24 lg:flex">
      <div className="w-9/12 space-y-9 text-neutral-700">
        <div className="space-y-6 ">
          <Link
            to="/account"
            className="text-sm font-light text-neutral-400 transition-colors before:mr-3 before:content-['<'] hover:text-neutral-600"
          >
            Back to account
          </Link>
          <h2 className="text-3xl font-light">My addresses</h2>
          <button className="button button-dark">add new address</button>
        </div>
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(10)].map((_, index) => (
            <AddressItem key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountAdressSection;
