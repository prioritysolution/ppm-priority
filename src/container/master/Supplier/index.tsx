"use client";
import React, { useEffect } from "react";
import { SupplierHooks } from "./Hooks";
import Supplier from "@/components/master/Supplier";
import { AccountLedgerHooks } from "../AccountLedger/Hooks";

const SupplierContainer = () => {
  const {
    supplierDrawer,
    handleOpenSupplierDrawer,
    handleCloseSupplierDrawer,
    AddSupplierFormik,
    handleMobileChange,
    supplierMobile,
    postLoaders,
    token,
    loader,
    handleEditData,
    orgId,
    getSupplierApiCall,
    editData,
  } = SupplierHooks();

  const { getAccountLedgerApiCall } = AccountLedgerHooks();

  useEffect(() => {
    if (token && orgId) {
      getAccountLedgerApiCall(orgId);
      getSupplierApiCall(orgId);
    }
  }, [token, orgId]);

  return (
    <Supplier
      supplierDrawer={supplierDrawer}
      handleOpenSupplierDrawer={handleOpenSupplierDrawer}
      handleCloseSupplierDrawer={handleCloseSupplierDrawer}
      AddSupplierFormik={AddSupplierFormik}
      handleMobileChange={handleMobileChange}
      supplierMobile={supplierMobile}
      loader={loader}
      handleEditData={handleEditData}
      postLoaders={postLoaders}
      editData={editData}
      token={token}
    />
  );
};

export default SupplierContainer;
