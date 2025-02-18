import React from "react";
import NavBarMobile from "../components/NavProcurement/NavBarMobile.jsx";
import NavBar from "../components/NavProcurement/NavBar.jsx";
import DateComponent from "../components/Dashboard/DateComponent.jsx";
import DashboardLayout from "../components/Dashboard/DashboardLayout.jsx";
import PowerBI from "../components/Dashboard/PowerBI.jsx";

export function ProcurementDashboard() {
  const embedUrl =
    "https://app.powerbi.com/reportEmbed?reportId=31e9a24b-493c-4e07-be36-259f6317c24f&autoAuth=true&ctid=2840082d-702c-4fb1-9885-abddd1ddaa1e";

  return (
    <div className="flex flex-col h-screen md:flex-row">
      <div className="md:h-screen mb-4 md:mb-0">
        <NavBar />
        <NavBarMobile />
      </div>

      <div className="h-screen md:w-full flex  overflow-x-auto">
        <div className="flex flex-col w-full">
          <DateComponent />
          <div className="flex flex-col mx-20  justify-center items-center">
            <DashboardLayout />
            {/* <PowerBI embedUrl={embedUrl} /> */}
          </div>
          {/* <div className="flex flex-row gap-5 ml-24 mt-5 items-center">
            Hello
          </div> */}
        </div>
      </div>

      {/* <div className="flex flex-col lg:flex-col"></div> */}
    </div>
  );
}
