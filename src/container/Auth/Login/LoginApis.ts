import { doPostApiCall } from "@/utils/ApiConfig";
import { endPoints } from "@/utils/endPoints";

export const adminLoginAPI = async (body: any, type: 'login' | 'checkRate') => {
    let url;
    switch (type) {
        case "login":
            url = endPoints.login
        break;
        case "checkRate":
            url = endPoints.checkRateLogin
    }
    let data = {
        url: url,
        bodyData: body,
    }
    let res: any = await doPostApiCall(data)
    return res;
}
