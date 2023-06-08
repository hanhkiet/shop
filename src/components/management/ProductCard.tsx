import { useState } from 'react';
import { Product } from '../../app/types';
import ImportModal from '../../modals/manager/ImportModal';
import ProductCatalogDetailModal from '../../modals/manager/ProductCatalogDetailModal';

const ProductCard = (product: Product) => {
  const { images, name, price } = product;

  const [isCatalogModalShow, setIsCatalogModalShow] = useState(false);
  const [isImportModalShow, setIsImportModalShow] = useState(false);

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
