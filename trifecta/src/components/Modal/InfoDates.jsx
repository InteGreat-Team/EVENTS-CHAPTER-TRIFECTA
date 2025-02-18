import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../Buttons/Button";
import Input from "../Inputs/Input";

const Modal = ({ showInfo, toggleModalInfo, selectedItem }) => {
  const handleCancel = () => {
    toggleModalInfo(); // Close the modal
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;
    return formattedDate;
  };

  return (
    <>
      {showInfo && (
        <div className="fixed inset-0 flex items-center justify-center w-full h-lvh font-inter bg-[#00000080]">
          <div className="absolute flex flex-col items-center justify-center bg-white px-8 py-6 font-medium rounded-md">
            <h1 className="flex justify-center text-lg mb-5 font-bold border-b-2 border-black w-full pb-3">
              Item Summary
            </h1>
            <div className="grid grid-cols-2 text-lg md:w-[410px]">
              <h1 className="font-semibold">Unit Price Last Update: </h1>
              <h1 className="text-center mb-3">
                {formatDate(selectedItem.unitpricelastupdate)}
              </h1>
              <h1 className="font-semibold">Retail Price Last Update: </h1>
              <h1 className="text-center mb-3">
                {formatDate(selectedItem.retailpricelastupdate)}
              </h1>
              <h1 className="font-semibold">Manufacturer Date: </h1>
              <h1 className="text-center mb-3">
                {formatDate(selectedItem.manufacturerdate)}
              </h1>
              <h1 className="font-semibold">Expiration Date: </h1>
              <h1 className="text-center ">
                {formatDate(selectedItem.expirationdate)}
              </h1>
            </div>

            <div className="mt-5 flex justify-end w-full flex-col">
              <Button
                onClick={handleCancel}
                text="Close"
                color="bg-red-dark mt-3"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
