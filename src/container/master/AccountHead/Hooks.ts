import { useFormik } from "formik"
import * as Yup from 'yup'
import text from '@/languages/en_US.json'
import { getAccountHeadDataAPI, postAccountHeadAPI, updateAccountHeadAPI } from "./AccountHeadApis"
import { useDispatch } from "react-redux"
import toast from "react-hot-toast"
import getSessionStorageData from "@/utils/getSessionStorageData"
import { getAccountHeadData, getAccountHeadMainData } from "./AccountHeadReducer"
import { useState } from "react"

export const AccountHeadHooks = () => {


    const dispatch = useDispatch()

    const token = getSessionStorageData('token')
    const orgId = getSessionStorageData('orgId')
    const [loader, setLoader] = useState<boolean>(false)
    const [postLoaders, setPostLoaders] = useState<boolean>(false)
    const [editData, setEditData] = useState<any>(null)

    //edit data function
    const editAccountHead = (data: any) => {
        // console.table(data)
        setEditData(data)
    }

    // add account head formik
    const AddAccountHeadFormik = useFormik({
        enableReinitialize: true,
        initialValues: {
            headName: editData && Object.keys(editData).length > 0 ? editData.Head_Name : '',
            headCode: editData && Object.keys(editData).length > 0 ? editData.Head_Code : '',
            mainHead: editData && Object.keys(editData).length > 0 ? editData.Main_Head : ''
        },
        validationSchema: Yup.object().shape({
            headName: Yup.string()
                .required(text.errors.requiredErrors.addAccountHead.headName),
            headCode: Yup.number()
                .positive(text.errors.patternErrors.addAccountHead.headCode)
                .required(text.errors.requiredErrors.addAccountHead.headCode),
            mainHead: Yup.string()
                .required(text.errors.requiredErrors.addAccountHead.mainHead)
        }),
        onSubmit: (values, { resetForm }) => {
            editData && Object.keys(editData).length > 0 ?
            editAccountHeadApiCall(orgId, editData.Id, values, resetForm)
           : postAccountHeadApiCall(orgId, values, resetForm)
            resetForm()
        }
    })

    //account head main dropdown get api call
    const getAccountHeadMainApiCall = async (id: number) => {
        getAccountHeadDataAPI(id, 'mainHead').then((res: any) => {
            if (res.messsage === 'Data Found') {
                dispatch(getAccountHeadMainData(res.Data))
            } else {
                dispatch(getAccountHeadMainData([]))
            }
        }).catch((err: any) => {
            console.error(err)
            toast.error('Something went wrong')
            dispatch(getAccountHeadMainData([]))
        })
    }

    //account head get api call
    const getAccountHeadApiCall = async (id: number) => {
        setLoader(true)
        getAccountHeadDataAPI(id, 'head').then((res: any) => {
            if (res.status === 200) {
                dispatch(getAccountHeadData(res.Data))
            } else {
                dispatch(getAccountHeadData([]))
            }
        }).catch((err: any) => {
            console.error(err)
            toast.error('Something went wrong')
            dispatch(getAccountHeadData([]))
        }).finally(() => {
            setLoader(false)
        })
    }

    //account head post api call
    const postAccountHeadApiCall = async (orgId: number, item: any, resetForm: any ) => {
        setPostLoaders(true);
        let bodyData = {
            Head_Name: item.headName,
            Head_Code: item.headCode,
            Main_Head: item.mainHead,
            org_id: orgId
        }
        postAccountHeadAPI(bodyData)
            .then((res: any) => {
                // console.log(res)
                if (res.status === 200) {
                    getAccountHeadApiCall(orgId)
                    toast.success('Account head created successfully')
                    // setEditData(null)
                    resetForm()
                } else {
                    toast.error(res.message)
                }
            })
            .catch((err) => {
                console.error(err)
                toast.error('Something went wrong')
                setPostLoaders(false)
            }).finally(() => {
                setPostLoaders(false)
            })
    }


    //edit account head api call
    const editAccountHeadApiCall = async (orgId: number, headId: number, item: any, resetForm: any) => {
        setPostLoaders(true);
        let bodyData = {
            Head_Name: item.headName,
            Head_Code: item.headCode,
            Main_Head: item.mainHead,
            org_id: orgId,
            Head_Id: headId
        }
        updateAccountHeadAPI(bodyData)
            .then((res: any) => {
                // console.log(res)
                if (res.status === 200) {
                    getAccountHeadApiCall(orgId)
                    toast.success('Account head updated successfully')
                    setEditData(null)
                    resetForm()
                } else {
                    toast.error(res.message)
                }
            })
            .catch((err) => {
                console.error(err)
                toast.error('Something went wrong')
                setPostLoaders(false)
            }).finally(() => {
                setPostLoaders(false)
            })
    }
    return {
        token, orgId,
        AddAccountHeadFormik,
        getAccountHeadMainApiCall,
        getAccountHeadApiCall,
        loader,
        postLoaders,
        editAccountHead,
        editData
    }
}