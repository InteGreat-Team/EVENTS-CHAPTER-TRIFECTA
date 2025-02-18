import React, { useEffect } from "react";
import { useUserInfoContext } from "../hooks/useUserInfoContext.jsx";
import { useUserContext } from "../hooks/useUserContext.jsx";
import { useTenantContext } from "../hooks/useTenantContext.jsx";
import { NavBar } from "../global/NavBar.jsx";
import { NavBarMobile } from "../global/NavBarMobile.jsx";
import { NavLink } from "react-router-dom";
import PowerBI from "../components/Dashboard/PowerBI.jsx";

export function Logistics() {
  const embedUrl =
    "https://app.powerbi.com/reportEmbed?reportId=5f1833a6-5084-4f90-af7d-ad24f52fa811&autoAuth=true&ctid=2840082d-702c-4fb1-9885-abddd1ddaa1e";

  const { userInfo } = useUserInfoContext();
  const { tenantInfo } = useTenantContext();

  const {
    updateUserFields,
    userFirstName,
    userLastName,
    userRole,
    userEmail,
    userPassword,
    userUID,
    isEmailInvalid,
    isPasswordInvalid,
    currentDocId,
  } = useUserContext();
  //console.log('User info: ', userInfo);

  const {
    updateTenantFields,
    companyName,
    companyEmail,
    companyIndustry,
    companyAddress,
    companyLogoImgFile,
    companyLogoSrc,
    serviceInventory,
    serviceLogistics,
    serviceProcurement,
    primaryColor,
  } = useTenantContext();
  //console.log('Tenant info: ', tenantInfo);
  //console.log("Tenant Context",useTenantContext());

  useEffect(() => {
    // Call updateUserFields in useEffect to avoid state updates during rendering
    if (userInfo) {
      updateUserFields(userInfo);
      updateTenantFields(tenantInfo);
    }
  }, [updateUserFields, userInfo]);

  /* console.log('Name: ', userFirstName) */
  //console.log("User Context",useUserContext());

  return (
    <div className="flex lg:flex-row w-screen h-screen flex-col">
      <div className="lg:h-screen md:mb-0 justify-start">
        <NavBar />
        <NavBarMobile />
      </div>
      <div className="flex flex-col items-center justify-start h-screen w-full bg-gray lg:p-4 overflow-x-auto">
        <div className="w-full flex flex-col">
          <div>
            <header className="flex flex-row justify-between items-center p-4 h-full">
              <div className="flex-grow">
                <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-center">
                  Logistics Dashboard
                </h1>
              </div>
              <NavLink
                to="/logistics-dashboard"
                className=" text-black py-2 px-4 m-0 border rounded text-sm lg:text-lg font-semibold"
                style={{
                  color: primaryColor,
                  borderColor: primaryColor,
                  transition: "background-color 0.3s",
                  border: `3px solid ${primaryColor}`,
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = primaryColor;
                  e.target.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "";
                  e.target.style.color = primaryColor;
                }}
              >
                View
              </NavLink>
            </header>
          </div>
          <PowerBI embedUrl={embedUrl} />
          {/* <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-5 items-center justify-center w-full lg:h-[7rem] md:h-[12rem] h-[25rem] my-[1rem]">
            <div className="bg-white rounded flex items-center justify-center h-full my-[1rem]">
              <p className="flex justify-center"> KPI 1</p>
            </div>
            <div className="bg-white rounded flex items-center justify-center h-full my-[1rem]">
              <p className="flex justify-center"> KPI 2</p>
            </div>
            <div className="bg-white rounded flex items-center justify-center h-full my-[1rem]">
              <p className="flex justify-center"> KPI 3</p>
            </div>
            <div className="bg-white rounded flex items-center justify-center h-full my-[1rem]">
              <p className="flex justify-center"> KPI 4</p>
            </div>
          </div>
          <div className="rounded flex flex-col lg:flex-row gap-5 items-center justify-center w-full lg:h-[20rem] h-[30rem]">
            <div className="bg-white rounded flex items-center justify-center lg:w-[70%] w-full h-full">
              <p className="flex justify-center"> Bar Chart</p>
            </div>
            <div className="bg-white rounded flex items-center justify-center lg:w-[30%] w-full h-full">
              <p className="flex justify-center"> Pie Chart</p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-5 items-center justify-center w-full lg:h-[7rem] md:h-[12rem] h-[25rem] my-[1rem]">
            <div className="bg-white rounded flex items-center justify-center h-full my-[1rem]">
              <p className="flex justify-center"> KPI 5</p>
            </div>
            <div className="bg-white rounded flex items-center justify-center h-full my-[1rem]">
              <p className="flex justify-center"> KPI 6</p>
            </div>
            <div className="bg-white rounded flex items-center justify-center h-full my-[1rem]">
              <p className="flex justify-center"> KPI 7</p>
            </div>
            <div className="bg-white rounded flex items-center justify-center h-full my-[1rem]">
              <p className="flex justify-center"> KPI 8</p>
            </div>
          </div>
          <div>
            <p className="lg:ml-0 ml-[1rem]">More KPI</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-5 items-center justify-center w-full lg:h-[7rem] md:h-[12rem] h-[25rem] my-[1rem]">
            <div className="bg-white rounded flex items-center justify-center h-full my-[1rem]">
              <p className="flex justify-center"> KPI 9</p>
            </div>
            <div className="bg-white rounded flex items-center justify-center h-full my-[1rem]">
              <p className="flex justify-center"> KPI 10</p>
            </div>
            <div className="bg-white rounded flex items-center justify-center h-full my-[1rem]">
              <p className="flex justify-center"> KPI 11</p>
            </div>
            <div className="bg-white rounded flex items-center justify-center h-full my-[1rem]">
              <p className="flex justify-center"> KPI 12</p>
            </div>
          </div> */}
        </div>
        <footer className="hidden sm:block">
          <p className="text-sm text-white fixed bottom-0 left-0 right-0 text-center z-50 bg-black p-[10px]">
            © 2024 {companyName}. All rights reserved. Powered by Trifecta.
          </p>
        </footer>
      </div>
    </div>
  );
}
