import { useState } from 'react'
import { Link } from 'react-router-dom'
function Product(props : any) {

    const [isShown, setIsShown] = useState(false)
    return (
        <>
            <div key={props.id} onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)} className="text-center w-fit mx-auto m-10">
                {!isShown && <img src={props.imageOne} className="mx-auto h-96 w-96" />}
                {isShown && <Link to={`/products/${props.name.replace(/\W+/gi, "-").toLowerCase()}`}><img src={props.imageTwo} className="mx-auto h-96 w-96" /></Link>}
                <Link to={`/products/${props.name.replace(/\W+/gi, "-").toLowerCase()}`}><p className="uppercase text-neutral-800 font-light text-sm mb-5">{props.name}</p></Link>
                {!isShown && <p className="uppercase text-neutral-500 font-light">${props.price} usd</p>}
                {isShown && <Link to="/">{props.size.map((eachSize: any) =>
                    <span key={eachSize} className="border-solid border-2 border-indigo-500 hover:border-indigo-900 px-5 mx-1">{eachSize}</span>
                )}</Link>}
            </div>
        </>
    )
}

export default Product
