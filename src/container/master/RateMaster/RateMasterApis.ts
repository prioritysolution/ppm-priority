import { doGetApiCall, doPostApiCall, doPutApiCall } from "@/utils/ApiConfig";
import { endPoints } from "@/utils/endPoints";

export const getRateMasterAPI = async(id: number)=>{
    let data = {
        url: endPoints.getRate(id)
    }
    let res: any = await doGetApiCall(data)
    return res;
}

export const postRateMasterAPI= async(body: any)=>{
    let data = {
        url: endPoints?.postRate,
        bodyData: body,
    }
    let res: any = await doPostApiCall(data)
    return res;
}

export const updateRateMasterAPI= async(body: any)=>{
    let data = {
        url: endPoints?.updateRate,
        bodyData: body,
    }
    let res: any = await doPutApiCall(data)
    return res;
}


