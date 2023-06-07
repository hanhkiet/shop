import { FormEvent, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendAddProductRequest } from '../../app/manager/storageSlice';
import { AppDispatch, RootState } from '../../app/store';
import { Collection, Color, Product } from '../../app/types';
import { useRefWithValidator } from '../../hooks/useRefWithValidator';
import Modal from '../Modal';

type Props = {
  onClose: () => void;
};

const AddProductModal = ({ onClose }: Props) => {
  const dispatch: AppDispatch = useDispatch();

  const {
    ref: nameRef,
    error: nameError,
    validate: validateName,
  } = useRefWithValidator(
    (value: string) => value.trim().length > 0,
    'Please enter a valid name',
  );

  const {
    ref: priceRef,
    error: priceError,
    validate: validatePrice,
  } = useRefWithValidator(
    (value: string) => Number(value) > 0,
    'Please enter a valid price',
  );

  const [selectedColor, setSelectedColor] = useState<Color>(Color.BLACK);
  const [collectionTagList, setCollectionTagList] = useState<Collection[]>([]);
  const [imageList, setImageList] = useState<string[]>([]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isNameValid = validateName();
    const isPriceValid = validatePrice();
    const isCollectionListValid = collectionTagList.length > 0;
    const isImageListValid = imageList.length > 0;

    if (
      isCollectionListValid &&
      isImageListValid &&
      isNameValid &&
      isPriceValid
    ) {
      const payload = {
        name: nameRef.current?.value,
        price: Number(priceRef.current?.value),
        color: selectedColor,
        images: imageList,
        collections: collectionTagList,
      } as Product;

      dispatch(sendAddProductRequest(payload)).then(() => onClose());
    }
  };

  const handleDeleteCollectionTag = (collection: Collection) =>
    setCollectionTagList(
      collectionTagList.filter(item => item.id !== collection.id),
    );

  return (
    <Modal
      className="flex flex-row items-center justify-center"
      onClose={onClose}
    >
      <div className="w-[40rem] space-y-3 p-6 text-center">
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
              placeholder="Price"
            />
            <p className="mx-1 text-xs text-red-500">
              {priceError ?? <span></span>}
            </p>
          </div>

          <SelectField
            onChange={e => setSelectedColor(e.currentTarget.value as Color)}
          />

          <CollectionTagField
            collectionTagList={collectionTagList}
            onAdd={collection =>
              setCollectionTagList([...collectionTagList, collection])
            }
            onDelete={handleDeleteCollectionTag}
          />

          <LinkField
            imageList={imageList}
            onAdd={image => setImageList([...imageList, image])}
            onDelete={image =>
              setImageList(imageList.filter(item => item !== image))
            }
          />

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

type CollectionTagProps = {
  collection: Collection;
};
const CollectionTag = ({ collection }: CollectionTagProps) => (
  <div className="group rounded bg-neutral-700 px-3 py-1 text-xs text-neutral-200 hover:bg-red-700 hover:text-transparent">
    <p className="group-hover:hidden">{collection.name}</p>
    <p className="hidden text-white group-hover:inline">x</p>
  </div>
);

type SelectFieldProps = {
  onChange: (event: FormEvent<HTMLSelectElement>) => void;
};
const SelectField = ({ onChange }: SelectFieldProps) => (
  <div className="w-full space-y-1 text-left">
    <select
      className="input-field w-full bg-white  lg:text-base"
      onChange={onChange}
    >
      {Object.values(Color).map(color => (
        <option key={color} value={color}>
          {color}
        </option>
      ))}
    </select>
  </div>
);

type CollectionTagFieldProps = {
  collectionTagList: Collection[];
  onAdd: (collection: Collection) => void;
  onDelete: (collection: Collection) => void;
};

const CollectionTagField = ({
  collectionTagList,
  onAdd,
  onDelete,
}: CollectionTagFieldProps) => {
  const collections = useSelector(
    (state: RootState) => state.storage.collections,
  );

  return (
    <div className="w-full">
      <ul className="flex flex-wrap items-center gap-3 text-sm">
        <p>Collection: </p>
        {collectionTagList.map(tag => (
          <li key={tag.id}>
            <div className="cursor-pointer" onClick={() => onDelete(tag)}>
              <CollectionTag collection={tag} />
            </div>
          </li>
        ))}
        <li>
          <div className="group">
            <p className="cursor-pointer">+ Add</p>
            <div
              className="absolute hidden rounded bg-white p-3 text-sm opacity-0 shadow-md 
            transition-opacity hover:opacity-100 group-hover:block"
            >
              <ul className="flex max-h-64 flex-col gap-2 overflow-x-scroll">
                {collections
                  .filter(collection => !collectionTagList.includes(collection))
                  .map(collection => (
                    <li key={collection.id}>
                      <div
                        onClick={() => onAdd(collection)}
                        className="w-full cursor-pointer p-2 text-left hover:bg-slate-200"
                      >
                        {collection.name}
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

type LinkFieldProps = {
  imageList: string[];
  onAdd: (image: string) => void;
  onDelete: (image: string) => void;
};
const LinkField = ({ imageList, onAdd, onDelete }: LinkFieldProps) => {
  const [isInputVisible, setIsInputVisible] = useState(false);

  return (
    <div className="w-full space-y-1 text-left">
      <ol className=" list-decimal space-y-1 text-sm">
        <p>Images: </p>
        {imageList.map(image => (
          <li className="mx-4">
            <div className="group relative">
              <p className="inline-block rounded bg-neutral-600 px-2 py-1 text-white group-hover:hidden">
                {image}
              </p>
              <p
                onClick={() => onDelete(image)}
                className="hidden w-fit cursor-pointer rounded bg-red-600 px-2 py-1 text-white group-hover:inline-block"
              >
                x
              </p>
              <img
                className="absolute bottom-0 hidden rounded-md bg-white p-3 opacity-0 shadow-2xl transition-opacity hover:opacity-100 group-hover:inline-block"
                src={image}
                alt="Not found"
              />
            </div>
          </li>
        ))}
        {isInputVisible ? (
          <InputWithHandleClickOutside
            onAdd={onAdd}
            onClickOutside={() => setIsInputVisible(false)}
          />
        ) : (
          <div
            className="cursor-pointer"
            onClick={() => setIsInputVisible(true)}
          >
            + Image
          </div>
        )}
      </ol>
    </div>
  );
};

type InputWithHandleClickOutsideProps = {
  onAdd: (value: string) => void;
  onClickOutside: () => void;
};
const InputWithHandleClickOutside = ({
  onAdd,
  onClickOutside,
}: InputWithHandleClickOutsideProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        if (inputRef.current.value) {
          onAdd(inputRef.current.value);
        }

        onClickOutside();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [inputRef]);

  return (
    <input ref={inputRef} type="text" className="input-field w-full py-1" />
  );
};
