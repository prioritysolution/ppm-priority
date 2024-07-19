import { ButtonFieldInput, FlexBox, FlexCenter, FlexItemCenter, TextFieldInput } from '@/common'
import { Box, Card, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import { FC } from 'react'
import text from '@/languages/en_US.json'
import { forgetPasswordImages, logo } from '@/Images'
import OtpFieldInput from '@/common/FormFields/OtpFieldInput'

interface ForgetPassword {
    formik: any
    showOtpField: boolean
    onOtpSubmit(otp: string): void
    loading?: boolean
}

const ForgetPassword: FC<ForgetPassword> = ({ formik, showOtpField , loading, onOtpSubmit }) => {
    return <Box>
        <Grid container spacing={5}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} className='h-screen'>
                <FlexItemCenter gap={2} className='p-5'>
                    <Box className={`!w-16`}>
                        <Image src={logo} alt={'PPM'} />
                    </Box>
                    <Typography component={'h4'} className='!text-md md:!text-xl font-bold'>
                        {text.companyDetails.companyName}
                    </Typography>
                </FlexItemCenter>
                <FlexCenter className='h-1/2 w-full'>
                    <Box className={'space-y-5'}>
                        <Typography component={'p'} className='text-4xl font-extrabold text-center'>
                            {text.forgotPassword.title}
                        </Typography>
                        <Typography component={'p'} className='text-sm font-semibold text-center'>
                            {!showOtpField ? text.forgotPassword.desc : text.forgotPassword.otpDesc}
                        </Typography>
                        {!showOtpField ? <form onSubmit={formik?.handleSubmit} className='space-y-5'>
                            <TextFieldInput inputLabel={text.label.email}
                                placeholder={text.placeholders.email}
                                extraCls={`w-full`}
                                color={`success`}
                                textinputname={`email`}
                                onChange={formik?.handleChange}
                                value={formik?.values?.email}
                                handleBlur={formik?.handleBlur}
                                error={
                                    formik?.touched?.email &&
                                    Boolean(formik?.errors?.email)
                                }
                                helperText={
                                    formik?.touched?.email && formik?.errors?.email
                                }
                                clickEnter={formik?.handleSubmit}
                                fullwidthState />
                                <ButtonFieldInput name={text.buttonNames.continue}
                                    buttonextracls={`!rounded-sm !shadow !bg-violet-400 !p-3 !text-sm !capitalize w-full 
                                    rounded-full hover:bg-violet-400`}
                                    variant={`contained`}
                                    type={'submit'}
                                    loading={loading}
                                    disabled={loading}
                                />
                        </form> : <OtpFieldInput length={6} onOtpSubmit={onOtpSubmit} resendHandler={()=>{}}/>}
                    </Box>
                </FlexCenter>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} className='bg-blue-300 h-full' alignItems={'center'}>
                <Image src={forgetPasswordImages} alt={`forget password`} className='w-full h-screen' />
            </Grid>
        </Grid>
    </Box>
}

export default ForgetPassword