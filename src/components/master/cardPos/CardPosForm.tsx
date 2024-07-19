import { ButtonFieldInput, DatePickerField, DropDownField, FlexBetween, FlexItemCenter, RadioGroupField, TextFieldInput } from '@/common'
import { KeyboardArrowLeft } from '@mui/icons-material'
import { Container, Divider, Drawer, Grid, IconButton, Typography } from '@mui/material'
import { FC } from 'react'
import text from '@/languages/en_US.json'
import { Dayjs } from 'dayjs'

interface CardPosFormProps {
    openForm: boolean
    handleCloseDrawer(): void
    formik: any
    handleDateChange(): void
    date: Dayjs | null
    handleError(): void
    errMessage: string
    handlePosType(event?: React.ChangeEvent<HTMLInputElement>): void
    posType: string
    postLoaders?: boolean
    bankData: any
    editData: any
}

const CardPosForm: FC<CardPosFormProps> = ({ formik, handleCloseDrawer, openForm, date, editData,
    errMessage, handleDateChange, handleError, handlePosType, posType, postLoaders, bankData }) => {

    const drawerWidth = 700

    const radioData = [
        {
            value: "1",
            label: 'Card'
        },
        {
            value: "2",
            label: 'QR'
        }
    ]

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
                {
                      editData && Object.keys(editData).length > 0 ? text.edit.editcardPos :
                    text.add.addCardPos}
            </Typography>
        </FlexItemCenter>
        <Divider />
        <Container className='py-10'>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <TextFieldInput
                            placeholder={text.placeholders.cardPos.posName}
                            extraCls={`w-full`}
                            color={`success`}
                            textinputname={`posName`}
                            inputLabel={text.label.cardPos.posName}
                            onChange={formik?.handleChange}
                            value={formik?.values?.posName}
                            handleBlur={formik?.handleBlur}
                            error={
                                formik?.touched?.posName &&
                                Boolean(formik?.errors?.posName)
                            }
                            helperText={
                                formik?.touched?.posName && formik?.errors?.posName
                            }
                            clickEnter={formik?.handleSubmit}
                            fullwidthState autoFocus />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <TextFieldInput
                            placeholder={text.placeholders.cardPos.posProvider}
                            inputLabel={text.label.cardPos.posProvider}
                            extraCls={`w-full`}
                            color={`success`}
                            textinputname={`posProvider`}
                            onChange={formik?.handleChange}
                            value={formik?.values?.posProvider}
                            handleBlur={formik?.handleBlur}
                            error={
                                formik?.touched?.posProvider &&
                                Boolean(formik?.errors?.posProvider)
                            }
                            helperText={
                                formik?.touched?.posProvider && formik?.errors?.posProvider
                            }
                            clickEnter={formik?.handleSubmit}
                            fullwidthState />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <RadioGroupField handleChange={handlePosType}
                            radioData={radioData}
                            value={posType} label={text.label.cardPos.posType}
                            color='success'
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <DropDownField
                            name={`linkBank`}
                            dropdownLabel={text.label.cardPos.linkBank}
                            // placeholder={text.placeholders.cardPos.linkBank}
                            color={`success`}
                            option={formik?.values?.linkBank}
                            handleChange={formik?.handleChange}
                            handleBlur={formik?.handleBlur}
                            selectOption={bankData}
                            error={
                                formik?.touched?.linkBank &&
                                Boolean(formik?.errors?.linkBank)
                            }
                            errorText={
                                formik?.touched?.linkBank && formik?.errors?.linkBank
                            }
                            fullWidthState
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <DatePickerField
                            label={text.label.cardPos.installationData}
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
                                name={
                                    editData && Object.keys(editData).length > 0 ? text.buttonNames.update :
                                    text.buttonNames.add}
                                handleClick={
                                    date === null ? handleError :
                                        formik?.handleSubmit}
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

export default CardPosForm