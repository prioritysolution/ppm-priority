import { ButtonFieldInput, FlexBetween, FlexItemCenter, TextFieldInput } from '@/common'
import { Divider, Grid } from '@mui/material'
import { FC } from 'react'
import text from '@/languages/en_US.json'

interface TankerFormProps {
    formik: any
    postLoaders?: boolean
    handleResetForm(): void
}

const TankerForm: FC<TankerFormProps> = ({ formik, postLoaders, handleResetForm }) => {
    return <form onSubmit={formik?.handleSubmit}>
        <FlexItemCenter className='h-[3rem]'>
            <p className='font-bold text-black text-lg px-5'>
                {text.add.addTanker}
            </p>
        </FlexItemCenter>
        <Divider className='w-full m-0' />
        <Grid container spacing={1} className='p-5'>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextFieldInput
                    placeholder={text.placeholders.tanker.tankerName}
                    extraCls={`w-full`}
                    color={`success`}
                    textinputname={`tankerName`}
                    inputLabel={text.label.tanker.tankerName}
                    onChange={formik?.handleChange}
                    value={formik?.values?.tankerName}
                    handleBlur={formik?.handleBlur}
                    error={
                        formik?.touched?.tankerName &&
                        Boolean(formik?.errors?.tankerName)
                    }
                    helperText={
                        formik?.touched?.tankerName && formik?.errors?.tankerName
                    }
                    clickEnter={formik?.handleSubmit}
                    fullwidthState autoFocus />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextFieldInput
                    placeholder={text.placeholders.tanker.vehicleName}
                    extraCls={`w-full`}
                    color={`success`}
                    textinputname={`vehicleName`}
                    inputLabel={text.label.tanker.vehicleName}
                    onChange={formik?.handleChange}
                    value={formik?.values?.vehicleName}
                    handleBlur={formik?.handleBlur}
                    error={
                        formik?.touched?.vehicleName &&
                        Boolean(formik?.errors?.vehicleName)
                    }
                    helperText={
                        formik?.touched?.vehicleName && formik?.errors?.vehicleName
                    }
                    clickEnter={formik?.handleSubmit}
                    fullwidthState />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextFieldInput
                    placeholder={text.placeholders.tanker.vehicleNumber}
                    extraCls={`w-full`}
                    color={`success`}
                    textinputname={`vehicleNumber`}
                    inputLabel={text.label.tanker.vehicleNumber}
                    onChange={formik?.handleChange}
                    value={formik?.values?.vehicleNumber}
                    handleBlur={formik?.handleBlur}
                    error={
                        formik?.touched?.vehicleNumber &&
                        Boolean(formik?.errors?.vehicleNumber)
                    }
                    helperText={
                        formik?.touched?.vehicleNumber && formik?.errors?.vehicleNumber
                    }
                    clickEnter={formik?.handleSubmit}
                    fullwidthState />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextFieldInput
                    placeholder={text.placeholders.tanker.capacity}
                    extraCls={`w-full`}
                    color={`success`}
                    textinputname={`capacity`}
                    inputLabel={text.label.tanker.capacity}
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
                    value={formik?.values?.capacity}
                    handleBlur={formik?.handleBlur}
                    error={
                        formik?.touched?.capacity &&
                        Boolean(formik?.errors?.capacity)
                    }
                    helperText={
                        formik?.touched?.capacity && formik?.errors?.capacity
                    }
                    clickEnter={formik?.handleSubmit}
                    fullwidthState />
            </Grid>
        </Grid>
        <FlexItemCenter className='w-full mt-2 p-5'>
            <FlexBetween className='flex-row-reverse w-full'>
                <ButtonFieldInput name={text.buttonNames.add}
                    buttonextracls={`rounded-full bg-blue-500  capitalize`}
                    variant={`contained`}
                    loading={postLoaders}
                    disabled={postLoaders}
                />
                <ButtonFieldInput name={text.buttonNames.cancel}
                    buttonextracls={`rounded-full bg-gray-400 capitalize`}
                    variant={`contained`} type={`button`} 
                    handleClick={handleResetForm} 
                    />
            </FlexBetween>
        </FlexItemCenter>
    </form>
}

export default TankerForm