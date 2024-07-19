import { useFormik } from "formik"
import { useState } from "react"
import * as Yup from 'yup'
import text from '@/languages/en_US.json'
import getSessionStorageData from "@/utils/getSessionStorageData"
import { getItemCategoryDataAPI, postItemCategoryAPI, updateItemCategoryAPI } from "./ItemCategoryApis"
import { useDispatch } from "react-redux"
import { getItemCategoryData } from "./ItemCategoryReducer"
import toast from "react-hot-toast"

export const ItemCategoryHooks = () => {

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [postLoaders, setPostLoaders] = useState(false)
    const [editData, setEditData] = useState<any>(null)
    const [openAddItemModal, setOpenAddItemModal] = useState(false)

    const orgId = getSessionStorageData('orgId')

    //edit functionality
    const handleEditData = (data: any) => {
        setOpenAddItemModal(true)
        setEditData(data)
    }


    // item category add formik
    const AddItemCategoryFormik = useFormik({
        enableReinitialize: true,
        initialValues: {
            itemCategory: editData && Object.keys(editData)?.length > 0 ? editData.Catagary_Name : ''
        },
        validationSchema: Yup.object().shape({
            itemCategory: Yup.string()
                .required(text.errors.requiredErrors.itemCategory)

        }),
        onSubmit: (values, { resetForm }) => {
            if (editData && Object.keys(editData)?.length > 0) {
                updateItemCategoryApiCall(editData.Id, values, resetForm)
            } else {
                postItemCategoryApiCall(values, resetForm)
            }

        }
    })

    //open modal state
    const handleOpenModal = () => {
        setOpenAddItemModal(true)
    }

    //close modal state
    const handleCloseModal = () => {
        setOpenAddItemModal(false)
        AddItemCategoryFormik.resetForm()
        setEditData(null)
    }


    //get api call for item category
    const getItemCategoryApiCall = async (id: number) => {
        setLoading(true)
        getItemCategoryDataAPI(id).then((res: any) => {
            if (res.status === 200) {
                dispatch(getItemCategoryData(res.Data))
            } else {
                dispatch(getItemCategoryData([]))
            }
        }).catch((err) => {
            console.error(err)
            toast.error('Something went wrong')
            dispatch(getItemCategoryData([]))
        }).finally(() => {
            setLoading(false)
        })
    }

    //item category post api call
    const postItemCategoryApiCall = async (item: any, resetForm: any) => {
        setPostLoaders(true);
        let bodyData = {
            cat_name: item.itemCategory,
            org_id: orgId,
        }
        postItemCategoryAPI(bodyData)
            .then((res: any) => {
                // console.log(res, '* res')
                if (res.status === 200) {
                    setOpenAddItemModal(false)
                    getItemCategoryApiCall(orgId)
                    toast.success('Item category created successfully')
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

    //update unit master api call
    const updateItemCategoryApiCall = async (unitId: number, item: any, resetForm: any) => {
        setPostLoaders(true)
        let bodyData = {
            cat_id: unitId,
            cat_name: item.itemCategory,
            org_id: orgId,
        }
        updateItemCategoryAPI(bodyData).then((res: any) => {
            if (res.status === 200) {
                getItemCategoryApiCall(orgId)
                toast.success('Item category edited successfully')
                handleCloseModal()
                setEditData(null)
                resetForm()
            } else {
                toast.error(res.message)

            }
        }).catch((err) => {
            toast.error('Something went wrong')
            console.error(err)
        }).finally(() => {
            setPostLoaders(false)
        })
    }

    return {
        handleOpenModal,
        handleCloseModal,
        openAddItemModal,
        AddItemCategoryFormik,
        getItemCategoryApiCall,
        handleEditData,
        loading,
        postLoaders,
        editData
    }
}