"use client"
import AccountHead from '@/components/master/accountHead'
import React, { useEffect } from 'react'
import { AccountHeadHooks } from './Hooks'

const AccountHeadContainer = () => {
  const {AddAccountHeadFormik, getAccountHeadMainApiCall, 
    orgId, token, getAccountHeadApiCall, loader,postLoaders, editAccountHead, editData}= AccountHeadHooks()

  useEffect(() => {
    if(token && orgId){
      getAccountHeadMainApiCall(orgId)
      getAccountHeadApiCall(orgId)
    }
  }, [token, orgId])
  
  return (
    <AccountHead
     addAccountHeadFormik={AddAccountHeadFormik}
     token={token}
     loader={loader}
     postLoaders={postLoaders}
     editAccountHead={editAccountHead}
     editData={editData}
    />
  )
}

export default AccountHeadContainer
