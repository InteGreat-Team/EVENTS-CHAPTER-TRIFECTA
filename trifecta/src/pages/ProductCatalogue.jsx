import React, { useState, useEffect } from "react";
import NavBarMobile from "../components/Nav/NavbarMobile";
import NavBar from "../components/Nav/Navbar";
import Table from "../components/ProductCatalogue/TableView";
import Card from "../components/ProductCatalogue/Card";
// import DataTable from "react-data-table-component";
import AddProductModal from "../components/Modal/AddProduct";
// import Dropdown from "../components/Dropdown/Dropdown";
import Button from "../components/Buttons/Button";
import PriceUpdate from "../components/Dashboard/PriceUpdate";
import Input from "../components/Inputs/Input";
import axios from "axios";
import { useUserInfoContext } from "../hooks/useUserInfoContext.jsx";
import { useUserContext } from "../hooks/useUserContext.jsx";

export function ProductCatalogue() {
  const { userInfo } = useUserInfoContext();
  const {
    updateUserFields,
    userFirstName,
    userLastName,
    userRole,
    userEmail,
    userPassword,
    companyName,
    companyIndustry,
    companyAddress,
    companyLogoImgFile,
    companyLogoSrc,
    serviceInventory,
    serviceLogistics,
    serviceProcurement,
    userUID,
    isEmailInvalid,
    isPasswordInvalid,
    currentDocId,
  } = useUserContext();
  console.log("User info: ", userInfo);
  useEffect(() => {
    // Call updateUserFields in useEffect to avoid state updates during rendering
    updateUserFields(userInfo);
  }, [updateUserFields, userInfo]);

  const [showAdd, setShowAdd] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [viewType, setViewType] = useState("table");
  // const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([]);

  const toggleModalAdd = () => {
    console.log(showAdd);
    setShowAdd(!showAdd);
  };

  const handleViewTypeChange = (type) => {
    setViewType(type);
    setDropdown(false); // Close dropdown after selecting view type
  };

  const handleSearchChange = async (event) => {
    const query = event.target.value;

    try {
      const response = await axios.get(
        `http://localhost:3001/api/search?query=${query}`
      );
      // console.log(response)
      const searchData = response.data;
      setSearchResults(searchData);
    } catch (error) {
      console.error("Error searching items:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // Submit search query when Enter key is pressed
      handleSearchChange(event);
    }
  };

  return (
    <>
      <div className="h-screen flex flex-col md:flex-row w-screen">
        <div className="md:h-screen mb-4 md:mb-0 ">
          <NavBar />
          <NavBarMobile />
        </div>

        <div className="h-screen md:w-full flex flex-col mx-3 overflow-x-auto no-scrollbar">
          {/* <div className="flex-1 flex md:justify-start justify-center items-start border border-black mt-2 rounded min-h-[450px]">
            <h1 className="">Dashboard</h1>
            <PriceUpdate />
          </div> */}
          <div className="flex-1 flex justify-start items-end flex-col mt-12">
            <div className="flex md:justify-between md:items-center justify-between items-start flex-row  px-3 w-full mb-4">
              {/* <Dropdown
                handleViewTypeChange={handleViewTypeChange}
                dropdown={dropdown}
                setDropdown={setDropdown}
              /> */}
              <Input
                type="search"
                placeholder="Search..."
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
              />
              <Button toggleModalAdd={toggleModalAdd} type="addProduct" />
            </div>
            {/* {viewType === 'table' ? <Table /> : <Card />} */}
            <Table searchResults={searchResults} />
          </div>
        </div>
      </div>
      <AddProductModal showAdd={showAdd} toggleModalAdd={toggleModalAdd} />
    </>
  );
}
