import Modal from './Modal';

type Props = {
  title: string;
  description: string;
  onYes: () => void;
  onClose: () => void;
};

const YesNoDialogModal = ({ title, description, onYes, onClose }: Props) => {
  return (
    <Modal onClose={onClose} className="flex items-center justify-center">
      <div className="space-y-9 p-6">
        <div className="space-y-2">
          <h2 className="text-3xl">{title}</h2>
          <p>{description}</p>
        </div>

        <div className="flex w-full justify-end gap-3">
          <button className="button button-dark" onClick={onYes}>
            yes
          </button>
          <button className="button" onClick={onClose}>
            cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default YesNoDialogModal;
