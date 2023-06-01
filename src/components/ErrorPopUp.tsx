import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const ErrorPopUp = () => {
  const { message, status } = useSelector((state: RootState) => state.message);

  if (!status) return null;

  return (
    <div
      className={`fixed right-4 bottom-4 z-[100] max-w-fit ${
        status ? '' : 'hidden'
      }`}
    >
      <div
        className={`transition-all duration-200 ${
          status ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        } transform rounded-lg ${
          status < 300 ? 'bg-green-500' : 'bg-red-500'
        } px-6 py-4 text-white`}
      >
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ErrorPopUp;
