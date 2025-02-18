import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../Buttons/Button";
import Input from "../Inputs/Input";

const Modal = ({ showAdd, toggleModalAdd }) => {
  const [formData, setFormData] = useState({
    itemname: "",
    itemcategory: "",
    itemdescription: "",
    unitprice: "",
    retailprice: "",
    reorderpoint: "",
    reorderquantity: "",
    manufacturerdate: "",
    expirationdate: "",
    totalcost: "",
    activestatus: "",
    actionflag: "",
  });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "activestatus" ? value === "true" : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/addItem", formData);
      toggleModalAdd(); // Close the modal after successful submission
      window.location.reload();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleCancel = () => {
    setFormData({
      itemname: "",
      itemcategory: "",
      itemdescription: "",
      unitprice: "",
      retailprice: "",
      reorderpoint: "",
      reorderquantity: "",
      manufacturerdate: "",
      expirationdate: "",
      totalcost: "",
      activestatus: "",
      actionflag: "",
    });
    toggleModalAdd(); // Close the modal
  };

  return (
    <>
      {showAdd && (
        <div className="fixed inset-0 flex items-center justify-center w-full h-lvh font-inter bg-[#00000080]">
          <div className="absolute flex flex-col items-center justify-center bg-white px-5 py-6 font-medium rounded-md">
            <div className="flex flex-row justify-center items-center ">
              <h2 className="text-xl font-bold mb-3">Add Product</h2>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="md:w-60 max-h-[420px] overflow-y-auto no-scrollbar ">
                <Input
                  label="Item ID:"
                  type="text"
                  disabled="disabled"
                  id="itemid"
                />
                <Input
                  label="Item Name:"
                  type="text"
                  id="itemname"
                  value={formData.itemname}
                  onChange={handleChange}
                />
                <Input
                  label="Item Category:"
                  type="text"
                  id="itemcategory"
                  value={formData.itemcategory}
                  onChange={handleChange}
                />
                <Input
                  label="Item Description:"
                  type="text"
                  id="itemdescription"
                  value={formData.itemdescription}
                  onChange={handleChange}
                />
                <Input
                  label="Unit Price:"
                  type="number"
                  id="unitprice"
                  value={formData.unitprice}
                  onChange={handleChange}
                />
                <Input
                  label="Retail Price:"
                  type="number"
                  id="retailprice"
                  value={formData.retailprice}
                  onChange={handleChange}
                />
                <Input
                  label="Reorder Point:"
                  type="number"
                  id="reorderpoint"
                  value={formData.reorderpoint}
                  onChange={handleChange}
                />
                <Input
                  label="Reorder Quantity:"
                  type="number"
                  id="reorderquantity"
                  value={formData.reorderquantity}
                  onChange={handleChange}
                />
                <Input
                  label="Manufacturer Date:"
                  type="date"
                  id="manufacturerdate"
                  value={formData.manufacturerdate}
                  onChange={handleChange}
                />
                <Input
                  label="Expiration Date:"
                  type="date"
                  id="expirationdate"
                  value={formData.expirationdate}
                  onChange={handleChange}
                />
                <Input
                  label="Total Cost:"
                  type="number"
                  id="totalcost"
                  value={formData.totalcost}
                  onChange={handleChange}
                />
                <Input
                  label="Active Status:"
                  type="select"
                  id="activestatus"
                  value={formData.activestatus ? "true" : "false"}
                  onChange={handleChange}
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </Input>
                <Input
                  label="Action Flag:"
                  type="text"
                  id="actionflag"
                  value={formData.actionflag}
                  onChange={handleChange}
                />
              </div>

              <div className="mt-5 flex justify-end w-full flex-col">
                <Button type="submit" text="Save" color="bg-blue-save" />
                <Button
                  onClick={handleCancel}
                  text="Cancel"
                  color="bg-red-dark mt-3"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
