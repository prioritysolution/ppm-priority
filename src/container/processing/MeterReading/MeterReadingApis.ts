import { doGetApiCall, doPostApiCall } from "@/utils/ApiConfig";
import { endPoints } from "@/utils/endPoints";

export const postMeterReadingData = async (
  body: any,
  type: "reading" | "gst"
) => {
  let url;
  if (type === "reading") {
    url = endPoints?.getReadingData;
  } else if (type === "gst") {
    url = endPoints?.getGstData;
  }
  let data = {
    url: url,
    bodyData: body,
  };
  let res: any = await doPostApiCall(data);
  return res;
};

export const getNoteDenomApi = async () => {
  let data = {
    url: endPoints?.getNoteDenom,
  };
  let res: any = await doGetApiCall(data);
  return res;
};

export const postProcessMeterReadData = async (body: any) => {
  let data = {
    url: endPoints.postProcessMeterRead,
    bodyData: body,
  };

  let res: any = await doPostApiCall(data);
  return res;
};
