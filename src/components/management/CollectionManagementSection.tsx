import { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendLoadProductsCollectionRequest } from '../../app/manager/storageSlice';
import { AppDispatch, RootState } from '../../app/store';
import { CollectionType } from '../../app/types';
import AddCollectionModal from '../../modals/manager/AddCollectionModal';
import CollectionCard from './CollectionCard';

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
