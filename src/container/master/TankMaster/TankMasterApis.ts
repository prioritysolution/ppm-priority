import { doGetApiCall, doPostApiCall, doPutApiCall } from "@/utils/ApiConfig";
import { endPoints } from "@/utils/endPoints";

export const getTankDataAPI = async (id: number) => {
  let url = endPoints?.getTankMaster(id);
  let data = {
    url: url,
  };
  let res: any = await doGetApiCall(data);
  return res;
};

export const getTankItemAPI = async (id: number) => {
  let url = endPoints?.getTankItem(id);

  let data = {
    url,
  };
  let res: any = await doGetApiCall(data);
  return res;
};

export const postTankDataAPI = async (body: any) => {
  let data = {
    url: endPoints?.postTankMaster,
    bodyData: body,
  };
  let res: any = await doPostApiCall(data);
  return res;
};

export const updatetankDataAPI = async (body: any) => {
  let data = {
    url: endPoints?.updateTankMaster,
    bodyData: body,
  };
  let res: any = await doPutApiCall(data);
  return res;
};
