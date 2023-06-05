import { RemoveScrollBar } from 'react-remove-scroll-bar';

type Props = {
  isShown: boolean;
  onClose: () => void;
};

function QuantityWarningContent(props: Props) {
  return <>
    {props.isShown && <RemoveScrollBar />}
    <div className="mt-1 border-b-[2px] border-neutral-300">
      <div className="mx-5 flex h-16 justify-between">
        <div className="text-1xl grid content-center font-bold capitalize">
          Message
        </div>
        <img
          onClick={props.onClose}
          className="my-auto h-3 hover:cursor-pointer"
          src="https://cdn-icons-png.flaticon.com/512/2961/2961937.png"
          alt=""
        />
      </div>
    </div>

    <div className="grid max-h-96 w-full overflow-auto px-6 py-3 text-center">
      <p>
        You have reached the maximum quantity of this product!
      </p>
    </div>
  </>;
}

export default QuantityWarningContent;
