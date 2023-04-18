type Props = {
    srcImg: string;
    adText: string;
    buttonText: string;
    className?: string;
};

export default function Advertisement(props: Props) {

    return (
        <div className={props.className ? props.className : ""}>
            <div className="relative m-1">
                <img alt="" className="object-cover
                      w-full h-96" src={props.srcImg}
                />
                <div className="div absolute bottom-10 mb-10 w-full text-center">
                    <h1 className="pb-2 text-2xl text-white font-light tracking-widest uppercase mb-5">{props.adText}</h1>
                    <button className="uppercase bg-white text-gray-500 tracking-widest text-sm px-9 py-3 hover:bg-gray-200">{props.buttonText}</button>
                </div>

            </div>
        </div>
    )
}
