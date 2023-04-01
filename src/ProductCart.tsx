import { useState } from 'react'
import { Link } from 'react-router-dom'

function ProductCart(props: any) {
    const [productCount, setProductCount] = useState(1)

    if (!productCount) {
        setProductCount(1)
    }
    
    return (
        <>
            <div key={props.productId} className="m-5 flex flex-row">
                <div className="basis-1/4">
                    <img className="mx-auto w-40" src={props.image} alt="" />
                </div>
                <div className="ml-5 basis-3/4">
                    <Link to={`/products/${props.name.replace(/\W+/gi, "-").toLowerCase()}`}>{props.name}</Link>
                    <p>{props.size}</p>
                    <p>${props.price}</p>
                    <div className="flex flex-row">
                        <div className="basis-1/2 m-auto text-center border-[2px] border-indigo-500">
                            <div className="flex flex-row">
                                <div className="basis-1/3 hover:cursor-pointer" onClick={() => setProductCount(productCount - 1)}>-</div>
                                <div className="basis-1/3"><input className="text-center outline-none" type="number" value={productCount} onChange={e => setProductCount(e.target.valueAsNumber)} min="1" /></div>
                                <div className="basis-1/3 hover:cursor-pointer" onClick={() => setProductCount(productCount + 1)}>+</div>
                            </div>
                        </div>
                        <div className="basis-1/2 m-auto text-center">
                            <span className="hover:cursor-pointer underline underline-offset-4 hover:no-underline ">Remove</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductCart
