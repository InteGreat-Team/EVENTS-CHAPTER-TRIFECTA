import React, { useEffect, useState } from "react";
import { useUserInfoContext } from "../hooks/useUserInfoContext.jsx";
import { useUserContext } from "../hooks/useUserContext.jsx";
import { useTenantContext} from '../hooks/useTenantContext.jsx';
import { NavBar } from "../global/NavBar.jsx";
import { NavBarMobile } from "../global/NavBarMobile.jsx";
import Appearance from "../components/Appearance.jsx";
import Company from "../components/Company.jsx";
import Services from "../components/Services.jsx";

export function Settings(){
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
    secondaryColor
    } = useTenantContext(); 
    //console.log('Tenant info: ', tenantInfo);
    //console.log("Tenant Context",useTenantContext());

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (userInfo && tenantInfo) {
            updateUserFields(userInfo);
            updateTenantFields(tenantInfo);
            setIsLoading(false);
        }
    }, [tenantInfo]);

  const [profileClass, setProfileClass] = useState("border-red-dark border-b-4 md:ml-12 md:mr-6 text-2xl font-light text-black");
  const [servicesClass, setServicesClass] = useState("text-2xl md:mx-6 font-light text-black");
  const [appearanceClass, setAppearanceClass] = useState("text-2xl md:mx-6 mr-6 font-light text-black");
  const [showProfile, setShowProfile] = useState(true);
  const [showServices, setShowServices] = useState(false);
  const [showAppearance, setShowAppearance] = useState(false);

  function onClickProfile() {
    setProfileClass("border-red-dark border-b-4 md:ml-12 md:mr-6 text-2xl font-light text-black");
    setServicesClass("text-2xl md:mx-6 font-light text-black");
    setAppearanceClass("text-2xl md:mx-6 mr-6  font-light text-black");
    setShowProfile(true);
    setShowAppearance(false);
    setShowServices(false);
  }

  function onClickServices() {
    setServicesClass("border-red-dark border-b-4 md:mx-6 text-2xl font-light text-black");
    setProfileClass("text-2xl md:mx-6 font-light text-black");
    setAppearanceClass("text-2xl md:mx-6 mr-6 font-light text-black");
    setShowProfile(false);
    setShowAppearance(false);
    setShowServices(true);
  }

  function onClickAppearance() {
    setAppearanceClass("border-red-dark border-b-4 md:mx-6 mr-6 text-2xl font-light text-black");
    setServicesClass("text-2xl md:mx-6 font-light text-black");
    setProfileClass("text-2xl md:mx-6 font-light text-black");
    setShowProfile(false);
    setShowAppearance(true);
    setShowServices(false);
  }

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-40">Loading...</div>
      ) : (
        <>
        <div className="flex lg:flex-row w-screen h-screen flex-col">
          <div className="lg:h-screen md:mb-0 justify-start">
            <NavBar />
            <NavBarMobile />
          </div>
          <div className="flex flex-col items-center justify-around h-screen w-full bg-gray lg:p-4 overflow-x-auto">
            <div className="overflow-x-auto bg-white w-full h-full flex flex-col ">
              <h1 className="flex flex-row text-2xl font-bold text-red-dark mt-6 md:ml-12 justify-center lg:justify-start md:justify-start" 
                  style={{
                    color: primaryColor
                    }}>Settings</h1>
              <div className="flex flex-row justify-around lg:justify-start md:justify-start mt-6 border-b-2 text-dark-gray">
                  <button className="border-none hover:scale-100 hover:bg-gray mb-2 mx-1" onClick={onClickProfile}>
                      <h1 className={`${profileClass} lg:text-2xl md:text-xl text-lg font-semibold m-1`} style={{ borderColor: primaryColor }}>Profile</h1>
                  </button>
                  <button className="border-none hover:scale-100 hover:bg-gray mb-2" onClick={onClickServices}>
                      <h1 className={`${servicesClass} lg:text-2xl md:text-xl text-lg font-semibold m-1`} style={{ borderColor: primaryColor }}>Services</h1>
                  </button>
                  <button className="border-none hover:scale-100 hover:bg-gray mb-2" onClick={onClickAppearance}>
                      <h1 className={`${appearanceClass} lg:text-2xl md:text-xl text-lg font-semibold m-1`} style={{ borderColor: primaryColor }}>Appearance</h1>
                  </button>
              </div>
              {showProfile && <Company />}
              {showServices && <Services />}
              {showAppearance && <Appearance />}
            </div>
            
            <footer className="hidden sm:block">
                <p className="text-sm text-white fixed bottom-0 left-0 right-0 text-center z-50 bg-black p-[10px]">© 2024 {companyName}. All rights reserved. Powered by Trifecta.</p>
            </footer>
          </div>
        </div>
        <footer className="hidden sm:block">
          <p className="text-sm text-gray-500">
            © 2024 {companyName}. All rights reserved. Powered by Trifecta.
          </p>
        </footer>
        </>
      )}
    </>
  )
}
