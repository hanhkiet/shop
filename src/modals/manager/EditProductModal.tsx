import { Product } from '../../app/types';

type EditProductModalProps = {
  product: Product;
};

const EditProductModal = ({ product }: EditProductModalProps) => {
  return <div>{product.name}</div>;
};

export default EditProductModal;
