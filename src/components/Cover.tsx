import { useState, useEffect } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import ProductCard from '../components/ProductCard';

type Props = {
  src: string;
  srcSmallScreen?: string;
  mainTitle: string;
  subTitle: string;
  firstButton: string;
  secondButton?: string;
  numberOfShowItems: Number;
};

function Cover(props: Props) {
  const baseURL = 'http://localhost:5500/src/static/data/productsData.json';
  const [products, setProducts] = useState<any>();
  // console.log(products)
  useEffect(() => {
    axios.get(baseURL).then(response => {
      setProducts(response.data);
    });
  }, [products]);
  const numberOfShowItems = props.numberOfShowItems;
  const listItems = products ? (
    <>
      <div className="mx-auto grid grid-cols-1 gap-x-24 gap-y-12 p-12 md:grid-cols-2 lg:max-w-screen-xl lg:grid-cols-4">
        {products.slice(0, numberOfShowItems).map((product: any) => (
          <ProductCard
            key={product.productId}
            id={product.productId}
            name={product.name}
            price={product.price}
            imageOne={product.image[0]}
            imageTwo={product.image[1]}
            size={product.size}
          />
        ))}
      </div>
      <button className="button button-dark mx-auto mb-10 grid place-content-center">
        VIEW ALL
      </button>
    </>
  ) : (
    <Skeleton count={5} />
  );
  const renderSrc =
    props.src.split('.').pop() == 'mp4' ? (
      <video
        className="-z-10 hidden h-screen w-full object-cover brightness-[.80] md:block lg:block"
        autoPlay
        loop
        muted
        src={props.src}
      ></video>
    ) : (
      <img
        className="-z-10 hidden h-screen w-full object-cover brightness-[.80] md:block lg:block"
        src={props.src}
        alt=""
      />
    );
  return (
    <>
      <div className="relative h-screen">
        {renderSrc}
        <img
          className="-z-10 block h-screen w-full object-cover md:hidden lg:hidden"
          src={props.srcSmallScreen ? props.srcSmallScreen : props.src}
          alt=""
        />
        <div className="absolute bottom-1/4 w-full text-center md:bottom-12 md:left-24 md:w-fit md:text-left lg:bottom-12">
          <h1 className="pb-2 text-2xl font-bold uppercase text-white md:text-3xl">
            {props.mainTitle}
          </h1>
          <h3 className="pb-3 text-xs font-light uppercase tracking-widest text-white md:text-sm">
            {props.subTitle}
          </h3>
          <div className="flex justify-center gap-6 md:justify-start lg:justify-start">
            <button className="button button-light ">
              {props.firstButton}
            </button>
            {props.secondButton && (
              <button className="button button-dark ">
                {props.secondButton}
              </button>
            )}
          </div>
        </div>
      </div>
      <h2 className="m-10 text-center text-3xl font-light">
        {props.mainTitle}
      </h2>
      {listItems}
    </>
  );
}

export default Cover;
