import { useState } from 'react'

function Product(props) {

    const [isShown, setIsShown] = useState(false)
    return (
        <>
            <div key={props.id} size={props.size} onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)} className="text-center">
                {!isShown && <img src={props.imageOne} className="mx-auto" />}
                {isShown && <img src={props.imageTwo} className="mx-auto" />}
                <p className="uppercase text-neutral-800 font-light text-sm mb-5">{props.name}</p>
                {!isShown && <p className="uppercase text-neutral-500 font-light">${props.price} usd</p>}
                {isShown && <p>{props.size.map((eachSize) =>
                    <span key={eachSize} className="border-solid border-2 border-indigo-600 px-5 mx-3">{eachSize}</span>
                )}</p>}
            </div>
        </>
    )
}

export default Product
