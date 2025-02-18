import { useTenantContext } from "../hooks/useTenantContext.jsx";
import React, { useState } from "react";
import { NavBar } from "../global/NavBar.jsx";
import { NavBarMobile } from "../global/NavBarMobile.jsx";
import ServicePro from "./ServicePro.jsx";
import ServiceInv from "./ServiceInv.jsx";
import ServiceLog from "./ServiceLog.jsx";

export default function services() {
    const {companyName, serviceProcurement, serviceInventory, serviceLogistics, primaryColor} = useTenantContext();

    const [ProcurementClass, setProcurementClass] = useState("flex flex-start border-red-dark border-l-4 mr-6 text-2xl font-light text-black");
    const [InventoryClass, setInventoryClass] = useState("flex flex-start text-2xl mr-6 font-light text-black");
    const [LogisticsClass, setLogisticsClass] = useState("flex flex-start text-2xl mr-6 font-light text-black");
    const [showProcurement, setShowProcurement] = useState(true);
    const [showInventory, setShowInventory] = useState(false);
    const [showLogistics, setShowLogistics] = useState(false);


    function onClickProcurement() {
        setProcurementClass("flex flex-start border-red-dark border-l-4 mr-6 text-2xl font-light text-black");
        setInventoryClass("flex flex-start text-2xl mr-6 font-light text-black");
        setLogisticsClass("flex flex-start text-2xl mr-6 font-light text-black");
        setShowProcurement(true);
        setShowLogistics(false);
        setShowInventory(false);
        }

    function onClickInventory() {
        setInventoryClass("flex flex-start border-red-dark border-l-4 mr-6 text-2xl font-light text-black");
        setProcurementClass("flex flex-start text-2xl mr-6 font-light text-black");
        setLogisticsClass("flex flex-start text-2xl mr-6 font-light text-black");
        setShowProcurement(false);
        setShowLogistics(false);
        setShowInventory(true);
        }

    function onClickLogistics() {
        setLogisticsClass("flex flex-start border-red-dark border-l-4 mr-6 text-2xl font-light text-black");
        setInventoryClass("flex flex-start text-2xl mr-6 font-light text-black");
        setProcurementClass("flex flex-start text-2xl mr-6 font-light text-black");
        setShowProcurement(false);
        setShowLogistics(true);
        setShowInventory(false);
    }

    return(
        <div className="flex flex-col md:ml-12 ml-3 mt-6">
            <h1 className="text-2xl font-bold text-red" style={{color: primaryColor}}>Services Availed</h1>
            <p className="mb-2">{serviceProcurement? "✔️" : "❌" } Procurement</p>
            <p className="mb-2">{serviceInventory? "✔️" : "❌" } Inventory</p>
            <p className="mb-2">{serviceLogistics? "✔️" : "❌" } Logistics</p>
                    <div className="flex flex-row mt-8 text-dark-gray">
                        <div className="flex flex-col">
                            <button className="border-none" onClick={onClickProcurement}>
                            <h1 className={ProcurementClass} style={{borderColor: primaryColor}}>Procurement</h1>
                            </button>
                            <button className="border-none" onClick={onClickInventory}>
                            <h1 className={InventoryClass} style={{borderColor: primaryColor}}>Inventory</h1>
                            </button>
                            <button className="border-none" onClick={onClickLogistics} >
                            <h1 className={LogisticsClass} style={{borderColor: primaryColor}}>Logistics</h1>
                            </button>
                        </div>
                        
                        <div>
                            {showProcurement && <ServicePro />}
                            {showInventory && <ServiceInv />}
                            {showLogistics && <ServiceLog />}
                        </div>
                    </div>
                    
            </div>
    );
}

