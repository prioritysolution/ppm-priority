import { ButtonFieldInput, DatePickerField, DropDownField, FlexBetween, FlexItemCenter, TextFieldInput } from '@/common'
import { KeyboardArrowLeft } from '@mui/icons-material'
import { Container, Divider, Drawer, Grid, IconButton, Typography } from '@mui/material'
import { Dayjs } from 'dayjs'
import { FC } from 'react'
import text from '@/languages/en_US.json'

interface BankAccountFormProps {
    openBankAccountDrawer: boolean
    handleCloseBankAccountDrawer(): void
    handleOpeningDate(): void
    openingDate: Dayjs | null
    handleOpeningDateError(): void
    errorMessage: string
    formik: any
    loading: boolean
    underLedgerDropDownValue: any
    editData: any
}

const BankAccountForm: FC<BankAccountFormProps> = ({ errorMessage, handleCloseBankAccountDrawer, editData,
    handleOpeningDate, handleOpeningDateError, openBankAccountDrawer, openingDate, formik, loading, underLedgerDropDownValue
}) => {

    const drawerWidth = 700
    return <Drawer
        anchor={`right`}
        open={openBankAccountDrawer}
        onClose={handleCloseBankAccountDrawer}
        sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
    >
        <FlexItemCenter className='h-[4rem] px-2' gap={3}>
            <IconButton onClick={handleCloseBankAccountDrawer}>
                <KeyboardArrowLeft />
            </IconButton>
            <Typography component={`p`} className={`!font-bold text-2xl`}>
                {editData && Object.keys(editData).length > 0 ? text.edit.editBankAccount : text.add.addBankAccount}
            </Typography>
        </FlexItemCenter>
        <Divider />
        <Container className='py-10'>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <TextFieldInput
                            placeholder={text.placeholders.addBankAccount.bankName}
                            extraCls={`w-full`}
                            color={`success`}
                            textinputname={`bankName`}
                            inputLabel={text.label.addBankAccount.bankName}
                            onChange={formik?.handleChange}
                            value={formik?.values?.bankName}
                            handleBlur={formik?.handleBlur}
                            error={
                                formik?.touched?.bankName &&
                                Boolean(formik?.errors?.bankName)
                            }
                            helperText={
                                formik?.touched?.bankName && formik?.errors?.bankName
                            }
                            clickEnter={formik?.handleSubmit}
                            fullwidthState autoFocus />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <TextFieldInput
                            placeholder={text.placeholders.addBankAccount.bankBranch}
                            inputLabel={text.label.addBankAccount.bankBranch}
                            extraCls={`w-full`}
                            color={`success`}
                            textinputname={`bankBranch`}
                            onChange={formik?.handleChange}
                            value={formik?.values?.bankBranch}
                            handleBlur={formik?.handleBlur}
                            error={
                                formik?.touched?.bankBranch &&
                                Boolean(formik?.errors?.bankBranch)
                            }
                            helperText={
                                formik?.touched?.bankBranch && formik?.errors?.bankBranch
                            }
                            clickEnter={formik?.handleSubmit}
                            fullwidthState />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <TextFieldInput
                            placeholder={text.placeholders.addBankAccount.bankIfsc}
                            inputLabel={text.label.addBankAccount.bankIfsc}
                            extraCls={`w-full`}
                            color={`success`}
                            textinputname={`bankIfsc`}
                            onChange={formik?.handleChange}
                            value={formik?.values?.bankIfsc}
                            handleBlur={formik?.handleBlur}
                            error={
                                formik?.touched?.bankIfsc &&
                                Boolean(formik?.errors?.bankIfsc)
                            }
                            helperText={
                                formik?.touched?.bankIfsc && formik?.errors?.bankIfsc
                            }
                            clickEnter={formik?.handleSubmit}
                            fullwidthState />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <TextFieldInput
                            placeholder={text.placeholders.addBankAccount.accountNo}
                            inputLabel={text.label.addBankAccount.accountNo}
                            extraCls={`w-full`}
                            color={`success`}
                            textinputname={`accountNo`}
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
                            value={formik?.values?.accountNo}
                            handleBlur={formik?.handleBlur}
                            error={
                                formik?.touched?.accountNo &&
                                Boolean(formik?.errors?.accountNo)
                            }
                            helperText={
                                formik?.touched?.accountNo && formik?.errors?.accountNo
                            }
                            clickEnter={formik?.handleSubmit}
                            fullwidthState />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <DropDownField
                            name={`underLedger`}
                            dropdownLabel={text.label.addBankAccount.underLedger}
                            // placeholder={text.placeholders.addBankAccount.underLedger}
                            color={`success`}
                            option={formik?.values?.underLedger}
                            handleChange={formik?.handleChange}
                            handleBlur={formik?.handleBlur}
                            selectOption={underLedgerDropDownValue}
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

                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <TextFieldInput
                            placeholder={text.placeholders.addBankAccount.openingBalance}
                            inputLabel={text.label.addBankAccount.openingBalance}
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
                            handleChange={handleOpeningDate}
                            date={openingDate}
                            handleError={handleOpeningDateError}
                            errorMessage={errorMessage}
                            extraCls={`w-full`}
                            handleBlur={handleOpeningDateError}
                            color={errorMessage ? 'error' : 'success'}
                            format='DD-MM-YYYY'
                            clearable
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <FlexBetween className={`w-full items-center flex-row-reverse`}>
                            <ButtonFieldInput buttonextracls={`rounded-full bg-[#032974] text-white capitalize`}
                                variant={'contained'}
                                handleClick={openingDate === null ? handleOpeningDateError : formik?.handleSubmit}
                                name={editData && Object.keys(editData).length > 0 ?
                                    text.buttonNames.update :
                                    text.buttonNames.add}
                                loading={loading}
                                disabled={loading}
                            />
                            <ButtonFieldInput buttonextracls={`rounded-full bg-[#BDBDBD] text-black capitalize`}
                                name={text.buttonNames.cancel} variant={'contained'} type={`button`}
                                handleClick={handleCloseBankAccountDrawer} />
                        </FlexBetween>
                    </Grid>
                </Grid>
            </form>
        </Container>
    </Drawer>
}

export default BankAccountForm