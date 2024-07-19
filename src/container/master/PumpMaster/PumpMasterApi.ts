import { doGetApiCall, doPostApiCall } from "@/utils/ApiConfig";
import { endPoints } from "@/utils/endPoints";

export const getPumpListAPI = async(id: number, type: 'pump' | 'nozzle' , pumpId?: number)=>{
    let url: string;
    switch(type){
        case 'pump':
            url=endPoints?.getPumpList(id)
            break;
        case 'nozzle':
            url=pumpId ? endPoints?.getNozzle(id, pumpId) : ''
    }
    let data = {
        url: url
    }
    let res: any = await doGetApiCall(data)
    return res;
}


export const postPumpMasterAPI= async(body: any)=>{
    let data = {
        url: endPoints?.postPumpMaster,
        bodyData: body,
    }
    let res: any = await doPostApiCall(data)
    return res;
}
