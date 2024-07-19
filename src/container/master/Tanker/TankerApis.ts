import { doGetApiCall, doPostApiCall, doPutApiCall } from "@/utils/ApiConfig";
import { endPoints } from "@/utils/endPoints";

export const getTankerAPI = async(id: number)=>{
    let data = {
        url: endPoints?.getTanker(id),
    }
    let res: any = await doGetApiCall(data)
    return res;
}

export const postTankerAPI= async(body: any)=>{
    let data = {
        url: endPoints?.postTanker,
        bodyData: body,
    }
    let res: any = await doPostApiCall(data)
    return res;
}


export const updateTankerAPI = async (body: any) => {
    let data = {
        url: endPoints?.updateTanker,
        bodyData: body,
    }
    let res: any = await doPutApiCall(data)
    return res;
}