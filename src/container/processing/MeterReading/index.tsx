"use client";
import MeterReading from "@/components/processing/meterReading";
import React, { useEffect } from "react";
import { MeterReadingHooks } from "./Hooks";
import { ShiftMasterHooks } from "@/container/master/ShiftMaster/Hooks";
import { PumpMasterHooks } from "@/container/master/PumpMaster/Hooks";
import { StaffHooks } from "@/container/master/Staff/Hooks";
import { ItemMasterHooks } from "@/container/master/ItemMaster/Hooks";
import { CardPosHooks } from "@/container/master/CardPos/Hooks";
import { SideBarHooks } from "@/container/Sidebar/Hooks";

const MeterReadingContainer = () => {
  const {
    addMeterReadingFormik,
    handleReadingDate,
    errorMessage,
    addGSTFormik,
    showModal,
    postGstLoaders,
    handleReadingDateError,
    pumpId,
    meterReading,
    calculaterGstGrandTotal,
    readingDate,
    orgId,
    token,
    handleNozzleChange,
    postLoaders,
    getNoteDenomApiCall,
    loading,
    addInfoForm,
    handleCollapsibleForm,
    showAddInfoForm,
    gstGrandTotal,
    denominators,
    handleDenominatorChange,
    handleCloseAddMoreModal,
    showAddMoreModal,
    isDisabled,
    handlePostTableData,
    cashTransactionTotal,
    gstTable,
    meterReadingGrandTotal,
    calculateMeterReadingGrandTotal,
    handleDeleteMeterReadingData,
    handleDeleteAdditionalItemData,
    activeSteps,
    cashTransactionGrandTotal,
    isTransactionValid,
    bankTransactionData,
    transactionBankingForm,
    calculateBankTransactionTotal,
    bankTransactionTotal,
    handleTransactionPost,
    handleDeleteBankTransactionData,
    setActiveSteps,
    grandTotal,
    decimal,
    decimalInput,
    handleCalculateDecimalChange,
    decimalInputError,
    finalAmountDiff,
    setFinalAmountDiff,
    handleCalculateCheck,
    calculateCheck,
  } = MeterReadingHooks();

  const { getShiftApiCall } = ShiftMasterHooks();

  const { getPumpMasterApiCall } = PumpMasterHooks();

  const { getStaffApiCall } = StaffHooks();

  const { getAdditionalItemApiCall } = ItemMasterHooks();

  const { getCardPosApiCall } = CardPosHooks();

  const { finYearGetApiCall } = SideBarHooks();

  useEffect(() => {
    if (token && orgId) {
      getShiftApiCall(orgId);
      getPumpMasterApiCall(orgId, "pump");
      getStaffApiCall(orgId, "staff");
      getAdditionalItemApiCall(orgId);
      getCardPosApiCall(orgId);
      getNoteDenomApiCall();
      finYearGetApiCall(orgId);
    }
  }, [token, orgId]);

  useEffect(() => {
    if (token && orgId && pumpId) {
      getPumpMasterApiCall(orgId, "nozzle", pumpId);
      handleNozzleChange();
    }
  }, [pumpId, token, orgId]);

  // console.table(gstTable)

  useEffect(() => {
    if (meterReading.length > 0) {
      calculateMeterReadingGrandTotal();
    }
  }, [meterReading]);

  useEffect(() => {
    if (gstTable.length > 0) {
      calculaterGstGrandTotal();
    }
  }, [gstTable]);

  return (
    <MeterReading
      date={readingDate}
      errMessage={errorMessage}
      formik={addMeterReadingFormik}
      handleDateChange={handleReadingDate}
      handleError={handleReadingDateError}
      loading={postLoaders}
      addInfoForm={addInfoForm}
      addInfoLoader={postGstLoaders}
      handleAddInfo={handleCollapsibleForm}
      showAddInfoForm={showAddInfoForm}
      handlePostTableData={handlePostTableData}
      handleDeleteMeterReadingData={handleDeleteMeterReadingData}
      handleDeleteAdditionalItemData={handleDeleteAdditionalItemData}
      denominators={denominators}
      handleDenominatorChange={handleDenominatorChange}
      cashTransactionTotal={cashTransactionTotal}
      cashTransactionGrandTotal={cashTransactionGrandTotal}
      addGSTFormik={addGSTFormik}
      showModal={showModal}
      transactionBankingForm={transactionBankingForm}
      handleCloseConfirmationModal={handleCloseAddMoreModal}
      gstGrandTotal={gstGrandTotal}
      isTransactionValid={isTransactionValid}
      confirmationModal={showAddMoreModal}
      isDisabled={isDisabled}
      handleTransactionPost={handleTransactionPost}
      handleDeleteBankTransactionData={handleDeleteBankTransactionData}
      meterReading={meterReading}
      gstTable={gstTable}
      meterReadingGrandTotal={meterReadingGrandTotal}
      activeSteps={activeSteps}
      bankTransactionData={bankTransactionData}
      bankTransactionTotal={bankTransactionTotal}
      setActiveSteps={setActiveSteps}
      finalAmountDiff={finalAmountDiff}
      setFinalAmountDiff={setFinalAmountDiff}
      grandTotal={grandTotal}
      decimal={decimal}
      decimalInput={decimalInput}
      handleCalculateDecimalChange={handleCalculateDecimalChange}
      decimalInputError={decimalInputError}
      handleCalculateCheck={handleCalculateCheck}
      calculateCheck={calculateCheck}
    />
  );
};

export default MeterReadingContainer;
