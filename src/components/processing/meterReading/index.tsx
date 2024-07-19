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
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FC, useEffect, useState } from "react";
import text from "@/languages/en_US.json";
import MeterReadingForm from "./MeterReadingForm";
import { Dayjs } from "dayjs";
import MeterReadingTable from "./MeterReadingTable";
import { useSelector } from "react-redux";
import { Add, Close, Send } from "@mui/icons-material";
import AdditionalInfoForm from "./AdditionalInfoForm";
import MeterReadingEntryForm from "./MeterReadingEntryForm";
import {
  ButtonFieldInput,
  CheckBox,
  CommonStepper,
  FlexBetween,
  FlexBox,
  FlexCenter,
  FlexContentCenter,
  TextFieldInput,
} from "@/common";
import AdditionalItemTable from "./AdditionalItemTable";
import TransactionDetails from "./TransactionDetails";

interface MeterReadingProps {
  date: Dayjs | null;
  errMessage: string;
  formik: any;
  handleDateChange(): void;
  handleError(): void;
  loading: boolean;
  showAddInfoForm: boolean;
  handleAddInfo(): void;
  addInfoForm: any;
  addInfoLoader: boolean;
  addGSTFormik: any;
  showModal: boolean;
  handleCloseConfirmationModal(): void;
  confirmationModal: boolean;
  isDisabled: boolean;
  meterReading: any;
  gstTable: any;
  meterReadingGrandTotal: number;
  gstGrandTotal: number;
  handlePostTableData(): void;
  handleDeleteMeterReadingData: any;
  handleDeleteAdditionalItemData: any;
  activeSteps: number;
  bankTransactionData: any;
  transactionBankingForm: any;
  bankTransactionTotal: number;
  denominators: string[];
  handleDenominatorChange(
    event: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number
  ): void;
  cashTransactionTotal: number[];
  cashTransactionGrandTotal: number;
  handleTransactionPost(): void;
  handleDeleteBankTransactionData: any;
  isTransactionValid: boolean;
  setActiveSteps: any;
  grandTotal: number;
  decimal: number;
  decimalInput: number;
  handleCalculateDecimalChange: any;
  decimalInputError: string;
  finalAmountDiff: number;
  setFinalAmountDiff: any;
  handleCalculateCheck: any;
  calculateCheck: boolean;
}

const MeterReading: FC<MeterReadingProps> = ({
  date,
  errMessage,
  formik,
  handleDateChange,
  showModal,
  bankTransactionData,
  bankTransactionTotal,
  handleError,
  loading,
  handleAddInfo,
  showAddInfoForm,
  addInfoForm,
  addInfoLoader,
  addGSTFormik,
  handlePostTableData,
  activeSteps,
  confirmationModal,
  handleCloseConfirmationModal,
  isDisabled,
  meterReading,
  gstTable,
  meterReadingGrandTotal,
  gstGrandTotal,
  handleDeleteMeterReadingData,
  handleDeleteAdditionalItemData,
  transactionBankingForm,
  cashTransactionTotal,
  denominators,
  handleDenominatorChange,
  handleDeleteBankTransactionData,
  handleTransactionPost,
  cashTransactionGrandTotal,
  isTransactionValid,
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
}) => {
  const [addDisabled, setAddDisabled] = useState(false);
  const pumpOptions = useSelector(
    (state: any) => state.pumpMasterData?.pumpMasterData
  )?.map((pumpData: any) => {
    return {
      name: pumpData.Pump_Name,
      value: pumpData.Id,
    };
  });

  const shiftOptions = useSelector(
    (state: any) => state.shiftMasterData?.shiftMasterData
  )?.map((shiftData: any) => {
    return {
      name: shiftData.Shift_Name,
      value: shiftData.Id,
    };
  });

  const staffOptions = useSelector((state: any) => state.staff?.staffData)?.map(
    (staffData: any) => {
      return {
        name: staffData.Staff_Name,
        value: staffData.Id,
      };
    }
  );

  const nozzleOptions = useSelector(
    (state: any) => state.pumpMasterData?.nozzleData
  )?.map((nozzleData: any) => {
    return {
      name: nozzleData.Nozzle_Name,
      value: nozzleData.Id,
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
  useEffect(() => {
    setFinalAmountDiff(
      grandTotal - bankTransactionTotal - cashTransactionGrandTotal
    );
    // console.log("diff", finalAmountDiff);
    // console.log(
    //   "diff2",
    //   grandTotal - bankTransactionTotal - cashTransactionGrandTotal
    // );
  }, [
    bankTransactionData,
    bankTransactionTotal,
    cashTransactionGrandTotal,
    grandTotal,
  ]);

  const isDis = cashDenomData.map(
    (data: any, idx: number) =>
      Number(denominators[idx]) > 0 &&
      grandTotal -
        bankTransactionTotal -
        (cashTransactionGrandTotal - cashTransactionTotal[idx]) <=
        data.Note_Value * (Number(denominators[idx]) - 1)
  );

  useEffect(() => {
    setAddDisabled(isDis.includes(true));
  }, [isDis]);

  const steps = [
    text.dashboardHeader.meterReading,
    text.label.meterReading.transactionDetails,
  ];

  return (
    <>
      <Box className="p-5 min-h-[95vh] space-y-5">
        {/* <pre>{JSON.stringify({ grandTotal }, null, 4)}</pre> */}
        <Typography
          component={`p`}
          className="text-2xl font-bold text-slate-600 mb-5"
        >
          {activeSteps === 0
            ? text.tableTitles.meterReading
            : text.label.meterReading.transactionDetails}
        </Typography>
        <CommonStepper activeStep={activeSteps} steps={steps} />
        {/* <pre>
          {JSON.stringify(
            { activeSteps, meterReadingGrandTotal, gstGrandTotal },
            null,
            4
          )}
        </pre> */}
        {activeSteps === 0 ? (
          <>
            <Grid container rowGap={2}>
              {/* meter reading form */}
              <Grid item xs={12} sm={12} lg={12} xl={12}>
                <MeterReadingForm
                  date={date}
                  errMessage={errMessage}
                  formik={formik}
                  handleDateChange={handleDateChange}
                  handleError={handleError}
                  nozzleOptions={nozzleOptions}
                  pumpOptions={pumpOptions}
                  shiftOptions={shiftOptions}
                  staffOptions={staffOptions}
                  loading={loading}
                  isDisabled={isDisabled}
                  financialYear={financialYear}
                />
              </Grid>

              {/* add info form */}
              <Grid item xs={12} sm={12} lg={12} xl={12}>
                <List
                  sx={{ width: "100%" }}
                  component="nav"
                  aria-labelledby="addinfo-form"
                >
                  <ListItemButton
                    onClick={() => {}}
                    sx={{
                      border: "1px solid green",
                      borderRadius: "10px",
                    }}
                  >
                    <ListItemText primary={text.tableTitles.addInfo} />
                    {showAddInfoForm ? <Close /> : <Add />}
                  </ListItemButton>
                  <Collapse
                    in={showAddInfoForm}
                    timeout="auto"
                    unmountOnExit
                    className="p-5 shadow"
                  >
                    <AdditionalInfoForm
                      formik={addInfoForm}
                      itemOptions={itemOptions}
                      loading={addInfoLoader}
                    />
                  </Collapse>
                </List>
              </Grid>
            </Grid>
            <Box>
              <Box className="space-y-5 border p-5 border-green-400 rounded-md">
                {/* meter reading table */}
                {meterReading.length > 0 && (
                  <MeterReadingTable
                    meterReading={meterReading}
                    meterReadingGrandTotal={meterReadingGrandTotal}
                    handleDelete={handleDeleteMeterReadingData}
                  />
                )}

                {/* additional item table */}
                {gstTable.length > 0 && (
                  <AdditionalItemTable
                    additionalItem={gstTable}
                    gstGrandTotal={gstGrandTotal}
                    handleDelete={handleDeleteAdditionalItemData}
                  />
                )}

                {meterReading.length > 0 && (
                  <FlexBox className="justify-end">
                    <ButtonFieldInput
                      variant={"outlined"}
                      color={"success"}
                      name={"Send"}
                      endIcon={<Send />}
                      buttonextracls={"capitalize"}
                      handleClick={handlePostTableData}
                    />
                  </FlexBox>
                )}
              </Box>
            </Box>
          </>
        ) : (
          <Box className={`border border-green-400 rounded-md p-5`}>
            <div className="flex items-center justify-between ">
              <div
                className="cursor-pointer py-1 flex items-center gap-2"
                onClick={() => setActiveSteps(0)}
              >
                <ArrowBackIcon />
                <p>Back</p>
              </div>
              <div>
                <p className="text-lg">
                  Total Amount to be paid : <span>{grandTotal}</span>
                </p>
              </div>
              <div></div>
            </div>

            <TransactionDetails
              bankTransactionData={bankTransactionData}
              formik={transactionBankingForm}
              cardPosOptions={cardPosOptions}
              bankTransactionTotal={bankTransactionTotal}
              noteDenom={cashDenomData}
              denominators={denominators}
              handleDenominatorChange={handleDenominatorChange}
              totalAmount={cashTransactionTotal}
              cashTransactionGrandTotal={cashTransactionGrandTotal}
              handleDeleteBankTransactionData={handleDeleteBankTransactionData}
              amountTobePaid={grandTotal}
            />
            {decimal !== 0 && (
              <FlexContentCenter className="w-full items-center justify-center gap-5 py-5">
                <p
                  className={`text-red-500 text-lg mr-5 ${
                    decimal === 0 && "hidden"
                  }`}
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
                    // error={
                    //   formik?.touched?.amount && Boolean(formik?.errors?.amount)
                    // }
                    // helperText={formik?.touched?.amount && formik?.errors?.amount}
                    // clickEnter={formik?.handleSubmit}
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
            )}
            <FlexContentCenter className="w-full items-center justify-center">
              {!isTransactionValid && (
                <Typography
                  component={"p"}
                  className="!text-xs !font-semibold text-red-400"
                >
                  The transaction grand total should be equal to the sum of
                  meter reading and additional item grand total
                </Typography>
              )}
              {finalAmountDiff < 0 ? (
                <p
                  className={`text-red-500 text-lg mr-5 ${
                    finalAmountDiff === 0 && "hidden"
                  }`}
                >
                  Cash Exceedes : {finalAmountDiff - decimalInput}
                </p>
              ) : (
                <p
                  className={`text-red-500 text-lg mr-5 ${
                    grandTotal -
                      bankTransactionTotal -
                      cashTransactionGrandTotal ===
                      0 && "hidden"
                  }`}
                >
                  Cash Sortage :{" "}
                  {grandTotal -
                    bankTransactionTotal -
                    cashTransactionGrandTotal -
                    decimalInput}
                </p>
              )}
              {/* <p>Hello{decimalInput}</p> */}
              <ButtonFieldInput
                name={text.buttonNames.add}
                variant={"contained"}
                buttonextracls={"bg-green-400 w-1/3 capitalize"}
                handleClick={handleTransactionPost}
                disabled={
                  bankTransactionTotal + cashTransactionGrandTotal === 0 ||
                  addDisabled ||
                  (decimal !== 0 &&
                    decimalInput !== decimal * -1 &&
                    decimalInput !== 1 - decimal)
                }
              />
            </FlexContentCenter>
          </Box>
        )}
      </Box>
      <Dialog open={showModal} disableEscapeKeyDown>
        <DialogTitle className="h-[4rem]">
          <FlexContentCenter>
            <Typography className="font-bold text-lg capitalize">
              {text.tableTitles.MeterReadingEntry}
            </Typography>
            {/* <IconButton onClick={handleCloseModal}>
            <Close fontSize='small' />
          </IconButton> */}
          </FlexContentCenter>
        </DialogTitle>
        <Divider />
        <Container className="py-5">
          <MeterReadingEntryForm formik={addGSTFormik} />
        </Container>
      </Dialog>
      <Dialog open={confirmationModal} className="rounded-lg">
        <FlexCenter>
          <Container className="h-[8rem] py-5">
            <FlexBetween className="flex-col h-full">
              <Typography component={"p"} className="text-xl font-bold">
                {text.confirmationDialogues.meterReadingAddMore}
              </Typography>
              <FlexBetween className="flex-row-reverse w-full">
                <ButtonFieldInput
                  name={text.buttonNames.yes}
                  variant={"contained"}
                  buttonextracls={"bg-green-400 rounded-full capitalize"}
                  handleClick={handleCloseConfirmationModal}
                />
                <ButtonFieldInput
                  name={text.buttonNames.no}
                  variant={"contained"}
                  color={"error"}
                  buttonextracls={"bg-red-400 rounded-full capitalize"}
                  handleClick={() => {
                    handleAddInfo();
                    handleCloseConfirmationModal();
                  }}
                />
              </FlexBetween>
            </FlexBetween>
          </Container>
        </FlexCenter>
      </Dialog>
    </>
  );
};

export default MeterReading;
