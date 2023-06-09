import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendLoadProductsRequest } from '../../app/manager/storageSlice';
import { AppDispatch, RootState } from '../../app/store';
import { Color, Product, ProductFilterPayload } from '../../app/types';
import AddProductModal from '../../modals/manager/AddProductModal';
import ProductCard from './ProductCard';

const ProductManagementSection = () => {
  const dispatch: AppDispatch = useDispatch();
  const collections = useSelector(
    (state: RootState) => state.storage.collections,
  );
  const products = useSelector((state: RootState) => state.storage.products);
  const [maxShowItems, setMaxShowItems] = useState(20);

  const recentlyAddedProducts = useSelector(
    (state: RootState) => state.storage.recentlyAddedProducts,
  );

  const recentlyUpdatedProducts = useSelector(
    (state: RootState) => state.storage.recentlyUpdatedProducts,
  );

  const [searchQuery, setSearchQuery] = useState('');
  const queryRef = useRef<HTMLInputElement>(null);

  const [selectedCollectionType, setSelectedCollectionType] =
    useState<string>();
  const [selectedCollectionId, setSelectedCollectionId] = useState<number>();
  const [selectedColor, setSelectedColor] = useState<string>();

  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  useEffect(() => {
    const filterPayload = {
      type: selectedCollectionType ? selectedCollectionType : undefined,
      collectionId: selectedCollectionId ? selectedCollectionId : undefined,
      color: selectedColor,
      query: searchQuery ? searchQuery : null,
    } as ProductFilterPayload;

    dispatch(sendLoadProductsRequest(filterPayload));
  }, [
    selectedCollectionType,
    selectedCollectionId,
    selectedColor,
    searchQuery,
  ]);

  const handleCollectionTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => setSelectedCollectionType(event.target.value);

  const handleCollectionIdChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => setSelectedCollectionId(parseInt(event.target.value));

  const handleColorChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setSelectedColor(event.target.value);

  const handleReset = () => {
    setSelectedCollectionType('');
    setSelectedCollectionId(undefined);
    setSelectedColor(undefined);
    if (queryRef.current) queryRef.current.value = '';
    setSearchQuery('');
  };

  return (
    <div className="space-y-6">
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
            <option value={''} selected={selectedCollectionType === ''}>
              All
            </option>
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
            <option selected={selectedCollectionId === undefined}>All</option>
            {collections.map(collection => (
              <option key={collection.id} value={collection.id}>
                {collection.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3 text-center">
          <label
            htmlFor="color-select"
            className="block text-sm font-medium text-gray-700"
          >
            Color
          </label>
          <select
            id="color-select"
            className="appearance-none rounded border border-gray-300 bg-white px-2 py-1 text-gray-800 outline-none focus:border focus:outline-none"
            value={selectedColor}
            onChange={handleColorChange}
          >
            <option value={''} selected={selectedColor === undefined}>
              ALL
            </option>
            {Object.values(Color).map(color => (
              <option key={color.toString()} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mx-auto flex items-center gap-3 text-center lg:max-w-7xl">
        <button
          onClick={() => setSearchQuery(queryRef.current?.value || '')}
          className="button button-dark"
        >
          Search
        </button>
        <input
          ref={queryRef}
          type="text"
          placeholder="Product name"
          className="input-field py-2"
        />
        {(selectedCollectionType ||
          selectedCollectionId ||
          selectedColor ||
          searchQuery.length !== 0) && (
          <button
            onClick={handleReset}
            className="text-md text-neutral-600 underline hover:text-neutral-400"
          >
            reset
          </button>
        )}
      </div>
      <div className="flex flex-col items-center gap-6 pb-12">
        {recentlyUpdatedProducts.length > 0 && (
          <ProductSection
            title="recently updated"
            products={recentlyUpdatedProducts}
          />
        )}

        {recentlyAddedProducts.length > 0 && (
          <ProductSection
            title="recently added"
            products={recentlyAddedProducts}
          />
        )}

        {products.length > 0 && (
          <ProductSection
            title="all"
            products={products.slice(0, maxShowItems)}
          />
        )}

        {products.length > maxShowItems && (
          <button
            onClick={() =>
              setMaxShowItems(Math.min(maxShowItems + 20, products.length))
            }
            className="button button-dark w-fit"
          >
            Load more
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductManagementSection;

type ProductSectionProps = {
  title: string;
  products: Product[];
};
const ProductSection = ({ title, products }: ProductSectionProps) => (
  <div className="mx-auto lg:max-w-7xl">
    <h2 className="mb-3 text-2xl uppercase text-neutral-600">{title}</h2>
    <div className="grid grid-cols-5 gap-6">
      {products.map(product => (
        <ProductCard key={product.uuid} {...product} />
      ))}
    </div>
  </div>
);
