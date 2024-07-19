import { useFormik } from "formik"
import * as Yup from 'yup'
import text from '@/languages/en_US.json'
import getSessionStorageData from "@/utils/getSessionStorageData"
import { useState } from "react"
import { getTankerAPI, postTankerAPI, updateTankerAPI } from "./TankerApis"
import { useDispatch } from "react-redux"
import { getTankerData } from "./TankerReducer"
import toast from "react-hot-toast"

export const TankerHooks = () => {

    const dispatch = useDispatch()
    const token = getSessionStorageData('token')
    const orgId = getSessionStorageData('orgId')

    //loader states
    const [loader, setLoader] = useState<boolean>(false)
    const [postLoader, setPostLoaders] = useState<boolean>(false)


    //edit state
    const [editData, setEditData] = useState<any>(null)


    //handle EditData
    const handleEditData = (data: any) => {
        console.log(data, '* data')
        setEditData(data)
    }

    //handle reset
    const handleResetForm = () => {
        AddTankerFormik.resetForm()
        setEditData(null)
    }

    //add tanker formik
    const AddTankerFormik = useFormik({
        enableReinitialize: true,
        initialValues: {
            tankerName: editData && Object.keys(editData).length > 0 ? editData.Tanker_Name : '',
            vehicleName: editData && Object.keys(editData).length > 0 ? editData.Vechle_Name : '',
            vehicleNumber: editData && Object.keys(editData).length > 0 ? editData.Vechle_No : '',
            capacity: editData && Object.keys(editData).length > 0 ? parseInt(editData.Capacity) : 0
        },
        validationSchema: Yup.object().shape({
            tankerName: Yup.string()
                .required(text.errors.requiredErrors.tanker.tankerName),
            vehicleName: Yup.string()
                .required(text.errors.requiredErrors.tanker.vehicleName),
            vehicleNumber: Yup.string()
                .required(text.errors.requiredErrors.tanker.vehicleNumber),
            capacity: Yup.number()
                .positive(text.errors.patternErrors.tanker.capacity)
                .required(text.errors.requiredErrors.tanker.capacity)
        }),
        onSubmit: (values) => {
            if (editData && Object.keys(editData).length > 0) {
                editTankerApiCall(editData.Id, orgId, values, handleResetForm)
            } else {
                postTankerApiCall(orgId, values, handleResetForm)
            }
        }
    })


    //tanker get api
    const getTankerApiCall = async (id: number) => {
        setLoader(true)
        getTankerAPI(id).then((res: any) => {
            // console.log(res)
            if (res.status === 200) {
                dispatch(getTankerData(res.Data))
            } else {
                dispatch(getTankerData([]))
            }
        }).catch((err: any) => {
            toast.error(err)
            toast.error('Something went wrong')
            dispatch(getTankerData([]))
        }).finally(() => {
            setLoader(false)
        })
    }

    //post supplier api call
    const postTankerApiCall = (orgId: number, item: any, resetForm: () => void) => {
        setPostLoaders(true);
        let bodyData = {
            Tanker_Name: item.tankerName,
            Vechle_Name: item.vehicleName,
            Vechle_No: item.vehicleNumber,
            Capacity: item.capacity,
            org_id: orgId
        }
        // console.table(bodyData)
        postTankerAPI(bodyData)
            .then((res: any) => {
                // console.log(res)
                if (res.status === 200) {
                    getTankerApiCall(orgId)
                    resetForm()
                    toast.success('Tanker added successfully')

                } else {
                    toast.error(res.message)
                }
            })
            .catch((err) => {
                console.error(err)
                toast.error('Something went wrong')
            }).finally(() => {
                setPostLoaders(false)
            })
    }

    //edit api call for card pos
    const editTankerApiCall = async (tankerId: number, orgId: number, item: any, resetForm: () => void) => {
        setPostLoaders(true)
        let bodyData = {
            Tanker_Id: tankerId,
            Tanker_Name: item.tankerName,
            Vechle_Name: item.vehicleName,
            Vechle_No: item.vehicleNumber,
            Capacity: item.capacity,
            org_id: orgId
        }
        updateTankerAPI(bodyData).then((res: any) => {
            if (res.status === 200) {
                getTankerApiCall(orgId)
                resetForm()
                toast.success('Tanker updated successfully')
            } else {
                toast.error(res.message)
            }
        }).catch((err) => {
            toast.error('Something went wrong')
            console.log(err)
        }).finally(() => {
            setPostLoaders(false)
        })
    }
    return {
        AddTankerFormik,
        token,
        handleResetForm,
        handleEditData,
        loader,
        postLoader,
        getTankerApiCall,
        orgId,
        editData
    }
}