import { useFormik } from "formik";
import * as Yup from "yup";
import text from "@/languages/en_US.json";
import dayjs, { Dayjs } from "dayjs";
import { DateValidationError } from "@mui/x-date-pickers";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMeterOpeningAPI,
  postMeterOpeningAPI,
  updateMeterOpeningAPI,
} from "./MeterOpeningApis";
import { getMeterOpeningData } from "./MeterOpeningReducer";
import toast from "react-hot-toast";
import getSessionStorageData from "@/utils/getSessionStorageData";

export const MeterHooks = () => {
  const dispatch = useDispatch();
  const token = getSessionStorageData("token");
  const orgId = getSessionStorageData("orgId");

  //loader states
  const [loader, setLoader] = useState<boolean>(false);
  const [postLoader, setPostLoaders] = useState<boolean>(false);

  //edit data states
  const [editData, setEditData] = useState<any>(null);

  //date states
  const [openingDate, setOpeningDate] = useState<Dayjs | null>(null);
  const [openingDateError, setOpeningDateError] =
    useState<DateValidationError | null>(null);

  const nozzleOptionData = useSelector(
    (state: any) => state.pumpMasterData.nozzleData
  )?.map((data: any) => {
    return {
      name: data.Nozzle_Name,
      value: data.Id,
    };
  });

  const financialYear = useSelector(
    (state: any) => state.sideBarData?.financialYear
  );

  const handleOpeningDate = (newValue?: Dayjs) => {
    setOpeningDate(newValue || null);
    if (newValue === null) {
      setOpeningDateError("invalidDate");
    }
    if (dayjs(newValue).format("YYYY-MM-DD") < financialYear[0]?.Fin_start) {
      setOpeningDateError("minDate");
    } else if (
      dayjs(newValue).format("YYYY-MM-DD") > financialYear[0]?.Fin_To
    ) {
      setOpeningDateError("maxDate");
    } else setOpeningDateError(null);
  };

  //handle Installation date error
  const handleOpeningDateError = (newError?: DateValidationError | null) => {
    setOpeningDateError(newError || null);
    if (openingDate === null) {
      setOpeningDateError("invalidDate");
    } else {
      if (
        dayjs(openingDate).format("YYYY-MM-DD") < financialYear[0]?.Fin_start
      ) {
        setOpeningDateError("minDate");
      } else if (
        dayjs(openingDate).format("YYYY-MM-DD") > financialYear[0]?.Fin_To
      ) {
        setOpeningDateError("maxDate");
      } else setOpeningDateError(null);
    }
  };

  //error Message function
  const [errorMessage, setErrMessage] = useState<string>("");

  useEffect(() => {
    if (openingDateError === "invalidDate")
      setErrMessage(text.errors.patternErrors.meterOpening.invalidDate);
    else if (openingDateError === "minDate" || openingDateError === "maxDate")
      setErrMessage(text.errors.patternErrors.meterOpening.rangeDate);
    else setErrMessage("");
  }, [openingDateError]);

  //edit data handle function
  const handleEditData = (data: any) => {
    console.table(data);
    setEditData(data);
    setOpeningDate(dayjs(data.Open_Date));
  };

  //reset form data
  const handleResetFormData = () => {
    addMeterOpeningFormik.resetForm();
    setOpeningDate(null);
    setOpeningDateError(null);
    setEditData(null);
    setErrMessage("");
    setErrMessage("");
  };

  // meter opening add formik
  const addMeterOpeningFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      pump:
        editData && Object.keys(editData).length > 0 ? editData.Pump_Id : "",
      nozzle:
        editData && Object.keys(editData).length > 0 ? editData.Nozzle_Id : "",
      openingReading:
        editData && Object.keys(editData).length > 0 ? editData.Open_Read : 0,
    },
    validationSchema: Yup.object().shape({
      pump: Yup.string().required(text.errors.requiredErrors.meterOpening.pump),
      nozzle: Yup.string().required(
        text.errors.requiredErrors.meterOpening.nozzle
      ),
      openingReading: Yup.number()
        .positive(text.errors.patternErrors.meterOpening.openingReading)
        .required(text.errors.requiredErrors.meterOpening.openingReading),
    }),
    onSubmit: (values) => {
      if (openingDate !== null) {
        const data = {
          ...values,
          openingDate: dayjs(openingDate).format("YYYY-MM-DD"),
        };
        if (editData && Object.keys(editData).length > 0) {
          editMeterOpeningApiCall(editData.Id, orgId, data);
        } else {
          postMeterOpeningCall(orgId, data);
        }
      } else {
        setOpeningDateError("invalidDate");
      }
    },
  });

  //getting pump id value as selected
  const pumpId: number = Number(addMeterOpeningFormik.values.pump);

  //nozzle Data check
  const isNozzleExists = nozzleOptionData.some(
    (el: any) => el.id === addMeterOpeningFormik.values.nozzle
  );

  const handleNozzleChange = () => {
    if (!isNozzleExists) {
      addMeterOpeningFormik.setFieldValue("nozzle", "");
    }
  };

  //meter opening api call
  const getMeterOpeningApiCall = async (id: number) => {
    setLoader(true);
    getMeterOpeningAPI(id)
      .then((res: any) => {
        if (res.status === 200) {
          dispatch(getMeterOpeningData(res.Data));
        } else {
          dispatch(getMeterOpeningData([]));
        }
      })
      .catch((err: any) => {
        console.error(err);
        toast.error("Something went wrong");
        dispatch(getMeterOpeningData([]));
      })
      .finally(() => {
        setLoader(false);
      });
  };

  //meter opening post api call
  const postMeterOpeningCall = async (orgId: number, item: any) => {
    setPostLoaders(true);
    let bodyData = {
      org_id: orgId,
      Pump_Id: item.pump,
      Nozle_Id: item.nozzle,
      Open_Read: item.openingReading,
      Open_Date: item.openingDate,
    };
    postMeterOpeningAPI(bodyData)
      .then((res: any) => {
        if (res.status === 200) {
          getMeterOpeningApiCall(orgId);
          toast.success("Meter opening created successfully");
          // setEditData(null)
          handleResetFormData();
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong");
        setPostLoaders(false);
      })
      .finally(() => {
        setPostLoaders(false);
      });
  };

  //update meter opening api call
  const editMeterOpeningApiCall = async (
    meterOpeningId: number,
    orgId: number,
    item: any
  ) => {
    setPostLoaders(true);
    let bodyData = {
      Rate_Id: meterOpeningId,
      Pump_Id: item.pump,
      Nozle_Id: item.nozzle,
      Open_Read: item.openingReading,
      Open_Date: item.openingDate,
      org_id: orgId,
    };
    updateMeterOpeningAPI(bodyData)
      .then((res: any) => {
        if (res.status === 200) {
          getMeterOpeningApiCall(orgId);
          toast.success("Meter opening updated successfully");
          handleResetFormData();
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
    addMeterOpeningFormik,
    handleOpeningDate,
    handleOpeningDateError,
    errorMessage,
    token,
    openingDate,
    orgId,
    handleResetFormData,
    getMeterOpeningApiCall,
    loader,
    postLoader,
    pumpId,
    handleEditData,
    editData,
    handleNozzleChange,
  };
};
