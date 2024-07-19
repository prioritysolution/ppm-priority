import { useFormik } from "formik"
import { useState } from "react"
import * as Yup from 'yup'
import text from '@/languages/en_US.json'
import { getUnitMasterDataAPI, postUnitMasterAPI, updateUnitMasterAPI } from "./UnitMasterApis"
import { useDispatch } from "react-redux"
import { getUnitMasterData } from "./UnitMasterReducer"
import getSessionStorageData from "@/utils/getSessionStorageData"
import toast from "react-hot-toast"

export const UnitMasterHooks = () => {

    const dispatch= useDispatch()
    const orgId= getSessionStorageData('orgId')
    
    //modal functionalities
    const [openFormDialog, setOpenFormDialog] = useState(false)
    
    //loading state
    const[loading, setLoading]= useState(false)
    const[postLoaders, setPostLoaders]= useState(false)


      //edit functionality
      const [editData, setEditData]=useState<any>(null)

      const handleEditData=(data: any)=>{
          setOpenFormDialog(true)
          setEditData(data)
      }
    
    // unitmaster add formik
    const AddUnitMasterFormik = useFormik({
        enableReinitialize: true,
        initialValues: {
            itemName: editData && Object.keys(editData)?.length > 0 ? editData.Unit_Name : ''
        },
        validationSchema: Yup.object().shape({
            itemName: Yup.string()
            .required(text.errors.requiredErrors.unitMaster)
            
        }),
        onSubmit: (values, { resetForm }) => {
            // console.log(values, '* unit master data')
           if( editData && Object.keys(editData)?.length > 0){
            updateUnitMasterApiCall(editData.Id, values , resetForm)} else
            {
            postUnitMasterApiCall(values, resetForm)
        }
        }
    })
    
    
  

    //modal open
    const handleOpenDialog = () => {
        setOpenFormDialog(true)
        setEditData(null)
    }

    //modal close
    const handleCloseModal=()=>{
        setOpenFormDialog(false)
        AddUnitMasterFormik.resetForm()
    }

    //unit master get api call
     const getUnitMasterDataApiCall= async (id: number)=>{
        setLoading(true)
     getUnitMasterDataAPI(id).then((res: any)=>{
         if(res.status === 200){
             dispatch(getUnitMasterData(res.Data))
         }else{
             dispatch(getUnitMasterData([]))
         }
     }).catch((err: any)=>{
        toast.error('Something went wrong')
        console.error(err)
        dispatch(getUnitMasterData([]))
     }).finally(()=>{
        setLoading(false)
     })

    }

    //unit master post api call
    const postUnitMasterApiCall = async (item: any, resetForm: any) => {
        setPostLoaders(true);
        let bodyData = {
            unit_name: item.itemName,
            org_id: orgId,
        }
     postUnitMasterAPI(bodyData)
            .then((res: any) => {
                if(res.status === 200){
                    setOpenFormDialog(false)
                    getUnitMasterDataApiCall(orgId)
                    toast.success('Unit created successfully')
                    setEditData(null)
                    resetForm()
                }else{
                    toast.error(res.message)
                }
            })
            .catch((err) => {
                toast.error('Something went wrong')
                console.error(err)
            }).finally(()=>{
                setPostLoaders(false)
            })
    }


    //update unit master api call
    const updateUnitMasterApiCall = async (unitId: number, item: any, resetForm: any) => {
        setPostLoaders(true)
        let bodyData = {
            unit_id: unitId,
            unit_name: item.itemName,
            org_id: orgId,
        }
     updateUnitMasterAPI(bodyData).then((res: any)=>{
         if(res.status === 200){
             getUnitMasterDataApiCall(orgId)
             toast.success('Unit edited successfully')
             handleCloseModal()
             setEditData(null)
             resetForm()
            //  setPostLoaders(false)
         }else{
             toast.error(res.message)
            //  setPostLoaders(false)
         }
     }).catch((err)=>{
        toast.error('Something went wrong')
        console.error(err)
     }).finally(()=>{
        setPostLoaders(false)
     })
    }

    return {
        openFormDialog,
        handleOpenDialog,
        handleCloseModal,
        AddUnitMasterFormik,
        getUnitMasterDataApiCall,
        handleEditData,
        loading,
        postLoaders,
        editData
    }
}