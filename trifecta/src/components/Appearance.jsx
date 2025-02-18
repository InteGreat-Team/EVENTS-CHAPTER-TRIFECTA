import React, { useState, useEffect } from 'react';
import Switch from './Switch';
import { useTenantContext } from "../hooks/useTenantContext.jsx";
import {setCompanyThemePreference } from "../server/FirebaseClient.js";
import { LoadingScreen } from '../global/LoadingScreen.jsx';

export default function Appearance() {
    const {
        primaryColor,
        companyName,
        tenantInfo,
        updateColor,
        updateTenantFields
            } = useTenantContext();

    const [color1, setColor1] = useState(primaryColor);

    const [enabled, setEnabled] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        // Call updateUserFields in useEffect to avoid state updates during rendering
        if (tenantInfo) {
        updateTenantFields(tenantInfo);
    }
    },[primaryColor, tenantInfo, color1]);

    const handleChangeColor1 = (e) => {
        setColor1(e.target.value);
    };

    const handleSaveChanges = async () => {
        try {
            await updateColor(color1);
            // Call the API function to set the company theme preference with the selected color
            const success = await setCompanyThemePreference(companyName, color1);

            if (success) {
                console.log("Theme preference updated successfully.");
                window.location.reload();
            } else {
                console.error("Failed to update theme preference.");
            }
        } catch (error) {
            console.error("Error updating theme preference:", error);
        }
    };

    const handleCancelChanges = () => {
        // Reset the color to the initial color or perform any other action needed
        setColor1(primaryColor);
    };

    return (
        <div className="flex flex-col md:ml-12 ml-3 mt-6">
            <setCompanyThemePreference/>
            <div className="flex flex-col justify-start">

                <div className="flex flex-row items-center justify-start mb-6">
                    <h1 className="lg:text-2xl text-xl mr-2 ">Company Color Theme</h1>
                    <div className="flex items-center mt-4 ml-2">
                        <input
                            className={`h-10 w-20 border border-gray-300 rounded-md`}
                            type="color"
                            value={color1}
                            onChange={handleChangeColor1}
                        />
                        <span className="ml-2 text-gray-600">{color1}</span>
                    </div>
                </div>
                
                <div className="flex items-center justify-center md:justify-start md:mt-4 md:ml-2">
                    <button className="ml-2 px-4 py-2 bg-gray-300 text-black rounded-2xl border hover:bg-gray hover:scale-100" 
                        onClick={handleCancelChanges}>
                        Cancel
                    </button>
                    <button className="ml-2 px-4 py-2 text-black rounded-2xl border hover:scale-100"
                        style={{ transition: "background-color 0.3s" }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = color1}
                        onMouseLeave={(e) => e.target.style.backgroundColor = ""}
                        onClick={handleSaveChanges}
                    >
                        Save
                    </button>                
                </div>
            </div>
        </div>
    );
}
