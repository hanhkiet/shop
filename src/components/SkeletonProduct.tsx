import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function SkeletonProduct() {
  return (
    <div className="m-5 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(4).keys()].map(index => (
        <div key={index}>
          <Skeleton height={220} />
          <Skeleton height={35} />
          <Skeleton height={30} />
        </div>
      ))}
    </div>
  );
}

export default SkeletonProduct;
