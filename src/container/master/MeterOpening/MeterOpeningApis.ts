import { doGetApiCall, doPostApiCall, doPutApiCall } from "@/utils/ApiConfig";
import { endPoints } from "@/utils/endPoints";

export const getMeterOpeningAPI= async(id: number)=>{
    let data = {
        url: endPoints.getMeterOpenings(id)
    }
    let res: any = await doGetApiCall(data)
    return res;
}


export const postMeterOpeningAPI = async (body: any) => {
    let data = {
        url: endPoints?.postMeterOpenings,
        bodyData: body,
    }
    let res: any = await doPostApiCall(data)
    return res;
}


export const updateMeterOpeningAPI = async (body: any) => {
    let data = {
        url: endPoints?.updateMeterOpenings,
        bodyData: body,
    }
    let res: any = await doPutApiCall(data)
    return res;
}