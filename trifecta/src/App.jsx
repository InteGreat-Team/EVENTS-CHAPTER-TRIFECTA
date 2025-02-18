import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import React from "react";
import AuthForm from "./pages/tenantAuthForm.jsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./pages/ProtectedRoute.jsx";
import { AuthProvider } from "./hooks/useAuthContext.jsx";
import { UserInfoProvider } from "./hooks/useUserInfoContext";
import { UserProvider } from "./hooks/useUserContext";
import { TrifectaLoginForm } from "./pages/TrifectaAuthform.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { SignOutProvider } from "./hooks/useSignOutContext.jsx";
import { CompanyProfile } from "./pages/CompanyProfile.jsx";
import { UserManagement } from "./pages/UserManagement.jsx";
import { Settings } from "./pages/Settings.jsx";
import { RoleManagement } from "./pages/RoleManagement.jsx";
import { Procurement } from "./pages/Procurement.jsx";
import { Inventory } from "./pages/Inventory.jsx";
import { Logistics } from "./pages/Logistics.jsx";
import { TenantProvider } from "./hooks/useTenantContext.jsx";
import { ProductCatalogue } from "./pages/ProductCatalogue.jsx";
import { DashboardInventory } from "./pages/DashboardInventory.jsx";
import { SelectedItemProvider } from "./hooks/useSelectedItemContext.jsx";
import { ProcurementDashboard } from "./pages/ProcurementDashboard.jsx";
import { PurchaseReq } from "./pages/PurchaseReq.jsx";
import { ProductStatus } from "./pages/ProductStatus.jsx";
import { Supplier } from "./pages/Supplier.jsx";
import { PurchaseOrder } from "./pages/PurchaseOrder.jsx";
import PageNotFound from "./pages/PageNotFound";
import { TenantLogin } from "./pages/TenantLogin.jsx";
import Inbound from "./pages/inbound.jsx";
import Outbound from "./pages/outbound.jsx";
import LogisticsDashboard from "./pages/LogisticsDashboard.jsx";

function App() {
  return (
    <BrowserRouter>
      <SignOutProvider value={SignOutProvider.contextValue}>
        <AuthProvider value={AuthProvider.contextValue}>
          <TenantProvider value={TenantProvider.contextValue}>
            <UserInfoProvider value={UserInfoProvider.contextValue}>
              <UserProvider value={UserProvider.contextValue}>
                <SelectedItemProvider>
                  <Routes>
                    <Route path="/logIn" element={<TenantLogin />} />
                    <Route
                      path="/trifectalogIn"
                      element={<TrifectaLoginForm />}
                    />
                    <Route
                      path="/dashboard"
                      element={<ProtectedRoute element={<Dashboard />} />}
                    />
                    <Route
                      path="/ProcurementDashboard"
                      element={
                        <ProtectedRoute element={<ProcurementDashboard />} />
                      }
                    />
                    <Route
                      path="/PurchaseReq"
                      element={<ProtectedRoute element={<PurchaseReq />} />}
                    />
                    <Route
                      path="/Supplier"
                      element={<ProtectedRoute element={<Supplier />} />}
                    />
                    <Route
                      path="/PurchaseOrder"
                      element={<ProtectedRoute element={<PurchaseOrder />} />}
                    />
                    <Route
                      path="/ProductStatus"
                      element={<ProtectedRoute element={<ProductStatus />} />}
                    />
                    <Route
                      path="/company-profile"
                      element={<ProtectedRoute element={<CompanyProfile />} />}
                    />
                    <Route
                      path="/dashboards-procurement"
                      element={<ProtectedRoute element={<Procurement />} />}
                    />
                    <Route
                      path="/dashboards-inventory"
                      element={<ProtectedRoute element={<Inventory />} />}
                    />
                    <Route
                      path="/DashboardInventory"
                      element={
                        <ProtectedRoute element={<DashboardInventory />} />
                      }
                    />
                    <Route
                      path="/inventory-product-catalogue"
                      element={
                        <ProtectedRoute element={<ProductCatalogue />} />
                      }
                    />
                    <Route
                      path="/dashboards-logistics"
                      element={<ProtectedRoute element={<Logistics />} />}
                    />
                    <Route
                      path="/logistics-inbound"
                      element={<ProtectedRoute element={<Inbound />} />}
                    />
                    <Route
                      path="/logistics-outbound"
                      element={<ProtectedRoute element={<Outbound />} />}
                    />
                     <Route
                      path="/logistics-dashboard"
                      element={<ProtectedRoute element={<LogisticsDashboard />} />}
                    />
                    <Route
                      path="/user-management"
                      element={<ProtectedRoute element={<UserManagement />} />}
                    />
                    <Route
                      path="/role-management"
                      element={<ProtectedRoute element={<RoleManagement />} />}
                    />
                    <Route
                      path="/settings"
                      element={<ProtectedRoute element={<Settings />} />}
                    />
                    <Route path="*" element={<PageNotFound />} />
                  </Routes>
                </SelectedItemProvider>
              </UserProvider>
            </UserInfoProvider>
          </TenantProvider>
        </AuthProvider>
      </SignOutProvider>
    </BrowserRouter>
  );
}

export default App;
