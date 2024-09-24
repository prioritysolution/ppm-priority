import {
  ButtonFieldInput,
  DropDownField,
  FlexBox,
  TextFieldInput,
} from "@/common";
import { Grid } from "@mui/material";
import { FC, memo } from "react";
import text from "@/languages/en_US.json";

interface AddItemFormProps {
  formik: any;
  itemOptions: any;
  showPetroliumModal: boolean;
  //   loading: boolean;
}

const AddItemForm: FC<AddItemFormProps> = ({
  formik,
  itemOptions,
  showPetroliumModal,
  //   loading,
}) => {
  return (
    <form>
      <Grid container spacing={2} flexWrap={"wrap"} rowGap={2}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <DropDownField
            name={`item`}
            dropdownLabel={text.label.addItemMaster.itemName}
            // placeholder={text.placeholders.addshiftMaster.shiftType}
            color={`success`}
            option={formik?.values?.item}
            handleChange={formik?.handleChange}
            handleBlur={formik?.handleBlur}
            selectOption={itemOptions}
            error={formik?.touched?.item && Boolean(formik?.errors?.item)}
            errorText={formik?.touched?.item && formik?.errors?.item}
            fullWidthState
            // disabled={showPetroliumModal}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <TextFieldInput
            placeholder={text.placeholders.addInfo.itemQuantity}
            inputLabel={text.label.addInfo.itemQuantity}
            extraCls={`w-full`}
            color={`success`}
            textinputname={`itemQuantity`}
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
            value={formik?.values?.itemQuantity}
            handleBlur={formik?.handleBlur}
            error={
              formik?.touched?.itemQuantity &&
              Boolean(formik?.errors?.itemQuantity)
            }
            helperText={
              formik?.touched?.itemQuantity && formik?.errors?.itemQuantity
            }
            clickEnter={formik?.handleSubmit}
            fullwidthState
            // disabled={showPetroliumModal}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <TextFieldInput
            placeholder={text.placeholders.addInfo.itemRate}
            inputLabel={text.label.addInfo.itemRate}
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
            value={formik?.values?.itemRate}
            handleBlur={formik?.handleBlur}
            error={
              formik?.touched?.itemRate && Boolean(formik?.errors?.itemRate)
            }
            helperText={formik?.touched?.itemRate && formik?.errors?.itemRate}
            // clickEnter={formik?.handleSubmit}
            fullwidthState
            // disabled={showPetroliumModal}
          />
        </Grid>
        <FlexBox className="w-full justify-end">
          <ButtonFieldInput
            buttonextracls={`rounded-full bg-[#032974] text-white capitalize`}
            variant={"contained"}
            name={text.buttonNames.add}
            // loading={loading}
            handleClick={formik.handleSubmit}
          />
        </FlexBox>
      </Grid>
    </form>
  );
};

const memoizedForm = memo(AddItemForm);

export default memoizedForm;
