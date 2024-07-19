import { doGetApiCall, doPostApiCall, doPutApiCall } from "@/utils/ApiConfig";
import { endPoints } from "@/utils/endPoints";

export const getUnitMasterDataAPI = async(id: number)=>{
    let data = {
        url: endPoints?.getUnitMaster(id),
    }
    let res: any = await doGetApiCall(data)
    return res;
}

export const postUnitMasterAPI = async (body: any) => {
    let data = {
        url: endPoints.postUnitMaster,
        bodyData: body,
    }
    let res: any = await doPostApiCall(data)
    return res;
}

export const updateUnitMasterAPI = async (body: any) => {
    let data = {
        url: endPoints?.updateUnitMaster,
        bodyData: body,
    }
    let res: any = await doPutApiCall(data)
    return res;
}