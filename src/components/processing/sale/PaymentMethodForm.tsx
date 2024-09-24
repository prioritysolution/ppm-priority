import { Grid, Typography } from "@mui/material";
import React, { FC } from "react";

import text from "@/languages/en_US.json";
import {
  ButtonFieldInput,
  CheckBox,
  DropDownField,
  FlexBox,
  FlexContentCenter,
  TextFieldInput,
} from "@/common";
import CashDenomTable from "./CashDenomTable";

interface PaymentMethodFormProps {
  paymentOption: string;
  cardPosOptions: any;
  formik: any;
  denomData: any;
  inDenominators: any;
  outDenominators: any;
  handleInDenominatorChange(
    event: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number
  ): void;
  handleOutDenominatorChange(
    event: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number
  ): void;
  cashInTransactionTotal: number[];
  cashOutTransactionTotal: number[];
  cashInTransactionGrandTotal: number;
  cashOutTransactionGrandTotal: number;
  grandTotal: number;
  handleCashTransactionPost: any;
  decimal: number;
  decimalInput: number;
  handleCalculateDecimalChange: any;
  decimalInputError: string;
  handleCalculateCheck: any;
  calculateCheck: boolean;
}

const PaymentMethodForm: FC<PaymentMethodFormProps> = ({
  paymentOption,
  cardPosOptions,
  formik,
  denomData,
  inDenominators,
  outDenominators,
  cashInTransactionTotal,
  cashOutTransactionTotal,
  handleInDenominatorChange,
  handleOutDenominatorChange,
  cashInTransactionGrandTotal,
  cashOutTransactionGrandTotal,
  grandTotal,
  handleCashTransactionPost,
  decimal,
  decimalInput,
  handleCalculateDecimalChange,
  decimalInputError,
  handleCalculateCheck,
  calculateCheck,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className="space-y-5">
        <Typography
          component={"p"}
          className="text-lg font-bold text-blue-500 text-center"
        >
          {paymentOption === "b"
            ? text.tableTitles.paymentMethod.bank
            : text.tableTitles.paymentMethod.cash}
        </Typography>
        <form>
          {paymentOption === "b" && (
            <Grid container spacing={2} rowGap={2} className="mb-5">
              <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <DropDownField
                  name={`cardPos`}
                  dropdownLabel={text.label.sale.transactionBanking.cardPos}
                  color={`success`}
                  option={formik?.values?.cardPos}
                  handleChange={formik?.handleChange}
                  handleBlur={formik?.handleBlur}
                  selectOption={cardPosOptions}
                  error={
                    formik?.touched?.cardPos && Boolean(formik?.errors?.cardPos)
                  }
                  errorText={
                    formik?.touched?.cardPos && formik?.errors?.cardPos
                  }
                  fullWidthState
                  // disabled={bankTransactionTotal === amountTobePaid}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <TextFieldInput
                  placeholder={text.placeholders.sale.transactionBanking.amount}
                  inputLabel={text.label.sale.transactionBanking.amount}
                  extraCls={`w-full`}
                  color={`success`}
                  textinputname={`amount`}
                  onChange={formik?.handleChange}
                  value={formik?.values?.amount}
                  handleBlur={formik?.handleBlur}
                  // disabled={bankTransactionTotal === amountTobePaid}
                  error={
                    formik?.touched?.amount && Boolean(formik?.errors?.amount)
                  }
                  helperText={formik?.touched?.amount && formik?.errors?.amount}
                  clickEnter={formik?.handleSubmit}
                  fullwidthState
                />
              </Grid>
            </Grid>
          )}
          {paymentOption === "c" && (
            <Grid container spacing={2} rowGap={2} className="mb-5">
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Typography
                  component={"p"}
                  className="text-lg font-bold text-blue-500 text-center"
                >
                  {text.tableTitles.cashDenomTable.in}
                </Typography>
                <CashDenomTable
                  notes={denomData}
                  denominators={inDenominators}
                  totalAmount={cashInTransactionTotal}
                  cashTransactionGrandTotal={cashInTransactionGrandTotal}
                  handleDenominatorChange={handleInDenominatorChange}
                  amountTobePaid={grandTotal + decimalInput}
                  cashOut={false}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Typography
                  component={"p"}
                  className="text-lg font-bold text-blue-500 text-center"
                >
                  {text.tableTitles.cashDenomTable.out}
                </Typography>
                <CashDenomTable
                  notes={denomData}
                  denominators={outDenominators}
                  totalAmount={cashOutTransactionTotal}
                  cashTransactionGrandTotal={cashOutTransactionGrandTotal}
                  handleDenominatorChange={handleOutDenominatorChange}
                  amountTobePaid={
                    cashInTransactionGrandTotal - grandTotal - decimalInput
                  }
                  cashOut={true}
                />
              </Grid>
            </Grid>
          )}
        </form>
        {decimal !== 0 && (
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <FlexContentCenter className="w-full items-center justify-center gap-5 py-5">
              <p
                className={`text-red-500 text-lg mr-5 ${
                  decimal === 0 && "hidden"
                }
                  `}
              >
                Amount after decimal points : {decimal}
              </p>
              <div className="flex flex-col items-center justify-center">
                <TextFieldInput
                  placeholder={
                    text.placeholders.meterReading.transactionBanking.amount
                  }
                  // inputLabel={
                  //   text.label.meterReading.transactionBanking.amount
                  // }
                  extraCls={`w-full `}
                  textnewclass={`w-[300px]`}
                  color={`success`}
                  type={`number`}
                  textinputname={`decimalInput`}
                  onChange={handleCalculateDecimalChange}
                  value={decimalInput}
                  disabled={decimal === 0 || calculateCheck}
                  error={
                    formik?.touched?.amount && Boolean(formik?.errors?.amount)
                  }
                  helperText={formik?.touched?.amount && formik?.errors?.amount}
                  clickEnter={formik?.handleSubmit}
                  fullwidthState
                />
                {decimalInputError.length > 0 && (
                  <p className="text-red-500 text-sm pt-3">
                    {decimalInputError}
                  </p>
                )}
              </div>
              <>
                <CheckBox
                  checked={calculateCheck}
                  handleBoxChange={handleCalculateCheck}
                />
                <p className={`text-sm -ml-5`}>{text.label.calculateAuto}</p>
              </>
            </FlexContentCenter>
          </Grid>
        )}
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <FlexBox className="w-full justify-end">
            <ButtonFieldInput
              buttonextracls={`rounded-full bg-[#032974] text-white capitalize`}
              variant={"contained"}
              name={text.buttonNames.add}
              disabled={
                formik?.values?.amount !== grandTotal &&
                paymentOption === "c" &&
                cashInTransactionGrandTotal -
                  cashOutTransactionGrandTotal -
                  decimalInput !==
                  grandTotal
              }
              handleClick={
                paymentOption === "b"
                  ? formik?.handleSubmit
                  : handleCashTransactionPost
              }
            />
          </FlexBox>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PaymentMethodForm;
