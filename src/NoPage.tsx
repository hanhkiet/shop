import { useEffect } from "react"
export default function NoPage() {

    // return to top when change path or component
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <div className="grid content-center h-screen object-fit">
                <div className="relative w-full h-[300px] grid content-center">
                    <img className="mx-auto brightness-0" src="https://cdn.shopify.com/s/files/1/0297/6293/files/ASRV-Wings-47x40.png?v=1628017603" />
                    <div className="center text-center mt-10">
                        <a className="text-white bg-slate-700 font-bold text-center mx-100 text-5xl p-5">DSG - 0404</a>
                    </div>
                    <img src="https://cdn.shopify.com/s/files/1/0297/6293/files/only-those-who-risk-are-occasionally-on-the-wrong-page.png" className="mx-auto mt-10" />
                </div>
                <div className="absolute w-full h-[300px] opacity-0 top-0"></div>
                <div className="text-center p-10">
                    <a href="google.com" className="bg-black text-white font-bold px-5 py-3 hover:opacity-80">BACK TO HOMEPAGE</a>
                </div>
            </div>
        </>
    )
}
