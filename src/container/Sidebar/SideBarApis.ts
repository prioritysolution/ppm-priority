import { doGetApiCall } from "@/utils/ApiConfig";
import { endPoints } from "@/utils/endPoints";

export const getFinYearAPI = async(id: number) => {
    let data = {
        url: endPoints?.finYear(id),
    }
    let res: any = await doGetApiCall(data)
    return res;
}

export const getLogoutAPI = async()=>{
    let data = {
        url: endPoints?.logout,
    }
    let res: any = await doGetApiCall(data)
    return res;
}

export const getSideBarDataAPI = async()=>{
    let data = {
        url: endPoints?.sideBarData,
    }
    let res: any = await doGetApiCall(data)
    return res;
}
