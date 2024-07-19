import getSessionStorageData from "@/utils/getSessionStorageData"
import { useFormik } from "formik"
import { useState } from "react"
import * as Yup from 'yup'
import text from '@/languages/en_US.json'
import { EMAIL_REGEX } from "@/utils/constants"
import { matchIsValidTel } from "mui-tel-input"
import { useDispatch } from "react-redux"
import { getSupplierAPI, postSupplierAPI, updateSupplierAPI } from "./SupplierApis"
import { getSupplierData } from "./SupplierReducer"
import toast from "react-hot-toast"

export const SupplierHooks = () => {

    const dispatch = useDispatch()
    const token = getSessionStorageData('token')
    const orgId = getSessionStorageData('orgId')

    //loader states
    const [loader, setLoader] = useState<boolean>(false)
    const [postLoaders, setPostLoaders] = useState<boolean>(false)

    //supplier mobile states
    const [supplierMobile, setSupplierMobile] = useState<string>('')

    //supplier drawer states
    const [supplierDrawer, setSupplierDrawer] = useState<boolean>(false)

    //edit data states
    const[editData, setEditData]=useState<any>(null)

    //handle open supplier drawer
    const handleOpenSupplierDrawer = () => {
        setSupplierDrawer(true)
    }

    //handle close supplier drawer 
    const handleCloseSupplierDrawer = () => {
        setSupplierDrawer(false)
        AddSupplierFormik.resetForm()
        setSupplierMobile('')
        setEditData(null)
    }

    //handle mobile number change
    const handleMobileChange = (number: string) => {
        setSupplierMobile(number)
    }

    //handle edit data
    const handleEditData=(data: any)=>{
        // console.log(data)
        setEditData(data)
        setSupplierMobile(data.Supp_Mobile)
        handleOpenSupplierDrawer()
    }

    //add supplier formik
    const AddSupplierFormik = useFormik({
        enableReinitialize: true,
        initialValues: {
            supplierName: editData && Object.keys(editData).length> 0 ? editData.Supp_Name : '',
            supplierAddress:  editData && Object.keys(editData).length> 0 ? editData.Supp_Add : '',
            supplierEmail:  editData && Object.keys(editData).length> 0 ? editData.Supp_Mail : '',
            gstin:  editData && Object.keys(editData).length> 0 ? editData.Supp_GSTIN : '',
            maxCredDays:  editData && Object.keys(editData).length> 0 ? editData.Max_Days : 0,
            openingBalance:  editData && Object.keys(editData).length> 0 ? editData.Open_Bal : 0,
            underLedger:  editData && Object.keys(editData).length> 0 ? editData.Link_Gl : ''
        },
        validationSchema: Yup.object().shape({
            supplierName: Yup.string()
                .required(text.errors.requiredErrors.supplier.name),
            supplierAddress: Yup.string()
                .required(text.errors.requiredErrors.supplier.address),
            supplierEmail: Yup.string()
                .matches(EMAIL_REGEX, text.errors.patternErrors.supplier.email)
                .required(text.errors.requiredErrors.supplier.email),
            gstin: Yup.string()
                .required(text.errors.requiredErrors.supplier.gstin),
            maxCredDays: Yup.number()
                .positive(text.errors.patternErrors.supplier.maxCredDays)
                .required(text.errors.requiredErrors.supplier.maxCredDays),
            openingBalance: Yup.number()
                .positive(text.errors.patternErrors.supplier.openingBalance)
                .required(text.errors.requiredErrors.supplier.openingBalance),
            underLedger: Yup.string()
                .required(text.errors.requiredErrors.supplier.underLedger),
        }),
        onSubmit: (values) => {
            if (matchIsValidTel(supplierMobile)) {
                const data = {
                    ...values, supplierMobile
                }
                if(editData && Object.keys(editData).length> 0){
                    editSupplierApiCall(editData.Id, orgId ,data)
                }else{
                    postSupplierApiCall(orgId, data)
                }
            }
        }
    })

    //supplier get api
    const getSupplierApiCall = async (id: number) => {
        setLoader(true)
        getSupplierAPI(id).then((res: any) => {
            // console.log(res)
            if (res.status === 200) {
                dispatch(getSupplierData(res.Data))
            } else {
                dispatch(getSupplierData([]))
            }
        }).catch((err: any) => {
            toast.error(err)
            toast.error('Something went wrong')
            dispatch(getSupplierData([]))
        }).finally(() => {
            setLoader(false)
        })
    }

    //post supplier api call
    const postSupplierApiCall = (orgId: number, item: any) => {
        setPostLoaders(true);
        let bodyData = {
            Suppl_Name: item.supplierName,
            Suppl_Addr: item.supplierAddress,
            Suppl_Mob: item.supplierMobile,
            Suppl_Mail: item.supplierEmail,
            Suppl_GSTIN: item.gstin,
            Max_Crd_Days: item.maxCredDays,
            Open_Bal: item.openingBalance,
            Link_Gl: item.underLedger,
            org_id: orgId
        }
        // console.table(bodyData)
        postSupplierAPI(bodyData)
            .then((res: any) => {
                // console.log(res)
                if (res.status === 200) {
                    getSupplierApiCall(orgId)
                    handleCloseSupplierDrawer()
                    toast.success('Supplier added successfully')

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
    const editSupplierApiCall = async (supplierId: number, orgId: number, item: any) => {
        setPostLoaders(true)
        let bodyData = {
            Suppl_Name: item.supplierName,
            Suppl_Addr: item.supplierAddress,
            Suppl_Mob: item.supplierMobile,
            Suppl_Mail: item.supplierEmail,
            Suppl_GSTIN: item.gstin,
            Max_Crd_Days: item.maxCredDays,
            Open_Bal: item.openingBalance,
            Link_Gl: item.underLedger,
            org_id: orgId,
            Suppl_Id: supplierId
        }
        updateSupplierAPI(bodyData).then((res: any) => {
            if (res.status === 200) {
                getSupplierApiCall(orgId)
                toast.success('Supplier updated successfully')
                handleCloseSupplierDrawer()
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
        supplierDrawer,
        handleOpenSupplierDrawer,
        handleCloseSupplierDrawer,
        AddSupplierFormik,
        handleMobileChange,
        supplierMobile, loader,
        token, postLoaders,
        orgId, getSupplierApiCall,
        handleEditData,
        editData
    }
}