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
  customerLoading: boolean;
}

const CustomerDetailsForm: FC<CustomerDetailsFormProps> = ({
  formik,
  soldToVal,
  customerData,
  handleCloseModal,
  customerLoading,
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
              textinputname={`Cust_Name`}
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
              value={formik?.values?.Cust_Name}
              handleBlur={formik?.handleBlur}
              error={
                formik?.touched?.Cust_Name && Boolean(formik?.errors?.Cust_Name)
              }
              helperText={
                formik?.touched?.Cust_Name && formik?.errors?.Cust_Name
              }
              // clickEnter={formik?.handleSubmit}
              fullwidthState
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextFieldInput
              placeholder={text.placeholders.sale.address}
              inputLabel={text.label.sale.address}
              extraCls={`w-full`}
              color={`success`}
              textinputname={`Cust_Addr`}
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
              value={formik?.values?.Cust_Addr}
              handleBlur={formik?.handleBlur}
              error={
                formik?.touched?.Cust_Addr && Boolean(formik?.errors?.Cust_Addr)
              }
              helperText={
                formik?.touched?.Cust_Addr && formik?.errors?.Cust_Addr
              }
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
              textinputname={`Cust_Mobile`}
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
              value={formik?.values?.Cust_Mobile}
              handleBlur={formik?.handleBlur}
              error={
                formik?.touched?.Cust_Mobile &&
                Boolean(formik?.errors?.Cust_Mobile)
              }
              helperText={
                formik?.touched?.Cust_Mobile && formik?.errors?.Cust_Mobile
              }
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
              textinputname={`Cust_Mail`}
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
              value={formik?.values?.Cust_Mail}
              handleBlur={formik?.handleBlur}
              error={
                formik?.touched?.Cust_Mail && Boolean(formik?.errors?.Cust_Mail)
              }
              helperText={
                formik?.touched?.Cust_Mail && formik?.errors?.Cust_Mail
              }
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
              textinputname={`Cust_GSTIN`}
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
              value={formik?.values?.Cust_GSTIN}
              handleBlur={formik?.handleBlur}
              error={
                formik?.touched?.Cust_GSTIN &&
                Boolean(formik?.errors?.Cust_GSTIN)
              }
              helperText={
                formik?.touched?.Cust_GSTIN && formik?.errors?.Cust_GSTIN
              }
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
          loading={customerLoading}
        />
      </FlexBox>
    </form>
  );
};

export default CustomerDetailsForm;
