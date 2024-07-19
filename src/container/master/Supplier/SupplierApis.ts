import { doGetApiCall, doPostApiCall, doPutApiCall } from "@/utils/ApiConfig";
import { endPoints } from "@/utils/endPoints";

export const getSupplierAPI = async(id: number)=>{
    let data = {
        url: endPoints?.getSupplier(id),
    }
    let res: any = await doGetApiCall(data)
    return res;
}

export const postSupplierAPI= async(body: any)=>{
    let data = {
        url: endPoints?.postSupplier,
        bodyData: body,
    }
    let res: any = await doPostApiCall(data)
    return res;
}


export const updateSupplierAPI = async (body: any) => {
    let data = {
        url: endPoints?.updateSupplier,
        bodyData: body,
    }
    let res: any = await doPutApiCall(data)
    return res;
}