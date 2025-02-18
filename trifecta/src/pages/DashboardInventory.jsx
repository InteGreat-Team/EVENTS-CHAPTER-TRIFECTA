import React, { useState, useEffect } from "react";
import NavBarMobile from "../components/Nav/NavbarMobile";
import NavBar from "../components/Nav/Navbar";
import ActivePieChart from "../components/Dashboard/ActivePieChart";
import DateComponent from "../components/Dashboard/DateComponent.jsx";
import { useTenantContext } from "../hooks/useTenantContext.jsx";
import PowerBI from "../components/Dashboard/PowerBI.jsx";

export function DashboardInventory() {
  const embedUrl =
    "https://app.powerbi.com/reportEmbed?reportId=35f0deca-5719-49be-a8af-e39070b98437&autoAuth=true&ctid=2840082d-702c-4fb1-9885-abddd1ddaa1e";

  // const { companyLogoImgFile, primaryColor } = useTenantContext();

  return (
    <>
      <div className="h-screen flex flex-col md:flex-row w-screen">
        <div className="md:h-screen mb-4 md:mb-0">
          <NavBar />
          <NavBarMobile />
        </div>
        {/* <div className="h-screen md:w-full flex  flex-col  overflow-x-auto mx-10">
          <DateComponent />
          <header className="bg-[#6366F1] dark:bg-[#4338CA] p-6 border-b border border-orange ">
            <div className="container mx-auto ">
              <h1 className="text-2xl font-bold text-white">
                Inventory Dashboard
              </h1>
            </div>
          </header>
          <div className="flex items-start justify-start h-screen">
            <ActivePieChart />
          </div>
        </div> */}
        <div className="flex flex-col w-screen  min-h-screen">
          <div className="flex flex-col w-full">
            <DateComponent />
          </div>
          <header
            className=" p-6 border-b mx-20 bg-[#6366F1] dark:bg-[#4338CA]"
            // style={{
            //   backgroundColor: primaryColor,
            //   transition: "background-color 0.3s ease",
            // }}
          >
            {/* <div className="container ">
              <h1 className="text-2xl font-bold text-white">
                Inventory Dashboard
              </h1>
            </div> */}
          </header>
          <div className="flex items-start justify-start h-screen mx-20">
            <PowerBI embedUrl={embedUrl} />
          </div>
        </div>
      </div>
    </>
  );
}
