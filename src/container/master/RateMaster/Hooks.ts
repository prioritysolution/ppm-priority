import { useFormik } from "formik";
import * as Yup from "yup";
import text from "@/languages/en_US.json";
import dayjs, { Dayjs } from "dayjs";
import { useMemo, useState } from "react";
import { DateValidationError } from "@mui/x-date-pickers";
import {
  getRateMasterAPI,
  postRateMasterAPI,
  updateRateMasterAPI,
} from "./RateMasterApis";
import { useDispatch } from "react-redux";
import getSessionStorageData from "@/utils/getSessionStorageData";
import { getRateData } from "./RateMasterReducer";
import toast from "react-hot-toast";
import { LoginHooks } from "@/container/Auth/Login/Hooks";
import { getModalState } from "@/container/Auth/Login/LoginReducer";

export const RateMasterHooks = () => {
  const dispatch = useDispatch();
  const token = getSessionStorageData("token");
  const orgId = getSessionStorageData("orgId");

  //rate date states
  const [rateDate, setRateDate] = useState<Dayjs | null>(null);
  const [rateDateError, setRateDateError] =
    useState<DateValidationError | null>(null);

  //loader states
  const [loader, setLoader] = useState<boolean>(false);
  const [postLoaders, setPostLoaders] = useState<boolean>(false);

  //edit data state
  const [editData, setEditData] = useState<any>(null);

  //handle installation date
  const handleRateDate = (newValue?: Dayjs) => {
    setRateDate(newValue || null);
    if (newValue === null) {
      setRateDateError("invalidDate");
    } else {
      setRateDateError(null);
    }
  };

  //handle Installation date error
  const handleRateDateError = (newError?: DateValidationError | null) => {
    setRateDateError(newError || null);
    if (rateDate === null) {
      setRateDateError("invalidDate");
    } else {
      setRateDateError(null);
    }
  };

  //error Message function
  const errorMessage = useMemo(() => {
    switch (rateDateError) {
      case "invalidDate": {
        return text.errors.patternErrors.rateMaster.invalidDate;
      }
      default: {
        return "";
      }
    }
  }, [rateDateError]);

  //edit data handler
  const editDataHandler = (data: any) => {
    console.log(data);
    setEditData(data);
    setRateDate(dayjs(new Date(data.Valid_Date)));
  };

  //handle resetForm
  const resetFormData = () => {
    AddRateMasterFormik.resetForm();
    setRateDate(null);
    setRateDateError(null);
    setEditData(null);
  };

  // rate master add formik
  const AddRateMasterFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      rateList: [],
      // name: "",
      // itemRate: null,
    },

    // validationSchema: Yup.object().shape({
    //   rateList: Yup.array().of(
    //     Yup.object().shape({
    //       name: Yup.string().required("Item name is required"),
    //       id: Yup.number().required("Item id is required"),
    //       itemRate: Yup.number()
    //         .positive(text.errors.patternErrors.rateMaster.itemRate)
    //         .required(text.errors.requiredErrors.rateMaster.itemRate),
    //     })
    //   ),
    // }),
    validationSchema: Yup.object().shape({
      itemRate: Yup.number()
        .positive(text.errors.patternErrors.rateMaster.itemRate)
        .required(text.errors.requiredErrors.rateMaster.itemRate),
    }),
    onSubmit: (values) => {
      console.log("values form", values);
      // if (rateDate !== null) {
      //   const data = {
      //     ...values,
      //     // rateDate: dayjs(rateDate).format("YYYY-MM-DD"),
      //   };
      //   if (editData && Object.keys(editData).length > 0) {
      //     // editRateApiCall(editData.Id, orgId, data);
      //     console.log("data", data);
      //   } else {
      //     postRateApiCall(orgId, data);
      //   }
      // } else {
      //   setRateDateError("invalidDate");
      // }
    },
  });

  //rate get api call
  const getRateApiCall = async (id: number) => {
    setLoader(true);
    getRateMasterAPI(id)
      .then((res: any) => {
        // console.log(res)
        if (res.status === 200) {
          dispatch(getRateData(res.Data));
        } else {
          dispatch(getRateData([]));
        }
      })
      .catch((err: any) => {
        console.error(err);
        toast.error("Something went wrong");
        dispatch(getRateData([]));
      })
      .finally(() => {
        setLoader(false);
      });
  };

  //post api call for rate
  const postRateApiCall = async (orgId: number, item: any) => {
    setPostLoaders(true);
    let bodyData = {
      ...item,
      org_id: orgId,
    };
    console.log("data", bodyData);
    postRateMasterAPI(bodyData)
      .then((res: any) => {
        // console.log(res, '* res')
        if (res.status === 200) {
          getRateApiCall(orgId);
          dispatch(getModalState(false));
          resetFormData();
          toast.success("Rate added successfully");
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong");
      })
      .finally(() => {
        setPostLoaders(false);
      });
  };

  //edit api call for rate
  const editRateApiCall = async (rateId: number, orgId: number, item: any) => {
    setPostLoaders(true);
    let bodyData = {
      Rate_Id: rateId,
      Item_Name: item.Item_Id,
      Item_Rate: item.Item_Rate,
      Rate_Date: item.Valid_Date,
      org_id: orgId,
    };
    console.log(bodyData, "Data");
    updateRateMasterAPI(bodyData)
      .then((res: any) => {
        if (res.status === 200) {
          getRateApiCall(orgId);
          toast.success("Rate updated successfully");
          resetFormData();
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.error(err);
      })
      .finally(() => {
        setPostLoaders(false);
      });
  };
  return {
    AddRateMasterFormik,
    handleRateDate,
    handleRateDateError,
    errorMessage,
    rateDate,
    getRateApiCall,
    token,
    orgId,
    editDataHandler,
    loader,
    postLoaders,
    editData,
    resetFormData,
    postRateApiCall,
    editRateApiCall,
  };
};
