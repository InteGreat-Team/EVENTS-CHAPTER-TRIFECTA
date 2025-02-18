import { FaSignOutAlt, FaShoppingCart } from "react-icons/fa";
import { BiSolidUserBadge } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { MdSpaceDashboard, MdWarehouse, MdLocalShipping } from "react-icons/md";
import { FaBuildingColumns, FaS } from "react-icons/fa6";
import { GrServices } from "react-icons/gr";
import { IoSettingsSharp } from "react-icons/io5";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";

import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSignOutContext } from "../hooks/useSignOutContext";
import { UserAuth } from "../hooks/useAuthContext";
import tenantLogo from "../assets/jabi.png"; //LOGO directory
import { useUserContext } from "../hooks/useUserContext.jsx";
import { useTenantContext } from "../hooks/useTenantContext.jsx";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export function NavBar() {
  const { isSignOutClicked, setIsSignOutClicked } = useSignOutContext();
  const { logOut } = UserAuth();

  const location = useLocation();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const {
    updateTenantFields,
    tenantInfo,
    serviceInventory,
    serviceLogistics,
    serviceProcurement,
    companyLogoImgFile,
    primaryColor,
  } = useTenantContext();

  const handleLogout = async () => {
    try {
      // Call the logOut function from your authentication context
      await logOut();

      // You can redirect the user to the login page or any other desired page
      // For example, using React Router's Navigate component
      // import { Navigate } from "react-router-dom";
      // return <Navigate to="/login" />;

      // Or you can perform other actions after successful logout
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    // Call updateUserFields in useEffect to avoid state updates during rendering
    if (tenantInfo) {
      updateTenantFields(tenantInfo);
    }
  }, []);

  const pageHeight = window.innerHeight;
  function isActiveLink(path) {
    return location.pathname === path;
  }

  return (
    <nav
      className="bg-white hidden h-[100%] min-h-[100vh] flex-col items-center
        text-black lg:flex pl-0 ml-0 pt-10"
    >
      {companyLogoImgFile ? (
        <img
        src={companyLogoImgFile}
        alt="Logo"
        className="block top-[20px] mt-2 w-20 h-auto"
      />
      ):(
        <Skeleton className="mt-4 mb-4" circle={true} height={75} width={75} />
      )}

      <section
        className={`navigation flex flex-col items-center justify-center ${
          pageHeight < 800 ? "mt-12" : "mt-10"
        }`}
      >
        {/* <UserInfo /> */}

        <NavLink
          to="/dashboard"
          className={`dashboard p-[8px] m-[1px] rounded-10 flex items-center justify-center gap-2 pr-[68px] ${
            !isActiveLink("/dashboard") ? "hover:bg-gray" : "bg-red"
          } rounded-10 flex items-center justify-center gap-2 pr-[68px] ${
            isActiveLink("/dashboard") ? "bg-red" : "hover:bg-gray"
          }`}
          style={{
            backgroundColor: isActiveLink("/dashboard")
              ? primaryColor
              : "hover:bg-gray",
          }}
        >
          <MdSpaceDashboard className=" h-auto w-[22px]" />
          <p>Dashboard</p>
        </NavLink>

        <NavLink
          to="/company-profile"
          className={`company-profile p-[8px] m-[1px] rounded-10 flex items-center justify-center gap-2 pr-[23px] ${
            !isActiveLink("/company-profile") ? "hover:bg-gray" : "bg-red"
          } rounded-10 flex items-center justify-center gap-2 pr-[23px] ${
            isActiveLink("/company-profile") ? "bg-red" : "hover:bg-gray"
          }`}
          style={{
            backgroundColor: isActiveLink("/company-profile")
              ? primaryColor
              : "hover:bg-gray",
          }}
        >
          <FaBuildingColumns className=" h-auto w-[22px]" />
          <p>Company Profile</p>
        </NavLink>

        <NavLink
          className={`services hover:bg-gray p-[8px] m-[1px]
            isDropdownOpen rounded-10 flex items-center justify-center gap-2 pr-[12px] border-black border-b cursor-pointer`}
          onClick={toggleDropdown}
        >
          <GrServices className="-mt-[4px] ml-[2px] h-auto w-[22px] " />
          <p className="pr-[40px]">Services</p>
          {isDropdownOpen ? (
            <IoMdArrowDropdown className="h-auto w-[24px]" />
          ) : (
            <IoMdArrowDropright className="h-auto w-[24px]" />
          )}
        </NavLink>

        {isDropdownOpen && serviceProcurement && (
          <NavLink
            to="/dashboards-procurement"
            className={`procurement p-[8px] m-[1px] rounded-10 flex items-center justify-center gap-2 pr-[6px] ${
              !isActiveLink("/dashboards-procurement")
                ? "hover:bg-gray"
                : "bg-red"
            }  rounded-10 flex items-center justify-center gap-2 pr-[6px] ${
              isActiveLink("/dashboards-procurement")
                ? "bg-red"
                : "hover:bg-gray"
            }`}
            style={{
              backgroundColor: isActiveLink("/dashboards-procurement")
                ? primaryColor
                : "hover:bg-gray",
            }}
          >
            <FaShoppingCart className=" h-auto w-[22px]" />
            <p>Procurement</p>
          </NavLink>
        )}

        {isDropdownOpen && serviceInventory && (
          <NavLink
            to="/dashboards-inventory"
            className={`inventory p-[8px] m-[1px] rounded-10 flex items-center justify-center gap-2 pr-[33px]${
              !isActiveLink("/dashboards-inventory")
                ? "hover:bg-gray"
                : "bg-red"
            }  rounded-10 flex items-center justify-center gap-2 pr-[33px] ${
              isActiveLink("/dashboards-inventory") ? "bg-red" : "hover:bg-gray"
            }`}
            style={{
              backgroundColor: isActiveLink("/dashboards-inventory")
                ? primaryColor
                : "hover:bg-gray",
            }}
          >
            <MdWarehouse className="h-auto w-[22px]" />
            <p>Inventory</p>
          </NavLink>
        )}

        {isDropdownOpen && serviceLogistics && (
          <NavLink
            to="/dashboards-logistics"
            className={`logistics p-[8px] m-[1px] pr-[38px] rounded-10 flex items-center justify-center gap-2 pr-[23px] ${
              !isActiveLink("/dashboards-logistics")
                ? "hover:bg-gray"
                : "bg-red"
            }  rounded-10 flex items-center justify-center gap-2 pr-[23px] ${
              isActiveLink("/dashboards-logistics") ? "bg-red" : "hover:bg-gray"
            }`}
            style={{
              backgroundColor: isActiveLink("/dashboards-logistics")
                ? primaryColor
                : "hover:bg-gray",
            }}
          >
            <MdLocalShipping className="h-auto w-[22px]" />
            <p>Logistics</p>
          </NavLink>
        )}

        <NavLink
          to="/user-management"
          className={`user-management p-[8px] m-[1px] rounded-10 flex items-center justify-center gap-2 pr-[10px]${
            !isActiveLink("/user-management") ? "hover:bg-gray" : "bg-red"
          } rounded-10 flex items-center justify-center gap-2 pr-[10px] ${
            isDropdownOpen ? "border-t border-black" : ""
          } ${isActiveLink("/user-management") ? "bg-red" : "hover:bg-gray"}`}
          style={{
            backgroundColor: isActiveLink("/user-management")
              ? primaryColor
              : "hover:bg-gray",
          }}
        >
          <FaUser className=" h-auto w-[22px]" />
          <p>User Management</p>
        </NavLink>

        <NavLink
          to="/role-management"
          className={`role-management p-[8px] m-[1px] rounded-10 flex items-center justify-center gap-2 pr-[10px]${
            !isActiveLink("/role-management") ? "hover:bg-gray" : "bg-red"
          } rounded-10 flex items-center justify-center gap-2 pr-[10px] ${
            isActiveLink("/role-management") ? "bg-red" : "hover:bg-gray"
          }`}
          style={{
            backgroundColor: isActiveLink("/role-management")
              ? primaryColor
              : "hover:bg-gray",
          }}
        >
          <BiSolidUserBadge className=" h-auto w-[22px]" />
          <p>Role Management</p>
        </NavLink>

        <NavLink
          to="/settings"
          className={`settings p-[8px] m-[1px] rounded-10 flex items-center justify-center gap-2 pr-[84px]${
            !isActiveLink("/settings") ? "hover:bg-gray" : "bg-red"
          } rounded-10 flex items-center justify-center gap-2 pr-[84px] ${
            isActiveLink("/settings") ? "bg-red" : "hover:bg-gray"
          }`}
          style={{
            backgroundColor: isActiveLink("/settings")
              ? primaryColor
              : "hover:bg-gray",
          }}
        >
          <IoSettingsSharp className=" h-auto w-[22px]" />
          <p>Settings</p>
        </NavLink>

        <NavLink
          className="sign-out  hover:bg-gray p-[8px] m-[1px] flex items-center justify-center gap-2 pr-[80px]"
          onClick={handleLogout}
        >
          <FaSignOutAlt className=" h-auto w-[22px]" />
          <p>Sign Out</p>
        </NavLink>
      </section>
    </nav>
  );
}
