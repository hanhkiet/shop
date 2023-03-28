import { useState } from 'react'

function Product(props) {

    const [isShown, setIsShown] = useState(false)
    return (
        <>
            <div key={props.id} size={props.size} onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)} className="text-center m-10">
                {!isShown && <img src={props.imageOne} className="mx-auto h-96 w-96" />}
                {isShown && <img src={props.imageTwo} className="mx-auto h-96 w-96" />}
                <p className="uppercase text-neutral-800 font-light text-sm mb-5">{props.name}</p>
                {!isShown && <p className="uppercase text-neutral-500 font-light">${props.price} usd</p>}
                {isShown && <span>{props.size.map((eachSize) =>
                    <span key={eachSize} className="border-solid border-2 border-indigo-600 px-5 mx-3">{eachSize}</span>
                )}</span>}
            </div>
        </>
    )
}

export default Product
