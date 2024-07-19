import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import text from "@/languages/en_US.json";
import { getItemMasterDropDownAPI, postItemMasterAPI } from "./itemMasterApis";
import { useDispatch } from "react-redux";
import {
  getItemMaster,
  getItemMasterCategory,
  getItemMasterUnit,
  getAdditionalItemData,
  getItemRateMasterData,
} from "./itemMasterReducer";
import toast from "react-hot-toast";
import getSessionStorageData from "@/utils/getSessionStorageData";

export const ItemMasterHooks = () => {
  const dispatch = useDispatch();
  const orgId = getSessionStorageData("orgId");
  const [openItemMaster, setOpenItemMaster] = useState<boolean>(false);
  const [postLoaders, setPostLoaders] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [editData, setEditData]: any = useState(null);

  // item master add formik
  const AddItemMasterFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      itemName: "",
      itemShortName: "",
      itemType: "",
      unitValue: 0,
      unit: "",
      cst: 0,
      sgst: 0,
      igst: 0,
      basicSaleRate: 0,
      rememberQnty: 0,
      openingQnty: 0,
      openingRate: 0,
      saleLedger: "",
      PurchaseLedger: "",
    },
    validationSchema: Yup.object().shape({
      itemName: Yup.string().required(
        text.errors.requiredErrors.addItemMaster.itemName
      ),
      itemShortName: Yup.string().required(
        text.errors.requiredErrors.addItemMaster.itemShortName
      ),
      itemType: Yup.string().required(
        text.errors.requiredErrors.addItemMaster.itemType
      ),
      unitValue: Yup.number()
        .positive(text.errors.patternErrors.addItemMaster.unitValue)
        .required(text.errors.requiredErrors.addItemMaster.unitValue)
        .test(
          "is-decimal",
          "The number must be a decimal with maximum 2 digits after .",
          (value) =>
            value !== undefined &&
            value !== null &&
            /^\d+(\.\d{1,2})?$/.test(value.toString())
        ),
      unit: Yup.string()
        .required(text.errors.requiredErrors.addItemMaster.unit)
        .test(
          "is-decimal",
          "The number must be a decimal with maximum 2 digits after .",
          (value) =>
            value !== undefined &&
            value !== null &&
            /^\d+(\.\d{1,2})?$/.test(value.toString())
        ),
      cst: Yup.number()
        .min(0, text.errors.patternErrors.addItemMaster.cst)
        .test(
          "is-decimal",
          "The number must be a decimal with maximum 2 digits after .",
          (value) =>
            value !== undefined &&
            value !== null &&
            /^\d+(\.\d{1,2})?$/.test(value.toString())
        ),
      // .positive(text.errors.patternErrors.addItemMaster.cst)
      // .required(text.errors.requiredErrors.addItemMaster.cst),
      sgst: Yup.number()
        .min(0, text.errors.patternErrors.addItemMaster.sgst)
        .test(
          "is-decimal",
          "The number must be a decimal with maximum 2 digits after .",
          (value) =>
            value !== undefined &&
            value !== null &&
            /^\d+(\.\d{1,2})?$/.test(value.toString())
        ),
      // .positive(text.errors.patternErrors.addItemMaster.sgst)
      // .required(text.errors.requiredErrors.addItemMaster.sgst),
      igst: Yup.number()
        .min(0, text.errors.patternErrors.addItemMaster.igst)
        .test(
          "is-decimal",
          "The number must be a decimal with maximum 2 digits after .",
          (value) =>
            value !== undefined &&
            value !== null &&
            /^\d+(\.\d{1,2})?$/.test(value.toString())
        ),
      // .positive(text.errors.patternErrors.addItemMaster.igst),
      // .required(text.errors.patternErrors.addItemMaster.igst),
      basicSaleRate: Yup.number()
        .positive(text.errors.patternErrors.addItemMaster.basicSaleRate)
        .required(text.errors.requiredErrors.addItemMaster.basicSaleRate)
        .test(
          "is-decimal",
          "The number must be a decimal with maximum 2 digits after .",
          (value) =>
            value !== undefined &&
            value !== null &&
            /^\d+(\.\d{1,2})?$/.test(value.toString())
        ),
      rememberQnty: Yup.number()
        .positive(text.errors.patternErrors.addItemMaster.rememberQnty)
        .required(text.errors.requiredErrors.addItemMaster.rememberQnty)
        .test(
          "is-decimal",
          "The number must be a decimal with maximum 2 digits after .",
          (value) =>
            value !== undefined &&
            value !== null &&
            /^\d+(\.\d{1,2})?$/.test(value.toString())
        ),
      openingQnty: Yup.number()
        .min(0, text.errors.patternErrors.addItemMaster.openingQnty)
        .test(
          "is-decimal",
          "The number must be a decimal with maximum 2 digits after .",
          (value) =>
            value !== undefined &&
            value !== null &&
            /^\d+(\.\d{1,2})?$/.test(value.toString())
        ),

      openingRate: Yup.number()
        .min(0, text.errors.patternErrors.addItemMaster.openingRate)
        .test(
          "is-decimal",
          "The number must be a decimal with maximum 2 digits after .",
          (value) =>
            value !== undefined &&
            value !== null &&
            /^\d+(\.\d{1,2})?$/.test(value.toString())
        ),
      saleLedger: Yup.number().required(
        text.errors.requiredErrors.addItemMaster.saleLedger
      ),
      purchaseLedger: Yup.number()
        .required(text.errors.requiredErrors.addItemMaster.purchaseLedger)
        .test(
          "ledger-match",
          "Purchase ledger cannot be same as sale ledger",
          function (value) {
            return value !== this.parent.saleLedger;
          }
        ),
    }),
    onSubmit: (values, { resetForm }) => {
      postItemApiCall(orgId, values, resetForm);
    },
  });

  //handle open drawer
  const handleOpenDrawer = () => {
    setOpenItemMaster(true);
  };

  //handle close drawer
  const handleCloseDrawer = () => {
    setOpenItemMaster(false);
    setEditData(null);
    AddItemMasterFormik.resetForm();
  };

  //item master dropdown unit api call
  const getItemMasterUnitApiCall = async (id: number) => {
    getItemMasterDropDownAPI(id, "unit")
      .then((res: any) => {
        if (res.status === 200) {
          dispatch(getItemMasterUnit(res.Data));
        } else {
          dispatch(getItemMasterUnit([]));
        }
      })
      .catch((err: any) => {
        console.error(err);
        toast.error("Something went wrong");
        dispatch(getItemMasterUnit([]));
      });
  };

  //item master dropdown category
  const getItemMasterCategoryApiCall = async (id: number) => {
    getItemMasterDropDownAPI(id, "category")
      .then((res: any) => {
        if (res.status === 200) {
          dispatch(getItemMasterCategory(res.Data));
        } else {
          dispatch(getItemMasterCategory([]));
        }
      })
      .catch((err: any) => {
        console.error(err);
        toast.error("Something went wrong");
        dispatch(getItemMasterCategory([]));
      });
  };

  //item get api call
  const getItemApiCall = async (id: number) => {
    setLoader(true);
    getItemMasterDropDownAPI(id, "item")
      .then((res: any) => {
        if (res.status === 200) {
          // console.log("Master", res.Data);

          dispatch(getItemMaster(res.Data));
        } else {
          dispatch(getItemMaster([]));
        }
      })
      .catch((err: any) => {
        console.error(err);
        toast.error("Something went wrong");
        dispatch(getItemMaster([]));
      })
      .finally(() => {
        setLoader(false);
      });
  };

  //aditional item get api call
  const getAdditionalItemApiCall = async (id: number) => {
    setLoader(true);
    getItemMasterDropDownAPI(id, "additional")
      .then((res: any) => {
        if (res.status === 200) {
          // console.log("Master", res.Data);

          dispatch(getAdditionalItemData(res.Data));
        } else {
          dispatch(getAdditionalItemData([]));
        }
      })
      .catch((err: any) => {
        console.error(err);
        toast.error("Something went wrong");
        dispatch(getAdditionalItemData([]));
      })
      .finally(() => {
        setLoader(false);
      });
  };

  // Rate item get api call
  const getRateItemApiCall = async (id: number) => {
    setLoader(true);
    getItemMasterDropDownAPI(id, "rate")
      .then((res: any) => {
        if (res.status === 200) {
          dispatch(getItemRateMasterData(res.Data));
        } else {
          dispatch(getItemRateMasterData([]));
        }
      })
      .catch((err: any) => {
        console.error(err);
        toast.error("Something went wrong");
        dispatch(getItemRateMasterData([]));
      })
      .finally(() => {
        setLoader(false);
      });
  };

  //item post api call
  const postItemApiCall = async (orgId: number, item: any, resetForm: any) => {
    setPostLoaders(true);
    let bodyData = {
      item_name: item.itemName,
      item_sh_name: item.itemShortName,
      item_type: item.itemType,
      unit_val: item.unitValue,
      item_unit: item.unit,
      cgst_val: item.cst,
      sgst_val: item.sgst,
      igst_val: item.igst ?? 0,
      basic_sale_rate: item.basicSaleRate,
      remember_qnty: item.rememberQnty,
      open_qnty: item.openingQnty,
      open_rate: item.openingRate,
      item_sale_gl: item.saleLedger,
      item_pur_gl: item.purchaseLedger,
      org_id: orgId,
    };
    // console.log(bodyData);

    postItemMasterAPI(bodyData)
      .then((res: any) => {
        if (res.status === 200) {
          setOpenItemMaster(false);
          getItemApiCall(orgId);
          toast.success("Item added created successfully");
          // setEditData(null)
          resetForm();
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

  return {
    handleCloseDrawer,
    handleOpenDrawer,
    openItemMaster,
    AddItemMasterFormik,
    getItemMasterUnitApiCall,
    getItemMasterCategoryApiCall,
    postLoaders,
    getItemApiCall,
    getAdditionalItemApiCall,
    getRateItemApiCall,
    loader,
  };
};
