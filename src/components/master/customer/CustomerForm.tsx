import { ButtonFieldInput, DropDownField, FlexBetween, FlexItemCenter, PhoneNumberInput, TextFieldInput } from '@/common'
import { KeyboardArrowLeft } from '@mui/icons-material'
import { Container, Divider, Drawer, Grid, IconButton, Typography } from '@mui/material'
import { FC } from 'react'
import text from '@/languages/en_US.json'
import { matchIsValidTel } from 'mui-tel-input'

interface CustomerFormProps {
  openCustomerDrawer: boolean
  handleCloseDrawer(): void
  formik: any
  handleCustomerMobile(numebr: string): void
  customerMobile: string
  underLedgerOptions: any
  loading: boolean
  editData: any
}

const CustomerForm: FC<CustomerFormProps> = ({ handleCloseDrawer, openCustomerDrawer, formik, 
  customerMobile, handleCustomerMobile, underLedgerOptions, loading, editData }) => {
  const drawerWidth = 700
  return <Drawer
    open={openCustomerDrawer}
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
        {  editData && Object.keys(editData).length > 0 ? text.edit.editCustomer :
        text.add.addCustomer}
      </Typography>
    </FlexItemCenter>
    <Divider />
    <Container className='py-5'>
      <form onSubmit={formik?.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TextFieldInput
              placeholder={text.placeholders.customer.customerName}
              extraCls={`w-full`}
              color={`success`}
              textinputname={`customerName`}
              inputLabel={text.label.customer.customerName}
              onChange={formik?.handleChange}
              value={formik?.values?.customerName}
              handleBlur={formik?.handleBlur}
              error={
                formik?.touched?.customerName &&
                Boolean(formik?.errors?.customerName)
              }
              helperText={
                formik?.touched?.customerName && formik?.errors?.customerName
              }
              clickEnter={formik?.handleSubmit}
              fullwidthState autoFocus />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextFieldInput
              placeholder={text.placeholders.customer.customerAddress}
              extraCls={`w-full`}
              color={`success`}
              textinputname={`customerAddress`}
              inputLabel={text.label.customer.customerAddress}
              onChange={formik?.handleChange}
              value={formik?.values?.customerAddress}
              handleBlur={formik?.handleBlur}
              error={
                formik?.touched?.customerAddress &&
                Boolean(formik?.errors?.customerAddress)
              }
              helperText={
                formik?.touched?.customerAddress && formik?.errors?.customerAddress
              }
              clickEnter={formik?.handleSubmit}
              fullwidthState />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <PhoneNumberInput
              handleChange={handleCustomerMobile}
              phoneNo={customerMobile}
              label={text.label.customer.mobile}
              placeholder={text.placeholders.customer.mobile}
              errorText={!matchIsValidTel(customerMobile) ? text.errors.patternErrors.customer.mobileNo : ''}
              handleBlur={()=>{ 
                !matchIsValidTel(customerMobile)
              }}
              error={!matchIsValidTel(customerMobile)}
              defaultCountry='IN'
              color='success'
              fullwidthState
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextFieldInput
              inputLabel={text.label.customer.customerEmail}
              placeholder={text.placeholders.customer.customerEmail}
              extraCls={`w-full`}
              color={`success`}
              textinputname={`customerEmail`}
              onChange={formik?.handleChange}
              value={formik?.values?.customerEmail}
              handleBlur={formik?.handleBlur}
              error={
                formik?.touched?.customerEmail &&
                Boolean(formik?.errors?.customerEmail)
              }
              helperText={
                formik?.touched?.customerEmail && formik?.errors?.customerEmail
              }
              clickEnter={formik?.handleSubmit}
              fullwidthState />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextFieldInput
              inputLabel={text.label.customer.gstin}
              placeholder={text.placeholders.customer.gstin}
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
              inputLabel={text.label.customer.maxCredLimit}
              placeholder={text.placeholders.customer.maxCredLimit}
              extraCls={`w-full`}
              color={`success`}
              textinputname={`maxCredLimit`}
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
              value={formik?.values?.maxCredLimit}
              handleBlur={formik?.handleBlur}
              error={
                formik?.touched?.maxCredLimit &&
                Boolean(formik?.errors?.maxCredLimit)
              }
              helperText={
                formik?.touched?.maxCredLimit && formik?.errors?.maxCredLimit
              }
              clickEnter={formik?.handleSubmit}
              fullwidthState />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextFieldInput
              inputLabel={text.label.customer.maxCredDays}
              placeholder={text.placeholders.customer.maxCredDays}
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
              inputLabel={text.label.customer.openingBalance}
              placeholder={text.placeholders.customer.openingBalance}
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
              dropdownLabel={text.label.customer.underLedger}
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
            name={ editData && Object.keys(editData).length > 0 ? text.buttonNames.update : text.buttonNames.add}
            buttonextracls={`rounded-full bg-blue-500 capitalize`}
            variant={`contained`}
            handleClick={matchIsValidTel(customerMobile) ? formik?.handleSubmit : ()=>{}}
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

export default CustomerForm