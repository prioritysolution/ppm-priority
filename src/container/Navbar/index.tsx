"use client";
import Navbar from "@/components/navbar";
import { NavbarHooks } from "./Hooks";
import { SideBarHooks } from "../Sidebar/Hooks";
import { useEffect, useState } from "react";
import getSessionStorageData from "@/utils/getSessionStorageData";
import text from "@/languages/en_US.json";

const NavBarContainer = () => {
  const [organizationName, setOrganisationName] = useState(
    text.companyDetails.companyName
  );
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
    setOrganisationName(getSessionStorageData("orgName"));
    if (token) {
      getSideBarDataApiCall();
    }
    if (orgId && token) {
      finYearGetApiCall(orgId);
    }
  }, [token, orgId]);

  return (
    // <p>Hello</p>
    <Navbar
      handleToggleHamMenu={handleToggleHamDrawer}
      openHamMenu={openHamDrawer}
      handleSubMenu={handleSubMenu}
      handleSubMenuClose={handleSubMenuClose}
      openMenuId={openMenuId}
      logOutGetApiCall={logOutGetApiCall}
      organizationName={organizationName}
    />
  );
};

export default NavBarContainer;
