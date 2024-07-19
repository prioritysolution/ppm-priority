import { ButtonFieldInput, FlexBetween, FlexItemCenter, TextFieldInput } from '@/common'
import { FC } from 'react'
import text from '@/languages/en_US.json'
import { Box, Divider, Grid } from '@mui/material'
import dynamic from 'next/dynamic'
const DynamicTypography = dynamic(() => import('@mui/material/Typography'), {
    ssr: false
})

interface PumpMasterFormProps {
    formik: any
}

const PumpMasterForm: FC<PumpMasterFormProps> = ({ formik }) => {
    return <form onSubmit={formik?.handleSubmit}>
        <FlexItemCenter className='h-[3rem]'>
            <p className='font-bold text-black text-lg px-5'>
                {text.add.addPump}
            </p>
        </FlexItemCenter>
        <Divider className='w-full m-0'/>
        <Grid container spacing={1} className='p-5'>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextFieldInput
                    placeholder={text.placeholders.addPumpMaster.pumpName}
                    extraCls={`w-full`}
                    color={`success`}
                    textinputname={`pumpName`}
                    inputLabel={text.label.addPumpMaster.pumpName}
                    onChange={formik?.handleChange}
                    value={formik?.values?.pumpName}
                    handleBlur={formik?.handleBlur}
                    error={
                        formik?.touched?.pumpName &&
                        Boolean(formik?.errors?.pumpName)
                    }
                    helperText={
                        formik?.touched?.pumpName && formik?.errors?.pumpName
                    }
                    clickEnter={formik?.handleSubmit}
                    fullwidthState autoFocus />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextFieldInput
                    placeholder={text.placeholders.addPumpMaster.nozzleNumber}
                    extraCls={`w-full`}
                    color={`success`}
                    textinputname={`nozzleNumber`}
                    sx={{
                        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                            display: "none",
                        },
                        "& input[type=number]": {
                            MozAppearance: "textfield",
                        },
                    }}
                    inputLabel={text.label.addPumpMaster.nozzleNumber}
                    onChange={formik?.handleChange}
                    value={formik?.values?.nozzleNumber}
                    handleBlur={formik?.handleBlur}
                    error={
                        formik?.touched?.nozzleNumber &&
                        Boolean(formik?.errors?.nozzleNumber)
                    }
                    helperText={
                        formik?.touched?.nozzleNumber && formik?.errors?.nozzleNumber
                    }
                    clickEnter={formik?.handleSubmit}
                    fullwidthState />
            </Grid>
        </Grid>
        {/* <TextFieldInput
            placeholder={text.placeholders.addPumpMaster.nozzleName}
            extraCls={`w-full`}
            color={`success`}
            textinputname={`nozzleName`}
            inputLabel={text.label.addPumpMaster.nozzleName}
            onChange={formik?.handleChange}
            value={formik?.values?.nozzleName}
            handleBlur={formik?.handleBlur}
            error={
                formik?.touched?.nozzleName &&
                Boolean(formik?.errors?.nozzleName)
            }
            helperText={
                formik?.touched?.nozzleName && formik?.errors?.nozzleName
            }
            clickEnter={formik?.handleSubmit}
            fullwidthState autoFocus /> */}
        <FlexItemCenter className='w-full mt-2 p-5'>
            <FlexBetween className='flex-row-reverse w-full'>
                <ButtonFieldInput name={text.buttonNames.add}
                    buttonextracls={`rounded-full bg-blue-500  capitalize`}
                    variant={`contained`} />
                <ButtonFieldInput name={text.buttonNames.cancel}
                    buttonextracls={`rounded-full bg-gray-400 capitalize`}
                    variant={`contained`} type={`button`} />
            </FlexBetween>
        </FlexItemCenter>
    </form>
}

export default PumpMasterForm