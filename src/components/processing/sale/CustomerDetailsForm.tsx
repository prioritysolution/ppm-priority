import {
  ButtonFieldInput,
  DropDownField,
  FlexBox,
  TextFieldInput,
} from "@/common";
import { Grid } from "@mui/material";
import { FC } from "react";
import text from "@/languages/en_US.json";
import dayjs from "dayjs";

interface CustomerDataProps {
  name: string;
  value: number;
}

interface CustomerDetailsFormProps {
  soldToVal: string;
  customerData?: CustomerDataProps[];
  formik: any;
  handleCloseModal: any;
}

const CustomerDetailsForm: FC<CustomerDetailsFormProps> = ({
  formik,
  soldToVal,
  customerData,
  handleCloseModal,
}) => {
  // const employeeName = soldByDropDownData.filter(
  //   (data: any) => data.value === formik?.values?.soldBy
  // )[0].name;

  return (
    <form onSubmit={formik.handleSubmit}>
      {soldToVal === "1" ? (
        <Grid
          container
          spacing={1}
          flexWrap={"wrap"}
          rowGap={2}
          className="p-10 w-full"
        >
          {/* <pre>{JSON.stringify({ metaData, customerData }, null, 4)}</pre> */}
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            className="w-[300px]"
          >
            <DropDownField
              name={`partyId`}
              dropdownLabel={text.label.sale.selectCustomer}
              // placeholder={text.placeholders.sale.selectCustomer}
              color={`success`}
              option={formik?.values?.partyId}
              handleChange={formik?.handleChange}
              handleBlur={formik?.handleBlur}
              selectOption={customerData}
              error={
                formik?.touched?.partyId && Boolean(formik?.errors?.partyId)
              }
              errorText={formik?.touched?.partyId && formik?.errors?.partyId}
              fullWidthState
            />
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          spacing={2}
          flexWrap={"wrap"}
          rowGap={2}
          className="mb-5"
        >
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextFieldInput
              placeholder={text.placeholders.sale.custName}
              inputLabel={text.label.sale.custName}
              extraCls={`w-full`}
              color={`success`}
              textinputname={`custName`}
              type={`text`}
              sx={{
                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                  {
                    display: "none",
                  },
                "& input[type=number]": {
                  MozAppearance: "textfield",
                },
              }}
              onChange={formik?.handleChange}
              value={formik?.values?.custName}
              handleBlur={formik?.handleBlur}
              error={
                formik?.touched?.custName && Boolean(formik?.errors?.custName)
              }
              helperText={formik?.touched?.custName && formik?.errors?.custName}
              clickEnter={formik?.handleSubmit}
              fullwidthState
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextFieldInput
              placeholder={text.placeholders.sale.address}
              inputLabel={text.label.sale.address}
              extraCls={`w-full`}
              color={`success`}
              textinputname={`address`}
              type={`text`}
              sx={{
                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                  {
                    display: "none",
                  },
                "& input[type=number]": {
                  MozAppearance: "textfield",
                },
              }}
              onChange={formik?.handleChange}
              value={formik?.values?.address}
              handleBlur={formik?.handleBlur}
              error={
                formik?.touched?.address && Boolean(formik?.errors?.address)
              }
              helperText={formik?.touched?.address && formik?.errors?.address}
              clickEnter={formik?.handleSubmit}
              fullwidthState
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextFieldInput
              placeholder={text.placeholders.sale.phone}
              inputLabel={text.label.sale.phone}
              extraCls={`w-full`}
              color={`success`}
              textinputname={`phone`}
              type={`text`}
              sx={{
                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                  {
                    display: "none",
                  },
                "& input[type=number]": {
                  MozAppearance: "textfield",
                },
              }}
              onChange={formik?.handleChange}
              value={formik?.values?.phone}
              handleBlur={formik?.handleBlur}
              error={formik?.touched?.phone && Boolean(formik?.errors?.phone)}
              helperText={formik?.touched?.phone && formik?.errors?.phone}
              clickEnter={formik?.handleSubmit}
              fullwidthState
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextFieldInput
              placeholder={text.placeholders.sale.email}
              inputLabel={text.label.sale.email}
              extraCls={`w-full`}
              color={`success`}
              textinputname={`email`}
              type={`email`}
              sx={{
                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                  {
                    display: "none",
                  },
                "& input[type=number]": {
                  MozAppearance: "textfield",
                },
              }}
              onChange={formik?.handleChange}
              value={formik?.values?.email}
              handleBlur={formik?.handleBlur}
              error={formik?.touched?.email && Boolean(formik?.errors?.email)}
              helperText={formik?.touched?.email && formik?.errors?.email}
              clickEnter={formik?.handleSubmit}
              fullwidthState
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextFieldInput
              placeholder={text.placeholders.sale.gstIn}
              inputLabel={text.label.sale.gstIn}
              extraCls={`w-full`}
              color={`success`}
              textinputname={`gstIn`}
              type={`text`}
              sx={{
                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                  {
                    display: "none",
                  },
                "& input[type=number]": {
                  MozAppearance: "textfield",
                },
              }}
              onChange={formik?.handleChange}
              value={formik?.values?.gstIn}
              handleBlur={formik?.handleBlur}
              error={formik?.touched?.gstIn && Boolean(formik?.errors?.gstIn)}
              helperText={formik?.touched?.gstIn && formik?.errors?.gstIn}
              clickEnter={formik?.handleSubmit}
              fullwidthState
            />
          </Grid>
        </Grid>
      )}

      <FlexBox className="w-full justify-between">
        <ButtonFieldInput
          buttonextracls={`rounded-full bg-[#032974] text-white capitalize`}
          variant={"contained"}
          name={text.buttonNames.cancel}
          handleClick={handleCloseModal}
          type={`button`}
        />
        <ButtonFieldInput
          buttonextracls={`rounded-full bg-[#032974] text-white capitalize`}
          variant={"contained"}
          name={text.buttonNames.add}
        />
      </FlexBox>
    </form>
  );
};

export default CustomerDetailsForm;
