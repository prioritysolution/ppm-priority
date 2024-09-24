import {
  Box,
  Collapse,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

import text from "@/languages/en_US.json";
import PurchaseForm from "../purchase/PurchaseForm";
import { Dayjs } from "dayjs";
import { FC } from "react";
import { useSelector } from "react-redux";

import AddItemForm from "../sale/AddItemForm";
import { ButtonFieldInput, FlexBox, RadioGroupField } from "@/common";
import CustomerDetailsForm from "../sale/CustomerDetailsForm";
import AddItemTable from "../sale/AddItemTable";
import PaymentMethodForm from "../sale/PaymentMethodForm";

interface PurchaseProps {
  date: Dayjs | null;
  errMessage: string;
  formik: any;
  addItemFormik: any;
  handleDateChange(): void;
  handleError(): void;
  // customerErrorMessage: string | null;
  // handleSoldTo: any;
  // soldToVal: string;
  loading: boolean;
  // purchaseModalOpen: boolean;
  // handleCloseModal: any;
  // selectPartyFormik: any;
  // addNewPartyFormik: any;
  // purchaseData: any;
  itemTableData: any;
  itemTableGrandTotal: number;
  showAddItemForm: boolean;
  showPaymentMethodForm: boolean;
  paymentOption: string;
  handlePaymentOption: any;
  showPaymentModal: boolean;
  transactionBankingForm: any;
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
  handleCashTransactionPost: any;
  handleCreditTransactionPost: any;
}

const Purchase: FC<PurchaseProps> = ({
  date,
  errMessage,
  formik,
  addItemFormik,
  handleDateChange,
  handleError,
  // customerErrorMessage,
  // handleSoldTo,
  // soldToVal,
  loading,
  // purchaseModalOpen,
  // handleCloseModal,
  // selectPartyFormik,
  // addNewPartyFormik,
  // purchaseData,
  itemTableData,
  itemTableGrandTotal,
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
}) => {
  const staffData = useSelector((state: any) => state.staff?.staffData)?.map(
    (data: any) => {
      return {
        name: data.Staff_Name,
        value: data.Id,
      };
    }
  );

  const customerData = useSelector(
    (state: any) => state.customer?.CustomerData
  )?.map((data: any) => {
    return {
      name: data.Cust_Name,
      value: data.Id,
    };
  });

  const itemOptions = useSelector(
    (state: any) => state.itemMasterData?.additionalItemData
  )?.map((itemData: any) => {
    return {
      name: itemData.Item_Name,
      value: itemData.Id,
    };
  });

  const cardPosOptions = useSelector(
    (state: any) => state.cardPos?.CardPosData
  )?.map((cardPosData: any) => {
    return {
      name: `${cardPosData.Pos_Name} - ${
        cardPosData.Pos_Type === 1 ? "Card" : "QR"
      }`,
      value: cardPosData.Id,
    };
  });

  const cashDenomData = useSelector(
    (state: any) => state.meterReading?.noteDenom
  );

  const financialYear = useSelector(
    (state: any) => state.sideBarData?.financialYear
  );

  // const soldToOption = [
  //   {
  //     label: "Party",
  //     value: "1",
  //   },
  //   {
  //     label: "Other",
  //     value: "2",
  //   },
  // ];

  const paymentMethodOption = [
    {
      label: "Cash",
      value: "c",
    },
    {
      label: "Bank",
      value: "b",
    },
    {
      label: "Credit",
      value: "Cr",
    },
  ];

  return (
    <>
      <Box
        className={`p-5  ${
          itemTableData.length > 0 ? "h-full" : "min-h-[90vh]"
        } space-y-5`}
      >
        <Typography
          component={`p`}
          className="text-2xl font-bold text-slate-600 mb-5"
        >
          {text.tableTitles.purchase}
          {/* {activeSteps === 0
          ? text.tableTitles.meterReading
          : text.label.meterReading.transactionDetails} */}
        </Typography>
        <Box className="border p-5 border-green-400 rounded-md">
          <Grid container rowGap={2}>
            {/* meter reading form */}
            <Grid item xs={12} sm={12} lg={12} xl={12}>
              <PurchaseForm
                date={date}
                errMessage={errMessage}
                // customerErrorMessage={customerErrorMessage}
                formik={formik}
                handleDateChange={handleDateChange}
                handleError={handleError}
                soldByDropDownData={staffData}
                loading={loading}
                customerData={customerData}
                // purchaseData={purchaseData}
                financialYear={financialYear}
                //   isDisabled={isDisabled}
              />
            </Grid>
            <Grid item xs={12} sm={12} lg={12} xl={12}>
              <List
                sx={{ width: "100%" }}
                component="nav"
                aria-labelledby="addinfo-form"
                className="border p-5 border-green-400 rounded-md"
              >
                <ListItemButton
                  onClick={() => {}}
                  sx={{
                    border: "1px solid green",
                    borderRadius: "10px",
                  }}
                >
                  <ListItemText primary={text.tableTitles.addItem} />
                  {/* {showAddInfoForm ? <Close /> : <Add />} */}
                </ListItemButton>
                <Collapse
                  in={showAddItemForm}
                  timeout="auto"
                  unmountOnExit
                  className="p-5 shadow"
                >
                  {/* <AddItemForm
                    formik={addItemFormik}
                    itemOptions={itemOptions}
                    // loading={addInfoLoader}
                  /> */}
                </Collapse>
              </List>
            </Grid>

            <Grid item xs={12} sm={12} lg={12} xl={12}></Grid>
          </Grid>
        </Box>
        {/* <Dialog open={purchaseModalOpen} disableEscapeKeyDown>
          <DialogTitle className="h-[4rem]">
            <FlexContentCenter>
              <Typography className="font-bold text-lg capitalize">
                {text.tableTitles.customerDetails}
              </Typography>
               <IconButton onClick={() => {}}>
                  <Close fontSize="small" />
                </IconButton>
             </FlexContentCenter>
          </DialogTitle>
          <Divider />
          <Container className="py-5">
             <MeterReadingEntryForm formik={addGSTFormik} />
             <CustomerDetailsForm
              soldToVal={soldToVal}
              customerData={soldToVal === "1" && customerData}
              formik={soldToVal === "1" ? selectPartyFormik : addNewPartyFormik}
              handleCloseModal={handleCloseModal}
            /> 
           </Container>
         </Dialog> */}

        {itemTableData.length > 0 && (
          <Box>
            <Box className="space-y-5 border p-5 border-green-400 rounded-md">
              <AddItemTable
                additionalItem={itemTableData}
                itemGrandTotal={itemTableGrandTotal}
                handleDelete={() => {}}
              />
            </Box>
          </Box>
        )}
        <Box className="border p-5 border-green-400 rounded-md ">
          <Grid container rowGap={2} className="mb-5">
            <Grid item xs={12} sm={12} lg={12} xl={12}>
              <List
                sx={{ width: "100%" }}
                component="nav"
                aria-labelledby="addinfo-form"
                className="p-5 border border-green-400 rounded-md"
              >
                <ListItemButton
                  onClick={() => {}}
                  sx={{
                    border: "1px solid green",
                    borderRadius: "10px",
                  }}
                >
                  <ListItemText primary={text.label.purchase.paymentMethod} />
                  {/* {showAddInfoForm ? <Close /> : <Add />} */}
                </ListItemButton>
                <Collapse
                  in={showPaymentMethodForm}
                  timeout="auto"
                  unmountOnExit
                  className="p-5 shadow"
                >
                  <RadioGroupField
                    radioData={paymentMethodOption}
                    extraCls="w-full px-3 "
                    // labelCls={
                    //   "w-full border-[1px] border-gray-400 px-3 py-4 text-gray-500 rounded mb-2"
                    // }
                    // label={text.label.purchase.paymentMethod}
                    row
                    value={paymentOption}
                    // color={`success`}
                    handleChange={handlePaymentOption}
                  />
                  {/* <pre>{paymentOption}</pre> */}
                </Collapse>
                {/*  */}
                {paymentOption === "Cr" && (
                  <FlexBox className="w-full justify-end mt-5">
                    <ButtonFieldInput
                      buttonextracls={`rounded-full bg-[#032974] text-white capitalize`}
                      variant={"contained"}
                      name={text.buttonNames.add}
                      handleClick={handleCreditTransactionPost}
                    />
                  </FlexBox>
                )}
              </List>
            </Grid>
          </Grid>
          {showPaymentModal && (
            <Box>
              <Box className="space-y-5 border p-5 border-green-400 rounded-md">
                {/* <PaymentMethodForm
                  paymentOption={paymentOption}
                  cardPosOptions={cardPosOptions}
                  formik={transactionBankingForm}
                  denomData={cashDenomData}
                  inDenominators={inDenominators}
                  outDenominators={outDenominators}
                  cashInTransactionTotal={cashInTransactionTotal}
                  cashOutTransactionTotal={cashOutTransactionTotal}
                  handleInDenominatorChange={handleInDenominatorChange}
                  handleOutDenominatorChange={handleOutDenominatorChange}
                  cashInTransactionGrandTotal={cashInTransactionGrandTotal}
                  cashOutTransactionGrandTotal={cashOutTransactionGrandTotal}
                  grandTotal={itemTableGrandTotal}
                  handleCashTransactionPost={handleCashTransactionPost}
                /> */}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Purchase;
