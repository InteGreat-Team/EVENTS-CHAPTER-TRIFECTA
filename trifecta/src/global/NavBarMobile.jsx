import { useRef, useState, useEffect } from 'react';
import HamburgerMenu from 'react-hamburger-menu';
import { NavLink, useLocation } from 'react-router-dom';
import { FaSignOutAlt, FaShoppingCart  } from "react-icons/fa";
import { BiSolidUserBadge } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { MdSpaceDashboard, MdWarehouse, MdLocalShipping } from "react-icons/md";
import { FaBuildingColumns, FaS } from "react-icons/fa6";
import { GrServices } from "react-icons/gr";
import { IoSettingsSharp } from "react-icons/io5";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { HiOutlineViewBoards } from 'react-icons/hi';
import { UserAuth } from "../hooks/useAuthContext";
import tenantLogo from '../assets/jabi.png'; //LOGO directory
import { useSignOutContext } from '../hooks/useSignOutContext';
import { useUserContext } from '../hooks/useUserContext.jsx';
import { useTenantContext} from '../hooks/useTenantContext.jsx';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export function NavBarMobile() {
  const { isSignOutClicked, setIsSignOutClicked } =
    useSignOutContext();
  const [isOpen, setOpen] = useState(false);
  const { logOut } = UserAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const location = useLocation();
  const { 
    updateTenantFields,
    tenantInfo,
    serviceInventory,
    serviceLogistics,
    serviceProcurement,
    companyLogoImgFile,
    primaryColor
    } = useTenantContext();

  function isActiveLink(path) {
    return location.pathname === path;
  }
  
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
  
  const closeMenuOnClick = () => {
    setOpen(false);
  };

  useEffect(() => {
        // Call updateUserFields in useEffect to avoid state updates during rendering
        if (tenantInfo) {
        updateTenantFields(tenantInfo);
    }
    },[]);

  return (
    <div className="relative z-50 w-full lg:hidden">
      <div className="bg-white rounded-b-8 border-b-2 border-gray flex flex-row items-center justify-between p-8">
        {companyLogoImgFile ? (
        <img
        src={companyLogoImgFile}  
          alt="Logo"
          className="w-[70px] ml-[20px] -m-[50px]"
        />
        ):(
          <Skeleton className='ml-[30px] my-[-20px] mt-[-10px] pt-[-10px]' circle={true} height={60} width={60} />
        )}
        <HamburgerMenu
          isOpen={isOpen}
          menuClicked={() => setOpen(!isOpen)}
          width={32}
          height={24}
          strokeWidth={3}
          rotate={0}
          color='black'
          borderRadius={0}
          animationDuration={0.3}
          className="mr-6"
        />
      </div>

      {isOpen && (
        <div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="shadow-4xl bg-white h-full left-0 right-0 top-[5.5rem] flex flex-col items-center text-[1rem] text-[#000000] md:text-[1.25rem]"
        >
          {/* DASHBOARD */}
          <NavLink to="/dashboard" onClick={closeMenuOnClick} 
            className={`dashboardNav ${
                isActiveLink('/dashboard')
                  ? 'bg-red'
                  : 'hover:bg-gray'
              } w-full py-[5px] mb-[14px] flex justify-center`}
            style={{backgroundColor: isActiveLink('/dashboard') ? primaryColor : "hover:bg-gray"}}
            >
            <button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: 0.1 + 1 / 10,
              }}
              className={`dashboard  ${
                isActiveLink('/dashboard')
                  ? ''
                  : ''
              } rounded-10 grid grid-cols-2 items-center border-0 px-[6.5rem] py-2 -my-[10px]`}
            >
              <MdSpaceDashboard className=" -ml-[50px] h-[30px] w-[30px]" />
              <p className="-ml-2 ">Dashboard</p>
            </button>
          </NavLink>

            {/* COMPANY PROFILE */}
          <NavLink to="/company-profile" onClick={closeMenuOnClick} 
            className={`companyProfileNav ${
                isActiveLink('/company-profile')
                  ? 'bg-red'
                  : 'hover:bg-gray'
              } w-full -my-[5px] mb-[4px] py-[5px] flex justify-center`}
            style={{backgroundColor: isActiveLink('/company-profile') ? primaryColor : "hover:bg-gray"}}
            >
            <button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: 0.1 + 1 / 10,
              }}
              className={`company-profile ${
                isActiveLink('/company-profile')
                  ? ''
                  : ''
              }  rounded-10 grid grid-cols-2 items-center border-0 px-[6.5rem] py-2 -my-[10px] -mr-[40px]`}
            >
              <FaBuildingColumns className="-ml-[50px] h-[30px] w-[30px] " />
              <p className="-ml-[30px] ">Company Profile</p>
            </button>
          </NavLink>

          {/* SERVICES */}
          <NavLink onClick={toggleDropdown} className="bg-gray w-full py-[5px] mb-[18px] flex items-center justify-center">
            <button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: 0.1 + 1 / 10,
              }}
              className={`services   ${
                isActiveLink('/services')
                  ? ''
                  : ''
              }  rounded-10 grid grid-cols-3 items-center border-0 px-[6.5rem] py-2 -my-[10px] -mr-[40px]`}
            >
              <GrServices className="-ml-[50px] h-[30px] w-[30px]" />
              <p className="-ml-[0px] ">Services</p>
              {isDropdownOpen ? (<IoMdArrowDropdown className="h-auto w-[24px] justify-self-end -mr-[58px]" />
            ) : (<IoMdArrowDropright className="h-auto w-[24px] justify-self-end -mr-[58px]" />)}
            </button>
          </NavLink>

            {/* PROCUREMENT */}
          {isDropdownOpen && serviceProcurement && (
            <NavLink to="/dashboards-procurement" onClick={closeMenuOnClick} 
              className={`procurementNav ${
                  isActiveLink('/dashboards-procurement')
                    ? 'bg-red'
                    : 'hover:bg-gray'
                } w-full -my-[15px] py-[5px] flex justify-center`}
              style={{backgroundColor: isActiveLink('/dashboards-procurement') ? primaryColor : "hover:bg-gray"}}
              >
              <button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                  delay: 0.1 + 1 / 10,
                }}
                className={`dashboards-procurement ${
                  isActiveLink('/dashboards-procurement')
                    ? ''
                    : ''
                }  rounded-10 grid grid-cols-2 items-center border-0 px-[6.5rem] py-2 -my-[10px] -mr-[40px]`}
              >
                <FaShoppingCart className="-ml-[45px] h-[30px] w-[30px]" />
                <p className="-ml-[22px]">Procurement</p>
              </button>
            </NavLink>
          )}

            {/* INVENTORY */}
          {isDropdownOpen && serviceInventory && (
            <NavLink to="/dashboards-inventory" onClick={closeMenuOnClick} 
              className={`inventoryNav ${
                  isActiveLink('/dashboards-inventory')
                    ? 'bg-red'
                    : 'hover:bg-gray'
                } w-full my-[15px] py-[5px] flex justify-center
                  ${
                    !serviceLogistics 
                      ? '-mb-[15px]' 
                      : ''
                  }`}
              style={{backgroundColor: isActiveLink('/dashboards-inventory') ? primaryColor : "hover:bg-gray"}}
              >
              <button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                  delay: 0.1 + 1 / 10,
                }}
                className={`dashboards-inventory ${
                  isActiveLink('/dashboards-inventory')
                    ? ''
                    : ''
                }  rounded-10 grid grid-cols-2 items-center border-0 px-[6.5rem] py-2 -my-[10px] -mr-[18px]`}
              >
                <MdWarehouse className="-ml-[50px] h-[30px] w-[30px]" />
                <p className="-ml-[10px] ">Inventory</p>
              </button>
            </NavLink>
          )}

            {/* LOGISTICS */}
          {isDropdownOpen && serviceLogistics && (
            <NavLink to="/dashboards-logistics" onClick={closeMenuOnClick} 
              className={`logisticsNav ${
                  isActiveLink('/dashboards-logistics')
                    ? 'bg-red'
                    : 'hover:bg-gray'
                } w-full -my-[15px] py-[5px] flex justify-center`}
              style={{backgroundColor: isActiveLink('/dashboards-logistics') ? primaryColor : "hover:bg-gray"}}
              >
              <button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                  delay: 0.1 + 1 / 10,
                }}
                className={`dashboards-logistics ${
                  isActiveLink('/dashboards-logistics')
                    ? ''
                    : ''
                }  rounded-10 grid grid-cols-2 items-center border-0 px-[6.5rem] py-2 -my-[10px] -mr-[10px]`}
              >
                <MdLocalShipping className="-ml-[50px] h-[30px] w-[30px]" />
                <p className="-ml-[8px] ">Logistics</p>
              </button>
            </NavLink>
          )}
          
            {/* USER MANAGEMENT */}
          <NavLink to="/user-management" onClick={closeMenuOnClick} 
            className={`userManagementNav mb-[18px]  ${
                isActiveLink('/user-management')
                  ? 'bg-red'
                  : 'hover:bg-gray'
              } w-full ${
                isDropdownOpen 
                  ? 'mt-[15px]' 
                  : '-mt-[15px]'
              } py-[5px] flex justify-center`}
            style={{backgroundColor: isActiveLink('/user-management') ? primaryColor : "hover:bg-gray"}}
            >
            <button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: 0.1 + 1 / 10,
              }}
              className={`user-management ${
                isActiveLink('/user-management')
                  ? ''
                  : ''
              }  rounded-10 grid grid-cols-2 items-center border-0 px-[6.5rem] py-2 -my-[10px] -mr-[45px]`}
            >
              <FaUser className="-ml-[50px] h-[30px] w-[30px]" />
              <p className="-ml-[35px] ">User Mangement</p>
            </button>
          </NavLink>
          
          {/* ROLE MANAGEMENT */}
          <NavLink to="/role-management" onClick={closeMenuOnClick} 
            className={`roleManagement ${
                isActiveLink('/role-management')
                  ? 'bg-red'
                  : 'hover:bg-gray'
              } w-full -my-[15px] py-[5px] flex justify-center`}
            style={{backgroundColor: isActiveLink('/role-management') ? primaryColor : "hover:bg-gray"}}
            >
            <button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: 0.1 + 1 / 10,
              }}
              className={`role-management ${
                isActiveLink('/role-management')
                  ? ''
                  : ''
              }  rounded-10 grid grid-cols-2 items-center border-0 px-[6.5rem] py-2 -my-[10px] -mr-[45px]`}
            >
              <BiSolidUserBadge className="-ml-[50px] h-[30px] w-[30px]" />
              <p className="-ml-[35px] ">Role Mangement</p>
            </button>
          </NavLink>

            {/* SETTINGS */}
          <NavLink to="/settings" onClick={closeMenuOnClick} 
            className={`settingsNav ${
                isActiveLink('/settings')
                  ? 'bg-red'
                  : 'hover:bg-gray'
              } w-full my-[15px] py-[5px] flex justify-center`}
            style={{backgroundColor: isActiveLink('/settings') ? primaryColor : "hover:bg-gray"}}
            >
            <button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: 0.1 + 1 / 10,
              }}
              className={`settings ${
                isActiveLink('/settings')
                  ? ''
                  : ''
              }  rounded-10 grid grid-cols-2 items-center border-0 px-[6.5rem] py-2 -my-[10px] mr-[22px]`}
            >
              <IoSettingsSharp className="-ml-[50px] h-[30px] w-[30px]" />
              <p className="ml-[2px]">Settings</p>
            </button>
          </NavLink>

           {/* SIGN OUT */}
          <NavLink onClick={closeMenuOnClick} 
            className={`signOutNav w-full -my-[15px] py-[5px] flex justify-center mb-[3px]`}
            >
            <button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: 0.1 + 1 / 10,
              }}
              className={` ${
                isActiveLink('')
                  ? ''
                  : ''
              }  rounded-10 grid grid-cols-2 items-center border-0 px-[6.5rem] py-2 -my-[10px] mr-[18px]`}
              onClick={handleLogout}
            >
              <FaSignOutAlt className="-ml-[50px] h-[40px] w-[30px]" />
              <p className="-ml-[1px] ">Sign Out</p>
            </button>
          </NavLink>
        </div>
      )}
    </div>
  );
}
