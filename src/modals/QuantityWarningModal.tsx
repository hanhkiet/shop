import { RemoveScrollBar } from 'react-remove-scroll-bar';
import Modal from './Modal';
import QuantityWarningContent from '../components/QuantityWarningContent';

type Props = {
    isShown: boolean,
    onClose: () => void;
}

function QuantityWarningModal(props: Props) {
    return <Modal
    className={`flex items-center justify-center overflow-y-auto duration-300 ${
      props.isShown ? `visible opacity-100` : `collapse opacity-0`
    }`}
    onClose={props.onClose}
  >
    {props.isShown && <RemoveScrollBar />}
    <QuantityWarningContent isShown={props.isShown} onClose={props.onClose} />
  </Modal>;
}

export default QuantityWarningModal;
