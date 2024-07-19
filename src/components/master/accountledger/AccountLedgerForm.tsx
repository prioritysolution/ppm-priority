import { ButtonFieldInput, DatePickerField, DropDownField, FlexBetween, FlexItemCenter, TextFieldInput } from '@/common'
import { KeyboardArrowLeft } from '@mui/icons-material'
import { Container, Divider, Drawer, Grid, IconButton, Typography } from '@mui/material'
import { FC } from 'react'
import text from '@/languages/en_US.json'
import { Dayjs } from 'dayjs'

interface AccountLedgerFormProps {
  handleCloseDrawer(): void
  openForm: boolean
  formik: any
  handleDateChange(): void
  date: Dayjs | null
  handleError(): void
  errMessage: string
  accountHeadDropdownValue: any
  postLoaders: boolean
  editData: any
}

const AccountLedgerForm: FC<AccountLedgerFormProps> = ({ formik, handleCloseDrawer, openForm,
  date, errMessage, handleDateChange, handleError, accountHeadDropdownValue, postLoaders, editData }) => {

  const drawerWidth = 700
  // const unit = [
  //   {
  //     name: 'data',
  //     value: 'data'
  //   }
  // ]

  // useEffect(() => {
  //   console.log(date, '* date')
  //   console.log(errMessage, '* errMsg')
  // }, [date, errMessage])
  return <Drawer
    anchor={`right`}
    open={openForm}
    onClose={handleCloseDrawer}
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
        {editData && Object.keys(editData).length > 0 ? text.edit.editAccountLedger : text.add.accountLedger}
      </Typography>
    </FlexItemCenter>
    <Divider />
    <Container className='py-10'>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TextFieldInput
              placeholder={text.placeholders.accountLedger.ledgerName}
              extraCls={`w-full`}
              color={`success`}
              textinputname={`ledgerName`}
              inputLabel={text.label.accountLedger.ledgerName}
              onChange={formik?.handleChange}
              value={formik?.values?.ledgerName}
              handleBlur={formik?.handleBlur}
              error={
                formik?.touched?.ledgerName &&
                Boolean(formik?.errors?.ledgerName)
              }
              helperText={
                formik?.touched?.ledgerName && formik?.errors?.ledgerName
              }
              clickEnter={formik?.handleSubmit}
              fullwidthState autoFocus />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TextFieldInput
              placeholder={text.placeholders.accountLedger.ledgerCode}
              inputLabel={text.label.accountLedger.ledgerCode}
              extraCls={`w-full`}
              color={`success`}
              textinputname={`ledgerCode`}
              type={`number`}
              sx={{
                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                  display: "none",
                },
                "& input[type=number]": {
                  MozAppearance: "textfield",
                },
              }}
              onChange={formik?.handleChange}
              value={formik?.values?.ledgerCode}
              handleBlur={formik?.handleBlur}
              error={
                formik?.touched?.ledgerCode &&
                Boolean(formik?.errors?.ledgerCode)
              }
              helperText={
                formik?.touched?.ledgerCode && formik?.errors?.ledgerCode
              }
              clickEnter={formik?.handleSubmit}
              fullwidthState />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <DropDownField
              name={`accountHead`}
              dropdownLabel={text.label.accountLedger.accountHead}
              // placeholder={text.placeholders.accountLedger.accountHead}
              color={`success`}
              option={formik?.values?.accountHead}
              handleChange={formik?.handleChange}
              handleBlur={formik?.handleBlur}
              selectOption={accountHeadDropdownValue}
              error={
                formik?.touched?.accountHead &&
                Boolean(formik?.errors?.accountHead)
              }
              errorText={
                formik?.touched?.accountHead && formik?.errors?.accountHead
              }
              fullWidthState
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextFieldInput
              placeholder={text.placeholders.accountLedger.openingBalance}
              inputLabel={text.label.accountLedger.openingBalance}
              extraCls={`w-full`}
              color={`success`}
              textinputname={`openingBalance`}
              type={`number`}
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
            <DatePickerField
              label={text.label.accountLedger.openingDate}
              handleChange={handleDateChange}
              date={date}
              handleError={handleError}
              errorMessage={errMessage}
              extraCls={`w-full`}
              handleBlur={handleError}
              color={errMessage ? 'error' : 'success'}
              format='DD-MM-YYYY'
              clearable
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <FlexBetween className={`w-full items-center flex-row-reverse`}>
              <ButtonFieldInput buttonextracls={`rounded-full bg-[#032974] text-white capitalize`}
                variant={'contained'}
                name={editData && Object.keys(editData).length > 0 ? text.buttonNames.update : text.buttonNames.add}
                handleClick={date === null ? handleError : formik?.handleSubmit}
              loading={postLoaders}
              disabled={postLoaders}
              />
              <ButtonFieldInput buttonextracls={`rounded-full bg-[#BDBDBD] text-black capitalize`}
                name={text.buttonNames.cancel} variant={'contained'} type={`button`}
                handleClick={handleCloseDrawer} />
            </FlexBetween>
          </Grid>
        </Grid>
      </form>
    </Container>
  </Drawer>
}

export default AccountLedgerForm