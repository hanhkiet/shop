import { useState } from 'react';
import { Link } from 'react-router-dom';

function CheckoutShippingSection() {
    const [checked, setChecked] = useState(true);
    return <div className='w-full'>
        <div className="relative rounded border p-3 grid gap-3">
        <div className='flex flex-row'>
                <div className='basis-2/12 text-gray-500'>Contact</div>
                <div className='basis-9/12'>longpqm19406c@st.uel.edu.vn</div>
                <div className='basis-1/12 text-sm grid items-center'><Link to="/checkout/information">Change</Link></div>
            </div>
            <div className='w-full h-px bg-gray-300'></div>
            <div className='flex flex-row'>
                <div className='basis-2/12 text-gray-500'>Ship to</div>
                <div className='basis-9/12'>199 Nguyen Van Thuong</div>
                <div className='basis-1/12 text-sm grid items-center'><Link to="/checkout/information">Change</Link></div>
            </div>
        </div>
        <h2 className="text-xl py-3">Shipping method</h2>
        <div className="relative rounded border grid">
            <div className="flex flex-row justify-between p-3">
                <div className='flex gap-3'>
                    <div className='grid items-start mt-1'>
                        <input type="radio" id="economy" value={'economy'} name="shipping_method" checked={checked} onClick={() => setChecked(true)} />
                    </div>
                    <div className='grid'>
                        <label htmlFor="economy">FedEx International Economy®</label>
                        <p className='text-gray-500 text-sm'>6 to 10 business days</p>
                    </div>
                </div>
                <p className='text-right font-[Mulish] font-bold'>$52.37</p>
            </div>
            <div className='w-full h-px bg-gray-300'></div>
            <div className="flex flex-row justify-between p-3">
                <div className="flex gap-3">
                    <div className='grid items-start mt-1'>
                        <input type="radio" id="priority" value={'priority'} name="shipping_method" checked={!checked} onClick={() => setChecked(false)} />
                    </div>
                    <div className='grid'>
                        <label htmlFor="priority">FedEx International Priority®</label>
                        <p className='text-gray-500 text-sm'>3 to 5 business days</p>
                    </div>
                </div>
                <p className='text-right font-[Mulish] font-bold'>$58.61</p>
            </div>
        </div>
    </div>;
}

export default CheckoutShippingSection;
