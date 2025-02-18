import { useTenantContext } from "../hooks/useTenantContext.jsx";
import {setServices } from "../server/FirebaseClient.js";
import React, { useState } from 'react';
import Switch from './Switch';

export default function servicePro(){
    const {primaryColor, secondaryColor, companyName, serviceProcurement, serviceInventory, serviceLogistics, updateServices} = useTenantContext();
    const [enabled, setEnabled] = useState(serviceInventory)

    const onClickInventory = async () => {
        try{
        updateServices(serviceProcurement, enabled, serviceLogistics)
        console.log("Clicked! ", enabled);
        const success = await setServices(companyName, "inventory", !enabled);
        if (success) {
                console.log("Inventory service preference updated successfully.");
                window.location.reload();
            } else {
                console.error("Failed to update Inventory service preference.");
            }
        }catch (error) {
            console.error("Error updating Inventory service preference:", error);
        }
    };

    return(
        <>
        <div className="flex flex-row flex-wrap items-center">
                <h1 className="md:text-2xl text-l mr-6 mb-3" style={{ color: primaryColor }}>Enable Inventory Service</h1>
                <Switch color1={primaryColor} color2={secondaryColor} checked={enabled} onChange={(e) => setEnabled(e.target.checked)} onClick={onClickInventory}/>
        </div>
        </>
    );
}