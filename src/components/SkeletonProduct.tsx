import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function SkeletonProduct() {
  const [arrayLength, setArrayLength] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setArrayLength(4);
      } else if (window.innerWidth >= 768) {
        setArrayLength(2);
      } else {
        setArrayLength(1);
      }
    };

    handleResize(); // Initial setup

    window.addEventListener('resize', handleResize); // Listen to window resize event

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup the event listener
    };
  }, []);

  return (
    <div
      id="myGrid"
      className="m-5 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
    >
      {[...Array(arrayLength).keys()].map(index => (
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
