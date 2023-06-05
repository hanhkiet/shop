import { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { sendUpdateProductCollectionRequest } from '../app/manager/storageSlice';
import { popUpMessage } from '../app/messageSlice';
import { AppDispatch } from '../app/store';
import { CollectionItem } from '../app/types';
import { useRefWithValidator } from '../hooks/useRefWithValidator';
import { collectionNameRegex } from '../utils/regex';
import Modal from './Modal';

type Props = {
  onClose: () => void;
  collection: CollectionItem;
};

const EditCollectionModal = ({ onClose, collection }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const {
    ref: collectionNameRef,
    error: collectionNameError,
    validate: validateCollectionName,
  } = useRefWithValidator(
    collectionNameRegex,
    'Please enter a valid collection name (e.g. Spring 2021)',
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidCollectionName = validateCollectionName();

    if (!isValidCollectionName) return;

    const collectionName = collectionNameRef.current?.value;

    if (collectionName === collection.name) {
      dispatch(
        popUpMessage({
          message: 'Collection name is the same as before',
          status: 999,
        }),
      );
    } else
      dispatch(
        sendUpdateProductCollectionRequest({
          ...collection,
          name: collectionName ?? '',
        }),
      ).then(() => onClose());
  };

  return (
    <Modal onClose={onClose} className="flex items-center justify-center">
      <div className="w-96 space-y-3 p-6 text-center">
        <h2 className="text-2xl font-light lg:text-3xl">Edit collection</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="w-full space-y-1 text-left">
            <input
              className="input-field w-full text-neutral-300 lg:text-base"
              disabled
              value={collection.type}
              type="text"
            />
          </div>
          <div className="w-full space-y-1 text-left">
            <input
              ref={collectionNameRef}
              defaultValue={collection.name}
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
            <button className="button button-dark">update</button>
            <button className="button" onClick={onClose}>
              cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditCollectionModal;
