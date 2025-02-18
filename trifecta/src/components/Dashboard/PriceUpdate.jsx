import React, { useState, useEffect } from "react";
// import { useSelectedItem } from "../hooks/useSelectedItemContext";
import { useSelectedItem } from "../../hooks/useSelectedItemContext";

const PriceUpdate = () => {
  const { selectedItem, setSelectedItem } = useSelectedItem();

  return (
    <div className="border-2 border-black mt-3 ml-3 px-3 py-4 rounded-md shadow-lg">
      <div className="border-b border-black">
        <h1 className="py-3 px-10 font-semibold md:text-[20px]">
          Price Updates
        </h1>
      </div>
      <div className="mt-4">
        {selectedItem ? (
          <>
            <h1 className="font-medium">
              Unit Price: {selectedItem.unit_price}
            </h1>
            <h1 className="text-[13px]">
              Last Update:{" "}
              {new Date(
                selectedItem.unit_price_last_update
              ).toLocaleDateString()}
            </h1>
            <h1 className="font-medium mt-2">
              Retail Price: {selectedItem.retail_price}
            </h1>
            <h1 className="text-[13px]">
              Last Update:{" "}
              {new Date(
                selectedItem.retail_price_last_update
              ).toLocaleDateString()}
            </h1>
          </>
        ) : (
          <div className="flex justify-center">
            <h1 className="font-medium">Select an item</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceUpdate;
