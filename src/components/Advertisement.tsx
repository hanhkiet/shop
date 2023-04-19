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
        <div className={props.className ? props.className : ""}>
            <div className="relative m-1">
                <img alt="" className="object-cover brightness-50
                      w-full h-[32rem]" src={props.srcImg}
                />
                <div className={`absolute ${props.isCenter ? "bottom-28 md:bottom-32 lg:bottom-32" : "bottom-10"} mb-10 w-full text-center`}>
                    <div className="flex justify-center">
                        <h1 className={`pb-2 text-${props.textSize || 2}xl text-white font-light tracking-widest uppercase mb-5 ${props.isCenter ? "w-full md:w-[50%] lg:w-[50%]" : "w-[50%]"}`}>{props.adText}</h1>
                    </div>
                    <button className="uppercase bg-white text-gray-500 tracking-widest text-sm px-9 py-3 hover:bg-gray-200">{props.buttonText}</button>
                </div>

            </div>
        </div>
    )
}
