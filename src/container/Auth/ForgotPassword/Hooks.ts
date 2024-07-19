import { EMAIL_REGEX } from "@/utils/constants"
import { useFormik } from "formik"
import * as Yup from 'yup'
import text from '@/languages/en_US.json'
import { useState } from "react"

export const ForgotPasswordHooks=()=>{

    const [showOtpField, setShowOtpField]=useState<boolean>(false)

    // forget password formik
    const  ForgetPasswordFormik= useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().matches(EMAIL_REGEX, text.errors.patternErrors.email)
                .required(text.errors.requiredErrors.email),

        }),
        onSubmit: (values, { resetForm }) => {
            console.log(values, '* values')
            resetForm()
            setShowOtpField(true)
        }
    })

    const onOtpSubmit=(otp: string)=>{
        console.log(otp, '* otp')
    }
    return{
        ForgetPasswordFormik,
        showOtpField,
        onOtpSubmit
    }
}