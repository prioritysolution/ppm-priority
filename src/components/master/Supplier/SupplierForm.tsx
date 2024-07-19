import { ButtonFieldInput, DropDownField, FlexBetween, FlexItemCenter, PhoneNumberInput, TextFieldInput } from '@/common'
import { KeyboardArrowLeft } from '@mui/icons-material'
import { Container, Divider, Drawer, Grid, IconButton, Typography } from '@mui/material'
import { FC } from 'react'
import text from '@/languages/en_US.json'
import { matchIsValidTel } from 'mui-tel-input'

interface SupplierFormProps {
  openSupplierDrawer: boolean
  handleCloseDrawer(): void
  formik: any
  handleSupplierMobile(numebr: string): void
  supplierMobile: string
  underLedgerOptions: any
  loading: boolean
  editData:any
}

const SupplierForm: FC<SupplierFormProps> = ({ handleCloseDrawer, openSupplierDrawer, formik, supplierMobile,
     handleSupplierMobile, underLedgerOptions, loading, editData }) => {
  const drawerWidth = 700
  return <Drawer
    open={openSupplierDrawer}
    onClose={handleCloseDrawer}
    anchor='right'
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
    }}
  >
    <FlexItemCenter className='h-[4rem] px-2' gap={3}>
      <IconButton onClick={handleCloseDrawer}>
        <KeyboardArrowLeft />
      </IconButton>
      <Typography component={`p`} className={`!font-bold text-2xl`}>
        { editData && Object.keys(editData).length> 0 ? text.edit.editSupplier : text.add.addSupplier}
      </Typography>
    </FlexItemCenter>
    <Divider />
    <Container className='py-5'>
      <form onSubmit={formik?.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TextFieldInput
              placeholder={text.placeholders.supplier.supplierName}
              extraCls={`w-full`}
              color={`success`}
              textinputname={`supplierName`}
              inputLabel={text.label.supplier.supplierName}
              onChange={formik?.handleChange}
              value={formik?.values?.supplierName}
              handleBlur={formik?.handleBlur}
              error={
                formik?.touched?.supplierName &&
                Boolean(formik?.errors?.supplierName)
              }
              helperText={
                formik?.touched?.supplierName && formik?.errors?.supplierName
              }
              clickEnter={formik?.handleSubmit}
              fullwidthState autoFocus />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextFieldInput
              placeholder={text.placeholders.supplier.supplierAddress}
              extraCls={`w-full`}
              color={`success`}
              textinputname={`supplierAddress`}
              inputLabel={text.label.supplier.supplierAddress}
              onChange={formik?.handleChange}
              value={formik?.values?.supplierAddress}
              handleBlur={formik?.handleBlur}
              error={
                formik?.touched?.supplierAddress &&
                Boolean(formik?.errors?.supplierAddress)
              }
              helperText={
                formik?.touched?.supplierAddress && formik?.errors?.supplierAddress
              }
              clickEnter={formik?.handleSubmit}
              fullwidthState />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <PhoneNumberInput
              handleChange={handleSupplierMobile}
              phoneNo={supplierMobile}
              label={text.label.supplier.mobile}
              placeholder={text.placeholders.supplier.mobile}
              errorText={!matchIsValidTel(supplierMobile) ? text.errors.patternErrors.supplier.mobileNo : ''}
              handleBlur={()=>{ 
                !matchIsValidTel(supplierMobile)
              }}
              error={!matchIsValidTel(supplierMobile)}
              defaultCountry='IN'
              color='success'
              fullwidthState
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextFieldInput
              inputLabel={text.label.supplier.supplierEmail}
              placeholder={text.placeholders.supplier.supplierEmail}
              extraCls={`w-full`}
              color={`success`}
              textinputname={`supplierEmail`}
              onChange={formik?.handleChange}
              value={formik?.values?.supplierEmail}
              handleBlur={formik?.handleBlur}
              error={
                formik?.touched?.supplierEmail &&
                Boolean(formik?.errors?.supplierEmail)
              }
              helperText={
                formik?.touched?.supplierEmail && formik?.errors?.supplierEmail
              }
              clickEnter={formik?.handleSubmit}
              fullwidthState />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextFieldInput
              inputLabel={text.label.supplier.gstin}
              placeholder={text.placeholders.supplier.gstin}
              extraCls={`w-full`}
              color={`success`}
              textinputname={`gstin`}
              onChange={formik?.handleChange}
              value={formik?.values?.gstin}
              handleBlur={formik?.handleBlur}
              error={
                formik?.touched?.gstin &&
                Boolean(formik?.errors?.gstin)
              }
              helperText={
                formik?.touched?.gstin && formik?.errors?.gstin
              }
              clickEnter={formik?.handleSubmit}
              fullwidthState />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextFieldInput
              inputLabel={text.label.supplier.maxCredDays}
              placeholder={text.placeholders.supplier.maxCredDays}
              extraCls={`w-full`}
              color={`success`}
              textinputname={`maxCredDays`}
              type={'number'}
              sx={{
                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                  display: "none",
                },
                "& input[type=number]": {
                  MozAppearance: "textfield",
                },
              }}
              onChange={formik?.handleChange}
              value={formik?.values?.maxCredDays}
              handleBlur={formik?.handleBlur}
              error={
                formik?.touched?.maxCredDays &&
                Boolean(formik?.errors?.maxCredDays)
              }
              helperText={
                formik?.touched?.maxCredDays && formik?.errors?.maxCredDays
              }
              clickEnter={formik?.handleSubmit}
              fullwidthState />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TextFieldInput
              inputLabel={text.label.supplier.openingBalance}
              placeholder={text.placeholders.supplier.openingBalance}
              extraCls={`w-full`}
              color={`success`}
              textinputname={`openingBalance`}
              type={'number'}
              sx={{
                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                  display: "none",
                },
                "& input[type=number]": {
                  MozAppearance: "textfield",
                },
              }}
              onChange={formik?.handleChange}
              value={formik?.values?.openingBalance}
              handleBlur={formik?.handleBlur}
              error={
                formik?.touched?.openingBalance &&
                Boolean(formik?.errors?.openingBalance)
              }
              helperText={
                formik?.touched?.openingBalance && formik?.errors?.openingBalance
              }
              clickEnter={formik?.handleSubmit}
              fullwidthState />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <DropDownField
              name={`underLedger`}
              dropdownLabel={text.label.supplier.underLedger}
              // placeholder={text.placeholders.addItemMaster.unit}
              color={`success`}
              option={formik?.values?.underLedger}
              handleChange={formik?.handleChange}
              handleBlur={formik?.handleBlur}
              selectOption={underLedgerOptions}
              error={
                formik?.touched?.underLedger &&
                Boolean(formik?.errors?.underLedger)
              }
              errorText={
                formik?.touched?.underLedger && formik?.errors?.underLedger
              }
              fullWidthState
            />
          </Grid>
        </Grid>
      <FlexItemCenter className='w-full h-[5rem]'>
        <FlexBetween className='flex-row-reverse w-full'>
          <ButtonFieldInput
            name={editData && Object.keys(editData).length> 0 ? text.buttonNames.update : text.buttonNames.add}
            buttonextracls={`rounded-full bg-blue-500 capitalize`}
            variant={`contained`}
            handleClick={matchIsValidTel(supplierMobile) ? formik?.handleSubmit : ()=>{}}
             loading={loading}
            disabled={loading}
          />
          <ButtonFieldInput name={text.buttonNames.cancel}
            buttonextracls={`rounded-full bg-gray-400 capitalize`}
            variant={`contained`} type={`button`} handleClick={handleCloseDrawer} />
        </FlexBetween>
      </FlexItemCenter>
    </form>
  </Container>
  </Drawer >
}

export default SupplierForm