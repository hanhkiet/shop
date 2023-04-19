type Props = {
  srcImg: string;
  adText: string;
  buttonText: string;
  className?: string;
  textSize?: Number;
  isCenter?: Boolean;
};

export default function Advertisement(props: Props) {
  return (
    <div className={props.className ? props.className : ''}>
      <div className="relative m-1">
        <img
          alt=""
          className="h-[32rem] w-full
                      object-cover brightness-50"
          src={props.srcImg}
        />
        <div
          className={`absolute ${
            props.isCenter ? 'bottom-28 md:bottom-32 lg:bottom-32' : 'bottom-10'
          } mb-10 w-full text-center`}
        >
          <div className="flex justify-center">
            <h1
              className={`pb-2 text-${
                props.textSize || 2
              }xl mb-5 font-light uppercase tracking-widest text-white ${
                props.isCenter ? 'w-full md:w-[50%] lg:w-[50%]' : 'w-[50%]'
              }`}
            >
              {props.adText}
            </h1>
          </div>
          <button className="bg-white px-9 py-3 text-sm uppercase tracking-widest text-gray-500 hover:bg-gray-200">
            {props.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
