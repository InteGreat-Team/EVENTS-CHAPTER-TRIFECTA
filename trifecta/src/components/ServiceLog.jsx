import { useTenantContext } from "../hooks/useTenantContext.jsx";
import {setServices } from "../server/FirebaseClient.js";
import React, { useState } from 'react';
import Switch from './Switch';

export default function servicePro(){
    const {primaryColor, secondaryColor, companyName, serviceProcurement, serviceInventory, serviceLogistics, updateServices} = useTenantContext();
    const [enabled, setEnabled] = useState(serviceLogistics)

    const onClickLogistics = async () => {
        try{
        updateServices(serviceProcurement, serviceInventory, enabled)
        console.log("Clicked! ", enabled);
        const success = await setServices(companyName, "logistics", !enabled);
        if (success) {
                console.log("Logistics service preference updated successfully.");
                window.location.reload();
            } else {
                console.error("Failed to update Logistics service preference.");
            }
        }catch (error) {
            console.error("Error updating Logistics service preference:", error);
        }
    };

    return(
        <>
        <div className="flex flex-row flex-wrap items-center">
                <h1 className="md:text-2xl text-l mr-6 mb-3" style={{ color: primaryColor }}>Enable Logistics Service</h1>
                <Switch color1={primaryColor} color2={secondaryColor} checked={enabled} onChange={(e) => setEnabled(e.target.checked)} onClick={onClickLogistics}/>
        </div>
        </>
    );
}