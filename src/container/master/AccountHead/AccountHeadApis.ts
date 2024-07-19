import { doGetApiCall, doPostApiCall, doPutApiCall } from "@/utils/ApiConfig";
import { endPoints } from "@/utils/endPoints";

export const getAccountHeadDataAPI = async(id: number, type: 'head' | 'mainHead')=>{
    let url;
    switch(type){
        case 'head':  url=endPoints?.getAccountHead(id)
        break;
        case "mainHead": url= endPoints?.getAccountHeadMain(id)
        break;
    }
    let data = {
        url: url,
    }
    let res: any = await doGetApiCall(data)
    return res;
}


export const postAccountHeadAPI= async(body: any)=>{
    let data = {
        url: endPoints?.postAccountHead,
        bodyData: body,
    }
    let res: any = await doPostApiCall(data)
    return res;
}

export const updateAccountHeadAPI= async(body: any)=>{
        let data = {
            url: endPoints?.updateAccountHead,
            bodyData: body,
        }
        let res: any = await doPutApiCall(data)
        return res;
}
