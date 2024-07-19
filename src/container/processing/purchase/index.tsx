"use client";
import Purchase from "@/components/processing/purchase";
import { PurchaseHooks } from "./Hooks";
import { StaffHooks } from "@/container/master/Staff/Hooks";
import { useEffect } from "react";
import { CustomerHooks } from "@/container/master/Customer/Hooks";
import { ItemMasterHooks } from "@/container/master/ItemMaster/Hooks";
import { CardPosHooks } from "@/container/master/CardPos/Hooks";
import { MeterReadingHooks } from "../MeterReading/Hooks";
import { SideBarHooks } from "@/container/Sidebar/Hooks";

const PurchaseContainer = () => {
  const {
    handlePurchaseDate,
    errorMessage,
    handlePurchaseDateError,
    // customerErrorMessage,
    purchaseDate,
    addPurchaseFormik,
    addItemFormik,
    // handleSoldTo,
    // soldToVal,
    orgId,
    token,
    loading,
    // purchaseModalOpen,
    // handleCloseModal,
    // addPartyFormik,
    // addNewPartyFormik,
    // purchaseData,
    itemTableData,
    itemTableGrandTotal,
    calculateItemTableGrandTotal,
    showAddItemForm,
    showPaymentMethodForm,
    paymentOption,
    handlePaymentOption,
    showPaymentModal,
    transactionBankingForm,
    inDenominators,
    outDenominators,
    cashInTransactionTotal,
    cashOutTransactionTotal,
    handleInDenominatorChange,
    handleOutDenominatorChange,
    cashInTransactionGrandTotal,
    cashOutTransactionGrandTotal,
    handleCashTransactionPost,
    handleCreditTransactionPost,
  } = PurchaseHooks();

  const { getStaffApiCall } = StaffHooks();
  const { getCustomerApiCall } = CustomerHooks();
  const { getAdditionalItemApiCall } = ItemMasterHooks();
  const { getCardPosApiCall } = CardPosHooks();
  const { getNoteDenomApiCall } = MeterReadingHooks();
  const { finYearGetApiCall } = SideBarHooks();

  useEffect(() => {
    if (token && orgId) {
      getStaffApiCall(orgId, "staff");
      getCustomerApiCall(orgId);
      getAdditionalItemApiCall(orgId);
      getCardPosApiCall(orgId);
      getNoteDenomApiCall();
      finYearGetApiCall(orgId);
    }
  }, [orgId, token]);

  useEffect(() => {
    calculateItemTableGrandTotal();
  }, [itemTableData]);

  return (
    <Purchase
      formik={addPurchaseFormik}
      addItemFormik={addItemFormik}
      itemTableData={itemTableData}
      date={purchaseDate}
      handleDateChange={handlePurchaseDate}
      errMessage={errorMessage}
      handleError={handlePurchaseDateError}
      // customerErrorMessage={customerErrorMessage}
      // handleSoldTo={handleSoldTo}
      // soldToVal={soldToVal}
      loading={loading}
      // purchaseModalOpen={purchaseModalOpen}
      // selectPartyFormik={addPartyFormik}
      // addNewPartyFormik={addNewPartyFormik}
      // handleCloseModal={handleCloseModal}
      // purchaseData={purchaseData}
      itemTableGrandTotal={itemTableGrandTotal}
      showAddItemForm={showAddItemForm}
      showPaymentMethodForm={showPaymentMethodForm}
      paymentOption={paymentOption}
      handlePaymentOption={handlePaymentOption}
      showPaymentModal={showPaymentModal}
      transactionBankingForm={transactionBankingForm}
      inDenominators={inDenominators}
      outDenominators={outDenominators}
      cashInTransactionTotal={cashInTransactionTotal}
      cashOutTransactionTotal={cashOutTransactionTotal}
      handleInDenominatorChange={handleInDenominatorChange}
      handleOutDenominatorChange={handleOutDenominatorChange}
      cashInTransactionGrandTotal={cashInTransactionGrandTotal}
      cashOutTransactionGrandTotal={cashOutTransactionGrandTotal}
      handleCashTransactionPost={handleCashTransactionPost}
      handleCreditTransactionPost={handleCreditTransactionPost}
    />
  );
};

export default PurchaseContainer;
