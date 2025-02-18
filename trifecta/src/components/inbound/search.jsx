import { FaSearch } from "react-icons/fa";

const Search = ({
  label,
  type,
  name,
  id,
  value,
  onChange,
  disabled,
  children,
  placeholder,
  onKeyDown,
}) => {
  return (
    <div>
      <label htmlFor={id} className="mb-1">
        {label}
      </label>
      {type === 'select' ? (
        <select
          name={id}
          id={id}
          value={value}
          onChange={onChange}
          className="mb-2 block w-full rounded-md border-0 py-[10px] pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          {children}
        </select>
      ) : type === 'search' ? (
        <div className="bg-gray-200 w-64 h-8 rounded-lg shadow-lg flex items-center cursor-pointer lg:w-96 lg:h-10 ">
      <FaSearch className="ml-2 mr-2 text-base text-neutral-400 lg:ml-4 " />
      <input
          type="text"
          placeholder="Search here"
          className="flex-grow border-none bg-neutral-300 bg-transparent text-xs outline-none md:text-base md:pl-2"
      />
  </div>
      ) : (
        <input
          type={type}
          name={id}
          id={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="mb-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      )}
    </div>
  )
}

export default Search
