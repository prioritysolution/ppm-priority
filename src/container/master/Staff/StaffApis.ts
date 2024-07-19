import { doGetApiCall, doPostApiCall, doPutApiCall } from "@/utils/ApiConfig";
import { endPoints } from "@/utils/endPoints";

export const getStaffAPI = async(id: number, type: 'type' | 'designation' | 'staff')=>{
    let url;
    switch(type){
        case 'type':
            url=endPoints.getStaffType(id)
            break;
        case 'designation':
            url=endPoints.getStaffDesignation(id)
            break;
        case "staff":
            url=endPoints.getStaff(id)
    }
    let data = {
        url: url,
    }
    let res: any = await doGetApiCall(data)
    return res;
}

export const postStaffAPI= async(body: any)=>{
    let data = {
        url: endPoints?.postStaff,
        bodyData: body,
    }
    let res: any = await doPostApiCall(data)
    return res;
}


export const updateStaffAPI = async (body: any) => {
    let data = {
        url: endPoints?.updateStaff,
        bodyData: body,
    }
    let res: any = await doPutApiCall(data)
    return res;
}