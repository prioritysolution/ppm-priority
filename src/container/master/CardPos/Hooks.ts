import { useFormik } from "formik"
import { useMemo, useState } from "react"
import * as Yup from 'yup'
import text from '@/languages/en_US.json'
import dayjs, { Dayjs } from "dayjs"
import { DateValidationError } from "@mui/x-date-pickers"
import { getCardPosApi, postCardPosAPI, updateCardPosAPI } from "./CardPosApi"
import { useDispatch } from "react-redux"
import { getBankPosData, getCardPosData } from "./CardPosAccountReducer"
import toast from "react-hot-toast"
import getSessionStorageData from "@/utils/getSessionStorageData"

export const CardPosHooks = () => {

    const dispatch = useDispatch()
    const token = getSessionStorageData('token')
    const orgId = getSessionStorageData('orgId')

    //drawer states
    const [openCardDrawer, setOpenCardDrawer] = useState<boolean>(false)

    //loading states
    const [loader, setLoader] = useState<boolean>(false)
    const [postLoaders, setPostLoaders] = useState<boolean>(false)

    //radioStates
    const [posType, setPosType] = useState<string>("1")

    //date field state
    const [installationDate, setInstallationDate] = useState<Dayjs | null>(null)
    const [installationDateError, setInstallationDateError] = useState<DateValidationError | null>(null)

    //editData state
    const [editData, setEditData]=useState<any>(null)

    //open drawer function
    const handleOpenCardDrawer = () => {
        setOpenCardDrawer(true)
    }

    //close drawer fucntion
    const handleCloseCardDrawer = () => {
        setOpenCardDrawer(false)
        AddCardPosFormik.resetForm()
        setInstallationDate(null)
        setInstallationDateError(null)
        setPosType("1")
        setEditData(null)
    }

    //handle pos types 
    const handlePosTypes = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPosType((event.target as HTMLInputElement).value)
    }

    //handle installation date 
    const handleInstallationDate = (newValue?: Dayjs) => {
        setInstallationDate(newValue || null)
        if (newValue === null) {
            setInstallationDateError('invalidDate')
        } else {
            setInstallationDateError(null)
        }
    }

    //handle Installation date error
    const handleInstallationDateError = (newError?: DateValidationError | null) => {
        setInstallationDateError(newError || null)
        if (installationDate === null) {
            setInstallationDateError('invalidDate')
        } else {
            setInstallationDateError(null)
        }
    }

    //edit Data function
    const handleEditPosData=(data: any)=>{
        setEditData(data)
        setInstallationDate(dayjs(data.Installation_Date))
        setPosType(data.Pos_Type)
        handleOpenCardDrawer()
    }    

    //error Message function
    const errorMessage = useMemo(() => {
        switch (installationDateError) {
            case 'invalidDate': {
                return text.errors.patternErrors.bankAccount.invalidDate
            }
            default: {
                return '';
            }
        }
    }, [installationDateError]);

    //add card/pos formik 
    const AddCardPosFormik = useFormik({
        enableReinitialize: true,
        initialValues: {
            posName: editData && Object.keys(editData).length > 0 ? editData.Pos_Name : '',
            posProvider: editData && Object.keys(editData).length > 0 ? editData.Pos_Provider : '',
            linkBank: editData && Object.keys(editData).length > 0 ? editData.Link_Bank :'',
        },
        validationSchema: Yup.object().shape({
            posName: Yup.string()
                .required(text.errors.requiredErrors.cardPos.posName),
            posProvider: Yup.string()
                .required(text.errors.requiredErrors.cardPos.posProvider),
            linkBank: Yup.string()
                .required(text.errors.requiredErrors.cardPos.linkBank),
        }),
        onSubmit: (values) => {
            if (installationDate !== null) {
                const data = { ...values, openingDate: dayjs(installationDate).format('YYYY-MM-DD'), posType }
                if(editData && Object.keys(editData).length > 0){
                    editCardPosApiCall(editData.Id, orgId, data)
                }else{
                postCardPosApiCall(orgId, data)
                }   
            } else {
                setInstallationDateError('invalidDate')
            }
        }
    })

    //card get api call
    const getCardPosApiCall = async (id: number) => {
        setLoader(true)
        getCardPosApi(id, 'card').then((res: any) => {
            // console.log(res)
            if (res.status === 200) {
                dispatch(getCardPosData(res.Data))
            } else {
                dispatch(getCardPosData([]))
            }
        }).catch((err: any) => {
            console.error(err)
            toast.error('Something went wrong')
            dispatch(getCardPosData([]))
        }).finally(() => {
            setLoader(false)
        })
    }

    //card pos get api call
    const getBankPosApiCall = (id: number) => {
        getCardPosApi(id, 'bank').then((res: any) => {
            if (res.status === 200) {
                dispatch(getBankPosData(res.Data))
            } else {
                dispatch(getBankPosData([]))
            }
        }).catch((err: any) => {
            console.error(err)
            toast.error('Something went wrong')
            dispatch(getBankPosData([]))
        }).finally(() => {
            setLoader(false)
        })
    }

    //post api call for card pos
    const postCardPosApiCall = async (orgId: number, item: any) => {
        setPostLoaders(true);
        let bodyData = {
            POS_Name: item.posName,
            POS_Provider: item.posProvider,
            POS_Type: item.posType,
            Under_Bank: item.linkBank,
            Install_Date: item.openingDate,
            org_id: orgId
        }
        // console.log(bodyData)
        postCardPosAPI(bodyData)
            .then((res: any) => {
                // console.log(res, '* res')
                if (res.status === 200) {
                    handleCloseCardDrawer()
                    getCardPosApiCall(orgId)
                    toast.success('Card/Pos added successfully')
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
    const editCardPosApiCall = async (cardId: number, orgId: number, item: any) => {
        setPostLoaders(true)
        let bodyData = {
            POS_Id:cardId,
            POS_Name: item.posName,
            POS_Provider: item.posProvider,
            POS_Type: item.posType,
            Under_Bank: item.linkBank,
            Install_Date: item.openingDate,
            org_id: orgId
        }
        updateCardPosAPI(bodyData).then((res: any) => {
            if (res.status === 200) {
                getCardPosApiCall(orgId)
                toast.success('Card/Pos updated successfully')
                handleCloseCardDrawer()
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
        handleCloseCardDrawer,
        handleOpenCardDrawer,
        openCardDrawer,
        handlePosTypes,
        posType,
        AddCardPosFormik,
        errorMessage,
        handleInstallationDate,
        handleInstallationDateError,
        installationDate,
        token,
        orgId,
        getBankPosApiCall,
        getCardPosApiCall,
        loader, 
        postLoaders,
        handleEditPosData,
        editData
    }
}