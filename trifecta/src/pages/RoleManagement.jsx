import React, { useEffect, useState } from "react";
import { useUserInfoContext } from '../hooks/useUserInfoContext.jsx';
import { useUserContext } from '../hooks/useUserContext.jsx';
import { useTenantContext} from '../hooks/useTenantContext.jsx';
import { NavBar } from '../global/NavBar.jsx';
import { NavBarMobile } from '../global/NavBarMobile.jsx';
import RoleMembers from "../components/RoleMembers.jsx";
import RoleAppearance from "../components/RoleAppearance.jsx";
import RolePermissions from "../components/RolePermissions.jsx";


const EditableRolePermissions = ({ onUpdatePermissions }) => {
  const [permissions, setPermissions] = useState({
    viewDashboard: false,
    editSettings: false,
    manageUsers: false,
  });

  const handlePermissionChange = (permission) => {
    const updatedPermissions = { ...permissions, [permission]: !permissions[permission] };
    setPermissions(updatedPermissions);
    onUpdatePermissions(updatedPermissions);
  };

  const permissionEntries = {
    manageRoles: { description: 'Allows users to create, edit, or delete roles' },
    viewProcurement: { description: 'Allows users to view procurement service' },
    viewLogistics: { description: 'Allows users to view logistics service' },
    viewInventory: { description: 'Allows users to view Inventory service' },
  };

  return (
    <div>

      <div className="flex flex-col mt-4">
        <div className="grid grid-cols-1 w-96 gap-6">
          {Object.entries(permissionEntries).map(([permission, { description }]) => (
            <div key={permission} className="flex flex-col mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-3xl mb-6 font-bold">{permission.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h3>
                  <p className="text-sm text-gray-500">{description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={permissions[permission]} 
                    onChange={() => handlePermissionChange(permission)} 
                  />
                  <div className="w-14 h-8 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
              <hr className="my-2 border-gray-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export function RoleManagement(){
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

  const [editRoleView, setEditRoleView] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleEditClick = (roleName) => {
    setSelectedRole({ name: roleName });
    setEditRoleView(true);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirm = () => {
    console.log("Role deleted:", selectedRole.name);
    setShowDeleteConfirmation(false);
    setEditRoleView(false);
  };

  const handleBackClick = () => {
    setEditRoleView(false);
  };

  const handleRemoveMember = () => {
    setEditRoleView(false);
    setSelectedRole(null);
  };

  const handleSubmitClick = () => {
    setEditRoleView(false);
    setSelectedRole(null);
  };

  const [showEditView, setShowEditView] = useState(false);

  const members = [
    { id: 1, name: 'Jack Gottenburg' },
    { id: 2, name: 'Louis Panganiban' },
    { id: 3, name: 'Judith Yukata' },
  ];

  const roleHierarchy = [
    { id: 'procurement', name: 'Procurement Manager' },
    { id: 'manager', name: 'Manager' },
  ];

  const [memberClass, setMemberClass] = useState("border-black border-b-4 mr-6 text-3xl font-light text-black");
  const [showMember, setShowMember] = useState(true);
  const onClickMember = () => {
    setMemberClass("border-black border-b-4 mr-6 text-3xl font-light text-black");
    setAppearanceClass("mr-6 text-3xl font-light text-black");
    setPermissionsClass("mr-6 text-3xl font-light text-black");
    setShowMember(true);
    setShowAppearance(false);
    setShowPermissions(false);
  };

  const [showAppearance, setShowAppearance] = useState(false);
  const [appearanceClass, setAppearanceClass] = useState("mr-6 text-3xl font-light text-black");
  const onClickAppearance = () => {
    setMemberClass("mr-6 text-3xl font-light text-black");
    setAppearanceClass("border-black border-b-4 mr-6 text-3xl font-light text-black");
    setPermissionsClass("mr-6 text-3xl font-light text-black");
    setShowMember(false);
    setShowAppearance(true);
    setShowPermissions(false);
  };

  const [showPermissions, setShowPermissions] = useState(false);
  const [permissionsClass, setPermissionsClass] = useState("mr-6 text-3xl font-light text-black");
  const onClickPermissions = () => {
    setMemberClass("mr-6 text-3xl font-light text-black");
    setAppearanceClass("mr-6 text-3xl font-light text-black");
    setPermissionsClass("border-black border-b-4 mr-6 text-3xl font-light text-black");
    setShowMember(false);
    setShowAppearance(false);
    setShowPermissions(true);
  };

  const [roleColor, setRoleColor] = useState('#000');

  const handleColorSelect = (color) => {
    setRoleColor(color);
  };

  const handleUpdatePermissions = (permissions) => {
    console.log("Updated Permissions:", permissions);
  };

  return (
    <div className="flex lg:flex-row w-screen h-screen flex-col">
      <div className="lg:h-screen md:mb-0 justify-start">
        <NavBar />
        <NavBarMobile />
      </div>
      <div className="flex flex-col items-center justify-around h-screen w-full bg-gray lg:p-4 overflow-x-auto">
        <div className="bg-white w-full h-full flex flex-col">
          <div className="mt-14 ml-12">
            <h1 className="text-3xl font-bold">Manage Roles</h1>
          </div>

          {!editRoleView && (
            <div className="flex flex-row mt-4 ml-12">
              <div className="flex flex-row basis-5/6 h-6">
                <p className="font-light text-xl">Search Role : </p>
                <input type="text" className="ml-5 basis-1/5 placeholder:italic placeholder:text-slate-400 block bg-white h-10 w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-lg" placeholder="Search Roles" />
              </div>
              <button className="w-48 h-10 right-0 mr-4 text-lg p-1 bg-white border-red-dark text-red-dark border" style={{color: primaryColor, borderColor: primaryColor}}>EDIT ROLES</button>
              <button className="w-40 h-8 right-0 p-1 text-sm bg-red-dark border-red-dark text-white" style={{borderColor: primaryColor, backgroundColor: primaryColor}}>ADD NEW ROLE</button>
            </div>
          )}

          {!editRoleView ? (
            <div className="mt-10 ml-12 mr-10">
              <table className="w-full">
                <thead>
                  <tr className="text-left" style={{borderColor: primaryColor, backgroundColor: primaryColor}}>
                    <th className="p-2">Role</th>
                    <th>Department</th>
                    <th>Members</th>
                    <th>Color</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-light">
                    <td className="p-2">Tenant</td>
                    <td>Owner</td>
                    <td>1 Member</td>
                    <td>Red</td>
                    <td className="text-right pr-4 cursor-pointer">
                      <span onClick={() => handleEditClick('Tenant')}>✏️</span>
                      <span onClick={handleDeleteClick}> ❌</span>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-light">
                    <td className="p-2">Manager</td>
                    <td>Inventory, Procurement</td>
                    <td>4 Members</td>
                    <td>White</td>
                    <td className="text-right pr-4 cursor-pointer">
                      <span onClick={() => handleEditClick('Manager')}>✏️</span>
                      <span onClick={handleDeleteClick}> ❌</span>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-light">
                    <td className="p-2">Procurement Manager</td>
                    <td>Procurement</td>
                    <td>2 members</td>
                    <td>Black</td>
                    <td className="text-right pr-4 cursor-pointer">
                      <span onClick={() => handleEditClick('Procurement Manager')}>✏️</span>
                      <span onClick={handleDeleteClick}> ❌</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex w-full">
              <div className="sidebar bg-white p-3 rounded w-1/8 mt-32">
                <div className="text-lg font-bold text-gray-700">{"> " + selectedRole.name}</div>
              </div>
              <div className="edit-role-view bg-white p-4 rounded-lg shadow-lg flex-grow">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl items-center justify-center font-bold" style={{ color: roleColor }}>EDIT ROLE - {selectedRole.name}</h1>
                  <div className="flex self-end items-center gap-1 mt-4">
                    <button
                    onClick={handleBackClick}
                    className="bg-red hover:bg-gray text-black py-2 px-4 rounded-2xl"
                    style={{ background: primaryColor }}
                    >
                    Back
                    </button>
                    <button
                    onClick={handleSubmitClick}
                    className="bg-red hover:bg-gray text-black py-2 px-4 rounded-2xl"
                    style={{ background: primaryColor }}
                    >
                      Submit
                    </button>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="border-none" onClick={onClickMember}>
                    <h1 className={memberClass}>MEMBERS</h1>
                  </button>

                  <button className="border-none" onClick={onClickAppearance}>
                    <h1 className={appearanceClass}>APPEARANCE</h1>
                  </button>

                  <button className="border-none" onClick={onClickPermissions}>
                    <h1 className={permissionsClass}>PERMISSIONS</h1>
                  </button>

                  {showMember && <RoleMembers members={members} />}
                  {showAppearance && <RoleAppearance onColorSelect={handleColorSelect} />}
                  {showPermissions && <EditableRolePermissions onUpdatePermissions={handleUpdatePermissions} />}
                </div>
             </div>
            </div>
          )}

        </div>
      </div>
      
      {showDeleteConfirmation && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this?</h2>
                <div className="flex justify-between">
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleDeleteConfirm}>
                    Yes
                  </button>
                  <button className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => setShowDeleteConfirmation(false)}>
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
        <footer className="hidden sm:block">
            <p className="text-sm text-white fixed bottom-0 left-0 right-0 text-center z-50 bg-black p-[10px]">© 2024 {companyName}. All rights reserved. Powered by Trifecta.</p>
        </footer>
    </div>
  );
}
