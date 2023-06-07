import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendDeleteProductCollectionRequest } from '../../app/manager/storageSlice';
import { AppDispatch } from '../../app/store';
import { CollectionItem } from '../../app/types';
import EditCollectionModal from '../../modals/EditCollectionModal';
import YesNoDialogModal from '../../modals/YesNoDialogModal';

const CollectionCard = (collection: CollectionItem) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  const handleDeleteCollection = () =>
    dispatch(sendDeleteProductCollectionRequest(collection.id)).then(() =>
      setIsDeleteModalOpen(false),
    );

  return (
    <>
      {isDeleteModalOpen && (
        <YesNoDialogModal
          title="Delete Collection"
          description='Are you sure you want to delete this "Collection"?'
          onYes={handleDeleteCollection}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}

      {isEditModalOpen && (
        <EditCollectionModal
          onClose={() => setIsEditModalOpen(false)}
          collection={collection}
        />
      )}

      <button
        key={collection.id}
        className="group relative rounded-md border p-6 text-center text-neutral-700"
      >
        <div className="absolute inset-0 flex h-full w-full bg-black opacity-0 transition-opacity group-hover:opacity-5"></div>
        <div className="absolute inset-0 hidden items-center justify-end gap-3 px-3 group-hover:flex">
          <button onClick={() => setIsDeleteModalOpen(true)}>
            <FontAwesomeIcon
              className="rounded border border-red-600 p-3 hover:bg-red-300"
              icon={faTrash}
              style={{ color: '#d10000' }}
            />
          </button>
          <button onClick={() => setIsEditModalOpen(true)}>
            <FontAwesomeIcon
              className="rounded border border-neutral-500 p-3 hover:bg-neutral-300"
              icon={faPenToSquare}
            />
          </button>
        </div>
        <p className="group-hover:text-neutral-300">{collection.name}</p>
      </button>
    </>
  );
};

export default CollectionCard;
