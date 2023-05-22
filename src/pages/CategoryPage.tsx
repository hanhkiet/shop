import { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function CategoryPage() {
  const text = "SPRING '23 COLLECTION";
  const words = text.split(' ');
  const lastWord = words.pop();
  const remainingText = words.join(' ');

  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const div1 = div1Ref.current;
      const div2 = div2Ref.current;
      const div3 = div3Ref.current;
      const div4 = div4Ref.current;

      if (div1 && div2 && div3 && div4) {
        const rect = div1.getBoundingClientRect();
        const shouldFixDiv2 = rect.top <= 0;
        const rect3 = div4.getBoundingClientRect();
        const shouldFixDiv3 = rect3.top > 0;

        div2.classList.toggle('fixed', shouldFixDiv2);
        div3.classList.toggle('fixed', shouldFixDiv2);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      <Navbar />
      <div className="mt-16 min-h-screen">
        <div className="relative" ref={div1Ref}>
          <img
            alt=""
            src="https://asrv.com/cdn/shop/files/Collection_banner_1800x.jpg"
            className="w-full"
          />
          <div className="absolute left-0 top-0 grid h-full w-full content-center">
            <p className="text-center text-3xl text-white">
              <span className="font-bold">{remainingText}</span>{' '}
              <span className="font-light">{lastWord}</span>
            </p>
          </div>
        </div>
        <div
          ref={div2Ref}
          className="sticky left-0 top-16 z-20 flex flex-row-reverse border-b-2 border-gray-300 bg-white md:flex-row"
        >
          <div className="basis-1/3 p-6 md:basis-1/12">
            <div className="flex justify-center gap-3 md:hidden">
              <button className="grid h-5 w-5 content-center" title="">
                <svg role="presentation" viewBox="0 0 36 36">
                  <rect fill="currentColor" width="36" height="36"></rect>
                </svg>
              </button>
              <button className="grid h-5 w-5 content-center" title="">
                <svg viewBox="0 0 36 36">
                  <path d="M21 36V21h15v15H21zm0-36h15v15H21V0zM0 21h15v15H0V21zM0 0h15v15H0V0z"></path>
                </svg>
              </button>
            </div>
            <div className="hidden justify-center gap-3 md:flex">
              <button className="grid h-5 w-5 content-center" title="">
                <svg viewBox="0 0 36 36">
                  <path d="M21 36V21h15v15H21zm0-36h15v15H21V0zM0 21h15v15H0V21zM0 0h15v15H0V0z"></path>
                </svg>
              </button>
              <button className="grid h-5 w-5 content-center" title="">
                <svg viewBox="0 0 36 36">
                  <path d="M28 36v-8h8v8h-8zm0-22h8v8h-8v-8zm0-14h8v8h-8V0zM14 28h8v8h-8v-8zm0-14h8v8h-8v-8zm0-14h8v8h-8V0zM0 28h8v8H0v-8zm0-14h8v8H0v-8zM0 0h8v8H0V0z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="hidden basis-0 border-x-2 border-gray-300 md:flex md:basis-full"></div>
          <div className="flex basis-1/3 justify-center gap-3 border-x-2 border-gray-300 p-6 md:basis-1/12 md:border-x-0">
            Sort
            <div className="grid content-center">
              <svg
                className="grid h-3 w-3 content-center"
                role="presentation"
                viewBox="0 0 19 12"
              >
                <polyline
                  fill="none"
                  stroke="currentColor"
                  points="17 2 9.5 10 2 2"
                  fill-rule="evenodd"
                  stroke-width="2"
                  stroke-linecap="square"
                ></polyline>
              </svg>
            </div>
          </div>
          <div className="flex basis-1/3 justify-center border-l-2 border-gray-300 p-6 md:basis-1/12 lg:hidden">
            Filter
          </div>
        </div>
        <div className="flex flex-row">
          <div className="basis-2/12">
            <div ref={div3Ref} className="w-2/12">
              ss
            </div>
          </div>
          <div className="basis-10/12">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
            illo nobis vel dignissimos cum ullam molestiae minima reiciendis
            ratione sed asperiores tempora atque odit aliquam, eligendi esse
            quaerat amet voluptatum. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Id excepturi, ullam hic vero tempore voluptas
            autem iste numquam impedit qui perferendis quo! Libero quis quo
            provident similique tempore voluptates reiciendis? Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Debitis, repellendus
            officiis. Quos aspernatur recusandae nesciunt, quas quam qui
            dignissimos officiis unde animi nisi sunt dolor reprehenderit quidem
            porro, eaque eius! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Provident illo nobis vel dignissimos cum ullam
            molestiae minima reiciendis ratione sed asperiores tempora atque
            odit aliquam, eligendi esse quaerat amet voluptatum. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Id excepturi, ullam hic
            vero tempore voluptas autem iste numquam impedit qui perferendis
            quo! Libero quis quo provident similique tempore voluptates
            reiciendis? Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Debitis, repellendus officiis. Quos aspernatur recusandae nesciunt,
            quas quam qui dignissimos officiis unde animi nisi sunt dolor
            reprehenderit quidem porro, eaque eius!Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Provident illo nobis vel dignissimos
            cum ullam molestiae minima reiciendis ratione sed asperiores tempora
            atque odit aliquam, eligendi esse quaerat amet voluptatum. Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Id excepturi,
            ullam hic vero tempore voluptas autem iste numquam impedit qui
            perferendis quo! Libero quis quo provident similique tempore
            voluptates reiciendis? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Debitis, repellendus officiis. Quos aspernatur
            recusandae nesciunt, quas quam qui dignissimos officiis unde animi
            nisi sunt dolor reprehenderit quidem porro, eaque eius!Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Provident illo nobis
            vel dignissimos cum ullam molestiae minima reiciendis ratione sed
            asperiores tempora atque odit aliquam, eligendi esse quaerat amet
            voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Id excepturi, ullam hic vero tempore voluptas autem iste numquam
            impedit qui perferendis quo! Libero quis quo provident similique
            tempore voluptates reiciendis? Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Debitis, repellendus officiis. Quos
            aspernatur recusandae nesciunt, quas quam qui dignissimos officiis
            unde animi nisi sunt dolor reprehenderit quidem porro, eaque eius!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
            illo nobis vel dignissimos cum ullam molestiae minima reiciendis
            ratione sed asperiores tempora atque odit aliquam, eligendi esse
            quaerat amet voluptatum. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Id excepturi, ullam hic vero tempore voluptas
            autem iste numquam impedit qui perferendis quo! Libero quis quo
            provident similique tempore voluptates reiciendis? Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Debitis, repellendus
            officiis. Quos aspernatur recusandae nesciunt, quas quam qui
            dignissimos officiis unde animi nisi sunt dolor reprehenderit quidem
            porro, eaque eius!Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Provident illo nobis vel dignissimos cum ullam molestiae
            minima reiciendis ratione sed asperiores tempora atque odit aliquam,
            eligendi esse quaerat amet voluptatum. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Id excepturi, ullam hic vero tempore
            voluptas autem iste numquam impedit qui perferendis quo! Libero quis
            quo provident similique tempore voluptates reiciendis? Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Debitis, repellendus
            officiis. Quos aspernatur recusandae nesciunt, quas quam qui
            dignissimos officiis unde animi nisi sunt dolor reprehenderit quidem
            porro, eaque eius!
          </div>
        </div>
      </div>
      <div ref={div4Ref}>
        <Footer />
      </div>
    </>
  );
}

export default CategoryPage;
