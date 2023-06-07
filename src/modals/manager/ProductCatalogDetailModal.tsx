import { Product } from '../../app/types';
import Modal from '../Modal';

type ProductCatalogDetailModalProps = {
  product: Product;
  onClose: () => void;
};

const ProductCatalogDetailModal = ({
  product,
  onClose,
}: ProductCatalogDetailModalProps) => {
  return (
    <Modal className="flex items-center justify-center" onClose={onClose}>
      <div className="w-[30rem] space-y-3 p-6 text-center">
        <div className="space-y-2">
          <h2 className="text-2xl font-light lg:text-3xl">Catalog</h2>
          <p className="text-sm lg:text-base">{product.name}</p>
        </div>
      </div>
    </Modal>
  );
};

export default ProductCatalogDetailModal;
