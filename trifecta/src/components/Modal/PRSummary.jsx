import React, { useState, useEffect } from "react";
import PRdata from "../ProductReq/PRdata";
import CloseBtn from "../Buttons/CloseBtn";
import InputField from "../InputField/InputField";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const PRSummary = ({ closeModal, type, row, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(row.status || "Pending");
  const [invoicenum, setInvoicenum] = useState(row.invoiceno || "");
  const [selectedDate, setSelectedDate] = useState(null);
  const [receivedDate, setReceivedDate] = useState(null);
  const [file, setFile] = useState(null);

  const {
    purchaseno,
    purchaseordernum,
    suppliername,
    targetdeliverydate,
    ordercreated,
    itemname,
    itemdesc,
    quantity,
    status,
    item,
    itemdescription,
    statusPO,
    unitprice,
    totalamount,
    invoiceno,
    orderreceived,
    orderpaid,
  } = row;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (type === "PurchaseRequest") {
          const response = await axios.get(
            `http://localhost:3002/api/items/${purchaseno}`
          );
          if (Array.isArray(response.data)) {
            setData(response.data);
            console.log(data);
          } else {
            console.log("Invalid response data format");
          }
        } else if (type === "PurchaseOrder") {
          const response = await axios.get(
            `http://localhost:3002/api/itemsPO/${purchaseordernum}`
          );
          if (Array.isArray(response.data)) {
            setData(response.data);
            console.log(data);
          } else {
            console.log("Invalid response data format");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [purchaseno]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleOrderPaidDateChange = (date) => {
    setSelectedDate(date);
    setSelectedStatus("Paid");
  };

  const handleOrderReceivedDateChange = (date) => {
    setReceivedDate(date);
    setSelectedStatus("Received");
  };

  useEffect(() => {
    console.log("Selected Date:", selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    console.log("Selected Date:", receivedDate);
  }, [receivedDate]);

  const nextEntry = () => {
    if (currentIndex < PRdata.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const totalAmount = () => {
    let totalAmount = 0;
    data.forEach((item) => {
      const itemTotal =
        type === "PurchaseOrder"
          ? item.quantity * item.unitprice
          : item.quantity;
      totalAmount += itemTotal;
    });
    return totalAmount;
  };

  const handleInputChange = (index, value) => {
    const updatedItems = [...data];
    updatedItems[index].unitprice = value;
    setData(updatedItems);
  };

  useEffect(() => {
    const newTotal = totalAmount();
    setTotal(newTotal);
  }, [data, type]);

  useEffect(() => {
    // Reset total when currentIndex or type changes
    setTotal(0);
  }, [currentIndex, type]);

  const handleSave = async () => {
    try {
      const adjustedSelectedDate = selectedDate
        ? new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000)
        : orderpaid;
      const adjustedReceivedDate = receivedDate
        ? new Date(receivedDate.getTime() + 24 * 60 * 60 * 1000)
        : orderreceived;

      const response = await axios.post(
        "http://localhost:3001/api/addPurchaseOrderInfo",
        {
          purchaseordernum,
          invoiceno: invoicenum,
          status: selectedStatus,
          items: data.map((item) => ({
            itemname: item.item,
            unitprice: item.unitprice,
          })),
          totalcost: totalAmount(),
          orderreceived: adjustedReceivedDate,
          orderpaid: adjustedSelectedDate,
        }
      );
      console.log(response.data);
      closeModal();
      window.location.reload();
    } catch (error) {
      console.error("Error saving purchase order information:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 shadow bg-[#00000080] p-2 ">
      <div className="bg-white flex items-center flex-col overflow-y-auto no-scrollbar max-h-[600px]  p-4 rounded-md">
        <h1 className="title flex text-center  font-bold py-1 mt-2 ">
          {type === "PurchaseRequest"
            ? "Purchase Request Summary"
            : "Purchase Order Summary"}
        </h1>

        <div className="border-b-[0.1rem] w-[23rem] border-transparent border-gradient my-[0.3rem] mb-4"></div>

        <div className="flex justify-start mt-1 text-sm ">
          <div className=" text-left ">
            {type === "PurchaseOrder" && (
              <div className="pt-1 px-4  grid grid-cols-2 mb-2 ">
                <h1 className="  font-semibold ">Order Created:</h1>
                <h1 className="font-light  border shadow w-28 py-1 px-2 rounded items-center">
                  {ordercreated}
                </h1>
              </div>
            )}
            {type === "PurchaseOrder" && (
              <div className="pt-1 px-4 grid grid-cols-2 mb-2 ">
                <h1 className="font-semibold">Target Delivery Date:</h1>
                <h1 className="font-light  border shadow w-28 py-1 px-2 rounded items-center">
                  {targetdeliverydate}
                </h1>
              </div>
            )}
            {type === "PurchaseOrder" && (
              <div className=" px-4 mt-1  grid grid-cols-2 mb-2">
                <h1 className="font-semibold flex items-center">Order Paid:</h1>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleOrderPaidDateChange}
                  value={
                    orderpaid !== "01-01-1970" ? orderpaid : "" || selectedDate
                  }
                  // value={orderpaid || selectedDate}
                  dateFormat="MM-dd-yyyy"
                  minDate={new Date()}
                  placeholderText="Select a date"
                  disabled={orderpaid !== "01-01-1970"}
                  className="  w-28 flex justify-center items-center rounded py-1 px-2 border shadow "
                />{" "}
              </div>
            )}
            {type === "PurchaseOrder" && (
              <div className="pt-1 px-4   grid grid-cols-2">
                <h1 className="font-semibold ">Order Received:</h1>
                <h1 className="font-light mb-2 ">
                  {/* {orderreceived !== '01-01-1970' ? orderreceived : ''} */}
                  <DatePicker
                    selected={receivedDate}
                    onChange={handleOrderReceivedDateChange}
                    value={
                      orderreceived !== "01-01-1970"
                        ? orderreceived
                        : "" || receivedDate
                    }
                    // value={orderpaid || selectedDate}
                    dateFormat="MM-dd-yyyy"
                    minDate={new Date()}
                    placeholderText="Select a date"
                    disabled={
                      orderreceived !== "01-01-1970" ||
                      orderpaid === "01-01-1970"
                    }
                    className="  w-28 flex justify-center items-center rounded py-1 px-2 border shadow"
                  />{" "}
                </h1>
              </div>
            )}
            {type === "PurchaseOrder" && (
              <div className=" px-4   grid grid-cols-2  mb-2 ">
                <h1 className="font-semibold flex items-center">
                  Invoice Number:
                </h1>
                {/* <h1 className="font-light mb-2 ml-2">33</h1> */}
                <InputField
                  type="Invoice Number" // Assuming invoiceno is a string
                  value={invoicenum}
                  onChange={(e) => setInvoicenum(e.target.value)}
                  placeholder="Enter invoice number"
                  className="border border-blue-500 w-[20px] "
                />
              </div>
            )}
            {type === "PurchaseOrder" && (
              <div className=" px-4   grid grid-cols-2 border-b border-black py-2  ">
                <h1 className="font-semibold flex items-center">
                  Attach file:
                </h1>
                {/* <h1 className="font-light mb-2 ml-2">33</h1> */}
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,image/*" // Specify accepted file types
                  id="attachmentInput"
                />
                <label
                  htmlFor="attachmentInput"
                  className="cursor-pointer w-[15rem] bg-slate-100 shadow py-1 px-4 rounded whitespace-nowrap"
                >
                  {file ? (
                    <p className="ml-2">{file.name}</p>
                  ) : (
                    <p>Choose File</p>
                  )}
                </label>
                {/* Display selected file name */}
                {/* {file && <p className="ml-2">{file.name}</p>} */}
              </div>
            )}
            {/* Supplier Info */}
            <div className="pt-1 px-4 border-b border-black">
              <h1 className="font-semibold">Supplier Name</h1>
              <h1 className="font-light mb-1 py-1">{suppliername}</h1>
            </div>
            <div className="">
              <table className="table-auto mb-3">
                <thead className="">
                  <tr className="">
                    <th className="px-4 py-2">Item Name</th>
                    <th className="px-4 py-2">Item Desc.</th>
                    <th className="px-4 py-2">Quantity</th>
                    {type === "PurchaseOrder" && (
                      <th className="px-4 py-2">Unit Price</th>
                    )}
                  </tr>
                </thead>
                <tbody className="text-center ">
                  {data.map((data, index) => (
                    <tr key={index}>
                      {type === "PurchaseRequest" && (
                        <>
                          <td className="px-4 py-2">{data.itemname}</td>
                          <td className="px-4 py-2">{data.itemdesc}</td>
                          <td className=" px-4 py-2">{data.quantity}</td>
                        </>
                      )}
                      {type === "PurchaseOrder" && (
                        <>
                          <td className="px-4 py-2">{data.item}</td>
                          <td className="px-4 py-2">{data.itemdescription}</td>
                          <td className=" px-4 py-2">{data.quantity}</td>
                          {/* <td className="px-4 py-2">{item.UnitPrice}</td> */}

                          <td className="">
                            <InputField
                              type="Unit Price"
                              value={data.unitprice}
                              required
                              placeholder="Enter unit price here" // Updated placeholder text
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  parseFloat(e.target.value)
                                )
                              }
                              className="border border-blue-500 w-[20px]" // Corrected classname typo
                            />
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>{" "}
            {type === "PurchaseOrder" && (
              <div className="text-center mt-3 flex justify-start border-t border-black p-4">
                <h1 className="font-semibold">Total Amount: </h1>
                <h1 className="ml-2">{isNaN(total) ? 0 : total}</h1>
              </div>
            )}
          </div>
        </div>
        <div className="w-full mt-5 flex justify-center mb-5">
          {type === "PurchaseOrder" && (
            <button
              type="submit"
              className="bg-blue-save w-[50%] text-white py-1 px-4 rounded hover:bg-blue-700 mr-2"
              onClick={handleSave}
            >
              Save
            </button>
          )}
          <CloseBtn closeModal={closeModal} type="close" />
        </div>
      </div>
    </div>
  );
};

export default PRSummary;
