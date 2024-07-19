import { useFormik } from "formik";
import * as Yup from "yup";
import text from "@/languages/en_US.json";
import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DateValidationError } from "@mui/x-date-pickers";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { getAccountLedgerData } from "./AccountLedgerReducer";
import {
  getAccountLedgerApi,
  postAccountLedgerAPI,
  updateAccountLedgerAPI,
} from "./AccountLedgerApis";
import getSessionStorageData from "@/utils/getSessionStorageData";

export const AccountLedgerHooks = () => {
  //open drawer state
  const dispatch = useDispatch();
  const token = getSessionStorageData("token");
  const orgId = getSessionStorageData("orgId");

  const [openAccountLedger, setOpenAccountLedger] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [postLoaders, setPostLoaders] = useState<boolean>(false);
  const [editData, setEditData] = useState<any>(null);

  //date field state
  const [openingDate, setOpeningDate] = useState<Dayjs | null>(
    dayjs(new Date())
  );
  const [openingDateError, setOpeningDateError] =
    useState<DateValidationError | null>(null);

  // console.log(openingDate, '* date')
  /**************************************** Drawer functionalities *************************************************************/
  //handle account ledger form open
  const handleOpenAccountLedger = () => {
    setOpenAccountLedger(true);
  };

  //handle account ledger form close
  const handleCloseAccountLedger = () => {
    setOpenAccountLedger(false);
    AddAccountLedgerFormik.resetForm();
    // setOpeningDate(null);x
    setOpeningDateError(null);
    setEditData(null);
  };
  /******************************************** Drawer functionalities ends ***************************************************/

  /*******************************************  Date field functionalities ***************************************************/
  //handle opening date
  const handleOpeningDate = (newValue?: Dayjs) => {
    setOpeningDate(newValue || null);
    if (newValue === null) {
      setOpeningDateError("invalidDate");
    } else {
      setOpeningDateError(null);
    }
  };

  //handle opening date error
  const handleOpeningDateError = (newError?: DateValidationError | null) => {
    setOpeningDateError(newError || null);
    if (openingDate === null) {
      setOpeningDateError("invalidDate");
    } else {
      setOpeningDateError(null);
    }
  };

  //error Message function
  const errorMessage = React.useMemo(() => {
    switch (openingDateError) {
      case "invalidDate": {
        return text.errors.patternErrors.accountLedger.invalidDate;
      }
      default: {
        return "";
      }
    }
  }, [openingDateError]);

  /************************************** Date field functionalities ends *****************************************************/

  /************************************* Edit functionalities *******************************************/

  const editAccountLedger = (data: any) => {
    // console.log(data)
    setEditData(data);
    setOpenAccountLedger(true);
    setOpeningDate(dayjs(data.Open_Date));
  };

  /************************************* Edit functionality ends **************************************/

  /************************************** Formik starts********************************* */
  // item category add formik
  const AddAccountLedgerFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ledgerName:
        editData && Object.keys(editData).length > 0 ? editData.Acct_Name : "",
      ledgerCode:
        editData && Object.keys(editData).length > 0
          ? editData.Account_Code
          : 0,
      accountHead:
        editData && Object.keys(editData).length > 0 ? editData.Acct_Head : "",
      openingBalance:
        editData && Object.keys(editData).length > 0 ? editData.Open_Bal : 0,
    },
    validationSchema: Yup.object().shape({
      ledgerName: Yup.string().required(
        text.errors.requiredErrors.accountLedger.ledgerName
      ),

      ledgerCode: Yup.number()
        .positive(text.errors.patternErrors.accountLedger.ledgerCode)
        .required(text.errors.requiredErrors.accountLedger.ledgerCode),
      accountHead: Yup.string().required(
        text.errors.requiredErrors.accountLedger.accountHead
      ),
      openingBalance: Yup.number()
        .min(0, text.errors.patternErrors.accountLedger.openingBalance)
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
      if (openingDate !== null) {
        const data = {
          ...values,
          openingDate: dayjs(openingDate).format("YYYY-MM-DD"),
        };
        if (editData && Object.keys(editData).length > 0) {
          editAccountLedgerApiCall(editData.Id, orgId, data);
        } else {
          postAccountLedgerApiCall(orgId, data);
        }
        // setOpeningDate(null)
      } else {
        setOpeningDateError("invalidDate");
      }
    },
  });
  /********************************************* Formik ends ************************************************************/

  /********************************************* Api calls starts *****************************************************/
  //get api call for account ledger
  const getAccountLedgerApiCall = async (id: number) => {
    setLoader(true);
    getAccountLedgerApi(id)
      .then((res: any) => {
        if (res.status === 200) {
          dispatch(getAccountLedgerData(res.Data));
        } else {
          dispatch(getAccountLedgerData([]));
        }
      })
      .catch((err: any) => {
        console.error(err);
        toast.error("Something went wrong");
        dispatch(getAccountLedgerData([]));
      })
      .finally(() => {
        setLoader(false);
      });
  };

  //post api call for account ledger
  const postAccountLedgerApiCall = async (orgId: number, item: any) => {
    setPostLoaders(true);
    let bodyData = {
      Acct_Name: item.ledgerName,
      Acct_Code: item.ledgerCode,
      Acct_Head: item.accountHead,
      org_id: orgId,
      Open_Bal: item.openingBalance,
      Open_Date: item.openingDate,
    };
    postAccountLedgerAPI(bodyData)
      .then((res: any) => {
        // console.log(res, '* res')
        if (res.status === 200) {
          handleCloseAccountLedger();
          getAccountLedgerApiCall(orgId);
          toast.success("Account ledger created successfully");
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

  //edit api call for account ledger
  const editAccountLedgerApiCall = async (
    acctId: number,
    orgId: number,
    item: any
  ) => {
    setPostLoaders(true);
    let bodyData = {
      Acct_Id: acctId,
      Acct_Name: item.ledgerName,
      Acct_Code: item.ledgerCode,
      Acct_Head: item.accountHead,
      Open_Bal: item.openingBalance,
      Open_Date: item.openingDate,
      org_id: orgId,
    };
    updateAccountLedgerAPI(bodyData)
      .then((res: any) => {
        if (res.status === 200) {
          getAccountLedgerApiCall(orgId);
          toast.success("Account ledger updated successfully");
          handleCloseAccountLedger();
          setEditData(null);
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
    token,
    orgId,
    loader,
    AddAccountLedgerFormik,
    handleCloseAccountLedger,
    handleOpenAccountLedger,
    openAccountLedger,
    errorMessage,
    handleOpeningDate,
    handleOpeningDateError,
    openingDate,
    getAccountLedgerApiCall,
    postLoaders,
    editAccountLedger,
    editData,
  };
};
