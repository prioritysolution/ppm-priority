"use client";
import React, { useEffect } from "react";

import DashBoard from "@/components/dashboard";
import { DashBoardHooks } from "./Hooks";
import { ItemMasterHooks } from "../master/ItemMaster/Hooks";
import { LoginHooks } from "../Auth/Login/Hooks";
import { RateMasterHooks } from "../master/RateMaster/Hooks";

const DashboardContainer = () => {
  const {
    showSaleData,
    setShowSaleData,
    showPurchaseData,
    setShowPurchaseData,
    showStockGraph,
    setShowStockGraph,
    handleToggleDataCards,
    token,
    orgId,
  } = DashBoardHooks();

  const { checkRateApiCall } = LoginHooks();

  const { getItemApiCall, getRateItemApiCall } = ItemMasterHooks();

  const {
    AddRateMasterFormik,
    errorMessage,
    handleRateDate,
    handleRateDateError,
    postLoaders,
    rateDate,
    resetFormData,
    postRateApiCall,
  } = RateMasterHooks();

  useEffect(() => {
    if (token && orgId) {
      getItemApiCall(orgId);
      getRateItemApiCall(orgId);
      checkRateApiCall(orgId);
    }
  }, [token, orgId]);

  return (
    <>
      <DashBoard
        showMonthwiseSale={showSaleData}
        handleShowSaleData={() =>
          handleToggleDataCards(setShowSaleData, "hide")
        }
        showMonthwiseData={showPurchaseData}
        handleShowPurchaseData={() =>
          handleToggleDataCards(setShowPurchaseData, "hide")
        }
        showAvailableStocksGraph={showStockGraph}
        handleShowStockGraph={() =>
          handleToggleDataCards(setShowStockGraph, "show")
        }
        handleShowPurchaseGraph={() =>
          handleToggleDataCards(setShowPurchaseData, "show")
        }
        handleShowSaleGraph={() =>
          handleToggleDataCards(setShowSaleData, "show")
        }
        handleShowStockData={() =>
          handleToggleDataCards(setShowStockGraph, "hide")
        }
        token={token}
        AddRateMasterFormik={AddRateMasterFormik}
        postRateApiCall={postRateApiCall}
        errorMessage={errorMessage}
        handleRateDate={handleRateDate}
        handleRateDateError={handleRateDateError}
        postLoaders={postLoaders}
        rateDate={rateDate}
        resetFormData={resetFormData}
      />
    </>
  );
};

export default DashboardContainer;
