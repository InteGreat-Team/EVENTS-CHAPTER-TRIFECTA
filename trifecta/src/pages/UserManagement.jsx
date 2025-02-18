import React, { useState, useEffect } from "react";
import { useUserInfoContext } from '../hooks/useUserInfoContext.jsx';
import { useUserContext } from '../hooks/useUserContext.jsx';
import { useTenantContext} from '../hooks/useTenantContext.jsx';
import { NavBar } from '../global/NavBar.jsx';
import { NavBarMobile } from '../global/NavBarMobile.jsx';
import DataTable from "../components/DataTable.jsx";
import AddUserModal from "../components/AddUserModal.jsx";

export function UserManagement(){
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
    userRow,
    setUserRow
    } = useUserContext();
    //console.log('User info: ', userInfo);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const addUser = (user) => {
        setUserRow((prevUserRow) => [...prevUserRow, user]);
      };

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
    primaryColor
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
                <div className="bg-white w-full h-full flex flex-col">
                    <div className="mt-14 ml-12">
                        <h1 className="text-2xl font-bold">Manage Users</h1>
                    </div>
 
                    <div className="flex flex-row mt-4 ml-12">
                        <div className="flex flex-row basis-5/6 h-6">
                        </div>
                        <button onClick={openModal} className="w-40 h-8 right-0 p-1 text-sm bg-red-dark border-red-dark text-white" style={{borderColor: primaryColor, backgroundColor: primaryColor}}>ADD NEW USER</button>
                    </div>

                        {/* Render the DataTable component */}
                        <div className="w-full mt-4">
                            <DataTable data={userRow} />
                        </div>

                        {/* Render the AddUserModal component */}
                        <AddUserModal
                            isOpen={isModalOpen}
                            onClose={closeModal}
                            onAddUser={addUser}
                        />
                  </div>
                <footer className="hidden sm:block">
                    <p className="text-sm text-white fixed bottom-0 left-0 right-0 text-center z-50 bg-black p-[10px]">© 2024 {companyName}. All rights reserved. Powered by Trifecta.</p>
                </footer>
            </div>
        </div>
    )
}