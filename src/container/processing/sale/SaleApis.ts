import { doPostApiCall } from "@/utils/ApiConfig";
import { endPoints } from "@/utils/endPoints";

export const postItemData = async (body: any) => {
  let data = {
    url: endPoints?.getGstData,
    bodyData: body,
  };
  let res: any = await doPostApiCall(data);
  return res;
};
