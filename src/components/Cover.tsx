import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import SkeletonProduct from './SkeletonProduct';
import ProductCard from '../components/ProductCard';
import Banner from './Banner';
import { Product } from '../app/types';

type Props = {
  src: string;
  srcSmallScreen?: string;
  mainTitle: string;
  productListTitle?: string;
  subTitle: string;
  firstButton: string;
  secondButton?: string;
  coverKey: number;
};

export default function Cover(props: Props) {
  const products = useSelector((state: RootState) => state.product.products);
  return (
    <>
      <div className="relative h-screen">
        <Banner
          bannerKey={props.coverKey}
          src={props.src}
          srcSmallScreen={props.srcSmallScreen || props.src}
        />
        <div className="absolute bottom-1/4 w-full text-center md:left-24 md:bottom-24 md:w-fit md:text-left">
          <h1 className="pb-2 text-2xl font-bold uppercase text-white md:text-3xl">
            {props.mainTitle}
          </h1>
          <h3 className="pb-3 text-xs font-light uppercase tracking-widest text-white md:text-sm">
            {props.subTitle}
          </h3>
          <div className="grid justify-center gap-3 md:flex md:justify-start md:gap-6">
            <button className="button button-light w-60">
              {props.firstButton}
            </button>
            {props.secondButton && (
              <button className="button button-dark w-60">
                {props.secondButton}
              </button>
            )}
          </div>
        </div>
      </div>
      <h2 className="m-10 text-center text-3xl font-light">
        {props.productListTitle ? props.productListTitle : props.mainTitle}
      </h2>
      {products ? (
        <>
          <div className="mx-auto grid grid-cols-2 gap-x-24 gap-y-12 p-12 lg:max-w-screen-xl lg:grid-cols-4">
            {products.map((product: Product) => (
              <ProductCard
                key={product.uuid}
                id={product.uuid}
                name={product.name}
                price={product.price}
                imageOne={product.images[0]}
                imageTwo={product.images[1]}
              />
            ))}
          </div>
          <button className="button button-dark mx-auto mb-10 grid place-content-center">
            VIEW ALL
          </button>
        </>
      ) : (
        <SkeletonProduct />
      )}
    </>
  );
}
