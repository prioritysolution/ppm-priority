import getSessionStorageData from "@/utils/getSessionStorageData";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { getStaffAPI, postStaffAPI, updateStaffAPI } from "./StaffApis";
import {
  getStaffData,
  getStaffDesignation,
  getStaffType,
} from "./StaffReducer";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import text from "@/languages/en_US.json";
import { EMAIL_REGEX } from "@/utils/constants";
import { DateValidationError } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { matchIsValidTel } from "mui-tel-input";

export const StaffHooks = () => {
  const dispatch = useDispatch();
  const token = getSessionStorageData("token");
  const orgId = getSessionStorageData("orgId");

  //loader states
  const [loader, setLoader] = useState<boolean>(false);
  const [postLoaders, setPostLoaders] = useState<any>(null);

  //drawer states
  const [staffDrawerOpen, setStaffDrawerOpen] = useState<boolean>(false);

  //staff mobile states
  const [staffMobile, setStaffMobile] = useState<string>("");

  //date field state
  const [joiningDate, setJoiningDate] = useState<Dayjs | null>(null);
  const [joiningDateError, setJoiningDateError] =
    useState<DateValidationError | null>(null);

  //edit states
  const [editData, setEditData] = useState<any>(null);

  //handle opening date
  const handleJoiningDate = (newValue?: Dayjs) => {
    setJoiningDate(newValue || null);
    if (newValue === null) {
      setJoiningDateError("invalidDate");
    } else {
      setJoiningDateError(null);
    }
  };

  //handle Joining date error
  const handleJoiningDateError = (newError?: DateValidationError | null) => {
    setJoiningDateError(newError || null);
    if (joiningDate === null) {
      setJoiningDateError("invalidDate");
    } else {
      setJoiningDateError(null);
    }
  };

  //error Message function
  const errorMessage = useMemo(() => {
    switch (joiningDateError) {
      case "invalidDate": {
        return text.errors.patternErrors.accountLedger.invalidDate;
      }
      default: {
        return "";
      }
    }
  }, [joiningDateError]);

  //handle staff drawer open
  const handleOpenDrawer = () => {
    setStaffDrawerOpen(true);
  };

  //handle staff drawer close
  const handleCloseDrawer = () => {
    setStaffDrawerOpen(false);
    AddStaffFormik.resetForm();
    setJoiningDate(null);
    setJoiningDateError(null);
    setEditData(null);
  };

  //handle staff phone number
  const handleStaffMobileChange = (number: string) => {
    setStaffMobile(number);
  };

  //handle edit data
  const handleEditData = (data: any) => {
    console.log(data);
    setEditData(data);
    setJoiningDate(dayjs(data.Join_Date));
    setStaffMobile(data.Staff_Mobile);
    handleOpenDrawer();
  };

  //staff formik
  const AddStaffFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      staffName:
        editData && Object.keys(editData).length > 0 ? editData.Staff_Name : "",
      staffAddress:
        editData && Object.keys(editData).length > 0 ? editData.Staff_Addr : "",
      staffEmail:
        editData && Object.keys(editData).length > 0 ? editData.Staff_Mail : "",
      staffType:
        editData && Object.keys(editData).length > 0 ? editData.Staff_Type : "",
      designation:
        editData && Object.keys(editData).length > 0 ? editData.Staff_Deg : "",
      basic:
        editData && Object.keys(editData).length > 0 ? editData.Basic_Pay : 0,
      da: editData && Object.keys(editData).length > 0 ? editData.DA_Pay : 0,
      hra: editData && Object.keys(editData).length > 0 ? editData.HRA_Pay : 0,
      ta: editData && Object.keys(editData).length > 0 ? editData.TA_Pay : 0,
      misc:
        editData && Object.keys(editData).length > 0 ? editData.Misc_Pay : 0,
      pf: editData && Object.keys(editData).length > 0 ? editData.PF_Ded : 0,
    },
    validationSchema: Yup.object().shape({
      staffName: Yup.string().required(
        text.errors.requiredErrors.addStaffMaster.staffName
      ),
      staffAddress: Yup.string().required(
        text.errors.requiredErrors.addStaffMaster.staffAddress
      ),
      staffEmail: Yup.string()
        .matches(
          EMAIL_REGEX,
          text.errors.patternErrors.addStaffMaster.staffEmail
        )
        .required(text.errors.requiredErrors.addStaffMaster.staffEmail),
      staffType: Yup.string().required(
        text.errors.requiredErrors.addStaffMaster.staffType
      ),
      designation: Yup.string().required(
        text.errors.requiredErrors.addStaffMaster.designation
      ),
      basic: Yup.number()
        .positive(text.errors.patternErrors.addStaffMaster.basic)
        .required(text.errors.requiredErrors.addStaffMaster.basic)
        .test(
          "is-decimal",
          "The number must be a decimal with maximum 2 digits after .",
          (value) =>
            value !== undefined &&
            value !== null &&
            /^\d+(\.\d{1,2})?$/.test(value.toString())
        ),
      da: Yup.number()
        .min(0, text.errors.patternErrors.addStaffMaster.da)
        .test(
          "is-decimal",
          "The number must be a decimal with maximum 2 digits after .",
          (value) =>
            value !== undefined &&
            value !== null &&
            /^\d+(\.\d{1,2})?$/.test(value.toString())
        ),
      hra: Yup.number()
        .min(0, text.errors.patternErrors.addStaffMaster.hra)
        .test(
          "is-decimal",
          "The number must be a decimal with maximum 2 digits after .",
          (value) =>
            value !== undefined &&
            value !== null &&
            /^\d+(\.\d{1,2})?$/.test(value.toString())
        ),
      ta: Yup.number()
        .min(0, text.errors.patternErrors.addStaffMaster.ta)
        .test(
          "is-decimal",
          "The number must be a decimal with maximum 2 digits after .",
          (value) =>
            value !== undefined &&
            value !== null &&
            /^\d+(\.\d{1,2})?$/.test(value.toString())
        ),
      misc: Yup.number()
        .min(0, text.errors.patternErrors.addStaffMaster.misc)
        .test(
          "is-decimal",
          "The number must be a decimal with maximum 2 digits after .",
          (value) =>
            value !== undefined &&
            value !== null &&
            /^\d+(\.\d{1,2})?$/.test(value.toString())
        ),
      pf: Yup.number()
        .min(0, text.errors.patternErrors.addStaffMaster.pf)
        .test(
          "is-decimal",
          "The number must be a decimal with maximum 2 digits after .",
          (value) =>
            value !== undefined &&
            value !== null &&
            /^\d+(\.\d{1,2})?$/.test(value.toString())
        ),
    }),
    onSubmit: (values) => {
      if (joiningDate !== null && matchIsValidTel(staffMobile)) {
        const data = {
          ...values,
          joiningDate: dayjs(joiningDate).format("YYYY-MM-DD"),
          staffMobile,
        };
        if (editData && Object.keys(editData).length > 0) {
          editStaffApiCall(editData.Id, orgId, data);
        } else {
          postStaffApiCall(orgId, data);
        }
      } else {
        setJoiningDateError("invalidDate");
      }
      // const data = {
      //     ...values,
      //     joiningDate,
      //     staffMobile
      // }
      // console.log(data)
    },
  });

  //empty Dispatch
  const emptyDispatch = (type: "type" | "designation" | "staff") => {
    if (type === "staff") {
      dispatch(getStaffData([]));
    } else if (type === "designation") {
      dispatch(getStaffDesignation([]));
    } else if (type === "type") {
      dispatch(getStaffType([]));
    }
  };

  //get staff Api Call
  const getStaffApiCall = async (
    id: number,
    type: "type" | "designation" | "staff"
  ) => {
    setLoader(true);
    getStaffAPI(id, type)
      .then((res: any) => {
        // console.log(res)
        if (res.status === 200) {
          if (type === "staff") {
            dispatch(getStaffData(res.Data));
          } else if (type === "designation") {
            dispatch(getStaffDesignation(res.Data));
          } else if (type === "type") {
            dispatch(getStaffType(res.Data));
          }
        } else {
          emptyDispatch(type);
        }
      })
      .catch((err: any) => {
        toast.error(err);
        toast.error("Something went wrong");
        emptyDispatch(type);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  //post api call for staff
  const postStaffApiCall = async (orgId: number, item: any) => {
    setPostLoaders(true);
    let bodyData = {
      Staff_Name: item.staffName,
      Staff_Addr: item.staffAddress,
      Staff_Mob: item.staffMobile,
      Staff_mail: item.staffEmail,
      Staff_Type: item.staffType,
      Staff_Deg: item.designation,
      Staff_Join: item.joiningDate,
      Staff_Basic: item.basic,
      Staff_DA: item.da,
      Staff_HRA: item.hra,
      Staff_TA: item.ta,
      Staff_Misc: item.misc,
      Staff_PF: item.pf,
      org_id: orgId,
    };
    // console.log(bodyData)
    postStaffAPI(bodyData)
      .then((res: any) => {
        // console.log(res, '* res')
        if (res.status === 200) {
          handleCloseDrawer();
          getStaffApiCall(orgId, "staff");
          toast.success("Staff added successfully");
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

  //edit api call for staff
  const editStaffApiCall = async (
    staffId: number,
    orgId: number,
    item: any
  ) => {
    setPostLoaders(true);
    let bodyData = {
      Staff_Id: staffId,
      Staff_Name: item.staffName,
      Staff_Addr: item.staffAddress,
      Staff_Mob: item.staffMobile,
      Staff_mail: item.staffEmail,
      Staff_Type: item.staffType,
      Staff_Deg: item.designation,
      Staff_Join: item.joiningDate,
      Staff_Basic: item.basic,
      Staff_DA: item.da,
      Staff_HRA: item.hra,
      Staff_TA: item.ta,
      Staff_Misc: item.misc,
      Staff_PF: item.pf,
      org_id: orgId,
    };
    updateStaffAPI(bodyData)
      .then((res: any) => {
        if (res.status === 200) {
          getStaffApiCall(orgId, "staff");
          toast.success("Staff details updated successfully");
          handleCloseDrawer();
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
    handleCloseDrawer,
    handleOpenDrawer,
    staffDrawerOpen,
    AddStaffFormik,
    joiningDate,
    handleJoiningDate,
    errorMessage,
    handleJoiningDateError,
    handleStaffMobileChange,
    staffMobile,
    getStaffApiCall,
    token,
    orgId,
    loader,
    postLoaders,
    handleEditData,
  };
};
