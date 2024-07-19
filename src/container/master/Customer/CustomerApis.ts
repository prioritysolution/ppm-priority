import { doGetApiCall, doPostApiCall, doPutApiCall } from "@/utils/ApiConfig";
import { endPoints } from "@/utils/endPoints";

export const getCustomerAPI= async(id: number)=>{
    let data = {
        url: endPoints.getCustomer(id)
    }
    let res: any = await doGetApiCall(data)
    return res;
}


export const postCustomerAPI = async (body: any) => {
    let data = {
        url: endPoints?.postCustomer,
        bodyData: body,
    }
    let res: any = await doPostApiCall(data)
    return res;
}


export const updateCustomerAPI = async (body: any) => {
    let data = {
        url: endPoints?.updateCustomer,
        bodyData: body,
    }
    let res: any = await doPutApiCall(data)
    return res;
}