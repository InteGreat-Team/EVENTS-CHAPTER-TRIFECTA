import React, {useEffect, useState} from "react";
import { useUserInfoContext } from '../hooks/useUserInfoContext.jsx';
import { useUserContext } from '../hooks/useUserContext.jsx';
import { useTenantContext} from '../hooks/useTenantContext.jsx';
import { NavBar } from '../global/NavBar.jsx';
import { NavBarMobile } from '../global/NavBarMobile.jsx';

export function Dashboard() {
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
    } = useTenantContext(); 
    //console.log('Tenant info: ', tenantInfo);
    console.log("Tenant Context",useTenantContext());

    useEffect(() => {
        // Call updateUserFields in useEffect to avoid state updates during rendering
        if (userInfo) {
        updateUserFields(userInfo);
        updateTenantFields(tenantInfo);

    }
    }, [updateUserFields, userInfo]);

    useEffect(() => {
        console.log("Company logo", companyLogoImgFile);
    },[]);

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
                <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-5 items-center justify-center w-full lg:h-[7rem] md:h-[12rem] h-[25rem] my-[1rem]">
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

                <div className="rounded flex flex-col lg:flex-row gap-5 items-center justify-center w-full lg:h-[20rem] h-[30rem] mb-[10px]">
                    <div className="bg-white rounded flex items-center justify-center lg:w-[70%] w-full h-full">
                        <p className="flex justify-center" > Bar Chart</p>
                    </div>
                    <div className="bg-white rounded flex items-center justify-center lg:w-[30%] w-full h-full">
                        <p className="flex justify-center" > Pie Chart</p>
                    </div>
                </div>

                <div>
                    <p className="lg:ml-0 ml-[1rem]">More KPI</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center justify-center w-full h-[32.5rem] my-[1rem] mt-[0rem]">
                    <div className="rounded flex flex-col items-center justify-start h-full my-[1rem] mb-[-1rem]">
                        <div className="bg-white rounded flex flex-col items-center justify-center w-full md:h-[7rem] h-[5.5rem]">
                            <p className="flex justify-center"> KPI 5a</p>
                        </div>
                        <div className="bg-white rounded flex flex-col items-center justify-center w-full md:h-[20rem] h-[12rem] my-[1rem]">
                            <p className="flex justify-center"> KPI 5b</p>
                        </div>
                    </div>
                    <div className="rounded flex flex-col items-center justify-start h-full my-[1rem] mb-[-1rem]">
                        <div className="bg-white rounded flex flex-col items-center justify-center w-full md:h-[7rem] h-[5.5rem]">
                            <p className="flex justify-center"> KPI 6a</p>
                        </div>
                        <div className="bg-white rounded flex flex-col items-center justify-center w-full md:h-[20rem] h-[12rem] my-[1rem]">
                            <p className="flex justify-center"> KPI 6b</p>
                        </div>
                    </div>
                    <div className="rounded flex flex-col items-center justify-start h-full my-[1rem] mb-[-1rem]">
                        <div className="bg-white rounded flex flex-col items-center justify-center w-full md:h-[7rem] h-[5.5rem]">
                            <p className="flex justify-center"> KPI 7a</p>
                        </div>
                        <div className="bg-white rounded flex flex-col items-center justify-center w-full md:h-[20rem] h-[12rem] my-[1rem]">
                            <p className="flex justify-center"> KPI 7b</p>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="hidden sm:block">
                <p className="text-sm text-white fixed bottom-0 left-0 right-0 text-center z-50 bg-black p-[10px]">© 2024 {companyName}. All rights reserved. Powered by Trifecta.</p>
            </footer>
        </div>
    </div>
);
}
