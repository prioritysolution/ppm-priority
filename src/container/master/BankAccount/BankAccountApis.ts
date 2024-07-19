import { doGetApiCall, doPostApiCall, doPutApiCall } from "@/utils/ApiConfig";
import { endPoints } from "@/utils/endPoints";

export const getBankAccountApi = async(id: number)=>{
    let data = {
        url: endPoints?.getBankAccounts(id)
    }
    let res: any = await doGetApiCall(data)
    return res;
}


export const postBankAccountAPI = async (body: any) => {
    let data = {
        url: endPoints?.postBankAccounts,
        bodyData: body,
    }
    let res: any = await doPostApiCall(data)
    return res;
}

export const updateBankAccountAPI = async (body: any) => {
    let data = {
        url: endPoints?.updateBankAccounts,
        bodyData: body,
    }
    let res: any = await doPutApiCall(data)
    return res;
}