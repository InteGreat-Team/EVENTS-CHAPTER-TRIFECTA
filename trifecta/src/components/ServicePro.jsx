import { useTenantContext } from "../hooks/useTenantContext.jsx";
import {setServices } from "../server/FirebaseClient.js";
import React, { useState, useEffect } from 'react';
import Switch from './Switch';

export default function servicePro(){
    const {primaryColor, secondaryColor, companyName, serviceProcurement, serviceInventory, serviceLogistics, updateServices, tenantInfo, updateTenantFields} = useTenantContext();
    const [enabled, setEnabled] = useState(serviceProcurement)

    useEffect(() => {
        // Call updateUserFields in useEffect to avoid state updates during rendering
        if (tenantInfo) {
        updateTenantFields(tenantInfo);
    }
    },[serviceProcurement, tenantInfo, updateServices]);

    const onClickProcurement = async () => {
        try{
        updateServices(enabled, serviceInventory, serviceLogistics)
        console.log("Clicked! ", enabled);
        const success = await setServices(companyName, "procurement", !enabled);
        if (success) {
                console.log("Procurement service preference updated successfully.");
                window.location.reload();
            } else {
                console.error("Failed to update Procurement service preference.");
            }
        }catch (error) {
            console.error("Error updating Procurement service preference:", error);
        }
    };

    return(
        <>
        <div className="flex flex-row flex-wrap items-center">
                <h1 className="md:text-2xl text-l mr-6 mb-3" style={{ color: primaryColor }}>Enable Procurement Service</h1>
                <Switch color1={primaryColor} color2={secondaryColor} checked={enabled} onChange={(e) => setEnabled(e.target.checked)} onClick={onClickProcurement}/>
        </div>
        </>
    );
}