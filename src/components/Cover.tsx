import { useState, useEffect } from 'react'
import axios from 'axios'
import Loading from '../components/Loading';
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
  }, []);
  const numberOfShowItems = props.numberOfShowItems
  const listItems = products ? (
    <div className="mx-auto p-12 grid gap-x-24 gap-y-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:max-w-screen-xl">
      {products.slice(0, numberOfShowItems).map((product: any) => (
        <ProductCard
          key={product.productId}
          name={product.name}
          price={product.price}
          imageOne={product.image[0]}
          imageTwo={product.image[1]}
          size={product.size}
        />
      ))}
    </div>
  ) : (
    <Loading />
  );
  const renderSrc = props.src.split('.').pop() == 'mp4' ? <video
    className="hidden md:block lg:block -z-10 h-screen w-full object-cover brightness-[.80]"
    autoPlay
    loop
    muted
    src={props.src}
  ></video> : <img className="hidden md:block lg:block -z-10 h-screen w-full object-cover brightness-[.80]" src={props.src} alt="" />
  return (
    <>
      <div className='relative h-screen'>
        {renderSrc}
        <img className="block md:hidden lg:hidden -z-10 h-screen w-full object-cover"
          src={props.srcSmallScreen ? props.srcSmallScreen : props.src} alt="" />
        <div className="absolute bottom-1/4 w-full text-center md:bottom-12 lg:bottom-12 md:left-24 md:w-fit md:text-left">
          <h1 className="pb-2 text-2xl font-bold uppercase text-white md:text-3xl">
            {props.mainTitle}
          </h1>
          <h3 className="pb-3 text-xs font-light uppercase tracking-widest text-white md:text-sm">
            {props.subTitle}
          </h3>
          <div className="flex gap-6 justify-center md:justify-start lg:justify-start">
            <button className="button button-light ">{props.firstButton}</button>
            {props.secondButton && <button className="button button-dark ">{props.secondButton}</button>}
          </div>
        </div>

      </div>
      <h2 className='text-center text-3xl font-light m-10'>{props.mainTitle}</h2>
      {listItems}
      <button className="button button-dark mx-auto grid place-content-center mb-10">VIEW ALL</button>
    </>
  );
}

export default Cover;
