import { Grid, Typography } from "@mui/material";
import { FC } from "react";
import text from "@/languages/en_US.json";
import {
  ButtonFieldInput,
  DropDownField,
  FlexBox,
  TextFieldInput,
} from "@/common";
import BankTransactionTable from "./BankTransactionTable";
import CashDenomTable from "./CashDenomTable";

interface TransactionDetailsProps {
  bankTransactionData: any;
  formik: any;
  cardPosOptions: any;
  bankTransactionTotal: number;
  amountTobePaid: number;
  noteDenom: any;
  denominators: string[];
  handleDenominatorChange(
    event: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number
  ): void;
  totalAmount: number[];
  cashTransactionGrandTotal: number;
  handleDeleteBankTransactionData: any;
}

const TransactionDetails: FC<TransactionDetailsProps> = ({
  bankTransactionData,
  formik,
  cardPosOptions,
  bankTransactionTotal,
  amountTobePaid,
  noteDenom,
  denominators,
  handleDenominatorChange,
  totalAmount,
  cashTransactionGrandTotal,
  handleDeleteBankTransactionData,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} className="space-y-5">
        <Typography
          component={"p"}
          className="text-lg font-bold text-blue-500 text-center"
        >
          {text.tableTitles.transactionDetails.bank}
        </Typography>
        <form onSubmit={formik?.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <DropDownField
                name={`cardPos`}
                dropdownLabel={
                  text.label.meterReading.transactionBanking.cardPos
                }
                color={`success`}
                option={formik?.values?.cardPos}
                handleChange={formik?.handleChange}
                handleBlur={formik?.handleBlur}
                selectOption={cardPosOptions}
                error={
                  formik?.touched?.cardPos && Boolean(formik?.errors?.cardPos)
                }
                errorText={formik?.touched?.cardPos && formik?.errors?.cardPos}
                fullWidthState
                disabled={bankTransactionTotal === amountTobePaid}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldInput
                placeholder={
                  text.placeholders.meterReading.transactionBanking.amount
                }
                inputLabel={text.label.meterReading.transactionBanking.amount}
                extraCls={`w-full`}
                color={`success`}
                textinputname={`amount`}
                onChange={formik?.handleChange}
                value={formik?.values?.amount}
                handleBlur={formik?.handleBlur}
                disabled={bankTransactionTotal === amountTobePaid}
                error={
                  formik?.touched?.amount && Boolean(formik?.errors?.amount)
                }
                helperText={formik?.touched?.amount && formik?.errors?.amount}
                clickEnter={formik?.handleSubmit}
                fullwidthState
              />
            </Grid>
            {0 < formik?.values?.amount &&
              !denominators.some((str) => str.length > 0) && (
                <div
                  className={`text-sm text-red-500 px-5 ${
                    bankTransactionTotal === 0 && "hidden"
                  }`}
                >
                  <p>
                    Grand total amount cannot be greater than {amountTobePaid}
                  </p>
                </div>
              )}
            {amountTobePaid - cashTransactionGrandTotal <
              formik?.values?.amount &&
              denominators.some((str) => str.length > 0) && (
                <div className={`text-sm text-red-500 px-5 `}>
                  <p>Please decrease cash denominators or amount</p>
                </div>
              )}
            {/* <pre>{JSON.stringify({ denominators }, null, 4)}</pre> */}
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <FlexBox className="w-full justify-end">
                <ButtonFieldInput
                  buttonextracls={`rounded-full bg-[#032974] text-white capitalize`}
                  variant={"contained"}
                  name={text.buttonNames.add}
                  disabled={
                    amountTobePaid === bankTransactionTotal ||
                    formik?.values?.amount >
                      Number(Math.floor(amountTobePaid)) ||
                    amountTobePaid - cashTransactionGrandTotal <
                      formik?.values?.amount
                  }
                />
              </FlexBox>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <BankTransactionTable
                bankTransactionData={bankTransactionData}
                bankTransactionGrandTotal={bankTransactionTotal}
                handleDeleteBankTransactionData={
                  handleDeleteBankTransactionData
                }
              />
              {/* <pre>{JSON.stringify({ bankTransactionData }, null, 4)}</pre> */}
            </Grid>
          </Grid>
        </form>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <Typography
          component={"p"}
          className="text-lg font-bold text-green-500 text-center"
        >
          {text.tableTitles.transactionDetails.cash}
        </Typography>
        <CashDenomTable
          notes={noteDenom}
          denominators={denominators}
          cashTransactionGrandTotal={cashTransactionGrandTotal}
          handleDenominatorChange={handleDenominatorChange}
          totalAmount={totalAmount}
          amountTobePaidInCash={amountTobePaid - bankTransactionTotal}
        />
      </Grid>
    </Grid>
  );
};

export default TransactionDetails;
