"use client";
import Navbar from "@/components/navbar";
import { NavbarHooks } from "./Hooks";
import { SideBarHooks } from "../Sidebar/Hooks";
import { useEffect } from "react";
import getSessionStorageData from "@/utils/getSessionStorageData";

const NavBarContainer = () => {
  const { openHamDrawer, handleToggleHamDrawer } = NavbarHooks();

  const {
    getSideBarDataApiCall,
    handleSubMenu,
    handleSubMenuClose,
    openMenuId,
    finYearGetApiCall,
    logOutGetApiCall,
  } = SideBarHooks();

  const token = getSessionStorageData("token");
  const orgId = getSessionStorageData("orgId");

  useEffect(() => {
    if (token) {
      getSideBarDataApiCall();
    }
    if (orgId && token) {
      finYearGetApiCall(orgId);
    }
  }, [token, orgId, getSideBarDataApiCall, finYearGetApiCall]);

  return (
    <Navbar
      handleToggleHamMenu={handleToggleHamDrawer}
      openHamMenu={openHamDrawer}
      handleSubMenu={handleSubMenu}
      handleSubMenuClose={handleSubMenuClose}
      openMenuId={openMenuId}
      logOutGetApiCall={logOutGetApiCall}
    />
  );
};

export default NavBarContainer;
