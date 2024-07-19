import { useFormik } from "formik";
import { useMemo, useState } from "react";
import * as Yup from "yup";
import text from "@/languages/en_US.json";
import { DateValidationError } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import getSessionStorageData from "@/utils/getSessionStorageData";
import {
  getBankAccountApi,
  postBankAccountAPI,
  updateBankAccountAPI,
} from "./BankAccountApis";
import { useDispatch } from "react-redux";
import { getBankAccountData } from "./BankAccountReducer";
import toast from "react-hot-toast";

export const BankAccountHooks = () => {
  const token = getSessionStorageData("token");
  const orgId = getSessionStorageData("orgId");
  const dispatch = useDispatch();

  //loading states
  const [loader, setLoader] = useState<boolean>(false);
  const [postLoaders, setPostLoaders] = useState<boolean>(false);

  //drawer states
  const [openBankAccountDrawer, setOpenBankAccountDrawer] =
    useState<boolean>(false);

  //date field state
  const [openingDate, setOpeningDate] = useState<Dayjs | null>(null);
  const [openingDateError, setOpeningDateError] =
    useState<DateValidationError | null>(null);

  //edit data state
  const [editData, setEditData] = useState<any>(null);

  //open bank account drawer
  const handleOpenBankAccountDrawer = () => {
    setOpenBankAccountDrawer(true);
  };

  //close bank account drawer
  const handleCloseBankAccountDrawer = () => {
    setOpenBankAccountDrawer(false);
    AddBankAccountFormik.resetForm();
    setOpeningDate(null);
    setOpeningDateError(null);
    setEditData(null);
  };

  //handle edit data

  const handleEditData = (data: any) => {
    // console.log(data)
    setOpenBankAccountDrawer(true);
    setEditData(data);
    setOpeningDate(dayjs(data.Open_Date));
  };

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
  const errorMessage = useMemo(() => {
    switch (openingDateError) {
      case "invalidDate": {
        return text.errors.patternErrors.bankAccount.invalidDate;
      }
      default: {
        return "";
      }
    }
  }, [openingDateError]);

  //bank account formik
  const AddBankAccountFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      bankName:
        editData && Object.keys(editData).length > 0 ? editData.Acct_Name : "",
      bankBranch:
        editData && Object.keys(editData).length > 0
          ? editData.Bank_Branch
          : "",
      bankIfsc:
        editData && Object.keys(editData).length > 0 ? editData.Bank_IFSC : "",
      accountNo:
        editData && Object.keys(editData).length > 0
          ? editData.Bank_Account_No
          : 0,
      underLedger:
        editData && Object.keys(editData).length > 0 ? editData.Under_Gl : "",
      openingBalance:
        editData && Object.keys(editData).length > 0 ? editData.Open_Bal : 0,
    },
    validationSchema: Yup.object().shape({
      bankName: Yup.string().required(
        text.errors.requiredErrors.bankAccount.bankName
      ),
      bankBranch: Yup.string().required(
        text.errors.requiredErrors.bankAccount.bankBranch
      ),
      bankIfsc: Yup.string().required(
        text.errors.requiredErrors.bankAccount.bankIfSc
      ),
      accountNo: Yup.number()
        .positive(text.errors.patternErrors.bankAccount.accountNo.positive)
        .required(text.errors.requiredErrors.bankAccount.accountNo)
        .integer(text.errors.patternErrors.bankAccount.accountNo.notDecimal),
      underLedger: Yup.string().required(
        text.errors.requiredErrors.bankAccount.underLedger
      ),
      openingBalance: Yup.number()
        .min(0, text.errors.patternErrors.bankAccount.openingBalance)
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
          editBankAccountApiCall(editData.Id, orgId, data);
        } else {
          postBankAccountApiCall(orgId, data);
        }
      } else {
        setOpeningDateError("invalidDate");
      }
    },
  });

  //bank account get api call
  const getBankAccountApiCall = async (id: number) => {
    setLoader(true);
    getBankAccountApi(id)
      .then((res: any) => {
        if (res.status === 200) {
          dispatch(getBankAccountData(res.Data));
        } else {
          dispatch(getBankAccountData([]));
        }
      })
      .catch((err: any) => {
        console.error(err);
        toast.error("Something went wrong");
        dispatch(getBankAccountData([]));
      })
      .finally(() => {
        setLoader(false);
      });
  };

  //post api call for bank account
  const postBankAccountApiCall = async (orgId: number, item: any) => {
    setPostLoaders(true);
    let bodyData = {
      Bank_Name: item.bankName,
      Bank_Branch: item.bankBranch,
      Bank_IFSC: item.bankIfsc,
      Account_No: item.accountNo,
      Link_GL: item.underLedger,
      Open_Bal: item.openingBalance,
      Open_Date: item.openingDate,
      org_id: orgId,
    };
    // console.log(bodyData)
    postBankAccountAPI(bodyData)
      .then((res: any) => {
        // console.log(res, '* res')
        if (res.status === 200) {
          handleCloseBankAccountDrawer();
          getBankAccountApiCall(orgId);
          toast.success("Bank account added successfully");
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

  //edit api call for bank account
  const editBankAccountApiCall = async (
    bankId: number,
    orgId: number,
    item: any
  ) => {
    setPostLoaders(true);
    let bodyData = {
      Bank_Id: bankId,
      Bank_Name: item.bankName,
      Bank_Branch: item.bankBranch,
      Bank_IFSC: item.bankIfsc,
      Account_No: item.accountNo,
      Link_GL: item.underLedger,
      Open_Bal: item.openingBalance,
      Open_Date: item.openingDate,
      org_id: orgId,
    };
    updateBankAccountAPI(bodyData)
      .then((res: any) => {
        if (res.status === 200) {
          getBankAccountApiCall(orgId);
          toast.success("Bank account updated successfully");
          handleCloseBankAccountDrawer();
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
    AddBankAccountFormik,
    openBankAccountDrawer,
    handleOpenBankAccountDrawer,
    handleCloseBankAccountDrawer,
    handleOpeningDate,
    openingDate,
    handleOpeningDateError,
    errorMessage,
    getBankAccountApiCall,
    handleEditData,
    postLoaders,
    loader,
    editData,
  };
};
