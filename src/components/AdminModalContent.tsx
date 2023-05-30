import { useDispatch } from 'react-redux';
import { toggleVisibility } from '../app/cartSlice';
import AdminMenuDropdown from './AdminMenuDropdown';

type Props = {
  name: string;
  dataItem: any;
  onClose: () => void;
};

function AdminModalContent(props: Props) {
  const dispatch = useDispatch();
  const handleCartAppear = () => {
    dispatch(toggleVisibility(false));
    props.onClose();
  };
  return (
    <>
      <div className="mt-1 border-b-[2px] border-neutral-300">
        <div className="mx-5 flex h-16 justify-between">
          <div className="text-1xl grid content-center font-light capitalize">
            {props.name}
          </div>
          <img
            onClick={handleCartAppear}
            className="my-auto h-3 hover:cursor-pointer"
            src="https://cdn-icons-png.flaticon.com/512/2961/2961937.png"
            alt=""
          />
        </div>
      </div>
      <div>
        <AdminMenuDropdown dataItem={props.dataItem} />
      </div>
    </>
  );
}

export default AdminModalContent;
