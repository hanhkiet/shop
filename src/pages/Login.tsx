import { useState } from "react";
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

function Login() {

    const [zoom, setZoom] = useState(
        Math.round((window.devicePixelRatio / 1.25) * 100),
    );
    const handleZoom = () => {
        console.log(zoom)
        function onChange() {
            setZoom(Math.round((window.devicePixelRatio / 1.25) * 100));
        }
        matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`).addEventListener(
            'change',
            onChange,
            { once: true },
        );
    };
    handleZoom();

    return (
        <>
            <div className={`${isMobile ? "h-[calc(100vh-68px)]" : "md:h-[calc(100vh-68px)] lg:h-[calc(100vh-68px)]"} flex justify-center items-center`}>
                <form className="text-center space-y-6 min-w-[20%]">
                    <h2 className="text-1xl font-extralight">Login</h2>
                    <p className="text-sm font-light">Please enter your e-mail and password</p>
                    <div className="space-y-4">
                        <input className="block w-full outline-none border px-4 py-2" type="email" placeholder="Email" />
                        <input className="block w-full outline-none border px-4 py-2" type="password" placeholder="Password" />
                    </div>
                    <button className="uppercase block w-full py-3 text-sm font-light bg-neutral-800 text-neutral-50" type="submit">login</button>
                    <p className="text-sm font-light">Don't have an account? <a href="create-account.html">Create one</a></p>
                </form>
            </div>
        </>
    )
}

export default Login
