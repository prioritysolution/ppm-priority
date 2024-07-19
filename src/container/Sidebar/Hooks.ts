import { useDispatch } from "react-redux"
import { getFinYearAPI, getLogoutAPI, getSideBarDataAPI } from "./SideBarApis"
import { getFinancialYear, getSideBarData } from "./SideBarReducer"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { pathName } from "@/utils/route"
import { useState } from "react"

export const SideBarHooks = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const [loader, setLoader]=useState<boolean>(false)
    const[logOutLoader, setLogOutLoader]=useState<boolean>(false)

    //financial year get api call
    const finYearGetApiCall = async (orgId: number) => {
     getFinYearAPI(orgId).then((res: any)=>{
         if (res.messsage === "Data Found") {
             dispatch(getFinancialYear([res.Data[0]]))
             // console.log(res.Data)
         } else {
             dispatch(getFinancialYear([]))
         }
     }).catch((err)=>{
        console.error(err)
        toast.error('Something went wrong')
        dispatch(getFinancialYear([]))
     })
    }

    //logout get api call
    const logOutGetApiCall = async () => {
        setLogOutLoader(true)
     getLogoutAPI().then((res: any)=>{
         if (res.message === "Logout Successfull") {
             router.push(pathName.login)
             sessionStorage.clear()
             toast.success(`LoggedOut Successfully`)
         } else {
             toast.error(res.message)
         }
     }).catch((err: any)=>{
        toast.error('Something went wrong')
        console.error(err)
    }).finally(()=>{
        setLogOutLoader(false)
     })
    }

    //sideBarData get Api call
    const getSideBarDataApiCall = async () => {
        setLoader(true)
        getSideBarDataAPI().then((res: any) => {
            if (res.messsage === 'Data Found') {
                dispatch(getSideBarData(res.Data))
            } else {
                dispatch(getSideBarData([]))
            }
        }).catch((err: any)=>{
            console.error(err)
            toast.error('Something went wrong')
            dispatch(getSideBarData([]))
        }).finally(()=>{
            setLoader(false)
        })
    }

    //menu open functionality
    const [openMenuId, setOpenMenuId] = useState<number | null>(null)

    const handleSubMenu = (id: number) => {
        if (openMenuId !== id) {
            setOpenMenuId(id)
        } else {
            setOpenMenuId(null)
        }
    }

    const handleSubMenuClose = () => {
        setOpenMenuId(null)
    }
    return {
        finYearGetApiCall,
        logOutGetApiCall,
        getSideBarDataApiCall,
        handleSubMenu,
        openMenuId,
        handleSubMenuClose,
        loader,
        logOutLoader
    }
}