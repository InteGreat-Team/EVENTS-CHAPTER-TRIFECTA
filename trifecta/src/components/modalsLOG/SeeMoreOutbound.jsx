import { useState, useEffect } from "react";
import axios from "axios";

const Modal = ({ showSeeMore, toggleSeeMore, selectedItem }) => {
  const [customerDetails, setCustomerDetails] = useState(null);

  // useEffect(() => {
  //   if (selectedItem && showSeeMore) {
  //     const fetchCustomerDetails = async () => {
  //       try {
  //         const response = await axios.get(`http://localhost:3003/api/customerDetails/${selectedItem.customerorderid}`);
  //         setCustomerDetails(response.data);
  //         console.log(customerDetails)
  //       } catch (error) {
  //         console.error('Error fetching customer details:', error);
  //       }
  //     };
  //     fetchCustomerDetails();
  //   }
  // }, [selectedItem, showSeeMore]);

  return (
    <>
      {showSeeMore && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white overflow-y-auto p-4 shadow-lg rounded-lg z-50 m-6 max-w-lg w-full h-5/6 md:h-fit">
            <div className="bg-white rounded-md flex flex-col">
              <h2 className="text-xl font-bold mb-3 text-center">
                Customer Order Summary
              </h2>
              {/* Customer Information */}
              <h2 className="font-bold mt-4">Customer Information</h2>
              <p className="font-semibold text-sm m-2 mt-6">
                Customer Order ID: {selectedItem.customerorderid}
              </p>
              <p className="font-semibold text-sm m-2">Customer Name: </p>
              <p className="font-semibold text-sm m-2">Customer Email:</p>

              {/* Delivery Information */}
              <h2 className="font-bold mt-4">Delivery Information</h2>
              <p className="font-semibold text-sm m-2 mt-6">
                Customer Order Date:
              </p>
              <p className="font-semibold text-sm m-2 ">Delivery ID:</p>
              <p className="font-semibold text-sm m-2">Shipment Date:</p>
              <p className="font-semibold text-sm m-2">Arrival Date:</p>

              {/* Order Information */}
              <h2 className="font-bold my-4">Order Information</h2>
              <table className="w-full">
                <tbody className=" space-y-4">
                  <tr className="text-[12px] text-center">
                    <th>Item Name</th>
                    <th>Item ID</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                  </tr>
                  <tr className="text-[12px] text-center bg-gray-200">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
              <h2 className=" text-right mt-2 font-bold">Total Cost:</h2>
              <div className="flex justify-center">
                <button
                  onClick={toggleSeeMore}
                  className="mt-10 p-2 px-1 w-36 bg-red-dark text-white rounded-md md:w-48"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
