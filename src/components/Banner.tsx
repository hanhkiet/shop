type Props = {
  src: string;
  srcSmallScreen?: string;
};

function Banner(props: Props) {
  return (
    <>
      {props.src.split('.').pop() == 'mp4' ? (
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
      )}
      <img
        className="-z-10 block h-screen w-full object-cover brightness-[.80] md:hidden lg:hidden"
        src={props.srcSmallScreen ? props.srcSmallScreen : props.src}
        alt=""
      />
    </>
  );
}

export default Banner;
