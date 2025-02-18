import React from "react";
import { RiFileAddFill } from "react-icons/ri";

const Button = ({ onClick, text, color, type, toggleModalAdd }) => {
  return (
    <>
      {/* <button
        className={`px-4 py-2 rounded-md text-white ${color}`}
        onClick={onClick}
        type={type}
      >
        {text}
      </button> */}

      {type === "addProduct" ? (
        <button
          onClick={toggleModalAdd}
          className="bg-brand-purple text-sm md:w-[9rem] mt-1 p-2 flex items-center justify-center rounded-md shadow-md text-white cursor-pointer whitespace-nowrap"
        >
          <span className="text-base md:mr-2 ">
            <RiFileAddFill />
          </span>
          <span className="hidden md:block">Add Product</span>
        </button>
      ) : (
        <button
          className={`px-4 py-2 rounded-md text-white ${color}`}
          onClick={onClick}
          type={type}
        >
          {text}
        </button>
      )}
    </>
  );
};

export default Button;
