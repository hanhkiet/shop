import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { Product } from '../../app/types';
import YesNoDialogModal from '../../modals/YesNoDialogModal';
import ImportModal from '../../modals/manager/ImportModal';
import ProductCatalogDetailModal from '../../modals/manager/ProductCatalogDetailModal';

const ProductCard = (product: Product) => {
  const dispatch: AppDispatch = useDispatch();
  const { images, name, price } = product;

  const [isCatalogModalShow, setIsCatalogModalShow] = useState(false);
  const [isImportModalShow, setIsImportModalShow] = useState(false);
  const [isDeleteModalShow, setIsDeleteModalShow] = useState(false);

  const handleDeleteProduct = () => {};

  return (
    <>
      {isCatalogModalShow && (
        <ProductCatalogDetailModal
          product={product}
          onClose={() => setIsCatalogModalShow(false)}
        />
      )}

      {isImportModalShow && (
        <ImportModal
          product={product}
          onClose={() => setIsImportModalShow(false)}
        />
      )}

      {isDeleteModalShow && (
        <YesNoDialogModal
          title="Delete Product"
          description="Are you sure you want to delete this product?"
          onYes={handleDeleteProduct}
          onClose={() => setIsDeleteModalShow(false)}
        />
      )}

      <div className="group relative">
        <div className="absolute inset-0 z-10 hidden flex-col items-center justify-center gap-3 group-hover:flex">
          <button
            onClick={() => setIsCatalogModalShow(true)}
            className="button"
          >
            view catalog
          </button>
          <button
            onClick={() => setIsImportModalShow(true)}
            className="button button-dark"
          >
            import
          </button>
          <button className="button button-red">delete</button>
        </div>
        <div className="absolute inset-0 flex h-full w-full bg-black opacity-0 transition-opacity group-hover:opacity-5"></div>
        <div className="cursor-pointer space-y-2 rounded text-center text-neutral-500 transition-all hover:border group-hover:opacity-20">
          <img src={images[0]} alt="" />
          <p className="text-sm">{name}</p>
          <p className="text-xs">${price}</p>
        </div>
      </div>
    </>
  );
};
export default ProductCard;
