import { useDispatch, useSelector } from 'react-redux';
import { setNote } from '../app/orderSlice';
import { RootState } from '../app/store';
import CheckoutButton from './CheckoutButton';

type Props = {
  onClickCloseNote: () => void;
};

function OrderNote(props: Props) {
  const notes = useSelector((state: RootState) => state.order.note);
  const dispatch = useDispatch();
  function handleNoteChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const newNote = event.target.value;
    dispatch(setNote(newNote));
  }
  return (
    <>
      <div className="absolute bottom-0 right-0 z-50 w-full">
        <div className="h-[calc(100vh-250px)] bg-white opacity-50"></div>
        <div className="h-[250px] border-t-[2px] border-neutral-500 bg-white">
          <div className="m-5">
            <div className="mb-5 flex justify-between">
              <div className="text-1xl grid content-center font-light">
                Edit Order Note
              </div>
              <img
                onClick={props.onClickCloseNote}
                className="my-auto h-3 hover:cursor-pointer"
                src="https://cdn-icons-png.flaticon.com/512/2961/2961937.png"
                alt=""
              />
            </div>
            <textarea
              placeholder="Write your order note..."
              value={notes}
              onChange={handleNoteChange}
              className="h-24 w-full resize-none border-[2px] border-neutral-500 p-3 focus:outline-none"
            ></textarea>
            <CheckoutButton />
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderNote;
