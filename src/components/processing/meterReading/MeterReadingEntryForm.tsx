import { ButtonFieldInput, FlexBox, TextFieldInput } from '@/common'
import { Grid } from '@mui/material'
import { FC } from 'react'
import text from '@/languages/en_US.json'

interface MeterReadingEntryFormProps {
    formik: any
}

const MeterReadingEntryForm: FC<MeterReadingEntryFormProps> = ({ formik }) => {
    return <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} flexWrap={'wrap'} rowGap={2}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextFieldInput
                    placeholder={text.placeholders.meterReading.itemName}
                    inputLabel={text.label.meterReading.itemName}
                    extraCls={`w-full`}
                    color={`success`}
                    textinputname={`itemName`}
                    onChange={formik?.handleChange}
                    value={formik?.values?.itemName}
                    handleBlur={formik?.handleBlur}
                    error={
                        formik?.touched?.itemName &&
                        Boolean(formik?.errors?.itemName)
                    }
                    helperText={
                        formik?.touched?.itemName && formik?.errors?.itemName
                    }
                    clickEnter={formik?.handleSubmit}
                    fullwidthState disabled/>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextFieldInput
                    placeholder={text.placeholders.meterReading.openingReading}
                    inputLabel={text.label.meterReading.openingReading}
                    extraCls={`w-full`}
                    color={`success`}
                    textinputname={`openingReading`}
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
                    value={formik?.values?.openingReading}
                    handleBlur={formik?.handleBlur}
                    error={
                        formik?.touched?.openingReading &&
                        Boolean(formik?.errors?.openingReading)
                    }
                    helperText={
                        formik?.touched?.openingReading && formik?.errors?.openingReading
                    }
                    clickEnter={formik?.handleSubmit}
                    fullwidthState disabled/>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextFieldInput
                    placeholder={text.placeholders.meterReading.closingReading}
                    inputLabel={text.label.meterReading.closingReading}
                    extraCls={`w-full`}
                    color={`success`}
                    textinputname={`closingReading`}
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
                    value={formik?.values?.closingReading}
                    handleBlur={formik?.handleBlur}
                    error={
                        formik?.touched?.closingReading &&
                        Boolean(formik?.errors?.closingReading)
                    }
                    helperText={
                        formik?.touched?.closingReading && formik?.errors?.closingReading
                    }
                    clickEnter={formik?.handleSubmit}
                    fullwidthState />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextFieldInput
                    placeholder={text.placeholders.meterReading.testingNumber}
                    inputLabel={text.label.meterReading.testingNumber}
                    extraCls={`w-full`}
                    color={`success`}
                    textinputname={`testing`}
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
                    value={formik?.values?.testing}
                    handleBlur={formik?.handleBlur}
                    error={
                        formik?.touched?.testing &&
                        Boolean(formik?.errors?.testing)
                    }
                    helperText={
                        formik?.touched?.testing && formik?.errors?.testing
                    }
                    clickEnter={formik?.handleSubmit}
                    fullwidthState />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextFieldInput
                    placeholder={text.placeholders.meterReading.creditQuantity}
                    inputLabel={text.label.meterReading.creditQuantity}
                    extraCls={`w-full`}
                    color={`success`}
                    textinputname={`creditQuantity`}
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
                    value={formik?.values?.creditQuantity}
                    handleBlur={formik?.handleBlur}
                    error={
                        formik?.touched?.creditQuantity &&
                        Boolean(formik?.errors?.creditQuantity)
                    }
                    helperText={
                        formik?.touched?.creditQuantity && formik?.errors?.creditQuantity
                    }
                    clickEnter={formik?.handleSubmit}
                    fullwidthState />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextFieldInput
                    placeholder={text.placeholders.meterReading.itemRate}
                    inputLabel={text.label.meterReading.itemRate}
                    extraCls={`w-full`}
                    color={`success`}
                    textinputname={`itemRate`}
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
                    value={formik?.values?.itemRate}
                    handleBlur={formik?.handleBlur}
                    error={
                        formik?.touched?.itemRate &&
                        Boolean(formik?.errors?.itemRate)
                    }
                    helperText={
                        formik?.touched?.itemRate && formik?.errors?.itemRate
                    }
                    clickEnter={formik?.handleSubmit}
                    fullwidthState disabled/>
            </Grid>
            <FlexBox className='w-full justify-end'>
                <ButtonFieldInput buttonextracls={`rounded-full bg-[#032974] text-white capitalize`}
                    variant={'contained'}
                    name={text.buttonNames.add}
                />
            </FlexBox>
        </Grid>
    </form>
}

export default MeterReadingEntryForm