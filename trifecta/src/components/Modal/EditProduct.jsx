import React, { useState, useEffect } from "react";
import Button from "../Buttons/Button";
import axios from "axios";
import Input from "../Inputs/Input";

const Modal = ({ showEdit, toggleModalEdit, selectedItem }) => {
  const [editedItem, setEditedItem] = useState(
    selectedItem ? { ...selectedItem } : {}
  );
  const [originalItem, setOriginalItem] = useState(
    selectedItem ? { ...selectedItem } : {}
  );

  useEffect(() => {
    setEditedItem(selectedItem ? { ...selectedItem } : {});
    setOriginalItem(selectedItem ? { ...selectedItem } : {});
  }, [selectedItem]);

  // const handleInputChange = (fieldName, value) => {
  //   setEditedItem({ ...editedItem, [fieldName]: value });
  //   console.log(editedItem);
  // };

  const handleInputChange = (fieldName, value) => {
    setEditedItem((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const saveChanges = async () => {
    try {
      // Make an HTTP POST request to your Express backend with the updated data
      const response = await axios.post(
        "http://localhost:3001/api/updateItem",
        editedItem
      );
      console.log(response.data); // Log the response from the backend
      toggleModalEdit(); // Close the modal after successful save
      window.location.reload();
    } catch (error) {
      console.error("Error saving changes:", error);
      // Handle error if save operation fails
    }
  };

  const cancelChanges = () => {
    setEditedItem(originalItem); // Reset editedItem to originalItem
    toggleModalEdit();
  };

  console.log(editedItem.manufacturerdate);

  return (
    <>
      {showEdit && (
        <div className="fixed inset-0 flex items-center justify-center w-full h-lvh font-inter bg-[#00000080]">
          <div className="absolute flex flex-col items-center justify-center bg-white p-8 font-medium rounded-md ">
            <div className="flex flex-row justify-center items-center ">
              <h2 className="text-xl font-bold mb-3">Edit Product</h2>
            </div>

            <div className="md:w-60 max-h-[420px] overflow-y-auto no-scrollbar">
              <Input
                label="Item ID:"
                type="text"
                disabled="disabled"
                id="itemid"
                value={editedItem.itemid || selectedItem.itemid}
              />
              <Input
                label="Item Name:"
                type="text"
                id="itemname"
                value={editedItem.itemname || ""}
                onChange={(e) => handleInputChange("itemname", e.target.value)}
              />
              <Input
                label="Item Category:"
                type="text"
                id="itemcategory"
                value={editedItem.itemcategory || ""}
                onChange={(e) =>
                  handleInputChange("itemcategory", e.target.value)
                }
              />
              <Input
                label="Item Description:"
                type="text"
                id="itemdescription"
                value={editedItem.itemdescription || ""}
                onChange={(e) =>
                  handleInputChange("itemdescription", e.target.value)
                }
              />
              <Input
                label="Unit Price:"
                type="number"
                id="unitprice"
                value={editedItem.unitprice || ""}
                onChange={(e) => handleInputChange("unitprice", e.target.value)}
              />
              <Input
                label="Retail Price:"
                type="number"
                id="retailprice"
                value={editedItem.retailprice || ""}
                onChange={(e) =>
                  handleInputChange("retailprice", e.target.value)
                }
              />
              <Input
                label="Reorder Point:"
                type="number"
                id="reorderpoint"
                value={editedItem.reorderpoint || ""}
                onChange={(e) =>
                  handleInputChange("reorderpoint", e.target.value)
                }
              />
              <Input
                label="Reorder Quantity:"
                type="number"
                id="reorderquantity"
                value={editedItem.reorderquantity || ""}
                onChange={(e) =>
                  handleInputChange("reorderquantity", e.target.value)
                }
              />
              <Input
                label="Manufacturer Date:"
                type="date"
                id="manufacturerdate"
                value={
                  editedItem.manufacturerdate
                    ? new Date(
                        new Date(editedItem.manufacturerdate).getTime() +
                          86400000 // Adding 1 day in milliseconds
                      )
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  handleInputChange("manufacturerdate", e.target.value)
                }
              />
              <Input
                label="Expiration Date:"
                type="date"
                id="expirationdate"
                value={
                  editedItem.expirationdate
                    ? new Date(
                        new Date(editedItem.expirationdate).getTime() + 86400000 // Adding 1 day in milliseconds
                      )
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  handleInputChange("expirationdate", e.target.value)
                }
              />
              <Input
                label="Total Cost:"
                type="number"
                id="totalcost"
                value={editedItem.totalcost || ""}
                onChange={(e) => handleInputChange("totalcost", e.target.value)}
              />
              <Input
                label="Active Status:"
                type="select"
                id="activestatus"
                value={editedItem.activestatus ? "true" : "false"}
                onChange={(e) =>
                  handleInputChange("activestatus", e.target.value === "true")
                }
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </Input>
              <Input
                label="Action Flag:"
                type="text"
                id="actionflag"
                value={editedItem.actionflag || ""}
                onChange={(e) =>
                  handleInputChange("actionflag", e.target.value)
                }
              />
            </div>

            <div className="mt-5 flex justify-end w-full flex-col">
              <Button onClick={saveChanges} text="Save" color="bg-blue-save" />
              <Button
                onClick={cancelChanges}
                text="Cancel"
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
