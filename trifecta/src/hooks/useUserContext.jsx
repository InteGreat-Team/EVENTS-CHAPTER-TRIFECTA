//useUserContext.jsx
import { createContext, useContext, useState } from 'react';

export const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyIndustry, setCompanyIndustry] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyLogoImgFile, setCompanyLogoImgFile] = useState('');
  const [companyLogoSrc, setCompanyLogoSrc] = useState('');
  const [serviceInventory, setServiceInventory] = useState(false);
  const [serviceLogistics, setServiceLogistics] = useState(false);
  const [serviceProcurement, setServiceProcurement] = useState(false);
  const [userUID, setUserUID] = useState('');
  const [userID, setUserID] = useState('');
  const [isEmailInvalid, setIsEmailInvalid] = useState(null);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(null);
  const [currentDocId, setCurrentDocId] = useState();
  const [primaryColor, setPrimaryColor] = useState('');
  const [secondaryColor, setSecondaryColor] = useState('');
  const [userRow, setUserRow] = useState([
    {
        column1: "Henry Sy",
        column2: "Owner",
        column3: "Tenant",
        column4: "henrysy@gmail.com"
    },
    {
        column1: "Travis Stonks",
        column2: "Inventory, Logistics",
        column3: "Manager",
        column4: "travisstonks@gmail.com"
    },
    {
        column1: "John Smith",
        column2: "Procurement",
        column3: "Procurement Management",
        column4: "johnsmith@gmail.com"
    }
    // Add more initial data rows as needed
  ]);

  function resetAdminFields() {
    setUserFirstName('');
    setUserLastName('');
    setUserRole('');
    setUserEmail();
    setUserPassword('');
    setUserUID('');
    
    /* setUserID('');
    setCompanyName('');
    setCompanyEmail('');
    setCompanyAddress('');
    setCompanyIndustry('');
    setServiceProcurement('');
    setServiceInventory('');
    setServiceLogistics(''); */
  }

  function updateUserFields(data) {
    // Update all fields based on the provided data object
    setUserFirstName(data.userFirstName || '');
    setUserLastName(data.userLastName || '');
    setUserRole(data.userRole ||'');
    setUserEmail(data.userEmail || '');
    setUserPassword(data.userPassword ||'');
    setUserUID(data.uid ||'');

    /* setUserID(data.id || '');
    setCompanyName(data.companyName || '');
    setCompanyEmail(data.companyEmail || '');
    setCompanyAddress(data.companyAddress || '');
    setCompanyIndustry(data.companyIndustry || '');
    setServiceProcurement(data.service_procurement || '');
    setServiceInventory(data.service_inventory || '');
    setServiceLogistics(data.service_logistics || ''); */
  }

  function resetValidation() {
    setIsEmailInvalid(null);
    setIsPasswordInvalid(null);
  }

  const contextValue = {
    userFirstName,
    setUserFirstName,
    userLastName,
    setUserLastName,
    userRole,
    setUserRole,
    userEmail,
    setUserEmail,
    userPassword,
    setUserPassword,
    /* companyName,
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
    serviceInventory,
    setServiceInventory,
    serviceLogistics,
    setServiceLogistics,
    serviceProcurement,
    setServiceProcurement, */
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
    updateUserFields,
    primaryColor, setPrimaryColor, 
    secondaryColor, setSecondaryColor,
    userRow,
    setUserRow
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}