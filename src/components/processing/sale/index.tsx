import {
  Box,
  Collapse,
  Container,
  Dialog,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

import text from "@/languages/en_US.json";
import SaleForm from "./SaleForm";
import { Dayjs } from "dayjs";
import { FC } from "react";
import { useSelector } from "react-redux";

import AddItemForm from "./AddItemForm";
import {
  ButtonFieldInput,
  FlexBox,
  FlexContentCenter,
  RadioGroupField,
} from "@/common";
import CustomerDetailsForm from "./CustomerDetailsForm";
import AddItemTable from "./AddItemTable";
import PaymentMethodForm from "./PaymentMethodForm";
import AddPetroliumForm from "./AddPetroliumForm";

interface SaleProps {
  date: Dayjs | null;
  errMessage: string;
  formik: any;
  addItemFormik: any;
  handleDateChange(): void;
  handleError(): void;
  customerErrorMessage: string | null;
  handleSoldTo: any;
  soldToVal: string;
  loading: boolean;
  saleModalOpen: boolean;
  handleCloseModal: any;
  selectPartyFormik: any;
  addNewPartyFormik: any;
  saleData: any;
  itemTableData: any;
  itemTableGrandTotal: number;
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
  activeAddItems: boolean;
  addItemCat: string;
  handleCatOptionChange: any;
  showPetroliumModal: boolean;
  handleClosePetroliumModal: any;
  addPetroliumItemFormik: any;
  petroliumItemRate: number;
  petroliumItemLoaders: boolean;
  handleItemTableDelete: any;
  decimal: number;
  decimalInput: number;
  handleCalculateDecimalChange: any;
  decimalInputError: string;
  handleCalculateCheck: any;
  calculateCheck: boolean;
  addPartyLoaders: boolean;
}

const Sale: FC<SaleProps> = ({
  date,
  errMessage,
  formik,
  addItemFormik,
  handleDateChange,
  handleError,
  customerErrorMessage,
  handleSoldTo,
  soldToVal,
  loading,
  saleModalOpen,
  handleCloseModal,
  selectPartyFormik,
  addNewPartyFormik,
  saleData,
  itemTableData,
  itemTableGrandTotal,
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
  activeAddItems,
  addItemCat,
  handleCatOptionChange,
  showPetroliumModal,
  handleClosePetroliumModal,
  addPetroliumItemFormik,
  petroliumItemRate,
  petroliumItemLoaders,
  handleItemTableDelete,
  decimal,
  decimalInput,
  handleCalculateDecimalChange,
  decimalInputError,
  handleCalculateCheck,
  calculateCheck,
  addPartyLoaders,
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

  const petroliumItemData = useSelector(
    (state: any) => state.tankMasterData?.tankItemData
  )?.map((item: any) => {
    return {
      name: item.Item_Name,
      value: `${item.Id}`,
    };
  });

  const pumpData = useSelector(
    (state: any) => state.pumpMasterData?.pumpMasterData
  )?.map((pump: any) => {
    return {
      name: pump.Pump_Name,
      value: `${pump.Id}`,
    };
  });

  const nozzleData = useSelector(
    (state: any) => state.pumpMasterData?.nozzleData
  )?.map((nozzle: any) => {
    return {
      name: nozzle.Nozzle_Name,
      value: `${nozzle.Id}`,
    };
  });

  const soldToOption = [
    {
      label: "Party",
      value: "1",
    },
    {
      label: "Other",
      value: "2",
    },
  ];

  const AddItemOption = [
    {
      label: "Petrolium",
      value: "1",
    },
    {
      label: "Lubricant/Other",
      value: "2",
    },
  ];

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
          {text.tableTitles.sale}
          {/* {activeSteps === 0
        ? text.tableTitles.meterReading
        : text.label.meterReading.transactionDetails} */}
        </Typography>
        <Box className="border p-5 border-green-400 rounded-md">
          <Grid container rowGap={2}>
            {/* meter reading form */}
            <Grid item xs={12} sm={12} lg={12} xl={12}>
              <SaleForm
                date={date}
                errMessage={errMessage}
                customerErrorMessage={customerErrorMessage}
                formik={formik}
                handleDateChange={handleDateChange}
                handleError={handleError}
                handleSoldTo={handleSoldTo}
                soldToVal={soldToVal}
                soldByDropDownData={staffData}
                loading={loading}
                soldToOption={soldToOption}
                saleData={saleData}
                financialYear={financialYear}
                activeAddItems={activeAddItems}

                //   isDisabled={isDisabled}
              />
            </Grid>
            <Grid item xs={12} sm={12} lg={12} xl={12}>
              <List
                sx={{ width: "100%" }}
                component="nav"
                aria-labelledby="addinfo-form"
                className="border p-3 border-green-400 rounded-md"
              >
                <div className="flex items-center justify-start  gap-10 px-5">
                  <p className="block text-lg">{text.tableTitles.addItem}</p>
                  <div>
                    <RadioGroupField
                      radioData={AddItemOption}
                      extraCls="w-full px-3 "
                      // label={custName ? custName : text.label.sale.soldTo}
                      row
                      value={addItemCat}
                      // color={customerErrorMessage ? "error" : `success`}
                      handleChange={handleCatOptionChange}
                      // handleBlur={formik?.handleBlur}
                      // selectOption={shiftOptions}
                      // error={formik?.touched?.shift && Boolean(formik?.errors?.soldTo)}
                      // errorText={formik?.errors?.}
                      // fullWidthState
                      // disabled={isDisabled}
                      disabled={!activeAddItems}
                    />
                    {customerErrorMessage && soldToVal === "0" && (
                      <p className="text-sm text-red-500">
                        {customerErrorMessage}
                      </p>
                    )}
                  </div>
                  {/* {showAddInfoForm ? <Close /> : <Add />} */}
                </div>
                <Collapse
                  in={addItemCat === "2"}
                  timeout="auto"
                  unmountOnExit
                  className="p-5 shadow"
                >
                  <AddItemForm
                    formik={addItemFormik}
                    itemOptions={itemOptions}
                    showPetroliumModal={showPetroliumModal}
                    // loading={addInfoLoader}
                  />
                </Collapse>
              </List>
            </Grid>

            <Grid item xs={12} sm={12} lg={12} xl={12}></Grid>
          </Grid>
        </Box>
        <Dialog open={saleModalOpen} disableEscapeKeyDown>
          <DialogTitle className="h-[4rem]">
            <FlexContentCenter>
              <Typography className="font-bold text-lg capitalize">
                {text.tableTitles.customerDetails}
              </Typography>
              {/* <IconButton onClick={() => {}}>
                <Close fontSize="small" />
              </IconButton> */}
            </FlexContentCenter>
          </DialogTitle>
          <Divider />
          <Container className="py-5">
            {/* <MeterReadingEntryForm formik={addGSTFormik} /> */}
            <CustomerDetailsForm
              soldToVal={soldToVal}
              customerData={soldToVal === "1" && customerData}
              formik={soldToVal === "1" ? selectPartyFormik : addNewPartyFormik}
              handleCloseModal={handleCloseModal}
              customerLoading={addPartyLoaders}
            />
          </Container>
        </Dialog>

        <Dialog open={showPetroliumModal} disableEscapeKeyDown>
          <DialogTitle className="h-[4rem]">
            <FlexContentCenter>
              <Typography className="font-bold text-lg capitalize">
                {text.label.sale.petrolium.formHeading}
              </Typography>
              {/* <IconButton onClick={() => {}}>
                <Close fontSize="small" />
              </IconButton> */}
            </FlexContentCenter>
          </DialogTitle>
          <Divider />
          <Container className="py-5">
            {/* <MeterReadingEntryForm formik={addGSTFormik} /> */}
            <AddPetroliumForm
              // soldToVal={soldToVal}
              petroliumItemData={petroliumItemData}
              formik={addPetroliumItemFormik}
              handleCloseModal={handleClosePetroliumModal}
              pumpData={pumpData}
              nozzleData={nozzleData}
              petroliumItemRate={petroliumItemRate}
              petroliumItemLoaders={petroliumItemLoaders}
            />
          </Container>
        </Dialog>

        {itemTableData.length > 0 && (
          <Box>
            <Box className="space-y-5 border p-5 border-green-400 rounded-md">
              <AddItemTable
                additionalItem={itemTableData}
                itemGrandTotal={itemTableGrandTotal}
                handleDelete={handleItemTableDelete}
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
                className="p-3 border border-green-400 rounded-md"
              >
                <div>
                  <ListItemText primary={text.label.sale.paymentMethod} />
                  {/* {showAddInfoForm ? <Close /> : <Add />} */}
                </div>
                <Collapse
                  in={itemTableData.length > 0}
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
                    // label={text.label.sale.paymentMethod}
                    row
                    value={paymentOption}
                    color={customerErrorMessage ? "error" : `success`}
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
                <PaymentMethodForm
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
                  decimal={decimal}
                  decimalInput={decimalInput}
                  handleCalculateDecimalChange={handleCalculateDecimalChange}
                  decimalInputError={decimalInputError}
                  handleCalculateCheck={handleCalculateCheck}
                  calculateCheck={calculateCheck}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Sale;
