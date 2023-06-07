import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { Catalog, Product, Size } from '../../app/types';
import Modal from '../Modal';

type Props = {
  product: Product;
  onClose: () => void;
};

const ImportModal = ({ product, onClose }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const remainingSize = Object.values(Size).filter(
    s => !catalogs.map(c => c.size).includes(s),
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleChangeCatalog = (index: number, catalog: Catalog) => {
    const newCatalogs = [...catalogs];
    newCatalogs[index] = catalog;
    setCatalogs(newCatalogs);
  };
  const handleDeleteCatalog = (index: number) => {
    const newCatalogs = [...catalogs];
    newCatalogs.splice(index, 1);
    setCatalogs(newCatalogs);
  };
  const handleAddCatalog = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const newCatalogs = [...catalogs];
    newCatalogs.push({
      size: remainingSize[0],
      quantity: 1,
    });
    setCatalogs(newCatalogs);
  };

  // console.log(catalogs);

  return (
    <Modal className="flex items-center justify-center" onClose={onClose}>
      <div className="w-[30rem] space-y-3 p-6 text-center">
        <div className="space-y-2">
          <h2 className="text-2xl font-light lg:text-3xl">Import</h2>
          <p className="text-sm lg:text-base">{product.name}</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 lg:gap-3">
          {catalogs.map((catalog, index) => (
            <CatalogField
              key={index}
              catalog={catalog}
              onChange={catalog => handleChangeCatalog(index, catalog)}
              onDelete={() => handleDeleteCatalog(index)}
            />
          ))}

          <button
            disabled={remainingSize.length === 0}
            onClick={handleAddCatalog}
            className="button button-dark disabled:opacity-20"
          >
            + catalog
          </button>

          <div className="flex w-full justify-end gap-3">
            <button
              disabled={catalogs.length == 0}
              className="button button-dark disabled:opacity-20"
            >
              Import
            </button>
            <button className="button" onClick={onClose}>
              cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ImportModal;

type CatalogFieldProps = {
  catalog: Catalog;
  onChange: (catalog: Catalog) => void;
  onDelete: () => void;
};
const CatalogField = ({ catalog, onDelete, onChange }: CatalogFieldProps) => {
  const { size, quantity } = catalog;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <label>Size:</label>
        <select
          onChange={event =>
            onChange({
              ...catalog,
              size: event.target.value as Size,
            })
          }
          className="appearance-none rounded border border-gray-300 bg-white px-2 py-1 text-gray-800 outline-none focus:border focus:outline-none"
        >
          {Object.keys(Size).map(s => (
            <option key={s} value={s} selected={s === size}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2">
        <label>Quantity:</label>
        <input
          onChange={event =>
            onChange({ ...catalog, quantity: +event.target.value })
          }
          type="number"
          min={1}
          defaultValue={quantity}
          className="input-field"
        />
      </div>
      <FontAwesomeIcon
        icon={faTrash}
        onClick={onDelete}
        style={{ color: 'white' }}
        className="cursor-pointer rounded bg-red-600 p-2 hover:bg-red-800"
      />
    </div>
  );
};
