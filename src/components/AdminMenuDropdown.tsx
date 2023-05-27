import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleVisibility } from '../app/cartSlice';

type Props = {
  dataItem: any;
};

function AdminMenuDropDown(props: Props) {
  const dispatch = useDispatch();

  return (
    <div className="z-50 m-5">
      <ul>
        {props.dataItem.map((item: any, index: any) => (
          <li key={index}>
            <Link
              onClick={() => dispatch(toggleVisibility(false))}
              className="text-1xl grid h-16 cursor-pointer content-center border-b-2 border-gray-300 font-light uppercase hover:text-gray-500"
              to={item.url}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminMenuDropDown;
