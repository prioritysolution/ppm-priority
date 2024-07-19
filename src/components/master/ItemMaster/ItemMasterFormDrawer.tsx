import {
  ButtonFieldInput,
  DropDownField,
  FlexBetween,
  FlexItemCenter,
  TextFieldInput,
} from "@/common";
import {
  Container,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { FC } from "react";
import text from "@/languages/en_US.json";
import { KeyboardArrowLeft } from "@mui/icons-material";

interface ItemMasterFormDrawerProps {
  formik: any;
  handleCloseDrawer(): void;
  openItemMaster: boolean;
  unitDropDownValue: any;
  itemCatDropDownValue: any;
  ledgerDropDownValue: any;
  loading: boolean;
}

const ItemMasterFormDrawer: FC<ItemMasterFormDrawerProps> = ({
  formik,
  handleCloseDrawer,
  openItemMaster,
  unitDropDownValue,
  itemCatDropDownValue,
  ledgerDropDownValue,
  loading,
}) => {
  const itemType = [
    {
      name: "data",
      value: "data",
    },
  ];

  const unit = [
    {
      name: "data",
      value: "data",
    },
  ];

  const drawerWidth = 700;
  return (
    <Drawer
      anchor={`right`}
      open={openItemMaster}
      onClose={handleCloseDrawer}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <FlexItemCenter className="h-[4rem] px-2" gap={3}>
        <IconButton onClick={handleCloseDrawer}>
          <KeyboardArrowLeft />
        </IconButton>
        <Typography component={`p`} className={`!font-bold text-2xl`}>
          {text.add.addItemMaster}
        </Typography>
      </FlexItemCenter>
      <Divider />
      <Container className="py-10">
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TextFieldInput
                placeholder={text.placeholders.addItemMaster.itemName}
                extraCls={`w-full`}
                color={`success`}
                textinputname={`itemName`}
                inputLabel={text.label.addItemMaster.itemName}
                onChange={formik?.handleChange}
                value={formik?.values?.itemName}
                handleBlur={formik?.handleBlur}
                error={
                  formik?.touched?.itemName && Boolean(formik?.errors?.itemName)
                }
                helperText={
                  formik?.touched?.itemName && formik?.errors?.itemName
                }
                clickEnter={formik?.handleSubmit}
                fullwidthState
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TextFieldInput
                placeholder={text.placeholders.addItemMaster.itemShortName}
                inputLabel={text.label.addItemMaster.itemShortName}
                extraCls={`w-full`}
                color={`success`}
                textinputname={`itemShortName`}
                onChange={formik?.handleChange}
                value={formik?.values?.itemShortName}
                handleBlur={formik?.handleBlur}
                error={
                  formik?.touched?.itemShortName &&
                  Boolean(formik?.errors?.itemShortName)
                }
                helperText={
                  formik?.touched?.itemShortName &&
                  formik?.errors?.itemShortName
                }
                clickEnter={formik?.handleSubmit}
                fullwidthState
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <DropDownField
                name={`itemType`}
                dropdownLabel={text.label.addItemMaster.itemType}
                // placeholder={text.placeholders.addItemMaster.itemType}
                color={`success`}
                option={formik?.values?.itemType}
                handleChange={formik?.handleChange}
                handleBlur={formik?.handleBlur}
                selectOption={itemCatDropDownValue}
                error={
                  formik?.touched?.itemType && Boolean(formik?.errors?.itemType)
                }
                errorText={
                  formik?.touched?.itemType && formik?.errors?.itemType
                }
                fullWidthState
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <DropDownField
                name={`unit`}
                dropdownLabel={text.label.addItemMaster.unit}
                // placeholder={text.placeholders.addItemMaster.unit}
                color={`success`}
                option={formik?.values?.unit}
                handleChange={formik?.handleChange}
                handleBlur={formik?.handleBlur}
                selectOption={unitDropDownValue}
                error={formik?.touched?.unit && Boolean(formik?.errors?.unit)}
                errorText={formik?.touched?.unit && formik?.errors?.unit}
                fullWidthState
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldInput
                placeholder={text.placeholders.addItemMaster.unitValue}
                inputLabel={text.label.addItemMaster.unitValue}
                extraCls={`w-full`}
                color={`success`}
                textinputname={`unitValue`}
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
                value={formik?.values?.unitValue}
                handleBlur={formik?.handleBlur}
                error={
                  formik?.touched?.unitValue &&
                  Boolean(formik?.errors?.unitValue)
                }
                helperText={
                  formik?.touched?.unitValue && formik?.errors?.unitValue
                }
                clickEnter={formik?.handleSubmit}
                fullwidthState
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldInput
                placeholder={text.placeholders.addItemMaster.cst}
                inputLabel={text.label.addItemMaster.cst}
                extraCls={`w-full`}
                color={`success`}
                textinputname={`cst`}
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
                value={formik?.values?.cst}
                handleBlur={formik?.handleBlur}
                error={formik?.touched?.cst && Boolean(formik?.errors?.cst)}
                helperText={formik?.touched?.cst && formik?.errors?.cst}
                clickEnter={formik?.handleSubmit}
                fullwidthState
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldInput
                placeholder={text.placeholders.addItemMaster.sgst}
                inputLabel={text.label.addItemMaster.sgst}
                extraCls={`w-full`}
                color={`success`}
                textinputname={`sgst`}
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
                value={formik?.values?.sgst}
                handleBlur={formik?.handleBlur}
                error={formik?.touched?.sgst && Boolean(formik?.errors?.sgst)}
                helperText={formik?.touched?.sgst && formik?.errors?.sgst}
                clickEnter={formik?.handleSubmit}
                fullwidthState
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldInput
                placeholder={text.placeholders.addItemMaster.igst}
                inputLabel={text.label.addItemMaster.igst}
                extraCls={`w-full`}
                color={`success`}
                textinputname={`igst`}
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
                value={formik?.values?.igst}
                handleBlur={formik?.handleBlur}
                error={formik?.touched?.igst && Boolean(formik?.errors?.igst)}
                helperText={formik?.touched?.igst && formik?.errors?.igst}
                clickEnter={formik?.handleSubmit}
                fullwidthState
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldInput
                placeholder={text.placeholders.addItemMaster.basicSaleRate}
                inputLabel={text.label.addItemMaster.basicSaleRate}
                extraCls={`w-full`}
                color={`success`}
                textinputname={`basicSaleRate`}
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
                value={formik?.values?.basicSaleRate}
                handleBlur={formik?.handleBlur}
                error={
                  formik?.touched?.basicSaleRate &&
                  Boolean(formik?.errors?.basicSaleRate)
                }
                helperText={
                  formik?.touched?.basicSaleRate &&
                  formik?.errors?.basicSaleRate
                }
                clickEnter={formik?.handleSubmit}
                fullwidthState
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldInput
                placeholder={text.placeholders.addItemMaster.rememberQnty}
                inputLabel={text.label.addItemMaster.rememberQnty}
                extraCls={`w-full`}
                color={`success`}
                textinputname={`rememberQnty`}
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
                value={formik?.values?.rememberQnty}
                handleBlur={formik?.handleBlur}
                error={
                  formik?.touched?.rememberQnty &&
                  Boolean(formik?.errors?.rememberQnty)
                }
                helperText={
                  formik?.touched?.rememberQnty && formik?.errors?.rememberQnty
                }
                clickEnter={formik?.handleSubmit}
                fullwidthState
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldInput
                placeholder={text.placeholders.addItemMaster.openingQnty}
                inputLabel={text.label.addItemMaster.openingQnty}
                extraCls={`w-full`}
                color={`success`}
                textinputname={`openingQnty`}
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
                value={formik?.values?.openingQnty}
                handleBlur={formik?.handleBlur}
                error={
                  formik?.touched?.openingQnty &&
                  Boolean(formik?.errors?.openingQnty)
                }
                helperText={
                  formik?.touched?.openingQnty && formik?.errors?.openingQnty
                }
                clickEnter={formik?.handleSubmit}
                fullwidthState
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldInput
                placeholder={text.placeholders.addItemMaster.openingRate}
                inputLabel={text.label.addItemMaster.openingRate}
                extraCls={`w-full`}
                color={`success`}
                textinputname={`openingRate`}
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
                value={formik?.values?.openingRate}
                handleBlur={formik?.handleBlur}
                error={
                  formik?.touched?.openingRate &&
                  Boolean(formik?.errors?.openingRate)
                }
                helperText={
                  formik?.touched?.openingRate && formik?.errors?.openingRate
                }
                clickEnter={formik?.handleSubmit}
                fullwidthState
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <DropDownField
                name={`saleLedger`}
                dropdownLabel={text.label.addItemMaster.saleLedger}
                // placeholder={text.placeholders.addItemMaster.unit}
                color={`success`}
                option={formik?.values?.saleLedger}
                handleChange={formik?.handleChange}
                handleBlur={formik?.handleBlur}
                selectOption={ledgerDropDownValue}
                error={
                  formik?.touched?.saleLedger &&
                  Boolean(formik?.errors?.saleLedger)
                }
                errorText={
                  formik?.touched?.saleLedger && formik?.errors?.saleLedger
                }
                fullWidthState
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <DropDownField
                name={`purchaseLedger`}
                dropdownLabel={text.label.addItemMaster.purchaseLedger}
                // placeholder={text.placeholders.addItemMaster.unit}
                color={`success`}
                option={formik?.values?.purchaseLedger}
                handleChange={formik?.handleChange}
                handleBlur={formik?.handleBlur}
                selectOption={ledgerDropDownValue}
                error={
                  formik?.touched?.purchaseLedger &&
                  Boolean(formik?.errors?.purchaseLedger)
                }
                errorText={
                  formik?.touched?.purchaseLedger &&
                  formik?.errors?.purchaseLedger
                }
                fullWidthState
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <FlexBetween className={`w-full items-center flex-row-reverse`}>
                <ButtonFieldInput
                  buttonextracls={`rounded-full bg-[#032974] text-white capitalize`}
                  variant={"contained"}
                  name={text.buttonNames.add}
                  loading={loading}
                />
                <ButtonFieldInput
                  buttonextracls={`rounded-full bg-[#BDBDBD] text-black capitalize`}
                  name={text.buttonNames.cancel}
                  variant={"contained"}
                  type={`button`}
                  handleClick={handleCloseDrawer}
                />
              </FlexBetween>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Drawer>
  );
};

export default ItemMasterFormDrawer;
