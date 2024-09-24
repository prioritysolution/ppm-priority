import { EMAIL_REGEX } from "@/utils/constants";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import text from "@/languages/en_US.json";
import { matchIsValidTel } from "mui-tel-input";
import getSessionStorageData from "@/utils/getSessionStorageData";
import {
  getCustomerAPI,
  postCustomerAPI,
  updateCustomerAPI,
} from "./CustomerApis";
import { useDispatch } from "react-redux";
import { getCustomerData } from "./CustomerReducer";
import toast from "react-hot-toast";

export const CustomerHooks = () => {
  const dispatch = useDispatch();
  const token = getSessionStorageData("token");
  const orgId = getSessionStorageData("orgId");

  //loader states
  const [loader, setLoader] = useState<boolean>(false);
  const [postLoaders, setPostLoaders] = useState<boolean>(false);

  //customer mobile states
  const [customerMobile, setCustomerMobile] = useState<string>("");

  //customer drawer states
  const [customerDrawerOpen, setCustomerDrawerOpen] = useState<boolean>(false);

  //editData state
  const [editData, setEditData] = useState<any>(null);

  //handle open customer drawer
  const handleOpenCustomerDrawer = () => {
    setCustomerDrawerOpen(true);
  };

  //handle close customer drawer
  const handleCloseCustomerDrawer = () => {
    setCustomerDrawerOpen(false);
    AddCustomerFormik.resetForm();
    setCustomerMobile("");
    setEditData(null);
  };

  //handle mobile number change
  const handleMobileChange = (number: string) => {
    setCustomerMobile(number);
  };

  //handle Edit
  const handleEditData = (data: any) => {
    // console.log(data)
    setEditData(data);
    setCustomerMobile(data.Cust_Mobile);
    handleOpenCustomerDrawer();
  };

  //add customer formik
  const AddCustomerFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      customerName:
        editData && Object.keys(editData).length > 0 ? editData.Cust_Name : "",
      customerAddress:
        editData && Object.keys(editData).length > 0 ? editData.Cust_Addr : "",
      customerEmail:
        editData && Object.keys(editData).length > 0 ? editData.Cust_Mail : "",
      gstin:
        editData && Object.keys(editData).length > 0 ? editData.Cust_GSTIN : "",
      maxCredLimit:
        editData && Object.keys(editData).length > 0 ? editData.Max_Limit : 0,
      maxCredDays:
        editData && Object.keys(editData).length > 0
          ? editData.Max_Credit_Day
          : 0,
      openingBalance:
        editData && Object.keys(editData).length > 0 ? editData.Open_Bal : 0,
      underLedger:
        editData && Object.keys(editData).length > 0 ? editData.Link_Gl : "",
    },
    validationSchema: Yup.object().shape({
      customerName: Yup.string().required(
        text.errors.requiredErrors.customer.name
      ),
      customerAddress: Yup.string().required(
        text.errors.requiredErrors.customer.address
      ),
      customerEmail: Yup.string().matches(
        EMAIL_REGEX,
        text.errors.patternErrors.customer.email
      ),
      gstin: Yup.string(),
      maxCredLimit: Yup.number()
        .positive(text.errors.patternErrors.customer.maxCredLimit)
        .required(text.errors.requiredErrors.customer.maxCredLimit),
      maxCredDays: Yup.number()
        .positive(text.errors.patternErrors.customer.maxCredDays)
        .required(text.errors.requiredErrors.customer.maxCredDays),
      openingBalance: Yup.number(),
      underLedger: Yup.string().required(
        text.errors.requiredErrors.customer.underLedger
      ),
    }),
    onSubmit: (values) => {
      if (matchIsValidTel(customerMobile)) {
        const data = {
          ...values,
          customerMobile,
        };
        if (editData && Object.keys(editData).length > 0) {
          editCustomerApiCall(editData.Id, orgId, data);
        } else {
          postCustomerApiCall(orgId, data);
        }
      }
    },
  });

  //customer get api call
  const getCustomerApiCall = async (id: number) => {
    setLoader(true);
    getCustomerAPI(id)
      .then((res: any) => {
        // console.log(res)
        if (res.status === 200) {
          dispatch(getCustomerData(res.Data));
        } else {
          dispatch(getCustomerData([]));
        }
      })
      .catch((err: any) => {
        console.error(err);
        toast.error("Something went wrong");
        dispatch(getCustomerData([]));
      })
      .finally(() => {
        setLoader(false);
      });
  };

  //post api call for customer
  const postCustomerApiCall = async (orgId: number, item: any) => {
    setPostLoaders(true);
    let bodyData = {
      org_id: orgId,
      Cust_Name: item.customerName,
      Cust_Address: item.customerAddress,
      Cust_Mobile: item.customerMobile,
      Cust_Mail: item.customerEmail,
      Cust_GSTIN: item.gstin,
      Max_Credit_Limit: item.maxCredLimit,
      Max_Credit_Days: item.maxCredDays,
      Open_Bal: item.openingBalance,
      Link_Gl: item.underLedger,
    };
    // console.log(bodyData)
    postCustomerAPI(bodyData)
      .then((res: any) => {
        // console.log(res, '* res')
        if (res.status === 200) {
          handleCloseCustomerDrawer();
          getCustomerApiCall(orgId);
          toast.success("Customer added successfully");
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

  //edit api call for card pos
  const editCustomerApiCall = async (
    customerId: number,
    orgId: number,
    item: any
  ) => {
    setPostLoaders(true);
    let bodyData = {
      Cust_Id: customerId,
      org_id: orgId,
      Cust_Name: item.customerName,
      Cust_Address: item.customerAddress,
      Cust_Mobile: item.customerMobile,
      Cust_Mail: item.customerEmail,
      Cust_GSTIN: item.gstin,
      Max_Credit_Limit: item.maxCredLimit,
      Max_Credit_Days: item.maxCredDays,
      Open_Bal: item.openingBalance,
      Link_Gl: item.underLedger,
    };
    updateCustomerAPI(bodyData)
      .then((res: any) => {
        if (res.status === 200) {
          getCustomerApiCall(orgId);
          toast.success("Customer updated successfully");
          handleCloseCustomerDrawer();
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
    customerDrawerOpen,
    handleOpenCustomerDrawer,
    handleCloseCustomerDrawer,
    AddCustomerFormik,
    handleMobileChange,
    customerMobile,
    token,
    loader,
    postLoaders,
    orgId,
    handleEditData,
    getCustomerApiCall,
    editData,
  };
};
