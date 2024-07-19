"use client";
import MeterOpening from "@/components/master/meterOpening";
import React, { useEffect } from "react";
import { MeterHooks } from "./Hooks";
import { PumpMasterHooks } from "../PumpMaster/Hooks";
import { SideBarHooks } from "@/container/Sidebar/Hooks";

const MeterOpeningContainer = () => {
  const {
    addMeterOpeningFormik,
    handleOpeningDate,
    handleOpeningDateError,
    errorMessage,
    openingDate,
    editData,
    handleResetFormData,
    getMeterOpeningApiCall,
    pumpId,
    handleEditData,
    handleNozzleChange,
    orgId,
    token,
    loader,
    postLoader,
  } = MeterHooks();

  const { getPumpMasterApiCall } = PumpMasterHooks();

  const { finYearGetApiCall } = SideBarHooks();

  useEffect(() => {
    if (token && orgId) {
      getMeterOpeningApiCall(orgId);
      getPumpMasterApiCall(orgId, "pump");
      finYearGetApiCall(orgId);
    }
  }, [token, orgId]);

  useEffect(() => {
    if (token && orgId && pumpId) {
      getPumpMasterApiCall(orgId, "nozzle", pumpId);
      handleNozzleChange();
    }
  }, [pumpId, orgId, token]);

  return (
    <MeterOpening
      addMeterFormik={addMeterOpeningFormik}
      errorMessage={errorMessage}
      handleOpeningDateChange={handleOpeningDate}
      handleOpeningDateError={handleOpeningDateError}
      loader={loader}
      openingDate={openingDate}
      postLoaders={postLoader}
      resetFormHandler={handleResetFormData}
      handleEditData={handleEditData}
      editData={editData}
    />
  );
};

export default MeterOpeningContainer;
