import {
  ButtonFieldInput,
  DatePickerField,
  DropDownField,
  FlexBetween,
  FlexItemCenter,
  TextFieldInput,
} from "@/common";
import { FC } from "react";
import text from "@/languages/en_US.json";
import { Divider, Grid } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";

interface MeterOpeningFormProps {
  formik: any;
  postLoaders: boolean;
  resetFormHandle(): void;
  pumpOptions: any;
  nozzleOptions: any;
  handleDateChange(): void;
  date: Dayjs | null;
  handleDateError(): void;
  errMessage: string;
  editData: any;
  financialYear: any;
}

const MeterOpeningForm: FC<MeterOpeningFormProps> = ({
  formik,
  postLoaders,
  resetFormHandle,
  nozzleOptions,
  pumpOptions,
  date,
  handleDateChange,
  handleDateError,
  errMessage,
  editData,
  financialYear,
}) => {
  return (
    <form onSubmit={formik?.handleSubmit}>
      <FlexItemCenter className="h-[3rem]">
        <p className="font-bold text-black text-lg px-5">
          {editData && Object.keys(editData).length > 0
            ? text.edit.editMeterOpening
            : text.add.addMeterOpening}
        </p>
      </FlexItemCenter>
      <Divider className="w-full m-0" />
      <Grid container spacing={1} className="p-5">
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <DropDownField
            name={`pump`}
            dropdownLabel={text.label.addMeterOpening.pump}
            // placeholder={text.placeholders.addItemMaster.itemType}
            color={`success`}
            option={formik?.values?.pump}
            handleChange={formik?.handleChange}
            handleBlur={formik?.handleBlur}
            selectOption={pumpOptions}
            error={formik?.touched?.pump && Boolean(formik?.errors?.pump)}
            errorText={formik?.touched?.pump && formik?.errors?.pump}
            fullWidthState
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <DropDownField
            name={`nozzle`}
            dropdownLabel={text.label.addMeterOpening.nozzle}
            // placeholder={text.placeholders.addItemMaster.itemType}
            color={`success`}
            option={formik?.values?.nozzle}
            handleChange={formik?.handleChange}
            handleBlur={formik?.handleBlur}
            selectOption={nozzleOptions}
            disabled={nozzleOptions?.length === 0}
            error={formik?.touched?.nozzle && Boolean(formik?.errors?.nozzle)}
            errorText={formik?.touched?.nozzle && formik?.errors?.nozzle}
            fullWidthState
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <TextFieldInput
            placeholder={text.placeholders.addMeterOpening.openingReading}
            extraCls={`w-full`}
            color={`success`}
            textinputname={`openingReading`}
            sx={{
              "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                {
                  display: "none",
                },
              "& input[type=number]": {
                MozAppearance: "textfield",
              },
            }}
            inputLabel={text.label.addMeterOpening.openingReading}
            onChange={formik?.handleChange}
            value={formik?.values?.openingReading}
            handleBlur={formik?.handleBlur}
            error={
              formik?.touched?.openingReading &&
              Boolean(formik?.errors?.openingReading)
            }
            helperText={
              formik?.touched?.openingReading && formik?.errors?.openingReading
            }
            clickEnter={formik?.handleSubmit}
            fullwidthState
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <DatePickerField
            label={text.label.addMeterOpening.openingDate}
            handleChange={handleDateChange}
            date={date}
            handleError={handleDateError}
            // errorMessage={errMessage}
            extraCls={`w-full`}
            handleBlur={handleDateError}
            color={errMessage ? "error" : "success"}
            format="DD-MM-YYYY"
            clearable
          />
          {errMessage.length > 0 && (
            <p className="text-xs text-red-600/70 px-2 py-1">{errMessage}</p>
          )}
        </Grid>
      </Grid>
      <FlexItemCenter className="w-full mt-2 p-5">
        <FlexBetween className="flex-row-reverse w-full">
          <ButtonFieldInput
            name={
              editData && Object.keys(editData).length > 0
                ? text.buttonNames.update
                : text.buttonNames.add
            }
            buttonextracls={`rounded-full bg-blue-500  capitalize`}
            handleClick={date === null ? handleDateError : formik?.handleSubmit}
            variant={`contained`}
            loading={postLoaders}
            disabled={
              postLoaders ||
              date === null ||
              dayjs(date).format("YYYY-MM-DD") < financialYear[0]?.Fin_start ||
              dayjs(date).format("YYYY-MM-DD") > financialYear[0]?.Fin_To
            }
          />
          <ButtonFieldInput
            name={text.buttonNames.cancel}
            buttonextracls={`rounded-full bg-gray-400 capitalize`}
            variant={`contained`}
            type={`button`}
            handleClick={resetFormHandle}
          />
        </FlexBetween>
      </FlexItemCenter>
    </form>
  );
};

export default MeterOpeningForm;
