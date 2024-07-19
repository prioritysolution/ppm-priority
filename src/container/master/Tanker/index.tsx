"use client"
import Tanker from '@/components/master/tanker'
import React, { useEffect } from 'react'
import { TankerHooks } from './Hooks'

const TankerContainer = () => {
  const { AddTankerFormik, token, handleResetForm, handleEditData, orgId,
    getTankerApiCall, loader, postLoader, editData } = TankerHooks()

  useEffect(() => {
    if (token && orgId) {
      getTankerApiCall(orgId)
    }
  }, [orgId, token])
  console.log(editData, '* data')
  return (
    <Tanker formik={AddTankerFormik}
      token={token}
      handleResetForm={handleResetForm}
      handleEditData={handleEditData}
      loader={loader}
      postLoaders={postLoader}
    />
  )
}

export default TankerContainer
