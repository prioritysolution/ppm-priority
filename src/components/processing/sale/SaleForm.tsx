import React, { FC } from "react";
import {
  ButtonFieldInput,
  DatePickerField,
  DropDownField,
  FlexBox,
  RadioGroupField,
} from "@/common";
import { Grid } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";

import text from "@/languages/en_US.json";

interface soldByDropDownDataProps {
  name: string;
  value: number;
}

interface soldToOptionProps {
  label: string;
  value: string;
}

interface SaleProps {
  handleDateChange(): void;
  date: Dayjs | null;
  handleError(): void;
  errMessage: string;
  customerErrorMessage: string | null;
  handleError(): void;
  formik: any;
  handleSoldTo: any;
  soldToVal: string;
  soldByDropDownData: soldByDropDownDataProps[];
  soldToOption: soldToOptionProps[];
  loading: boolean;
  saleData: any;
  financialYear: any;
  activeAddItems: boolean;
  //   isDisabled: boolean;
}

const SaleForm: FC<SaleProps> = ({
  date,
  errMessage,
  customerErrorMessage,
  handleDateChange,
  handleError,
  formik,
  handleSoldTo,
  soldToVal,
  soldByDropDownData,
  soldToOption,
  loading,
  saleData,
  financialYear,
  activeAddItems,
  //   isDisabled,
}) => {
  const custName =
    saleData && saleData.soldTo ? saleData.soldTo.Cust_Name : null;

  return (
    <form
      // onSubmit={formik?.handleSubmit}
      className="p-5 border border-green-400 rounded-md"
    >
      {/* <pre>{JSON.stringify({ saleData }, null, 4)}</pre> */}
      <Grid container spacing={2} flexWrap={"wrap"} rowGap={2}>
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          lg={3}
          justifyContent={"space-between"}
        >
          <DatePickerField
            label={text.label.sale.saleDate}
            handleChange={handleDateChange}
            date={date}
            handleError={handleError}
            // errorMessage={errMessage}
            extraCls={`w-full`}
            handleBlur={handleError}
            color={errMessage ? "error" : "success"}
            format="DD-MM-YYYY"
            clearable
            isDisabled={activeAddItems}
          />
          {errMessage.length > 0 && (
            <p className="text-xs text-red-600/70 px-2 py-1">{errMessage}</p>
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={3}>
          <RadioGroupField
            radioData={soldToOption}
            extraCls="w-full px-3 "
            labelCls={
              "w-full border-[1px] border-gray-400 px-3 py-4 text-gray-500 rounded"
            }
            label={custName ? custName : text.label.sale.soldTo}
            row
            value={soldToVal}
            color={customerErrorMessage ? "error" : `success`}
            handleChange={handleSoldTo}
            // handleBlur={formik?.handleBlur}
            // selectOption={shiftOptions}
            // error={formik?.touched?.shift && Boolean(formik?.errors?.soldTo)}
            // errorText={formik?.errors?.}
            // fullWidthState
            // disabled={isDisabled}
            disabled={activeAddItems}
          />
          {customerErrorMessage && soldToVal === "0" && (
            <p className="text-sm text-red-500">{customerErrorMessage}</p>
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={3}>
          <DropDownField
            name={`soldBy`}
            dropdownLabel={text.label.sale.soldBy}
            // placeholder={text.placeholders.addpumpMaster.pumpType}
            color={`success`}
            option={formik?.values?.soldBy}
            handleChange={formik?.handleChange}
            handleBlur={formik?.handleBlur}
            selectOption={soldByDropDownData}
            error={formik?.touched?.soldBy && Boolean(formik?.errors?.soldBy)}
            errorText={formik?.touched?.soldBy && formik?.errors?.soldBy}
            fullWidthState
            disabled={activeAddItems}
          />
        </Grid>

        {!activeAddItems && (
          <FlexBox className="w-full justify-end ">
            <ButtonFieldInput
              buttonextracls={`rounded-full bg-[#032974] text-white capitalize`}
              variant={"contained"}
              name={text.buttonNames.next}
              // disabled={soldToVal === "0"}
              loading={loading}
              disabled={
                date === null ||
                dayjs(date).format("YYYY-MM-DD") <
                  financialYear[0]?.Fin_start ||
                dayjs(date).format("YYYY-MM-DD") > financialYear[0]?.Fin_To ||
                activeAddItems
              }
              handleClick={formik.handleSubmit}
            />
          </FlexBox>
        )}
      </Grid>
    </form>
  );
};

export default SaleForm;
