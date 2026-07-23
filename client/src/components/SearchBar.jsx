function SearchBar({ search, setSearch }) {
  return (
    <div className="w-full flex justify-center">
      <div className="relative w-full max-w-3xl">

        {/* Search Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M16 10.5A5.5 5.5 0 115 10.5a5.5 5.5 0 0111 0z"
          />
        </svg>

        {/* Input */}
        <input
          type="text"
          placeholder="Search blogs by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            rounded-full
            border
            border-gray-300
            bg-white
            py-4
            pl-14
            pr-5
            text-lg
            shadow-md
            outline-none
            transition
            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-200
          "
        />
      </div>
    </div>
  );
}

export default SearchBar;