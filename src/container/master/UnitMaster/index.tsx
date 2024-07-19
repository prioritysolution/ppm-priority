"use client"
import UnitMaster from "@/components/master/unitMaster"
import { UnitMasterHooks } from "./Hooks"
import { useEffect } from "react"
import getSessionStorageData from "@/utils/getSessionStorageData"

const UnitMasterContainer = () => {
    const orgId = getSessionStorageData('orgId')
    const token= getSessionStorageData('token')
    const { openFormDialog,
        handleOpenDialog,
        handleCloseModal,
        AddUnitMasterFormik,
        getUnitMasterDataApiCall,
        handleEditData,
        loading,
        postLoaders,
        editData
    } = UnitMasterHooks()

    useEffect(() => {
        if(orgId && token){
        getUnitMasterDataApiCall(orgId)
    }
    }, [orgId, token])

    return <UnitMaster
        openFormDialog={openFormDialog}
        handleOpenDialog={handleOpenDialog}
        handleCloseModal={handleCloseModal}
        AddUnitMasterFormik={AddUnitMasterFormik}
        handleEditData={handleEditData}
        loading={loading}
        postLoaders={postLoaders}
        token={token}
        editData={editData}
    />
}

export default UnitMasterContainer