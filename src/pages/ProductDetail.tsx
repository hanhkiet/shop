import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { useParams } from 'react-router-dom';
import { Product } from '../app/types';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';
import { AppDispatch } from '../app/store';
import { useDispatch } from 'react-redux';
import { addItem } from '../app/cartSlice';
import { toggleVisibility } from '../app/cartSlice';

function ProductDetail() {
  const dispatch: AppDispatch = useDispatch();
  const { name } = useParams<{ name: string }>();
  const [pictureIndex, setPictureIndex] = useState(0);
  const products = useSelector((state: RootState) => state.product.products);
  const sizes = useSelector((state: RootState) => state.product.sizes);
  const [sizeValue, setSizeValue] = useState(sizes[0]);
  const scrollToElement = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };
  const thisProduct = products.find(
    (prod: Product) => prod.name.replace(/\W+/gi, '-').toLowerCase() === name,
  );
  if (!thisProduct || !name) return <></>;
  const thisProductColor = products.filter(
    (prod: Product) =>
      prod.name.slice(0, prod.name.lastIndexOf('-')).trim() ===
      thisProduct.name.slice(0, thisProduct.name.lastIndexOf('-')).trim(),
  );
  const handleCartAppear = () => {
    dispatch(toggleVisibility(true));
  };
  const handleAddToCart = () => {
    dispatch(
      addItem({
        id: thisProduct.uuid,
        size: sizeValue,
      }),
    );
  };
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex-grow font-[avenir-next] font-bold">
          <div className="grid flex-row md:flex">
            <div className="hidden basis-0 md:block md:basis-1/12">
              <div className="sticky top-16 left-0 py-3">
                {thisProduct.images.map((item: string, index) => (
                  <img
                    key={index}
                    onClick={() => {
                      setPictureIndex(index);
                      scrollToElement(index.toString());
                    }}
                    alt={item}
                    src={item}
                    className={`m-5 mx-auto h-20 cursor-pointer ${
                      pictureIndex === index ? `border-2 border-gray-500` : ``
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="basis-1/2 md:basis-6/12">
              {thisProduct.images.map((item: string, index) => (
                <div className="pt-20" id={index.toString()} key={index}>
                  <img
                    alt={item}
                    src={item}
                    className="mx-auto px-3 lg:w-5/6"
                  />
                </div>
              ))}
            </div>
            <div className="mx-5 basis-1/2 md:basis-5/12">
              <div className="sticky top-16 right-0 grid gap-6 pt-16">
                <p className="text-xl text-gray-700">
                  {thisProduct.name.toUpperCase()}
                </p>
                <p className="font-bold text-gray-500">
                  ${thisProduct.price} USD
                </p>
                <p>Color: </p>
                <div className="grid grid-cols-5">
                  {thisProductColor.map((item: Product) => (
                    <Link
                      key={item.uuid}
                      onClick={() => {
                        setPictureIndex(0);
                        setSizeValue(sizes[0]);
                      }}
                      to={`/products/${item.name
                        .replace(/\W+/gi, '-')
                        .toLowerCase()}`}
                    >
                      <img
                        alt=""
                        src={item.images[0]}
                        className={`mx-auto ${
                          thisProduct.uuid === item.uuid
                            ? `border-2 border-gray-500`
                            : ``
                        }`}
                      />
                    </Link>
                  ))}
                </div>
                <p>Size: </p>
                <div className={`flex gap-2`}>
                  {sizes.map((eachSize: string) => (
                    <div
                      key={eachSize}
                      onClick={() => setSizeValue(eachSize)}
                      className={`w-full cursor-pointer border border-solid border-neutral-300 px-6 py-2 text-center transition-colors ${
                        eachSize === sizeValue
                          ? `border-neutral-600`
                          : `hover:border-neutral-400`
                      }`}
                    >
                      {eachSize}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => {
                    handleAddToCart();
                    handleCartAppear();
                  }}
                  className="h-12 w-full bg-neutral-700 text-white duration-300 hover:bg-black"
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default ProductDetail;
