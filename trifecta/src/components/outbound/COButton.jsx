import { useState } from "react";
import {
  IoIosAddCircleOutline,
  IoIosAddCircle,
  IoIosClose,
} from "react-icons/io";
import axios from "axios";

const COButton = () => {
  const [showForm, setShowForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [items, setItems] = useState([
    { itemName: "", quantity: "", itemDescription: "" },
  ]);

  const handleItemChange = (e, index, field) => {
    const newItems = items.map((item, i) =>
      i === index ? { ...item, [field]: e.target.value } : item
    );
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { itemName: "", quantity: "", itemDescription: "" }]);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    if (!showForm) {
      setModalClosed(true);
      setCurrentStep(1);
    }
  };

  const [customerInfo, setCustomerInfo] = useState({
    id: "",
    name: "",
    contact: "",
    email: "",
    address: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    /* try {
          
          await axios.post('http://localhost:3003/api/addCO', { customerInfo, items })
          window.location.reload()
        } catch (error) {
          console.error('Error submitting form:', error)
        } */
  };

  const handleCustomerInfoChange = (field, value) => {
    setCustomerInfo((prevInfo) => ({
      ...prevInfo,
      [field]: value,
    }));
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmitClose = () => {
    handleSubmit();
    toggleForm();
  };
  const [modalClosed, setModalClosed] = useState(false);

  return (
    <div className="flex justify-center">
      <div>
        <button
          onClick={toggleForm}
          className="bg-yellow text-2xl p-1 px-3 rounded-md shadow-lg flex items-center justify-center lg:p-2 lg:px-6"
          aria-label="Add Customer Order"
        >
          <IoIosAddCircle className="md:mr-2" />
          <span className="hidden md:inline text-base">Add Customer Order</span>
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="fixed  inset-0 bg-white bg-opacity-100 overflow-y-auto p-4 shadow-lg rounded-lg m-6 max-w-full sm:max-w-lg md:max-w-md lg:max-w-xl ">
            <button
              onClick={toggleForm}
              className="absolute top-0 right-0 mt-4 mr-4 text-3xl text-gray-500 hover:text-red-700"
              aria-label="Close"
            >
              <IoIosClose />
            </button>
            <div className="mb-4">
              <div className="flex items-center justify-center mb-4">
                {/* Step indicators */}
                <div className="flex items-center">
                  <div
                    className={`w-20 h-12 text-white font-bold rounded-full ${
                      currentStep === 1 ? "bg-brand-blue" : "bg-purple-light"
                    } flex items-center justify-center`}
                  >
                    1
                  </div>
                  <div className="w-1/3 bg-black h-0.5"></div>
                  <div
                    className={`w-20 h-12 text-white font-bold rounded-full ${
                      currentStep === 2 ? "bg-brand-blue" : "bg-purple-light"
                    } flex items-center justify-center`}
                  >
                    2
                  </div>
                  <div className="w-1/3 bg-black h-0.5"></div>
                  <div
                    className={`w-20 h-12 text-white font-bold rounded-full ${
                      currentStep === 3 ? "bg-brand-blue" : "bg-purple-light"
                    } flex items-center justify-center`}
                  >
                    3
                  </div>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-center mb-10 mt-14">
                Customer Order Form
              </h2>
              {/* Form content based on current step */}
              {currentStep === 1 && (
                <div>
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="customerName"
                  >
                    Customer Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full p-2 mb-3 text-sm border rounded shadow-lg"
                    id="customerName"
                    value={customerInfo.name}
                    onChange={(e) =>
                      handleCustomerInfoChange("name", e.target.value)
                    }
                    type="text"
                    placeholder=""
                  />

                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="contactName"
                  >
                    Contact <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full p-2 mb-3 text-sm border rounded shadow-lg"
                    id="contactName"
                    value={customerInfo.contact}
                    onChange={(e) =>
                      handleCustomerInfoChange("contact", e.target.value)
                    }
                    type="text"
                    placeholder=""
                  />

                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="emailAdd"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full p-2 mb-3 text-sm border rounded shadow-lg"
                    id="emailAdd"
                    value={customerInfo.email}
                    onChange={(e) =>
                      handleCustomerInfoChange("email", e.target.value)
                    }
                    type="text"
                    placeholder=""
                  />

                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="City"
                  >
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full p-2 mb-3 text-sm border rounded shadow-lg"
                    id="Address"
                    value={customerInfo.address}
                    onChange={(e) =>
                      handleCustomerInfoChange("address", e.target.value)
                    }
                    type="text"
                    placeholder=""
                  />

                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="City"
                  >
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full p-2 mb-3 text-sm border rounded shadow-lg"
                    id="City"
                    value={customerInfo.city}
                    onChange={(e) =>
                      handleCustomerInfoChange("city", e.target.value)
                    }
                    type="text"
                    placeholder=""
                  />

                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="State"
                  >
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full p-2 mb-3 text-sm border rounded shadow-lg"
                    id="State"
                    value={customerInfo.state}
                    onChange={(e) =>
                      handleCustomerInfoChange("state", e.target.value)
                    }
                    type="text"
                    placeholder=""
                  />

                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="Country"
                  >
                    Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full p-2 mb-3 text-sm border rounded shadow-lg"
                    id="customerName"
                    value={customerInfo.country}
                    onChange={(e) =>
                      handleCustomerInfoChange("country", e.target.value)
                    }
                    type="text"
                    placeholder=""
                  />

                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="zipCode"
                  >
                    Zip Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full p-2 mb-3 text-sm border rounded shadow-lg"
                    id="zipCode"
                    value={customerInfo.zip}
                    onChange={(e) =>
                      handleCustomerInfoChange("zip", e.target.value)
                    }
                    type="text"
                    placeholder=""
                  />
                  <div className="flex justify-center">
                    <button
                      className="w-40 bg-brand-blue text-white py-2 px-4 rounded hover:bg-blue-700 mt-10"
                      onClick={handleNext}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="step2-form">
                  <h2 className="text-2xl font-bold text-center mb-6">
                    Item Info
                  </h2>
                  {items.map((item, index) => (
                    <div key={index} className="item-entry mb-4">
                      <input
                        className="w-full p-2 mb-3 text-sm border rounded shadow-md"
                        type="text"
                        placeholder="Item Name"
                        value={item.itemName}
                        onChange={(e) => handleItemChange(e, index, "itemName")}
                      />
                      <input
                        className="w-full p-2 mb-3 text-sm border rounded shadow-md"
                        type="number"
                        placeholder="Quantity"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(e, index, "quantity")}
                      />
                      <input
                        className="w-full p-2 mb-3 text-sm border rounded shadow-md"
                        type="text"
                        placeholder="Item Description"
                        value={item.itemDescription}
                        onChange={(e) =>
                          handleItemChange(e, index, "itemDescription")
                        }
                      />
                    </div>
                  ))}
                  <button
                    className="bg-yellow-400 text-white p-2 rounded-full shadow-md flex items-center justify-center hover:bg-blue-700"
                    onClick={addItem}
                  >
                    <IoIosAddCircleOutline className="text-xl" />
                  </button>

                  {/* Form navigation buttons */}
                  <div className="flex justify-between">
                    <button
                      className="bg-purple-light text-white mt-10 py-2 px-6 rounded hover:bg-brand-purple"
                      onClick={handlePrevious}
                    >
                      Previous
                    </button>
                    <button
                      className="bg-brand-blue text-white mt-10 py-2 px-10 rounded hover:bg-blue-700"
                      onClick={handleNext}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="step3-summary">
                  <h2 className="text-2xl font-bold text-center mb-6">
                    Summary
                  </h2>
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold mb-4">Customer Info</h3>
                    <p>
                      <strong>Customer Name:</strong> {customerInfo.name}
                    </p>
                    <p>
                      <strong>Contact:</strong> {customerInfo.contact}
                    </p>
                    <p>
                      <strong>Email Address:</strong> {customerInfo.email}
                    </p>
                    <p>
                      <strong>Address:</strong> {customerInfo.address}
                    </p>
                    <p>
                      <strong>City:</strong>
                      {customerInfo.city}
                    </p>
                    <p>
                      <strong>State:</strong>
                      {customerInfo.state}
                    </p>
                    <p>
                      <strong>Country:</strong>
                      {customerInfo.country}
                    </p>
                    <p>
                      <strong>Zip Code:</strong>
                      {customerInfo.zip}
                    </p>
                  </div>
                  <div className="mb-2">
                    <h3 className="text-2xl font-bold mb-4">Order Info</h3>
                    {items.map((item, index) => (
                      <div key={index} className="mb-2">
                        <p>
                          <strong>Item Name:</strong> {item.itemName}
                        </p>
                        <p>
                          <strong>Description:</strong> {item.itemDescription}
                        </p>
                        <p>
                          <strong>Quantity:</strong> {item.quantity}
                        </p>
                        <p>
                          <strong>Unit Price:</strong> {item.unitPrice}
                        </p>
                        <p>
                          <strong>Total:</strong>{" "}
                          {item.quantity * item.unitPrice}
                        </p>
                      </div>
                    ))}
                    <p className="text-lg font-bold">
                      <strong>Total Price:</strong>{" "}
                      {items.reduce(
                        (acc, item) => acc + item.quantity * item.unitPrice,
                        0
                      )}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <button
                      className="bg-purple-light text-white mt-10 py-2 px-6 rounded hover:bg-brand-purple"
                      onClick={handlePrevious}
                    >
                      Previous
                    </button>
                    <button
                      className="bg-brand-blue text-white mt-10 py-2 px-10 rounded hover:bg-blue-700"
                      onClick={handleSubmitClose}
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default COButton;
