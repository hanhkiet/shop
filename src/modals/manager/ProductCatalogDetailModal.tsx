import axios from 'axios';
import { useEffect, useState } from 'react';
import { Catalog, Product } from '../../app/types';
import Modal from '../Modal';

type ProductCatalogDetailModalProps = {
  product: Product;
  onClose: () => void;
};

const ProductCatalogDetailModal = ({
  product,
  onClose,
}: ProductCatalogDetailModalProps) => {
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_MANAGER_STORAGE_API_URL}/catalogs/${
          product.uuid
        }`,
        {
          withCredentials: true,
        },
      )
      .then(response => {
        setCatalogs(response.data);
      });
  }, []);

  return (
    <Modal className="flex items-center justify-center" onClose={onClose}>
      <div className="w-[30rem] space-y-3 p-6 text-center">
        <div className="space-y-2">
          <h2 className="text-2xl font-light lg:text-3xl">Catalog</h2>
          <p className="text-sm lg:text-base">{product.name}</p>
        </div>

        <div className="flex flex-col space-y-2">
          {catalogs.map((catalog, index) => (
            <div
              key={index}
              className="flex flex-col rounded-md border px-4 py-2"
            >
              <div className="text-md flex items-center justify-between">
                <p>{catalog.size}</p>
                <p>{catalog.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default ProductCatalogDetailModal;
