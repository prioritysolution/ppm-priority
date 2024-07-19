"use client"
import AccountLedger from '@/components/master/accountledger'
import React, { useEffect } from 'react'
import { AccountLedgerHooks } from './Hooks'
import { AccountHeadHooks } from '../AccountHead/Hooks'

const AccountLedgerContainer = () => {
  const { AddAccountLedgerFormik, handleCloseAccountLedger,
    handleOpenAccountLedger,
    openAccountLedger, handleOpeningDate,
    handleOpeningDateError, editData,
    openingDate, errorMessage, getAccountLedgerApiCall, 
    orgId, token,loader, postLoaders, editAccountLedger } = AccountLedgerHooks()

    const {getAccountHeadApiCall}=AccountHeadHooks()
    useEffect(()=>{
      if(token && orgId ){
        getAccountLedgerApiCall(orgId)
        getAccountHeadApiCall(orgId)
      }
    },[token, orgId])
  return (
    <AccountLedger accountLedgerFormik={AddAccountLedgerFormik}
      handleCloseDrawer={handleCloseAccountLedger}
      handleOpenDrawer={handleOpenAccountLedger}
      openAccountLedgerForm={openAccountLedger}
      handleOpeningDate={handleOpeningDate}
      handleOpeningDateError={handleOpeningDateError}
      openingDate={openingDate}
      errorMessage={errorMessage}
      loader={loader}
      postLoaders={postLoaders}
      editAccountLedger={editAccountLedger}
      editData={editData}
      token={token}
    />
  )
}

export default AccountLedgerContainer
