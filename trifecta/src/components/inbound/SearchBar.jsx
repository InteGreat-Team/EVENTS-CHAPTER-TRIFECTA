
import { FaSearch } from "react-icons/fa";


const SearchBar = () => {
    return (
        
      <div className="bg-gray-200 w-64 h-8 rounded-lg shadow-lg flex items-center cursor-pointer lg:w-96 lg:h-10 ">
      <FaSearch className="ml-2 mr-2 text-base text-neutral-400 lg:ml-4 " />
      <input
          type="text"
          placeholder="Search here"
          className="flex-grow border-none bg-neutral-300 bg-transparent text-xs outline-none md:text-base md:pl-2"
      />
  </div>
        
      );
}

export default SearchBar