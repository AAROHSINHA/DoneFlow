function SearchBar() {
  return (
    <div className="w-full md:w-[35%] h-[50px] md:h-[70%]">
          <input
            type="text"
            placeholder="Search Tasks"
            className="w-full h-full bg-gray-100 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-gray-700 placeholder-gray-500"
          />
        </div>
  )
}

export default SearchBar
