import SeeMoreOutbound from "../modalsLOG/SeeMoreOutbound";
import { useState, useEffect } from "react";
import { TbDots } from "react-icons/tb";
import { FaRegEdit } from "react-icons/fa";
import { RiArrowDropRightLine } from "react-icons/ri";
import { RiArrowDropLeftLine } from "react-icons/ri";
import axios from "axios";
import EditOutbound from "../modalsLOG/EditOutbound";
import { format } from "date-fns";

const OutboundTbl = () => {
  const [data, setData] = useState([]);
  const [showSeeMore, setShowSeeMore] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editData, setEditData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3003/api/dataOutbound"
        ); // Adjust the URL to your API endpoint
        setData(response.data);
        console.log(response.data); // Log the response data directly after setting state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Fetch data when the component mounts
  }, []); // Empty dependency array ensures useEffect runs only once

  const toggleSeeMore = () => {
    setShowSeeMore(!showSeeMore);
  };

  const handleRowClick = (row) => {
    setSelectedItem(row);
    toggleSeeMore(); // Show modal when row is clicked
  };

  const handleEditClick = (data) => {
    setEditData(data);
    setIsEditMode(true);
  };

  const handleSave = (updatedData) => {
    // Save the updated data, possibly sending it to a server
    console.log("Updated Data:", updatedData);
  };

  const handleSeeMoreClick = (data) => {
    // Handle see more action
    console.log("See More Data:", data);
    // Here you can implement functionality for the "See More" button
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), "MM-dd-yyyy HH:mm:ss");
  };

  const totalPages = Math.ceil(data.length / pageSize);

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, data.length);

  // Slice the data array to display only the items for the current page
  const currentPageData = data.slice(startIndex, endIndex);

  // Function to handle pagination button click
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <>
      <div className="flex justify-between items-center flex-row mt-3 px-3 w-full mb-4 ">
        <div className="overflow-auto rounded-lg shadow w-full mb-5">
          <table className="w-full shadow-lg">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr className="">
                {[
                  "Outbound Shipment ID",
                  "Target Shipment Date",
                  "Actual Shipment Date",
                  "Target Customer Received Date",
                  "Actual Customer Received Date",
                  "Shipping Status",
                  "Customer Addressline",
                  "Action",
                ].map((columnName, index) => (
                  <th
                    key={index}
                    className="p-3 text-sm font-semibold tracking-wide whitespace-nowrap"
                  >
                    {columnName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentPageData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="hover:underline text-center even:bg-gray-100 odd:bg-white"
                >
                  <td className="p-4">{row.outboundshipmentid}</td>
                  <td>{formatDate(row.targetshipmentdate)}</td>
                  <td>{formatDate(row.actualshipmentdate)}</td>
                  <td>{formatDate(row.targetcustomerreceiveddate)}</td>
                  <td>{formatDate(row.actualcustomerreceiveddate)}</td>
                  <td>{row.shippingstatus}</td>
                  <td>{row.customeraddressline}</td>
                  <td className="flex justify-center items-center space-x-2 mt-2">
                    <button
                      button
                      className="bg-black rounded-md text-xl p-2"
                      onClick={() => handleRowClick(row)}
                    >
                      <TbDots className="text-white" />
                    </button>

                    <button
                      className="bg-brand-blue rounded-md text-white text-sm p-2"
                      onClick={() =>
                        handleEditClick({
                          shipmentDate: "-",
                          receiveDate: "-",
                          paymentStatus: "unpaid",
                          deliveryStatus: "For Shipment",
                          goodsReceived: "No",
                        })
                      }
                    >
                      <FaRegEdit className="text-white text-xl text-center" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal */}
          <SeeMoreOutbound
            showSeeMore={showSeeMore}
            toggleSeeMore={toggleSeeMore}
            selectedItem={selectedItem}
          />
          <EditOutbound
            show={isEditMode}
            onClose={() => {
              setIsEditMode(false);
            }}
            data={editData}
            onSave={handleSave}
          />
        </div>
      </div>
      {/* Pagination */}
      <div className="flex justify-end items-center space-x-2 md:mr-20 text-sm mb-5">
        {/* Previous page button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray pr-5 pl-2 py-1 rounded-md flex flex-row items-center"
        >
          <RiArrowDropLeftLine className="text-[35px]" />
          Previous
        </button>
        {/* Current page indicator */}
        <span className="hidden md:block px-5">
          {currentPage} of {totalPages}
        </span>
        <span className="md:hidden block px-5">{currentPage}</span>
        {/* Next page button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-gray pl-9 pr-5 py-1 rounded-md flex flex-row items-center"
        >
          Next
          {/* <FaArrowRight className="text-[20px] ml-2" /> */}
          <RiArrowDropRightLine className="text-[35px]" />
        </button>
      </div>
    </>
  );
};

export default OutboundTbl;
