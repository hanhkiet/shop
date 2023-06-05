import { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { sendAddProductCollectionRequest } from '../app/manager/storageSlice';
import { AppDispatch } from '../app/store';
import { CollectionItem, CollectionType } from '../app/types';
import { useRefWithValidator } from '../hooks/useRefWithValidator';
import { nameRegex } from '../utils/regex';
import Modal from './Modal';

type Props = {
  onClose: () => void;
  type: CollectionType;
};

const AddCollectionModal = ({ type, onClose }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const {
    ref: collectionNameRef,
    error: collectionNameError,
    validate: validateCollectionName,
  } = useRefWithValidator(
    nameRegex,
    'Please enter a valid collection name (e.g. Spring 2021)',
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidCollectionName = validateCollectionName();

    if (isValidCollectionName) {
      const collection = {
        name: collectionNameRef.current?.value,
        type,
      } as CollectionItem;

      dispatch(sendAddProductCollectionRequest(collection)).then(() =>
        onClose(),
      );
    }
  };

  return (
    <Modal onClose={onClose} className="flex items-center justify-center">
      <div className="w-96 space-y-3 p-6 text-center">
        <h2 className="text-2xl font-light lg:text-3xl">Add new collection</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="w-full space-y-1 text-left">
            <input
              className="input-field w-full text-neutral-300 lg:text-base"
              disabled
              value={type}
              type="text"
            />
          </div>
          <div className="w-full space-y-1 text-left">
            <input
              ref={collectionNameRef}
              className={`input-field w-full lg:text-base ${
                collectionNameError && 'border-red-500'
              }`}
              type="text"
              placeholder="Collection name"
            />
            <p className="mx-1 text-xs text-red-500">
              {collectionNameError ?? <span></span>}
            </p>
          </div>

          <div className="flex w-full justify-end gap-3">
            <button className="button button-dark">Add</button>
            <button className="button" onClick={onClose}>
              cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddCollectionModal;
