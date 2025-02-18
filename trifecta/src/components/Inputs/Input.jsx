import { IoIosSearch } from "react-icons/io";

const Input = ({
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
      <div className="flex items-start ">
        <label htmlFor={id} className="mb-1">
          {label}
        </label>
      </div>
      {type === "select" ? (
        <div>
          <select
            name={id}
            id={id}
            value={value}
            onChange={onChange}
            className="mb-2 block w-full rounded-md border-0 py-[10px] pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            {children}
          </select>
        </div>
      ) : type === "search" ? (
        <div className="border-2 border-black rounded-md flex flex-row items-center pl-2 pr-3 text-sm">
          <IoIosSearch className="text-[23px]" />
          <input
            type="search"
            placeholder={placeholder}
            name={id}
            id={id}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            className="py-[5px] px-3 outline-none "
          />
        </div>
      ) : type === "date" ? (
        <div className="">
          <input
            type="date"
            name={id}
            id={id}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className="mb-2 w-full rounded-md py-1.5 pl-3 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      ) : (
        <div className="">
          <input
            type={type}
            name={id}
            id={id}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className="mb-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      )}
    </div>
  );
};

export default Input;
