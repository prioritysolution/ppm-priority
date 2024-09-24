import { doGetApiCall, doPostApiCall } from "@/utils/ApiConfig";
import { endPoints } from "@/utils/endPoints";

export const postItemData = async (body: any) => {
  let data = {
    url: endPoints?.getGstData,
    bodyData: body,
  };
  let res: any = await doPostApiCall(data);
  return res;
};

export const getPertoliumItemRate = async (body: any) => {
  let data = {
    url: endPoints?.getPetroliumItemRate,
    bodyData: body,
  };
  let res: any = await doPostApiCall(data);
  return res;
};

export const getCustomerData = async (orgId: number, custId: number) => {
  let data = {
    url: endPoints?.getCustomerDetails(orgId, custId),
  };

  let res: any = await doGetApiCall(data);
  return res;
};
