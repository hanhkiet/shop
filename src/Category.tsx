import { useState, useEffect } from 'react'
import Product from './Product'

function Category() {

    const [clickMode, setClickMode] = useState(false)
    const [gridMode, setGridMode] = useState(clickMode ? 2 : 3)
    const products = [
        {
            id: 1,
            name: "0714. TECH-TERRY WATERPROOF PANEL HOODIES - BLACK",
            price: 128,
            size: ["XS", "S", "M", "L", "XL"],
            image: ["https://cdn.shopify.com/s/files/1/0297/6293/products/0714Hoodie_Black_1200x.jpg?v=1678904575", "https://cdn.shopify.com/s/files/1/0297/6293/products/0734Shirt_Black_700x.jpg?v=1676403260"]
        },
        {
            id: 2,
            name: "0714. TECH-TERRY WATERPROOF PANEL HOODIES - BLACK",
            price: 128,
            size: ["XS", "S", "M", "L", "XL"],
            image: ["https://cdn.shopify.com/s/files/1/0297/6293/products/0714Hoodie_Black_1200x.jpg?v=1678904575", "https://cdn.shopify.com/s/files/1/0297/6293/products/0734Shirt_Black_700x.jpg?v=1676403260"]
        },
        {
            id: 3,
            name: "0714. TECH-TERRY WATERPROOF PANEL HOODIES - BLACK",
            price: 128,
            size: ["XS", "S", "M", "L", "XL"],
            image: ["https://cdn.shopify.com/s/files/1/0297/6293/products/0714Hoodie_Black_1200x.jpg?v=1678904575", "https://cdn.shopify.com/s/files/1/0297/6293/products/0734Shirt_Black_700x.jpg?v=1676403260"]
        },
        {
            id: 4,
            name: "0714. TECH-TERRY WATERPROOF PANEL HOODIES - BLACK",
            price: 128,
            size: ["XS", "S", "M", "L", "XL"],
            image: ["https://cdn.shopify.com/s/files/1/0297/6293/products/0714Hoodie_Black_1200x.jpg?v=1678904575", "https://cdn.shopify.com/s/files/1/0297/6293/products/0734Shirt_Black_700x.jpg?v=1676403260"]
        },
        {
            id: 5,
            name: "0714. TECH-TERRY WATERPROOF PANEL HOODIES - BLACK",
            price: 128,
            size: ["XS", "S", "M", "L", "XL"],
            image: ["https://cdn.shopify.com/s/files/1/0297/6293/products/0714Hoodie_Black_1200x.jpg?v=1678904575", "https://cdn.shopify.com/s/files/1/0297/6293/products/0734Shirt_Black_700x.jpg?v=1676403260"]
        },
        {
            id: 6,
            name: "0714. TECH-TERRY WATERPROOF PANEL HOODIES - BLACK",
            price: 128,
            size: ["XS", "S", "M", "L", "XL"],
            image: ["https://cdn.shopify.com/s/files/1/0297/6293/products/0714Hoodie_Black_1200x.jpg?v=1678904575", "https://cdn.shopify.com/s/files/1/0297/6293/products/0734Shirt_Black_700x.jpg?v=1676403260"]
        },
        {
            id: 7,
            name: "0714. TECH-TERRY WATERPROOF PANEL HOODIES - BLACK",
            price: 128,
            size: ["XS", "S", "M", "L", "XL"],
            image: ["https://cdn.shopify.com/s/files/1/0297/6293/products/0714Hoodie_Black_1200x.jpg?v=1678904575", "https://cdn.shopify.com/s/files/1/0297/6293/products/0734Shirt_Black_700x.jpg?v=1676403260"]
        },
        {
            id: 8,
            name: "0714. TECH-TERRY WATERPROOF PANEL HOODIES - BLACK",
            price: 128,
            size: ["XS", "S", "M", "L", "XL"],
            image: ["https://cdn.shopify.com/s/files/1/0297/6293/products/0714Hoodie_Black_1200x.jpg?v=1678904575", "https://cdn.shopify.com/s/files/1/0297/6293/products/0734Shirt_Black_700x.jpg?v=1676403260"]
        },
        {
            id: 9,
            name: "0714. TECH-TERRY WATERPROOF PANEL HOODIES - BLACK",
            price: 128,
            size: ["XS", "S", "M", "L", "XL"],
            image: ["https://cdn.shopify.com/s/files/1/0297/6293/products/0714Hoodie_Black_1200x.jpg?v=1678904575", "https://cdn.shopify.com/s/files/1/0297/6293/products/0734Shirt_Black_700x.jpg?v=1676403260"]
        },
        {
            id: 10,
            name: "0714. TECH-TERRY WATERPROOF PANEL HOODIES - BLACK",
            price: 128,
            size: ["XS", "S", "M", "L", "XL"],
            image: ["https://cdn.shopify.com/s/files/1/0297/6293/products/0714Hoodie_Black_1200x.jpg?v=1678904575", "https://cdn.shopify.com/s/files/1/0297/6293/products/0734Shirt_Black_700x.jpg?v=1676403260"]
        }
    ]
    const listItems = products.map((product) =>
    <Product key={product.id} name={product.name} price={product.price} imageOne={product.image[0]} imageTwo={product.image[1]} size={product.size} />
);
    const handleClickMode1 = () => {
        setClickMode(true)
        setGridMode(2)
    }
    const handleClickMode2 = () => {
        setClickMode(false)
        setGridMode(3)
    }
    return (
        <>
            <div className="relative mb-10 z-50">
                <div className="sort fixed left-0 right-0 bg-white">
                    <div className="flex flex-row-reverse md:flex-row lg:flex-row">
                        <div className="basis-1/3 lg:basis-1/6 border-2 grid content-center flex justify-center">
                            <div className="flex justify-between">
                                <img onClick={handleClickMode1} src="https://cdn-icons-png.flaticon.com/512/238/238910.png" alt="" className={`cursor-pointer h-5 mr-5 ${clickMode ? 'opacity-100' : 'opacity-50'}`} />
                                <img onClick={handleClickMode2} src="https://cdn-icons-png.flaticon.com/512/3603/3603178.png" alt="" className={`cursor-pointer h-5 ${clickMode ? 'opacity-50' : 'opacity-100'}`} />
                                {/* https://cdn-icons-png.flaticon.com/512/25/25394.png */}
                            </div>
                        </div>
                        <div className="basis-0 md:basis-full lg:basis-full border-t-2 border-b-2 grid content-center flex justify-center md:block lg:block"></div>
                        <div className="basis-1/3 lg:basis-1/6 border-2 flex justify-center">
                            <p className="font-light">Sort</p> <img src="https://cdn-icons-png.flaticon.com/512/2985/2985150.png" alt="" className='ml-3 w-5' />
                        </div>
                        <div className="basis-1/3 lg:basis-1/6 border-2 grid content-center flex justify-center block lg:hidden">
                            <span className="font-light">Filter</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex">
                <div className="basis-1/6 hidden lg:block">
                    <label className="uppercase">product type</label>
                    <ul className="capitalize">
                        <li>hoodies</li>
                        <li>long sleeves</li>
                        <li>outerwear</li>
                        <li>short sleeves</li>
                        <li>tanks</li>
                    </ul>
                    <label className="uppercase">activity</label>
                    <ul className="capitalize">
                        <li>rec</li>
                        <li>train</li>
                        <li>pro</li>
                    </ul>
                    <label className="uppercase">color type</label>
                    <ul className="capitalize">
                        <li>black</li>
                        <li>blue</li>
                        <li>brown</li>
                        <li>pink</li>
                        <li>grey</li>
                        <li>off-white</li>
                        <li>red</li>
                        <li>white</li>
                    </ul>
                </div>
                <div className={`basis-auto grid grid-cols-${gridMode}`}>
                    {listItems}
                    
                </div>
            </div>
        </>
    )
}

export default Category
