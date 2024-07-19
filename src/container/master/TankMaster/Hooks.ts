import { useFormik } from "formik";
import * as Yup from "yup";
import text from "@/languages/en_US.json";
import { useState } from "react";
import {
  getTankDataAPI,
  getTankItemAPI,
  postTankDataAPI,
  updatetankDataAPI,
} from "./TankMasterApis";
import { useDispatch } from "react-redux";
import { getTankMasterData, getTankItemData } from "./TankMasterReducer";
import toast from "react-hot-toast";
import getSessionStorageData from "@/utils/getSessionStorageData";

export const TankMasterHooks = () => {
  //drawer states
  const dispatch = useDispatch();
  const orgId = getSessionStorageData("orgId");
  const token = getSessionStorageData("token");
  const [openTankMasterDrawer, setOpenTankMasterDrawer] =
    useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [postLoaders, setPostLoaders] = useState<boolean>(false);
  const [editData, setEditData]: any = useState(null);

  //handle open drawer
  const handleOpenDrawer = () => {
    setOpenTankMasterDrawer(true);
  };

  //handle close drawer
  const handleCloseDrawer = () => {
    setOpenTankMasterDrawer(false);
    setEditData(null);
    TankMasterFormik.resetForm();
  };

  //edit data handler
  const handleEditData = (data: any) => {
    handleOpenDrawer();
    setEditData(data);
    // console.log(data, '* data')
  };

  // tank master add formik
  const TankMasterFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      tankName:
        editData && Object.keys(editData).length > 0 ? editData.Tank_Name : "",
      product:
        editData && Object.keys(editData).length > 0 ? editData.Link_Item : "",
      tankDiameter:
        editData && Object.keys(editData).length > 0
          ? parseInt(editData.Tank_Diameter)
          : 0,
      tankLength:
        editData && Object.keys(editData).length > 0
          ? parseInt(editData.Tank_Length)
          : 0,
      maxVolume:
        editData && Object.keys(editData).length > 0
          ? parseInt(editData.Max_Volum)
          : 0,
    },
    validationSchema: Yup.object().shape({
      tankName: Yup.string().required(
        text.errors.requiredErrors.tankMaster.tankName
      ),
      product: Yup.string().required(
        text.errors.requiredErrors.tankMaster.product
      ),
      tankDiameter: Yup.number()
        .positive(text.errors.patternErrors.tankMaster.tankDiameter)
        .required(text.errors.requiredErrors.tankMaster.tankDiameter),
      tankLength: Yup.number()
        .positive(text.errors.patternErrors.tankMaster.tankLength)
        .required(text.errors.requiredErrors.tankMaster.tankLength),
      maxVolume: Yup.number()
        .positive(text.errors.patternErrors.tankMaster.maxVolume)
        .required(text.errors.requiredErrors.tankMaster.maxVolume),
    }),
    onSubmit: (values, { resetForm }) => {
      if (editData && Object.keys(editData).length > 0) {
        updateTankMasterApiCall(editData.Id, values, resetForm);
      } else {
        postTankApiCall(orgId, values, resetForm);
      }
    },
  });

  //get tank api call
  const getTankApiCall = async (id: number) => {
    setLoader(true);
    getTankDataAPI(id)
      .then((res: any) => {
        // console.log(res);
        if (res.status === 200) {
          dispatch(getTankMasterData(res.Data));
        } else {
          dispatch(getTankMasterData([]));
        }
      })
      .catch((err: any) => {
        toast.error(err);
        toast.error("Something went wrong");
        dispatch(getTankMasterData([]));
      })
      .finally(() => {
        setLoader(false);
      });
  };

  //get tank api call
  const getTankItemApiCall = async (id: number) => {
    setLoader(true);
    getTankItemAPI(id)
      .then((res: any) => {
        // console.log(res);
        if (res.status === 200) {
          dispatch(getTankItemData(res.Data));
        } else {
          dispatch(getTankItemData([]));
        }
      })
      .catch((err: any) => {
        toast.error(err);
        toast.error("Something went wrong");
        dispatch(getTankItemData([]));
      })
      .finally(() => {
        setLoader(false);
      });
  };

  //tank post api call
  const postTankApiCall = async (orgId: number, item: any, resetForm: any) => {
    setPostLoaders(true);
    let bodyData = {
      Tank_Name: item.tankName,
      Tank_Diameter: item.tankDiameter,
      Tank_Length: item.tankLength,
      Max_Volum: item.maxVolume,
      Link_Item: item.product,
      org_id: orgId,
    };
    postTankDataAPI(bodyData)
      .then((res: any) => {
        if (res.status === 200) {
          handleCloseDrawer();
          getTankApiCall(orgId);
          toast.success("Tank created successfully");
          // setEditData(null)
          resetForm();
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("SOmething went wrong");
      })
      .finally(() => {
        setPostLoaders(false);
      });
  };

  //item update api call
  const updateTankMasterApiCall = async (
    tankId: number,
    item: any,
    resetForm: any
  ) => {
    setPostLoaders(true);
    let bodyData = {
      Tank_Id: tankId,
      Tank_Name: item.tankName,
      Tank_Diameter: item.tankDiameter,
      Tank_Length: item.tankLength,
      Max_Volum: item.maxVolume,
      Link_Item: item.product,
      org_id: orgId,
    };
    updatetankDataAPI(bodyData)
      .then((res: any) => {
        if (res.status === 200) {
          getTankApiCall(orgId);
          toast.success("Tank edited successfully");
          handleCloseDrawer();
          setEditData(null);
          resetForm();
          //  setPostLoaders(false)
        } else {
          toast.error(res.message);
          //  setPostLoaders(false)
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
    TankMasterFormik,
    handleOpenDrawer,
    handleCloseDrawer,
    openTankMasterDrawer,
    getTankApiCall,
    getTankItemApiCall,
    orgId,
    token,
    loader,
    postLoaders,
    handleEditData,
    editData,
  };
};
