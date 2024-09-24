import {
  ButtonFieldInput,
  DropDownField,
  FlexBox,
  TextFieldInput,
} from "@/common";
import { Grid } from "@mui/material";
import { FC } from "react";
import text from "@/languages/en_US.json";

interface AddPetroliumFormProps {
  formik: any;
  handleCloseModal: any;
  petroliumItemData: any;
  pumpData: any;
  nozzleData: any;
  petroliumItemRate: number;
  petroliumItemLoaders: boolean;
}

const AddPetroliumForm: FC<AddPetroliumFormProps> = ({
  formik,
  handleCloseModal,
  petroliumItemData,
  pumpData,
  nozzleData,
  petroliumItemRate,
  petroliumItemLoaders,
}) => {
  // const employeeName = soldByDropDownData.filter(
  //   (data: any) => data.value === formik?.values?.soldBy
  // )[0].name;

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} flexWrap={"wrap"} rowGap={2}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <DropDownField
            name={`itemId`}
            dropdownLabel={text.label.sale.petrolium.selectItem}
            // placeholder={text.placeholders.sale.selectCustomer}
            color={`success`}
            option={formik?.values?.itemId}
            handleChange={formik?.handleChange}
            handleBlur={formik?.handleBlur}
            selectOption={petroliumItemData}
            error={formik?.touched?.itemId && Boolean(formik?.errors?.itemId)}
            errorText={formik?.touched?.itemId && formik?.errors?.itemId}
            fullWidthState
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <TextFieldInput
            placeholder={text.label.sale.petrolium.itemRate}
            inputLabel={text.label.sale.petrolium.itemRate}
            extraCls={`w-full`}
            color={`success`}
            textinputname={`itemRate`}
            type={`number`}
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
            value={petroliumItemRate}
            handleBlur={formik?.handleBlur}
            error={
              formik?.touched?.itemRate && Boolean(formik?.errors?.itemRate)
            }
            helperText={formik?.touched?.itemRate && formik?.errors?.itemRate}
            clickEnter={formik?.handleSubmit}
            fullwidthState
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <DropDownField
            name={`pumpId`}
            dropdownLabel={text.label.sale.petrolium.selectPump}
            // placeholder={text.placeholders.sale.selectCustomer}
            color={`success`}
            option={formik?.values?.pumpId}
            handleChange={formik?.handleChange}
            handleBlur={formik?.handleBlur}
            selectOption={pumpData}
            error={formik?.touched?.pumpId && Boolean(formik?.errors?.pumpId)}
            errorText={formik?.touched?.pumpId && formik?.errors?.pumpId}
            fullWidthState
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <DropDownField
            name={`nozzleId`}
            dropdownLabel={text.label.sale.petrolium.selectNozzle}
            // placeholder={text.placeholders.sale.selectCustomer}
            color={`success`}
            option={formik?.values?.nozzleId}
            handleChange={formik?.handleChange}
            handleBlur={formik?.handleBlur}
            selectOption={nozzleData}
            error={
              formik?.touched?.nozzleId && Boolean(formik?.errors?.nozzleId)
            }
            errorText={formik?.touched?.nozzleId && formik?.errors?.nozzleId}
            fullWidthState
            disabled={nozzleData.length === 0}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <TextFieldInput
            placeholder={text.placeholders.sale.petrolium.itemQnty}
            inputLabel={text.label.sale.petrolium.itemQnty}
            extraCls={`w-full`}
            color={`success`}
            textinputname={`itemQnty`}
            type={`number`}
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
            value={formik?.values?.itemQnty}
            handleBlur={formik?.handleBlur}
            error={
              formik?.touched?.itemQnty && Boolean(formik?.errors?.itemQnty)
            }
            helperText={formik?.touched?.itemQnty && formik?.errors?.itemQnty}
            clickEnter={formik?.handleSubmit}
            fullwidthState
          />
        </Grid>

        <FlexBox className="w-full justify-between mt-5 px-5">
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
            loading={petroliumItemLoaders}
          />
        </FlexBox>
      </Grid>
    </form>
  );
};

export default AddPetroliumForm;
