"use client";
import RateMaster from "@/components/master/rateMaster";
import React, { useEffect } from "react";
import { RateMasterHooks } from "./Hooks";
import { ItemMasterHooks } from "../ItemMaster/Hooks";

const RateMasterContainer = () => {
  const {
    AddRateMasterFormik,
    handleRateDate,
    handleRateDateError,
    errorMessage,
    postLoaders,
    rateDate,
    getRateApiCall,
    loader,
    orgId,
    token,
    editDataHandler,
    editData,
    resetFormData,
    editRateApiCall,
  } = RateMasterHooks();

  const { getItemApiCall } = ItemMasterHooks();

  useEffect(() => {
    if (orgId && token) {
      getRateApiCall(orgId);
      getItemApiCall(orgId);
    }
  }, [token, orgId]);

  return (
    <RateMaster
      dateErrorMessage={errorMessage}
      handleDateChange={handleRateDate}
      handleDateError={handleRateDateError}
      rateDate={rateDate}
      loader={loader}
      postLoaders={postLoaders}
      rateMasterFormik={AddRateMasterFormik}
      token={token}
      editData={editData}
      editDataHandler={editDataHandler}
      resetFormData={resetFormData}
      editRateApiCall={editRateApiCall}
    />
  );
};

export default RateMasterContainer;
