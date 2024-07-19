import { doGetApiCall, doPostApiCall, doPutApiCall } from "@/utils/ApiConfig";
import { endPoints } from "@/utils/endPoints";

export const getItemCategoryDataAPI = async(id: number)=>{
    let data = {
        url: endPoints?.getItemCategory(id),
    }
    let res: any = await doGetApiCall(data)
    return res;
}

export const postItemCategoryAPI = async (body: any) => {
    let data = {
        url: endPoints?.postItemCategory,
        bodyData: body,
    }
    let res: any = await doPostApiCall(data)
    return res;
}

export const updateItemCategoryAPI = async (body: any) => {
    let data = {
        url: endPoints?.updateItemCategory,
        bodyData: body,
    }
    let res: any = await doPutApiCall(data)
    return res;
}