import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserAuth } from './useAuthContext';
import { getUserInfo } from '../server/FirebaseClient';

export const TenantContext = createContext();

export function useTenantContext() {
  return useContext(TenantContext);
}

export const TenantProvider = ({ children }) => {
  const [tenantFirstName, setTenantFirstName] = useState('');
  const [tenantLastName, setTenantLastName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const [companyName, setCompanyName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyIndustry, setCompanyIndustry] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyLogoImgFile, setCompanyLogoImgFile] = useState('');
  const [companyLogoSrc, setCompanyLogoSrc] = useState('');
  const [companyDesc, setCompanyDesc] = useState('');
  const [serviceInventory, setServiceInventory] = useState(false);
  const [serviceLogistics, setServiceLogistics] = useState(false);
  const [serviceProcurement, setServiceProcurement] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('');

  const [userUID, setUserUID] = useState('');
  const [userID, setUserID] = useState('');
  const [isEmailInvalid, setIsEmailInvalid] = useState(null);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(null);
  const [currentDocId, setCurrentDocId] = useState();

  function resetAdminFields() {
    /* setUserFirstName('');
    setUserLastName('');
    setUserRole('');
    setUserEmail();
    setUserPassword('');
    setUserUID('');
    setUserID(''); */

    setCompanyName('');
    setCompanyEmail('');
    setCompanyAddress('');
    setCompanyIndustry('');
    setCompanyDesc('');
    setServiceProcurement('');
    setServiceInventory('');
    setServiceLogistics('');
    setTenantFirstName('');
    setTenantLastName('');
    setPrimaryColor('');
  }

  function updateTenantFields(data) {
    // Update all fields based on the provided data object
    /* setUserFirstName(data.firstName || '');
    setUserLastName(data.lastName || '');
    setUserRole(data.role ||'');
    setUserEmail(data.email || '');
    setUserPassword(data.password ||'');
    setUserUID(data.uid ||'');
    setUserID(data.id || ''); */

    setCompanyName(data.companyName || '');
    setCompanyEmail(data.companyEmail || '');
    setCompanyAddress(data.companyAddress || '');
    setCompanyIndustry(data.companyIndustry || '');
    setCompanyDesc(data.companyDescription || '');
    setCompanyLogoImgFile(data.companyLogo || '');
    setServiceProcurement(data.service_procurement || '');
    setServiceInventory(data.service_inventory || '');
    setServiceLogistics(data.service_logistics || '');
    setTenantFirstName(data.firstName || '');
    setTenantLastName(data.lastName || '');
    setPrimaryColor(data.themePreference || '');
  }

  function updateServices(pro, inv, log) {
    setServiceProcurement(pro);
    setServiceInventory(inv);
    setServiceLogistics(log);
  }

  function updateColor(color1) {
    // Update all fields based on the provided data object
    setPrimaryColor(color1);
  }

  function updateLogo(logo) {
    setCompanyLogoImgFile(logo);
  }

  function resetValidation() {
    setIsEmailInvalid(null);
    setIsPasswordInvalid(null);
  }

  const [tenantInfo, setTenantInfo] = useState({});

  const { user } = UserAuth();

  useEffect(() => {
    async function fetchTenant() {
      if (user) {
        try {
          const currentTenant = await getUserInfo(user);
          setTenantInfo(currentTenant);
          console.log(currentTenant);
        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchTenant();
  }, [user]);

  const contextValue = {
    tenantInfo,
    setTenantInfo,
    companyName,
    setCompanyName,
    companyEmail,
    setCompanyEmail,
    companyIndustry,
    setCompanyIndustry,
    companyAddress,
    setCompanyAddress,
    companyLogoImgFile,
    setCompanyLogoImgFile,
    companyLogoSrc,
    setCompanyLogoSrc,
    companyDesc,
    setCompanyDesc,
    serviceInventory,
    setServiceInventory,
    serviceLogistics,
    setServiceLogistics,
    serviceProcurement,
    setServiceProcurement,
    primaryColor,
    setPrimaryColor,
    updateServices,
    updateColor,
    tenantFirstName,
    setTenantFirstName,
    tenantLastName,
    setTenantLastName,
    updateLogo,

    userRole,
    setUserRole,
    userEmail,
    setUserEmail,
    userPassword,
    setUserPassword,

    userUID,
    setUserUID,
    isEmailInvalid,
    setIsEmailInvalid,
    isPasswordInvalid,
    setIsPasswordInvalid,
    resetAdminFields,
    resetValidation,
    currentDocId,
    setCurrentDocId,
    updateTenantFields
  };

  return (
    <TenantContext.Provider value={contextValue}>
      {children}
    </TenantContext.Provider>
  );
};