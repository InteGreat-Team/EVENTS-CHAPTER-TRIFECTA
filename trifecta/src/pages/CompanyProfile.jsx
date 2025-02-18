import React, {useEffect} from "react";
import { useUserInfoContext } from '../hooks/useUserInfoContext.jsx';
import { useUserContext } from '../hooks/useUserContext.jsx';
import { useTenantContext} from '../hooks/useTenantContext.jsx';
import { NavBar } from '../global/NavBar.jsx';
import { NavBarMobile } from '../global/NavBarMobile.jsx';
import defaultLogo from "../assets/companyLogoDefault.jpg";
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export function CompanyProfile(){
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
    companyDesc,
    primaryColor,
    secondaryColor,
    serviceInventory,
    serviceLogistics,
    serviceProcurement,
    tenantFirstName,
    tenantLastName
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
            <div className="flex flex-col items-center justify-around h-screen w-full bg-gray lg:p-4 overflow-x-auto">
                <div className=" bg-white w-full h-screen flex lg:flex-row md:flex-col flex-col items-center justify-around overflow-x-auto">
                    <div className="flex basis-1/3 flex-col h-auto lg:h-full w-full items-center justify-start mt-4 lg:mt-20 lg:border-r">
                        <h1 className="text-2xl lg:ml-10 lg:self-start font-semibold ">Company Profile</h1>
                        {companyLogoImgFile ? (
                            <img src={companyLogoImgFile} alt="Logo" className="mt-4 w-80 h-auto" />
                        ) : (
                            <Skeleton className="mt-4 mb-4" circle={true} height={250} width={250} />
                        )}
                        {companyDesc ? (
                            <h3 className="mx-4 lg:text-sm md:text-xs text-sm text-center mt-2 md:pb-10">{companyDesc}</h3>
                        ):(
                            <div className="flex flex-col items-center space-y-2">
                                <Skeleton width={300} height={20} />
                                <Skeleton width={300} height={20} />
                                <Skeleton width={300} height={20} />
                                <Skeleton width={300} height={20} />
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col basis-2/3 h-full w-full">
                        <div className="flex flex-col h-full w-4/5 mt-14 place-self-center">
                            <div className="flex flex-row mb-4">
                                <p className=" flex left-0 text-2xl font-bold items-center justify-center" 
                                    style={{color: primaryColor}}>Company Info</p>
                                <Link to={"/settings"} className="px-3 py-2 text-xs md:text-base items-center rounded-2xl bg-white text-white flex flex-row flex-nowrap justify-end font-semibold ml-auto" 
                                    style={{ 
                                        color: primaryColor, 
                                        borderColor: primaryColor, 
                                        transition: "background-color 0.3s", 
                                        border: `3px solid ${primaryColor}` 
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = primaryColor;
                                        e.target.style.color = 'white';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = "";
                                        e.target.style.color = primaryColor;
                                    }}>
                                        Edit Profile</Link>
                            </div>

                            <div className="flex flex-row">
                                <div className="w-1/2">
                                    <h1 className="font-bold">Company Name</h1>
                                    {companyName ? (<p>{companyName}</p>) : (<Skeleton width={200} height={20} />)}
                                </div>
                                <div className="w-1/2">
                                    <h1 className="font-bold">Company Industry</h1>
                                    {companyIndustry ? (<p>{companyIndustry}</p>) : (<Skeleton width={200} height={20} />)}
                                </div>
                            </div>

                            <div className="mt-4 border-b border-stone mb-4 pb-4">
                                <h1 className="font-bold">Company Address</h1>
                                {companyAddress ? (<p>{companyAddress}</p>) : (<Skeleton width={200} height={20} />)}
                            </div>


                            <h1 className="text-2xl font-bold text-red" style={{color: primaryColor}}>Tenant Info</h1>

                            <div className="flex flex-row mt-4">

                                <div className="w-1/2">
                                    <h1 className="font-bold">Tenant First Name</h1>
                                    {tenantFirstName ? (<p>{tenantFirstName}</p>) : (<Skeleton width={200} height={20} />)}
                                </div>
                                <div className="w-1/2">
                                    <h1 className="font-bold">Tenant Second Name</h1>
                                    {tenantLastName ? (<p>{tenantLastName}</p>) : (<Skeleton width={200} height={20} />)}
                                </div>
                            </div>

                            <div className="flex flex-row mt-4 border-b border-stone mb-4 pb-4">
                                <div className="w-1/2">
                                    <h1 className="font-bold">Email</h1>
                                    {companyEmail ? (<p>{companyEmail}</p>) : (<Skeleton width={200} height={20} />)}
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <h1 className="text-2xl font-bold text-red" style={{color: primaryColor}}>Services Availed </h1>
                                {serviceProcurement ? (<p className="mb-24">{serviceProcurement? "✔️" : "❌" } Procurement {serviceInventory? "✔️" : "❌" } Inventory {serviceLogistics? "✔️" : "❌" } Logistics</p>) : (<Skeleton width={200} height={20} />)}
                            </div>
                            
                            </div>
                    </div>
                </div>
                <footer className="hidden sm:block">
                  <p className="text-sm text-white fixed bottom-0 left-0 right-0 text-center z-50 bg-black p-[10px]">© 2024 {companyName}. All rights reserved. Powered by Trifecta.</p>
                </footer>
            </div>
        </div>
    )
}