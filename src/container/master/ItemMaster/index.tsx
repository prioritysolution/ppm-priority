"use client";
import ItemMaster from "@/components/master/ItemMaster";
import { ItemMasterHooks } from "./Hooks";
import { useEffect } from "react";
import getSessionStorageData from "@/utils/getSessionStorageData";
import { AccountLedgerHooks } from "../AccountLedger/Hooks";

const ItemMasterContainer = ({}) => {
  const {
    handleCloseDrawer,
    handleOpenDrawer,
    openItemMaster,
    AddItemMasterFormik,
    getItemMasterUnitApiCall,
    getItemMasterCategoryApiCall,
    getItemApiCall,
    getRateItemApiCall,
    loader,
    postLoaders,
  } = ItemMasterHooks();

  const { getAccountLedgerApiCall } = AccountLedgerHooks();

  const token = getSessionStorageData("token");
  const orgId = getSessionStorageData("orgId");
  useEffect(() => {
    if (orgId && token) {
      getItemMasterUnitApiCall(orgId);
      getItemMasterCategoryApiCall(orgId);
      getItemApiCall(orgId);
      getRateItemApiCall(orgId);
      getAccountLedgerApiCall(orgId);
    }
  }, [orgId, token]);

  return (
    // <p>HEllo</p>
    <ItemMaster
      handleCloseDrawer={handleCloseDrawer}
      handleOpenDrawer={handleOpenDrawer}
      openItemMaster={openItemMaster}
      AddItemMasterFormik={AddItemMasterFormik}
      token={token}
      postLoaders={postLoaders}
      loader={loader}
    />
  );
};

export default ItemMasterContainer;
