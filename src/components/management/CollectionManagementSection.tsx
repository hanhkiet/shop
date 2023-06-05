import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  sendDeleteProductCollectionRequest,
  sendLoadProductsCollectionRequest,
} from '../../app/manager/storageSlice';
import { AppDispatch, RootState } from '../../app/store';
import { CollectionItem, CollectionType } from '../../app/types';
import EditCollectionModal from '../../modals/EditCollectionModal';
import YesNoDialogModal from '../../modals/YesNoDialogModal';
import AddCollectionModal from '../../modals/manager/AddCollectionModal';

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

type DividedByTypeSectionProps = {
  type: CollectionType;
};

const DividedByTypeSection = ({ type }: DividedByTypeSectionProps) => {
  const filterText = useContext(FilteringTextContext);
  const collections = useSelector((state: RootState) =>
    state.storage.collections.filter(
      collection =>
        collection.type === type &&
        collection.name.toLowerCase().includes(filterText.toLowerCase()),
    ),
  );

  const [isAddCollectionModalOpen, setIsAddCollectionModalOpen] =
    useState(false);

  return (
    <>
      {isAddCollectionModalOpen && (
        <AddCollectionModal
          type={type}
          onClose={() => setIsAddCollectionModalOpen(false)}
        />
      )}

      <div className="space-y-3">
        <h3 className="text-2xl text-neutral-600">{type}</h3>
        <div className="grid basis-9/12 grid-cols-2 gap-4 lg:grid-cols-3">
          {collections.map(collection => (
            <CollectionCard key={collection.id} {...collection} />
          ))}
          {!filterText && (
            <button
              onClick={() => setIsAddCollectionModalOpen(true)}
              className="rounded border p-4 text-center text-neutral-700 hover:bg-neutral-100"
            >
              + Add
            </button>
          )}
        </div>
      </div>
    </>
  );
};

const FilteringTextContext = createContext('');

const CollectionManagementSection = () => {
  const dispatch: AppDispatch = useDispatch();
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    dispatch(sendLoadProductsCollectionRequest());
  }, []);

  return (
    <div className="mx-auto max-w-screen-lg items-center space-y-6 p-3">
      <div className="flex gap-3 pb-6">
        <input
          onChange={e => setFilterText(e.target.value.trim())}
          type="text"
          placeholder='Search "Collection"'
          className="rounded border px-4 py-2 outline-none"
        />
      </div>

      <FilteringTextContext.Provider value={filterText}>
        <DividedByTypeSection type={'FEATURED'} />
        <DividedByTypeSection type={'TOPS'} />
        <DividedByTypeSection type={'BOTTOMS'} />
      </FilteringTextContext.Provider>
    </div>
  );
};

export default CollectionManagementSection;
