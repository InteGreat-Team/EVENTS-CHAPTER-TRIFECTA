import { useState, useEffect } from "react";
import { MdShoppingBag } from "react-icons/md";
import { HiOutlineViewBoards, HiOutlineLogout } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { useTenantContext } from "../../hooks/useTenantContext";

const NavBar = () => {
  const [open, setOpen] = useState(true);
  const {
    updateTenantFields,
    tenantInfo,
    companyLogoImgFile,
    primaryColor,
    companyName,
  } = useTenantContext();

  const Menus = [
    {
      title: "Dashboard",
      icon: <HiOutlineViewBoards />,
      path: "/DashboardInventory",
    },
    {
      title: "Product Catalogue",
      icon: <MdShoppingBag />,
      path: "/inventory-product-catalogue",
    },
    {
      title: "Go Back",
      icon: <HiOutlineLogout />,
      path: "/dashboards-inventory",
    },
  ];

  useEffect(() => {
    // Call updateUserFields in useEffect to avoid state updates during rendering
    if (tenantInfo) {
      updateTenantFields(tenantInfo);
    }
  }, [tenantInfo]);

  return (
    <div className="hidden md:block z-50 h-screen text-white">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-gray  min-h-lvh p-5  pt-8 relative duration-300 p-4`}
        // style={{
        //   backgroundColor: primaryColor,
        // }}
      >
        {/* bg-dark-blue */}
        <img
          src="./src/assets/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-blue
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="./src/assets/logo.png"
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg] h-16"
            }`}
          />
          <h1
            className={`text-black font-medium  origin-left  text-xl duration-200  ${
              !open && "scale-0"
            }`}
          >
            Inventory
          </h1>
        </div>
        <div className=" flex flex-col items-center mt-9 ">
          {/* <img
            src="https://i.pinimg.com/originals/10/7f/bf/107fbfe59b4df60a921e04e804cc0561.jpg"
            alt="profile-pic"
            className={`w-[60px] h-[60px] rounded-full md:w-[60px] ${
              !open &&
              `w-[40px] h-[39px] rounded-full ml-3 md:w-[45px] md:h-[40px]`
            }`}
          /> */}
          <img
            src={companyLogoImgFile}
            alt="Logo"
            // className="block top-[20px] mt-2 w-20 h-auto"
            className="block top-[20px] mt-2 w-32 mb-10 h-auto"
          />
          <h1
            className={`text-black  font-bold text-[24px] mt-4 ${
              !open && "scale-0 text-[3px]"
            }`}
          >
            {companyName}
          </h1>
        </div>

        <ul className="pt-[2rem]">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex  rounded-md  p-2 cursor-pointer  text-black text-sm items-center gap-x-4 md:text-base transition duration-300 ease-in-out  hover:underline 
            ${Menu.gap ? "mt-12" : "mt-2"} ${
                index === Menus.length - 1 && "mt-40" // Add this line
              } ${index === 0 && ""} ${!open && "w-[49px]"}`}
              style={{
                backgroundColor: primaryColor,
                transition: "background-color 0.3s ease",
              }}
            >
              <NavLink to={Menu.path} className="flex items-center gap-x-4  ">
                <span
                  className={`text-black rounded-full p-2`}
                  style={{
                    backgroundColor: primaryColor,
                  }}
                >
                  {Menu.icon}
                </span>
                <span
                  className={`${
                    !open && "hidden"
                  } origin-left duration-200 text-gradient-color`}
                >
                  {Menu.title}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default NavBar;
