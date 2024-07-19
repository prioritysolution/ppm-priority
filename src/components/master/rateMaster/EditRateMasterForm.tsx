import { ButtonFieldInput, FlexBetween, FlexItemCenter } from "@/common";
import { Grid, Typography } from "@mui/material";
import { FC } from "react";
import text from "@/languages/en_US.json";
import dayjs, { Dayjs } from "dayjs";
import { useSelector } from "react-redux";
import { WarningAmberOutlined } from "@mui/icons-material";

import * as Yup from "yup";

// import { itemList } from "./tempItems";

import { Formik, Field, FieldArray, Form, ErrorMessage } from "formik";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { RateMasterHooks } from "@/container/master/RateMaster/Hooks";

import getSessionStorageData from "@/utils/getSessionStorageData";
import toast from "react-hot-toast";

interface EditRateMasterFormProps {
  editData: any;
  postLoaders: boolean;
  editRateApiCall: any;
  setOpenEditModal: any;
}

const EditRateMasterForm: FC<EditRateMasterFormProps> = ({
  editData,
  postLoaders,
  editRateApiCall,
  setOpenEditModal,
}) => {
  const orgId = getSessionStorageData("orgId");
  return (
    <>
      <Formik
        // initialValues={formik?.initialValues}
        // onSubmit={handleSubmit}
        // validationSchema={formik?.validationSchema}
        // enableReinitialize
        initialValues={editData}
        validationSchema={Yup.object().shape({
          Id: Yup.number().required(),
          Item_Id: Yup.number().required(),
          Item_Rate: Yup.number()
            .positive(text.errors.patternErrors.rateMaster.itemRate)
            .required(text.errors.requiredErrors.rateMaster.itemRate)
            .test(
              "is-decimal",
              "The number must be a decimal with maximum 2 digits after .",
              (value) =>
                value !== undefined &&
                value !== null &&
                /^\d+(\.\d{1,2})?$/.test(value.toString())
            ),
        })}
        onSubmit={(values: {
          Id: number;
          Item_Id: number;
          Item_Name: string;
          Item_Rate: number;
          Valid_Date: Date;
        }) => {
          if (values.Item_Rate !== editData.Item_Rate) {
            editRateApiCall(values.Id, orgId, values);

            console.log(values);
            setOpenEditModal(false);
          } else {
            toast.error("Please enter new rate");
          }
        }}
        enableReinitialize
      >
        {({ values, errors, handleChange, resetForm, touched }) => (
          <Form autoComplete="off">
            <Grid
              container
              spacing={1}
              className="px-3 py-5"
              alignItems={`center`}
            >
              <Grid xs={12} sm={12} md={3} lg={3} xl={3} item>
                <Typography>{values?.Item_Name}</Typography>
              </Grid>
              <Grid xs={12} sm={12} md={6} lg={6} xl={6} item>
                <Field
                  name={`Item_Rate`}
                  value={values.Item_Rate}
                  onChange={handleChange}
                  color={`success`}
                  type="number"
                  className="w-full px-3 py-3 outline-none border"
                  sx={{
                    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                      {
                        display: "none",
                      },
                    "& input[type=number]": {
                      MozAppearance: "textfield",
                    },
                  }}
                  placeholder={text.placeholders.rateMaster.itemRate}
                  error={touched?.Item_Rate && Boolean(errors?.Item_Rate)}
                  helperText={touched?.Item_Rate && errors?.Item_Rate}
                />
                <ErrorMessage name={`Item_Rate`}>
                  {(errMessage) => (
                    <div className="text-red-500">{errMessage}</div>
                  )}
                </ErrorMessage>
              </Grid>
              <Grid xs={12} sm={12} md={3} lg={3} xl={3} item>
                <p>{dayjs(values?.Valid_Date).format("DD-MM-YYYY")}</p>
              </Grid>
            </Grid>
            <FlexItemCenter className="w-full  p-5">
              <FlexBetween className="flex-row-reverse w-full">
                <ButtonFieldInput
                  // name={
                  //   editData && Object.keys(editData).length > 0 ? text.buttonNames.update
                  //     : text.buttonNames.add
                  // }
                  name={text.buttonNames.update}
                  buttonextracls={`rounded-full bg-blue-500  capitalize text-white`}
                  // variant={`contained`}
                  loading={postLoaders}
                  disabled={postLoaders}
                  type={`submit`}
                  // handleClick={formik?.handleSubmit}
                  // handleClick={() => console.log("fomik", values)}
                />
                <ButtonFieldInput
                  name={text.buttonNames.cancel}
                  buttonextracls={`rounded-full bg-gray-400 capitalize`}
                  variant={`contained`}
                  disabled={postLoaders}
                  type={`button`}
                  handleClick={() => {
                    resetForm();
                    setOpenEditModal(false);
                  }}
                />
              </FlexBetween>
            </FlexItemCenter>
            {/* <pre>{JSON.stringify({ values, errors }, null, 4)}</pre> */}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EditRateMasterForm;
