import { useState } from 'react'
import { Squash as Hamburger } from 'hamburger-react'
import { motion } from 'framer-motion'
import { HiOutlineViewBoards, HiOutlineLogout } from 'react-icons/hi'
import { NavLink } from 'react-router-dom'
import { FaTruckLoading } from "react-icons/fa";
import { FaTruckArrowRight } from "react-icons/fa6";
import { useTenantContext } from "../../hooks/useTenantContext";

const NavBarMobile = () => {
  const [isOpen, setOpen] = useState(false)
  const {
    updateTenantFields,
    tenantInfo,
    companyLogoImgFile,
    primaryColor,
    companyName,
  } = useTenantContext();

  const closeMenuOnClick = () => {
    setOpen(false)
  }

  return (
    <div className=" z-20 w-[100%] md:hidden">
      <div className="bg-dark-blue  rounded-b-8 flex flex-row items-center justify-between p-6">
        <img
          src={companyLogoImgFile}
          alt="logo"
          className="w-[60px] h-[60px]  "
        />

        <Hamburger
          toggled={isOpen}
          size={32}
          toggle={setOpen}
          color="#f6f6f6"
          label="Show menu"
          rounded
        />
      </div>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="shadow-4xl bg-dark-blue rounded-10   fixed left-0 right-0 top-[6\.15rem] overflow-y-auto max-h-[80vh] flex flex-col items-center gap-5 border-4 py-[10rem] pt-10 text-[1rem] text-[#c9c9c9] md:text-[1.25rem] "
        >
          <div className="flex ">
            <img
              src="https://i.pinimg.com/originals/10/7f/bf/107fbfe59b4df60a921e04e804cc0561.jpg"
              alt="profile-pic"
              className="w-[60px] h-[60px] rounded-full "
            />{' '}
          </div>
          <h1 className="text-white text-[18px]"> Chen E. Lyn</h1>

          <NavLink to="/logistics-dashboard" onClick={closeMenuOnClick}>
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: 0.1 + 1 / 10,
              }}
              className="hover:bg-gray-500 dashboard gradient-outline rounded-10 flex items-center justify-center gap-5 border-4 w-[300px] h-[72px]"
            >
              <HiOutlineViewBoards className="h-auto w-[40px]" />
              <p className="text-[14px]">Dashboard</p>
            </motion.button>
          </NavLink>
          <NavLink to="/logistics-inbound" onClick={closeMenuOnClick}>
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: 0.1 + 1 / 10,
              }}
              className="hover:bg-gray-500 dashboard gradient-outline rounded-10 flex items-center justify-center gap-5 border-4 w-[300px] h-[72px]"
            >
              <FaTruckLoading className="h-auto w-[40px]" />
              <p className="text-[14px]">Inbound Logistics</p>
            </motion.button>
          </NavLink>
          <NavLink to="/logistics-outbound" onClick={closeMenuOnClick}>
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: 0.1 + 1 / 10,
              }}
              className="hover:bg-gray-500 dashboard gradient-outline rounded-10 flex items-center justify-center gap-5 border-4 w-[300px] h-[72px] "
            >
              <FaTruckArrowRight className="h-auto w-[40px]" />
              <p className="text-[14px]">Outbound Logistics</p>
            </motion.button>
          </NavLink>

          <NavLink to="/dashboards-logistics" onClick={closeMenuOnClick}>
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: 0.1 + 1 / 10,
              }}
              className="hover:bg-gray-500 dashboard gradient-outline rounded-10 flex items-center justify-center gap-5 border-4 w-[300px] h-[72px]"
            >
              <HiOutlineLogout className="h-auto w-[40px] " />
              <p className="-ml-2 text-[14px] font-semibold">Go Back</p>
            </motion.button>
          </NavLink>
        </motion.div>
      )}
    </div>
  )
}

export default NavBarMobile
