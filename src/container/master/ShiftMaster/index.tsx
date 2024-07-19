"use client"
import ShiftMaster from "@/components/master/ShiftMaster"
import { ShiftMasterHooks } from "./Hooks"
import { useEffect } from "react"

const ShiftMasterContainer = () => {

  const { AddShiftFormik, getShiftApiCall, loader, handleTimeRange,
    timeRange, handleEditData, editData, handleResetFormData,
    handleTimeRangeError, errorMessage, timeRangeError, orgId, token, postLoaders } = ShiftMasterHooks()

  useEffect(() => {
    if (token && orgId) {
      getShiftApiCall(orgId)
    }
  }, [token, orgId])


  return <ShiftMaster formik={AddShiftFormik}
    loader={loader}
    token={token}
    handleTimeRange={handleTimeRange}
    timeRange={timeRange}
    handleTimeRangeError={handleTimeRangeError}
    errorMessage={errorMessage}
    timeRangeError={timeRangeError}
    postLoaders={postLoaders}
    handleEditData={handleEditData}
    editData={editData}
    handleResetFormData={handleResetFormData}
  />
}

export default ShiftMasterContainer