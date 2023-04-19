import { useState } from 'react';

function Search() {
  const [searchResult, setSearchResult] = useState('');

  return (
    <div
      className={`${'md:h-[calc(100vh-68px)] lg:h-[calc(100vh-68px)]'} flex items-center justify-center`}
    >
      <form className="min-w-[20%] space-y-6 text-center">
        <h2 className="text-1xl font-extralight">Search</h2>
        <p className="text-sm font-light">
          Enter a word to search our products:
        </p>
        <div className="space-y-4">
          <input
            className="block w-full border px-4 py-2 outline-none"
            type="text"
            placeholder="Search..."
          />
        </div>
      </form>
    </div>
  );
}

export default Search;
