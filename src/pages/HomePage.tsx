import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Cover from '../components/Cover';
import Advertisement from '../components/Advertisement';
import DownloadApp from '../components/DownloadApp';
import ScrollToTop from '../components/ScrollToTop';

function HomePage() {
  return (
    <>
      <Navbar />
      <Cover
        src="https://asrv.com/cdn/shop/files/BF-Banner-Desktop_3f36479b-ef35-40df-9b4e-7770efeb8c56.jpg"
        srcSmallScreen="https://asrv.com/cdn/shop/files/BF-Banner-Mobile.jpg"
        mainTitle="END OF SEASON SALE"
        productListTitle="END OF SEASON SALE"
        subTitle="UP TO 50% OFF - SALE ENDS 5.31.23"
        firstButton="SHOP SALE"
        lineOfShowItems={4}
      />
      <Cover
        src="https://asrv.com/cdn/shop/files/Banner_1800x.jpg"
        srcSmallScreen="https://asrv.com/cdn/shop/files/Banner_mobile.png"
        mainTitle="BACK IN STOCK"
        productListTitle="CORE COLLECTION"
        subTitle="OUR BESTSELLERS RETURN WITH ALL-NEW COLORWAYS"
        firstButton="SHOP NEW ARRIVALS"
        lineOfShowItems={4}
      />
      <Cover
        src="https://cdn.shopify.com/s/files/1/0297/6293/files/D2B_2000x.png?v=1681496790"
        srcSmallScreen="https://cdn.shopify.com/s/files/1/0297/6293/files/MobileDrop2_x800.heic?v=1681328045"
        mainTitle="SPRING DROP 2"
        subTitle="BUILT FOR THE HIGH-PERFORMANCE LIFESTYLE"
        firstButton="SHOP NOW"
        secondButton="MINDSET TRAINING #10"
        lineOfShowItems={1}
      />
      <Cover
        src="https://cdn.shopify.com/videos/c/o/v/a1e944e243cd4e06b50e5eebd96d0d2f.mp4"
        srcSmallScreen="https://asrv.com/cdn/shop/files/DSC00896.png"
        mainTitle="SPRING DROP 1"
        subTitle="THE ART OF ADAPTATION"
        firstButton="SHOP NOW"
        secondButton="TUTORIAL"
        lineOfShowItems={1}
      />
      <Cover
        src="https://asrv.com/cdn/shop/files/wide-boy-final.jpg"
        mainTitle="WINTER '22 COLLECTION"
        subTitle="EXPLORE NATURE IN ITS HARSHEST FORM"
        firstButton="SHOP NOW"
        secondButton="LOOKBOOK"
        lineOfShowItems={1}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="order-last md:order-last lg:order-first">
          <img
            src="https://cdn.shopify.com/s/files/1/0297/6293/files/spring-app-banner-web2_1200x.png?v=1679009396"
            alt=""
          />
        </div>
        <div className="grid place-content-center">
          <h1 className="mb-3 text-center text-4xl font-bold text-gray-700 md:text-center lg:text-left">
            THE ASRV APP
          </h1>
          <h2 className="text-1xl mb-3 text-center font-light text-gray-500 md:text-center lg:text-left">
            DOWNLOAD FOR EARLY ACCESS AND EXCLUSIVE DROPS.
          </h2>
          <div className="mx-auto w-96 md:mx-auto lg:mx-0">
            <DownloadApp />
          </div>
        </div>
      </div>

      <div className="mx-auto">
        <Advertisement
          srcImg="https://cdn.shopify.com/s/files/1/0297/6293/files/phil-4_1800x.png?v=1678912482"
          adText="“ASRV exists for the individual who relentlessly chases the next challenge, in search of that beautiful place between pressure and ability, where we find our deepest sense of purpose.”"
          buttonText="our philosophy"
          isCenter
          isSmallText
        />
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <Advertisement
            srcImg="https://asrv.com/cdn/shop/files/zach_mindset_750x960_crop_center.png"
            adText="MINDSET NEWSLETTER"
            buttonText="explore"
            className="mt-2 mb-2 lg:mx-1"
          />
          <Advertisement
            srcImg="https://asrv.com/cdn/shop/files/omar_cycle.png"
            adText="PRO TRAINING CLUB"
            buttonText="apply now"
            className="mb-2 lg:mx-1 lg:mt-2"
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
