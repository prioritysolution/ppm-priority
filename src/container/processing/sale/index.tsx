"use client";
import Sale from "@/components/processing/sale";
import { SalesHooks } from "./Hooks";
import { StaffHooks } from "@/container/master/Staff/Hooks";
import { useEffect } from "react";
import { CustomerHooks } from "@/container/master/Customer/Hooks";
import { ItemMasterHooks } from "@/container/master/ItemMaster/Hooks";
import { CardPosHooks } from "@/container/master/CardPos/Hooks";
import { MeterReadingHooks } from "../MeterReading/Hooks";
import { SideBarHooks } from "@/container/Sidebar/Hooks";

const SaleContainer = () => {
  const {
    handleSalesDate,
    errorMessage,
    handleSalesDateError,
    customerErrorMessage,
    salesDate,
    addSaleFormik,
    addItemFormik,
    handleSoldTo,
    soldToVal,
    orgId,
    token,
    loading,
    saleModalOpen,
    handleCloseModal,
    addPartyFormik,
    addNewPartyFormik,
    saleData,
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
  } = SalesHooks();

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
    <Sale
      formik={addSaleFormik}
      addItemFormik={addItemFormik}
      itemTableData={itemTableData}
      date={salesDate}
      handleDateChange={handleSalesDate}
      errMessage={errorMessage}
      handleError={handleSalesDateError}
      customerErrorMessage={customerErrorMessage}
      handleSoldTo={handleSoldTo}
      soldToVal={soldToVal}
      loading={loading}
      saleModalOpen={saleModalOpen}
      selectPartyFormik={addPartyFormik}
      addNewPartyFormik={addNewPartyFormik}
      handleCloseModal={handleCloseModal}
      saleData={saleData}
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

export default SaleContainer;
