import { useState, useEffect } from "react";
import axios from "axios";

const Modal = ({ showSeeMore, toggleSeeMore, selectedItem }) => {
  const [supplierData, setSupplierData] = useState([]);
  const [dataRow, setDataRow] = useState(
    selectedItem ? { ...selectedItem } : {}
  );

  // useEffect(() => {
  //     console.log(dataRow.suppliername)
  // }, [selectedItem]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3002/api/datasupplier",
          {
            params: {
              suppliername: dataRow.suppliername,
            },
          }
        );
        setSupplierData(response.data);
        console.log(dataRow.suppliername);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedItem]);

  return (
    <>
      {showSeeMore && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white overflow-y-auto p-4 shadow-lg rounded-lg z-50 m-6 max-w-lg w-full h-5/6 md:h-fit">
            <div className="bg-white rounded-md flex flex-col">
              <h2 className="text-xl font-bold mb-3 text-center">
                Purchase Order Summary
              </h2>
              {/* Supplier Information */}
              <h2 className="font-bold mt-4">Supplier Information</h2>
              <p className="font-semibold text-sm m-2 mt-6">
                Supplier ID: {supplierData.supplierid}
              </p>
              <p className="font-semibold text-sm m-2">
                Supplier Name: {selectedItem.suppliername}
              </p>
              <p className="font-semibold text-sm m-2">Email Address:</p>
              <p className="font-semibold text-sm m-2">Address:</p>

              {/* Delivery Information */}
              <h2 className="font-bold mt-4">Delivery Information</h2>
              <p className="font-semibold text-sm m-2 mt-6">Delivery ID:</p>
              <p className="font-semibold text-sm m-2">Shipment Date:</p>
              <p className="font-semibold text-sm m-2">Arrival Date:</p>

              {/* Order Information */}
              <h2 className="font-bold my-4">Order Information</h2>
              <table className="w-full">
                <tbody className=" space-y-4">
                  <tr className="text-[12px] text-center">
                    <th>Item Name</th>
                    <th>Description</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                  </tr>
                  <tr className="text-[12px] text-center bg-gray-200">
                    <td>{selectedItem.item}</td>
                    <td>{selectedItem.itemdescription}</td>
                    <td>{selectedItem.unitprice}</td>
                    <td>{selectedItem.quantity}</td>
                  </tr>
                  {/* <tr className='text-[12px] text-center bg-gray-200'>
                            <td>Neozep</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr className='text-[12px] text-center bg-gray-200'>
                            <td>Enervon</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr> */}
                </tbody>
              </table>
              <h2 className=" text-right mt-2 font-bold">
                Total Cost: {selectedItem.totalamount}
              </h2>
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
