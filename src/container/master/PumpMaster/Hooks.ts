import { useFormik } from "formik";
import * as Yup from "yup";
import text from "@/languages/en_US.json";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPumpListAPI, postPumpMasterAPI } from "./PumpMasterApi";
import { getNozzleData, getPumpMasterData } from "./PumpMasterReducer";
import toast from "react-hot-toast";
import { nozzleData } from "@/types/data-types";
import getSessionStorageData from "@/utils/getSessionStorageData";

interface pumpData {
  pumpName: string;
  nozzleNumber: number;
}

export const PumpMasterHooks = () => {
  const dispatch = useDispatch();
  const [showNozzleForm, setShowNozzleForm] = useState<boolean>(false);
  const [addNozzleData, setAddNozzleData]: any = useState([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [nozzleNumberError, setNozzleNumberError] = useState<string>("");
  const [pumpData, setPumpData] = useState<pumpData>({
    nozzleNumber: 0,
    pumpName: "",
  });
  const [editNozzle, setEditNozzle] = useState<nozzleData>({
    id: null,
    nozzleName: "",
    tankName: "",
    tankId: null,
  });

  const [postLoaders, setPostLoaders] = useState<boolean>(false);
  const orgId = getSessionStorageData("orgId");
  const token = getSessionStorageData("token");
  const tankMasterData = useSelector(
    (state: any) => state.tankMasterData?.tankMasterData
  )?.map((data: any) => {
    return {
      name: data.Tank_Name,
      value: data.Id,
    };
  });

  // pump master add formik
  const AddPumpMasterFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      pumpName: "",
      nozzleNumber: 0,
      // nozzleName: ''
    },
    validationSchema: Yup.object().shape({
      pumpName: Yup.string().required(
        text.errors.requiredErrors.addPumpMaster.pumpName
      ),
      nozzleNumber: Yup.number()
        .positive(text.errors.patternErrors.addPumpMaster.nozzleNumber)
        .required(text.errors.requiredErrors.addPumpMaster.nozzleNumber),
      // nozzleName: Yup.string()
      //     .required(text.errors.requiredErrors.addPumpMaster.nozzleName)
    }),
    onSubmit: (values, { resetForm }) => {
      // console.log(values, '* values')
      setPumpData({
        nozzleNumber: values.nozzleNumber,
        pumpName: values.pumpName,
      });
      setShowNozzleForm(true);
      resetForm();
    },
  });

  // add Nozzle formik
  const AddNozzleFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      nozzleName:
        editNozzle &&
        Object.keys(editNozzle).length > 0 &&
        editNozzle.id !== null
          ? editNozzle.nozzleName
          : "",
      tankName:
        editNozzle &&
        Object.keys(editNozzle).length > 0 &&
        editNozzle.id !== null
          ? editNozzle.tankId
          : "",
      // nozzleName: ''`
    },
    validationSchema: Yup.object().shape({
      nozzleName: Yup.string().required(
        text.errors.requiredErrors.addPumpMaster.nozzleName
      ),
      tankName: Yup.string().required(
        text.errors.requiredErrors.addPumpMaster.selectTank
      ),
      // nozzleName: Yup.string()
      //     .required(text.errors.requiredErrors.addPumpMaster.nozzleName)
    }),
    onSubmit: (values, { resetForm }) => {
      const tankData =
        tankMasterData &&
        tankMasterData.filter((data: any) => data.value === values.tankName);
      // if(nozzleNumber<=addNozzleData.length ){
      // console.log(nozzleNumber, '* noz no')
      // console.log(addNozzleData.length, '* noz data len')
      if (
        editNozzle &&
        Object.keys(editNozzle).length > 0 &&
        editNozzle.id !== null
      ) {
        setAddNozzleData((prev: any) =>
          prev.map((currRow: any, idx: number) => {
            if (idx !== editNozzle.id) return currRow;
            else
              return {
                nozzleName: values.nozzleName,
                tankId: tankData[0].value,
                tankName: tankData[0].name,
              };
          })
        );
        setEditNozzle({
          id: null,
          nozzleName: "",
          tankName: "",
          tankId: null,
        });
        resetForm();
      } else {
        if (pumpData.nozzleNumber > addNozzleData.length) {
          setAddNozzleData((prev: any) => [
            ...prev,
            {
              nozzleName: values.nozzleName,
              tankId: tankData[0].value,
              tankName: tankData[0].name,
            },
          ]);
        } else {
          setNozzleNumberError("You cannot add more nozzles");
        }
        resetForm();
      }
    },
  });

  //cleanup reducers
  const clearDispatchByType = (type: "pump" | "nozzle") => {
    switch (type) {
      case "nozzle":
        dispatch(getNozzleData([]));
        break;
      case "pump":
        dispatch(getPumpMasterData([]));
        break;
      default:
        dispatch(getNozzleData([]));
        dispatch(getPumpMasterData([]));
        break;
    }
  };

  //get pump master data
  const getPumpMasterApiCall = async (
    id: number,
    type: "pump" | "nozzle",
    pumpId?: number
  ) => {
    setLoader(true);
    getPumpListAPI(id, type, pumpId)
      .then((res: any) => {
        if (res.status === 200) {
          switch (type) {
            case "pump":
              dispatch(getPumpMasterData(res.Data));
              break;
            case "nozzle":
              dispatch(getNozzleData(res.Data));
          }
          // console.log(res)
        } else {
          clearDispatchByType(type);
        }
      })
      .catch((err: any) => {
        toast.error(err);
        toast.error("Something went wrong");
        clearDispatchByType(type);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  //handle nozzle delete functionality
  const handleNozzleDelete = (id: number) => {
    setAddNozzleData((prev: any) =>
      prev.filter((_: any, index: number) => index !== id)
    );
  };

  //handle nozzle edit functionality
  const handleNozzleEdit = (editData: nozzleData) => {
    // console.log(editData, '* edit')
    setEditNozzle({
      id: editData.id,
      nozzleName: editData.nozzleName,
      tankName: editData.tankName,
      tankId: editData.tankId,
    });
  };

  //post data to api
  const addDataToApi = () => {
    if (addNozzleData.length < pumpData.nozzleNumber) {
      setNozzleNumberError(
        `Please add ${
          pumpData.nozzleNumber - addNozzleData.length
        } more nozzles`
      );
    } else {
      const data = {
        pumpName: pumpData.pumpName,
        nozzleNumber: pumpData.nozzleNumber,
        nozzleData: addNozzleData,
      };
      postPumpApiCall(orgId, data);
    }
  };

  //pump post api call
  const postPumpApiCall = async (orgId: number, data: any) => {
    setPostLoaders(true);
    let bodyData = {
      Pump_Name: data.pumpName,
      No_Nozzel: data.nozzleNumber,
      Nozzel_Data: data.nozzleData,
      org_id: orgId,
    };
    postPumpMasterAPI(bodyData)
      .then((res: any) => {
        // console.log(res)
        if (res.status === 200) {
          setShowNozzleForm(false);
          setNozzleNumberError("");
          setAddNozzleData([]);
          getPumpMasterApiCall(orgId, "pump");
          toast.success("Pump added successfully");
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

  return {
    AddPumpMasterFormik,
    showNozzleForm,
    AddNozzleFormik,
    addNozzleData,
    tankMasterData,
    getPumpMasterApiCall,
    loader,
    nozzleNumberError,
    handleNozzleDelete,
    addDataToApi,
    handleNozzleEdit,
    token,
    orgId,
    postLoaders,
  };
};
