import { doGetApiCall, doPostApiCall, doPutApiCall } from "@/utils/ApiConfig";
import { endPoints } from "@/utils/endPoints";

export const getAccountLedgerApi = async(id: number)=>{
    let data = {
        url: endPoints?.getAccountLedger(id)
    }
    let res: any = await doGetApiCall(data)
    return res;
}

export const postAccountLedgerAPI = async (body: any) => {
    let data = {
        url: endPoints?.postAccountLedger,
        bodyData: body,
    }
    let res: any = await doPostApiCall(data)
    return res;
}

export const updateAccountLedgerAPI = async (body: any) => {
    let data = {
        url: endPoints?.updateAccountLedger,
        bodyData: body,
    }
    let res: any = await doPutApiCall(data)
    return res;
}