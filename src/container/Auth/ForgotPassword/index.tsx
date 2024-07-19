"use client"
import ForgetPassword from '@/components/auth/forgetpassword'
import React from 'react'
import { ForgotPasswordHooks } from './Hooks'

export default function ForgotPasswordContainer() {
  const {ForgetPasswordFormik, showOtpField, onOtpSubmit} = ForgotPasswordHooks()

  return (
   <ForgetPassword formik={ForgetPasswordFormik} showOtpField={showOtpField} onOtpSubmit={onOtpSubmit}/>
  )
}

