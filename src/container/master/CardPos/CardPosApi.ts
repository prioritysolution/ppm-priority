import { doGetApiCall, doPostApiCall, doPutApiCall } from "@/utils/ApiConfig";
import { endPoints } from "@/utils/endPoints";

export const getCardPosApi = async(id: number, type: 'card' | 'bank')=>{
    let url;
    switch(type){
        case 'card':
            url= endPoints.getCardPos(id)
            break;
        case 'bank':
            url= endPoints.getBankPos(id)
            break
    }
    let data = {
        url: url
    }
    let res: any = await doGetApiCall(data)
    return res;
}


export const postCardPosAPI = async (body: any) => {
    let data = {
        url: endPoints?.postCardPos,
        bodyData: body,
    }
    let res: any = await doPostApiCall(data)
    return res;
}


export const updateCardPosAPI = async (body: any) => {
    let data = {
        url: endPoints?.updateCardPos,
        bodyData: body,
    }
    let res: any = await doPutApiCall(data)
    return res;
}