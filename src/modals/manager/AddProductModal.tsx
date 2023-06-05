import { FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Collection } from '../../app/types';
import { useRefWithValidator } from '../../hooks/useRefWithValidator';
import Modal from '../Modal';

type Props = {
  onClose: () => void;
};

const CollectionTag = ({ name }: Collection) => (
  <div className="rounded bg-neutral-700 px-3 py-1 text-xs text-neutral-200">
    {name}
  </div>
);

const AddProductModal = ({ onClose }: Props) => {
  const collections = useSelector(
    (state: RootState) => state.storage.collections,
  );

  const {
    ref: nameRef,
    error: nameError,
    validate: validateName,
  } = useRefWithValidator(
    (value: string) => value.length > 0,
    'Please enter a valid name',
  );

  const {
    ref: priceRef,
    error: priceError,
    validate: validatePrice,
  } = useRefWithValidator(
    (value: number) => value > 0,
    'Please enter a valid price',
  );

  const [collectionTagList, setCollectionTagList] = useState<Collection[]>([]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isNameValid = validateName();
    const isPriceValid = validatePrice();
    const isCollectionListValid = collectionTagList.length > 0;

    if (isNameValid && isPriceValid && isCollectionListValid) {
      console.log('Submit');
    }
  };

  const handleAddCollectionTag = (
    event: FormEvent<HTMLButtonElement>,
    collection: Collection,
  ) => {
    event.preventDefault();
    setCollectionTagList([...collectionTagList, collection]);
  };

  return (
    <Modal className="flex items-center justify-center" onClose={onClose}>
      <div className="w-[30rem] space-y-3 p-6 text-center">
        <div className="space-y-2">
          <h2 className="text-2xl font-light lg:text-3xl">Add product</h2>
          <p className="text-sm font-light lg:text-base">
            Please fill the information below
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="w-full space-y-1 text-left">
            <input
              ref={nameRef}
              className={`input-field w-full lg:text-base ${
                nameError && 'border-red-500'
              }`}
              type="text"
              placeholder="Product name"
            />
            <p className="mx-1 text-xs text-red-500">
              {nameError ?? <span></span>}
            </p>
          </div>

          <div className="w-full space-y-1 text-left">
            <input
              ref={priceRef}
              className={`input-field w-full lg:text-base ${
                priceError && 'border-red-500'
              }`}
              type="text"
              placeholder="Product price"
            />
            <p className="mx-1 text-xs text-red-500">
              {priceError ?? <span></span>}
            </p>
          </div>
          <div className="w-full">
            <ul className="flex flex-wrap gap-3 text-sm">
              {collectionTagList.map(tag => (
                <li key={tag.id}>
                  <CollectionTag {...tag} />
                </li>
              ))}
              <li>
                <div className="group">
                  <p className="cursor-pointer">+ Add</p>
                  <div className="absolute hidden rounded bg-white p-3 text-sm opacity-0 shadow-md transition-opacity hover:opacity-100 group-hover:block">
                    <ul className="flex max-h-64 flex-col gap-2 overflow-x-scroll">
                      {collections
                        .filter(
                          collection => !collectionTagList.includes(collection),
                        )
                        .map(collection => (
                          <li key={collection.id}>
                            <button
                              onClick={event =>
                                handleAddCollectionTag(event, collection)
                              }
                              className="w-full p-2 text-left hover:bg-slate-200"
                            >
                              {collection.name}
                            </button>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="flex w-full justify-end gap-3">
            <button className="button button-dark">add</button>
            <button className="button" onClick={onClose}>
              cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddProductModal;
