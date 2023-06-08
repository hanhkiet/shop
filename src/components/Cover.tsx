import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import SkeletonProduct from './SkeletonProduct';
import ProductCard from '../components/ProductCard';
import Banner from './Banner';
import { Collection, Product } from '../app/types';
import axios from 'axios';
import DownloadApp from './DownloadApp';

type Props = {
  src: string;
  srcSmallScreen?: string;
  mainTitle?: string;
  productListTitle: string;
  subTitle: string;
  firstButton?: string;
  secondButton?: string;
  coverKey: number;
};

export default function Cover(props: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const collections = useSelector(
    (state: RootState) => state.collection.collections,
  );
  const collection = collections.find(
    (item: Collection) => item.name === props.productListTitle,
  );

  useEffect(() => {
    if (!collection) return;
    axios
      .get(`${import.meta.env.VITE_COLLECTIONS_API_URL}/${collection.id}`)
      .then(res => setProducts(res.data))
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, [collections, collection]);

  if (!collection || collections.length === 0 || !products) {
    return <></>;
  }

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
            {props.mainTitle ? props.mainTitle : props.productListTitle}
          </h1>
          <h3 className="pb-3 text-xs font-light uppercase tracking-widest text-white md:text-sm">
            {props.subTitle}
          </h3>
          <div className="grid justify-center gap-3 md:flex md:justify-start md:gap-6">
            {props.firstButton ? (
              <Link
                to={`/collections/${props.productListTitle
                  .replace(/\W+/gi, '-')
                  .toLowerCase()}`}
              >
                <button className="button button-light w-60">
                  {props.firstButton}
                </button>
              </Link>
            ) : (
              <div className="w-64">
                <DownloadApp />
              </div>
            )}
            {props.secondButton && (
              <button className="button button-dark w-60">
                {props.secondButton}
              </button>
            )}
          </div>
        </div>
      </div>
      <h2 className="m-10 text-center text-3xl font-light">
        {props.productListTitle}
      </h2>
      {products.length > 0 ? (
        <>
          <div className="mx-auto grid grid-cols-2 lg:max-w-screen-xl lg:grid-cols-4">
            {products.slice(0, 4).map((item: Product) => (
              <ProductCard
                key={item.uuid}
                id={item.uuid}
                name={item.name}
                price={item.price}
                imageOne={item.images[0]}
                imageTwo={item.images[1]}
                catalogs={item.catalogs}
              />
            ))}
          </div>
          <Link
            to={`/collections/${props.productListTitle
              .replace(/\W+/gi, '-')
              .toLowerCase()}`}
          >
            <button className="button button-dark mx-auto mb-10 grid place-content-center">
              VIEW ALL
            </button>
          </Link>
        </>
      ) : (
        <SkeletonProduct />
      )}
    </>
  );
}
