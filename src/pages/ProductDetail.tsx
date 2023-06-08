import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { RemoveScrollBar } from 'react-remove-scroll-bar';
import { useParams } from 'react-router-dom';
import { addItem, toggleVisibility } from '../app/cartSlice';
import { AppDispatch } from '../app/store';
import { Catalog, Product } from '../app/types';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Modal from '../modals/Modal';

function ProductDetail() {
  const sales = false;
  const salesMessage = 'FINAL SALE // NO RETURNS';
  const imageRefs = useRef<HTMLImageElement[]>([]);
  const [pictureIndex, setPictureIndex] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 768) {
      }
      const imageElements = imageRefs.current;
      let newPictureIndex = pictureIndex;

      imageElements.forEach((image, index) => {
        const rect = image.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          newPictureIndex = index;
        }
      });
      if (window.innerWidth >= 768) {
        setPictureIndex(newPictureIndex);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pictureIndex]);

  const handleRefUpdate = (index: number) => (ref: HTMLImageElement | null) => {
    if (ref) {
      imageRefs.current[index] = ref;
    }
  };
  const dispatch: AppDispatch = useDispatch();
  const { name } = useParams<{ name: string }>();
  const [clickModal, setClickModal] = useState(false);
  const [hoverMeasure, setHoverMeasure] = useState(false);
  const [thisProduct, setThisProduct] = useState<Product | null>(null);
  const [sizeValue, setSizeValue] = useState<string | null>(null);
  const scrollToElement = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_PRODUCTS_API_URL}/${name}`)
      .then(response => {
        setThisProduct(response.data);
        setSizeValue(
          response.data.catalogs.find((item: Catalog) => item.quantity > 0)
            .size || null,
        );
      });
  }, [name]);
  const isNotAvaible = thisProduct?.catalogs.every(
    (item: Catalog) => item.quantity === 0,
  );
  const handleAddToCart = () => {
    dispatch(
      addItem({
        productUuid: thisProduct!.uuid,
        size: sizeValue!,
      }),
    );
  };
  const handleDecreasePictureIndex = () => {
    if (pictureIndex > 0) {
      setPictureIndex(pictureIndex - 1);
    } else {
      setPictureIndex(thisProduct!.images.length - 1);
    }
  };
  const handleIncreasePictureIndex = () => {
    if (pictureIndex < thisProduct!.images.length - 1) {
      setPictureIndex(pictureIndex + 1);
    } else {
      setPictureIndex(0);
    }
  };
  if (!thisProduct) return <></>;
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="my-16 flex-grow font-[avenir-next] font-bold">
          <div className="grid flex-row md:flex">
            <div className="hidden basis-0 md:block md:basis-1/12">
              <div className="sticky top-16 left-0 py-3">
                <div className="hidden lg:block">
                  {thisProduct!.images.map((item: string, index) => (
                    <img
                      key={index}
                      onClick={() => {
                        setPictureIndex(index);
                        scrollToElement(index.toString());
                      }}
                      alt={item}
                      src={item}
                      className={`m-5 mx-auto h-20 cursor-pointer delay-75 duration-300 ${
                        pictureIndex === index ? `border-2 border-gray-500` : ``
                      }`}
                    />
                  ))}
                </div>
                <div className="hidden h-0 place-items-center gap-3 md:grid md:h-[calc(100vh-4rem)] lg:hidden lg:h-0">
                  <div className="hidden gap-3 md:grid lg:hidden">
                    {thisProduct!.images.map((_, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setPictureIndex(index);
                          scrollToElement(index.toString());
                        }}
                        className={`m-auto h-3 w-3 cursor-pointer rounded-full border-2 duration-300  ${
                          pictureIndex === index
                            ? `border-black bg-black`
                            : `border-gray-500 bg-white`
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden basis-0 md:block md:basis-1/2">
              {thisProduct!.images.map((item: string, index) => (
                <div className="pt-20" id={index.toString()} key={index}>
                  <img
                    ref={handleRefUpdate(index)}
                    alt={item}
                    src={item}
                    className="mx-auto px-3 lg:w-5/6"
                  />
                </div>
              ))}
            </div>
            <div className="basis-1/2 justify-center md:hidden md:basis-0">
              <div className="flex overflow-x-hidden">
                {thisProduct!.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Image ${index}`}
                    className={`mb-5 transform transition-all duration-500 ${
                      index === pictureIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ transform: `translateX(-${pictureIndex * 100}%)` }}
                  />
                ))}
              </div>
              <div className="mx-28 flex flex-row justify-center">
                <svg
                  onClick={handleDecreasePictureIndex}
                  className="h-3 w-3 cursor-pointer"
                  role="presentation"
                  viewBox="0 0 6 9"
                >
                  <path
                    d="M5 8.5l-4-4 4-4"
                    stroke="currentColor"
                    fill="none"
                  ></path>
                </svg>
                {thisProduct!.images.map((_, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setPictureIndex(index);
                      scrollToElement(index.toString());
                    }}
                    className={`m-auto h-3 w-3 cursor-pointer rounded-full border-2 duration-300  ${
                      pictureIndex === index
                        ? `border-black bg-black`
                        : `border-gray-500 bg-white`
                    }`}
                  ></div>
                ))}
                <svg
                  onClick={handleIncreasePictureIndex}
                  className="h-3 w-3 cursor-pointer"
                  role="presentation"
                  viewBox="0 0 6 9"
                >
                  <path
                    d="M1 8.5l4-4-4-4"
                    stroke="currentColor"
                    fill="none"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="mx-5 basis-1/2 md:basis-5/12">
              <div className="sticky top-16 right-0 grid gap-6 pt-16">
                <p className="text-center text-xl text-gray-700 md:text-left">
                  {thisProduct!.name.toUpperCase()}
                </p>
                <div className="flex flex-row justify-center gap-3 font-bold text-gray-500 md:justify-start">
                  <p>${thisProduct!.price} USD</p>
                </div>
                {thisProduct!.catalogs.length > 0 && (
                  <>
                    <p>Size: </p>
                    <div className={`flex gap-2`}>
                      {thisProduct!.catalogs.map((item: Catalog, index) => (
                        <button
                          disabled={item.quantity <= 0}
                          key={index}
                          onClick={() => setSizeValue(item.size)}
                          className={`w-full ${
                            item.quantity > 0
                              ? `cursor-pointer opacity-100`
                              : `cursor-not-allowed opacity-50`
                          } border border-solid border-neutral-400 px-6 py-2 text-center transition-colors ${
                            item.size === sizeValue
                              ? `border-neutral-700`
                              : `hover:border-neutral-600`
                          }`}
                        >
                          {item.size}
                        </button>
                      ))}
                    </div>
                  </>
                )}
                <div>
                  <p
                    onMouseEnter={() => setHoverMeasure(true)}
                    onMouseLeave={() => setHoverMeasure(false)}
                    onClick={() => setClickModal(true)}
                    className="absolute cursor-pointer"
                  >
                    Measurements
                  </p>
                  <div
                    className={`relative top-6 left-0 mb-5 h-px bg-black duration-300 ${
                      hoverMeasure ? `w-24` : `w-12`
                    }`}
                  ></div>
                </div>
                <button
                  onClick={() => {
                    if (!isNotAvaible) {
                      handleAddToCart();
                      dispatch(toggleVisibility(true));
                    }
                  }}
                  className={`h-12 ${
                    isNotAvaible
                      ? `cursor-not-allowed opacity-50`
                      : `cursor-pointer opacity-100 hover:bg-black`
                  } w-full bg-neutral-700 uppercase text-white duration-300`}
                >
                  {isNotAvaible ? 'NOT AVAILABLE' : 'ADD TO CART'}
                </button>
                {sales && (
                  <p className="text-md text-center font-[ASRV-Standard] font-bold uppercase text-red-600">
                    {salesMessage}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      {clickModal && <RemoveScrollBar />}
      <Modal
        className={`flex items-center justify-center duration-300 ${
          clickModal ? `visible opacity-100` : `collapse opacity-0`
        }`}
        onClose={() => setClickModal(false)}
      >
        <div className="m-3 rounded-lg">
          <div className="flex flex-row justify-center">
            <p className=" text-center font-[ASRV-Standard] text-2xl text-gray-500">
              SIZE GUIDE {thisProduct!.name.split('.')[0]}
            </p>
            <svg
              onClick={() => setClickModal(false)}
              className="relative left-[20%] top-3 h-3 w-3 cursor-pointer text-gray-500 md:left-[35%]"
              role="presentation"
              viewBox="0 0 16 14"
            >
              <path
                d="M15 0L1 14m14 0L1 0"
                stroke="currentColor"
                fill="none"
              ></path>
            </svg>
          </div>
          <div>
            <img
              alt=""
              src={`https://cdn.shopify.com/s/files/1/0297/6293/files/${
                thisProduct!.name.split('.')[0]
              }.png`}
              className="mx-auto h-72 md:h-[calc(100vh-150px)]"
            />
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ProductDetail;
