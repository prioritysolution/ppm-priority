"use client"
import React, { useEffect } from 'react'
import { StaffHooks } from './Hooks'
import StaffMaster from '@/components/master/staff'

const StaffContainer = () => {
  const {
    handleCloseDrawer,
    handleOpenDrawer,
    staffDrawerOpen,
    AddStaffFormik,
    errorMessage,
    handleJoiningDate,
    handleJoiningDateError,
    handleStaffMobileChange,
    joiningDate,
    staffMobile,
    getStaffApiCall,
    orgId, token, handleEditData,
    loader, postLoaders
  } = StaffHooks()

  useEffect(()=>{
    if(token && orgId){
      getStaffApiCall(orgId, 'designation')
      getStaffApiCall(orgId, 'type')
      getStaffApiCall(orgId, 'staff')
    }
  },[orgId, token])

  return (
    <StaffMaster handleCloseDrawer={handleCloseDrawer}
      handleOpenDrawer={handleOpenDrawer}
      staffDrawerOpen={staffDrawerOpen}
      AddStaffFormik={AddStaffFormik}
      errorMessage={errorMessage}
      handleJoiningDate={handleJoiningDate}
      handleJoiningDateError={handleJoiningDateError}
      handleStaffMobileChange={handleStaffMobileChange}
      joiningDate={joiningDate}
      loader={loader}
      postLoaders={postLoaders}
      staffMobile={staffMobile}
      token={token} handleEditData={handleEditData}
    />
  )
}

export default StaffContainer
