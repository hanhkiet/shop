import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendLoadProductsRequest } from '../../app/manager/storageSlice';
import { AppDispatch, RootState } from '../../app/store';
import { Product, ProductFilterPayload } from '../../app/types';
import AddProductModal from '../../modals/manager/AddProductModal';

const ProductCard = ({ name, price, images }: Product) => {
  return (
    <div className="cursor-pointer space-y-2 rounded p-3 text-center text-neutral-500 transition-all hover:border">
      <img src={images[0]} alt="" />
      <p className="text-sm">{name}</p>
      <p className="text-xs">${price}</p>
    </div>
  );
};

const ProductManagementSection = () => {
  const dispatch: AppDispatch = useDispatch();
  const collections = useSelector(
    (state: RootState) => state.storage.collections,
  );
  const products = useSelector((state: RootState) => state.storage.products);

  const [selectedCollectionType, setSelectedCollectionType] =
    useState<string>('FEATURED');
  const [selectedCollectionId, setSelectedCollectionId] = useState<number>(0);

  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  useEffect(() => {
    const filterPayload = {
      type: selectedCollectionType,
      collectionId: selectedCollectionId,
    } as ProductFilterPayload;

    dispatch(sendLoadProductsRequest(filterPayload));
  }, [selectedCollectionType, selectedCollectionId]);

  const handleCollectionTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedCollectionType(event.target.value);
  };

  const handleCollectionIdChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedCollectionId(parseInt(event.target.value));
  };

  return (
    <>
      {isAddProductModalOpen && (
        <AddProductModal onClose={() => setIsAddProductModalOpen(false)} />
      )}

      <div className="mx-auto mb-4 flex items-center gap-3 lg:max-w-7xl">
        <button
          onClick={() => setIsAddProductModalOpen(true)}
          className="button button-dark"
        >
          Add product
        </button>
        {selectedCollectionId !== 0 && (
          <button className="button button-red">
            Delete all in collection
          </button>
        )}
      </div>
      <div className="mx-auto mb-4 flex items-center gap-6 lg:max-w-7xl">
        <div className="flex items-center gap-3 text-center">
          <label
            htmlFor="color-select"
            className="block text-sm font-medium text-gray-700"
          >
            Collection type
          </label>
          <select
            id="color-select"
            className="appearance-none rounded border border-gray-300 bg-white px-2 py-1 text-gray-800 outline-none focus:border focus:outline-none"
            value={selectedCollectionType}
            onChange={handleCollectionTypeChange}
          >
            <option value={'FEATURED'}>Featured</option>
            <option value={'TOPS'}>Tops</option>
            <option value={'BOTTOMS'}>Bottoms</option>
          </select>
        </div>

        <div className="flex items-center gap-3 text-center">
          <label
            htmlFor="color-select"
            className="block text-sm font-medium text-gray-700"
          >
            Collection
          </label>
          <select
            id="color-select"
            className="appearance-none rounded border border-gray-300 bg-white px-2 py-1 text-gray-800 outline-none focus:border focus:outline-none"
            value={selectedCollectionId}
            onChange={handleCollectionIdChange}
          >
            <option value={0}>All</option>
            {collections.map(collection => (
              <option key={collection.id} value={collection.id}>
                {collection.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mx-auto lg:max-w-7xl">
        <div className="grid grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.uuid} {...product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductManagementSection;
