function AccountPage() {
  return (
    <div className="relative lg:flex">
      <img
        className="-z-10 h-screen w-full object-cover lg:w-8/12"
        src="https://i.shgcdn.com/39e62f8f-e1a5-45e7-a573-91b95a8e0425/-/format/auto/-/preview/3000x3000/-/quality/lighter/"
        alt=""
      />
      <div className="absolute top-1/2 left-1/2 w-3/4 -translate-x-1/2 -translate-y-1/2 space-y-6 rounded-lg bg-neutral-50 p-6 text-center md:w-7/12 lg:static lg:flex lg:h-screen lg:translate-x-0 lg:translate-y-0 lg:flex-col lg:justify-center lg:space-y-8 lg:rounded-none lg:px-12">
        <div className="space-y-2">
          <h2 className="text-2xl font-light lg:text-3xl">Login</h2>
          <p className="text-sm font-light lg:text-base">
            Please enter your e-mail and password
          </p>
        </div>
        <form className="flex flex-col gap-3 lg:gap-4">
          <input
            className="input-field lg:text-base"
            type="email"
            placeholder="Email"
          />
          <input
            className="input-field lg:text-base"
            type="password"
            placeholder="Password"
          />
          <input className="button button-dark" type="button" value="login" />
        </form>
        <p className="text-sm font-light lg:text-base">
          Don't have an account? <a href="">Create one</a>
        </p>
      </div>
    </div>
  );
}

export default AccountPage;
