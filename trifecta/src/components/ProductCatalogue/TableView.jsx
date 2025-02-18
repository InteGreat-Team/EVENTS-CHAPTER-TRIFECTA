import React, { useState, useEffect } from "react";
import AddProductModal from "../Modal/AddProduct";
import EditProductModal from "../Modal/EditProduct";
import InfoDates from "../Modal/InfoDates";
import axios from "axios";
import { RiArrowDropRightLine } from "react-icons/ri";
import { RiArrowDropLeftLine } from "react-icons/ri";
import { GrStatusGoodSmall } from "react-icons/gr";
import DataTable from "react-data-table-component";
import { PiDotsThreeDuotone } from "react-icons/pi";
import { useSelectedItem } from "../../hooks/useSelectedItemContext";

const Table = ({ searchResults }) => {
  const [data, setData] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const { selectedItem, setSelectedItem } = useSelectedItem();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Number of items per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/data");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const toggleModalAdd = () => {
    setShowAdd(!showAdd);
  };

  const toggleModalEdit = () => {
    setShowEdit(!showEdit);
  };

  const toggleModalInfo = (item) => {
    setSelectedItem(item);
    setShowInfo(!showInfo);
  };

  const handleRowClick = (item) => {
    setSelectedItem(item);
    toggleModalEdit();
  };

  const handlePriceUpdate = (item) => {
    setSelectedItem(item);
  };

  // Use searchResults if available, otherwise use the original data
  const searchData = searchResults.length > 0 ? searchResults : data;

  // Calculate total number of pages
  const totalPages = Math.ceil(searchData.length / pageSize);

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, searchData.length);

  // Slice the data array to display only the items for the current page
  const currentPageData = searchData.slice(startIndex, endIndex);

  // Function to handle pagination button click
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="overflow-auto rounded-lg shadow w-full mb-5 scrollbar-thin">
        <table className="w-full shadow-lg">
          {/* Table header */}
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            {/* Header row */}
            <tr>
              {[
                "Item ID",
                "Item Name",
                "Item Category",
                "Item Description",
                "Unit Price",
                "Retail Price",
                "Reorder Point",
                "Reorder Quantity",
                "Total Cost",
                "Active Status",
                "Action Flag",
                "Actions",
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
          {/* Table body */}
          <tbody className="divide-y divide-gray-100">
            {currentPageData.map((item, rowIndex) => (
              <tr
                key={rowIndex}
                className=" text-center whitespace-nowrap cursor-pointer even:bg-gray odd:bg-white"
                onClick={() => handlePriceUpdate(item)}
              >
                {/* Table data */}
                <td className="p-4">{item.itemid}</td>
                <td>{item.itemname}</td>
                <td>{item.itemcategory}</td>
                <td>{item.itemdescription}</td>
                <td>{item.unitprice}</td>
                <td>{item.retailprice}</td>
                <td>{item.reorderpoint}</td>
                <td>{item.reorderquantity}</td>
                <td>{item.totalcost}</td>
                <td className="flex justify-center items-center h-[60px]">
                  {item.activestatus ? (
                    <>
                      <GrStatusGoodSmall className="text-green mr-1" />
                      {"Active"}
                    </>
                  ) : (
                    <>
                      <GrStatusGoodSmall className="text-dark-gray mr-1" />
                      {"Inactive"}
                    </>
                  )}
                </td>
                <td>{item.actionflag}</td>
                <td className="flex flex-row justify-center items-center ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 cursor-pointer block "
                    onClick={() => handleRowClick(item)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                  <PiDotsThreeDuotone
                    className="text-[25px] ml-2 "
                    onClick={() => toggleModalInfo(item)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2 md:mr-4 text-sm mb-5">
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

      {/* Modals */}
      <AddProductModal showAdd={showAdd} toggleModalAdd={toggleModalAdd} />
      <EditProductModal
        showEdit={showEdit}
        toggleModalEdit={toggleModalEdit}
        selectedItem={selectedItem}
      />
      <InfoDates
        showInfo={showInfo}
        toggleModalInfo={toggleModalInfo}
        selectedItem={selectedItem}
      />
    </>
  );
};

export default Table;
