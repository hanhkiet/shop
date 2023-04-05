import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
      <footer className="z-40 mb-10 mt-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="footer-item mx-10 text-center md:text-left lg:text-left">
              <h2 className="mb-5 font-bold">INFO</h2>
              <div>
                <ul>
                  <li>
                    <Link to="/" className="font-light hover:opacity-80">
                      MANUFACTURING
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="font-light hover:opacity-80">
                      DISCOUNTS
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="font-light hover:opacity-80">
                      PRIVACY POLICY
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="font-light hover:opacity-80">
                      TERMS OF SERVICE
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="font-light hover:opacity-80">
                      ACCESSIBILITY STATEMENT
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer-item mx-10 text-center md:text-left lg:text-left">
              <h2 className="mb-5 font-bold">HELP</h2>
              <ul>
                <li>
                  <Link to="/" className="font-light hover:opacity-80">
                    HELP CENTER
                  </Link>
                </li>
                <li>
                  <Link to="/" className="font-light hover:opacity-80">
                    SHIPPING
                  </Link>
                </li>
                <li>
                  <Link to="/" className="font-light hover:opacity-80">
                    RETURNS
                  </Link>
                </li>
                <li>
                  <Link to="/" className="font-light hover:opacity-80">
                    CONTACT
                  </Link>
                </li>
                <li>
                  <Link to="/" className="font-light hover:opacity-80">
                    WHOLESALE REQUEST
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer-item mx-10 text-center md:text-left lg:text-left">
              <h2 className="mb-5 font-bold">SUBSCRIBE</h2>
              <p>For early access to the latest releases.</p>
              <div className="sm:flex sm:justify-center">
                <form className="w-full">
                  <div className="flex items-center border-b border-teal-500 py-2">
                    <input
                      className="mr-3 w-full appearance-none border-none bg-transparent py-1 px-2 leading-tight text-gray-700 focus:outline-none"
                      type="text"
                      placeholder="Email address"
                      aria-label="Full name"
                    />
                    <button
                      className="flex-shrink-0 rounded border-4 border-teal-500 bg-teal-500 py-1 px-2 text-sm text-white hover:border-teal-700 hover:bg-teal-700"
                      type="button"
                    >
                      SUBSCRIBE
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="footer-item mx-10 text-center md:text-left lg:text-left">
              <h2 className="mb-5 font-bold">CONNECT</h2>
              <div className="mb-5 flex justify-between">
                <a
                  className="hover:opacity-80"
                  href="https://www.facebook.com/asrvsportswear"
                  target="_blank"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/20/20673.png"
                    className="h-5"
                  />
                </a>
                <a
                  className="hover:opacity-80"
                  href="https://twitter.com/asrvsportswear"
                  target="_blank"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/733/733635.png"
                    className="h-5"
                  />
                </a>
                <a
                  className="hover:opacity-80"
                  href="https://www.instagram.com/asrv"
                  target="_blank"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1384/1384031.png"
                    className="h-5"
                  />
                </a>
                <a
                  className="hover:opacity-80"
                  href="https://www.youtube.com/channel/UCYUwDoGKEGis5Q1mASQA7Kg"
                  target="_blank"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1384/1384028.png"
                    className="h-5"
                  />
                </a>
                <a
                  className="hover:opacity-80"
                  href="https://www.tiktok.com/@asrv"
                  target="_blank"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3046/3046120.png"
                    className="h-5"
                  />
                </a>
                <a
                  className="hover:opacity-80"
                  href="https://www.linkedin.com/company/asrv"
                  target="_blank"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3536/3536569.png"
                    className="h-5"
                  />
                </a>
              </div>
              <div className="flex">
                <a
                  className="mr-3 hover:opacity-80"
                  href="https://apps.apple.com/us/app/asrv/id1572892588"
                  target="_blank"
                >
                  <img
                    className=""
                    src="https://cdn.shopify.com/s/files/1/0297/6293/files/apple-button-400x134.png"
                  />
                </a>
                <a
                  className="ml-3 hover:opacity-80"
                  href="https://play.google.com/store/apps/details?id=co.tapcart.app.id_CxUw9Bapyn"
                  target="_blank"
                >
                  <img
                    className=""
                    src="https://cdn.shopify.com/s/files/1/0297/6293/files/google-button-400x134.png"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
