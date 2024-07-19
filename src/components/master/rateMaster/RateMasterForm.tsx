import {
  ButtonFieldInput,
  DatePickerField,
  DropDownField,
  FlexBetween,
  FlexCenter,
  FlexContentCenter,
  FlexItemCenter,
  TextFieldInput,
} from "@/common";
import { Grid, ListItem, Typography } from "@mui/material";
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

interface RateMasterFormProps {
  formik: any;
  postLoaders: boolean;
  handleDateChange(): void;
  date: Dayjs | null;
  handleError(): void;
  errMessage: string;
  editData: any;
  resetFormData(): void;
  postRateApiCall?: any;
}

const RateMasterForm: FC<RateMasterFormProps> = ({
  formik,
  postLoaders,
  date,
  errMessage,
  editData,
  handleDateChange,
  handleError,
  resetFormData,
  postRateApiCall,
}) => {
  const orgId = getSessionStorageData("orgId");
  const modalOpen = useSelector((state: any) => state.login?.modalState);

  const currentDate = new Date();
  let [day, month, year] = currentDate.toLocaleDateString().split("/");

  // let formattedDate = `${year}-${month}-${day}`;
  // const itemDropdownData = useSelector(
  //   (state: any) => state.itemMasterData?.itemMasterData
  // )?.map((data: any) => {
  //   return {
  //     name: data.Item_Name,
  //     id: data.Id,
  //   };
  // });
  const itemRateMasterData = useSelector(
    (state: any) => state.itemMasterData?.itemRateMasterData
  )?.map((data: any) => {
    return {
      name: data.Item_Name,
      id: data.Id,
      Item_Rate: "",
      rateDate: `${year}-${month}-${day}`,
    };
  });

  // const { AddRateMasterFormik } = RateMasterHooks();

  // const [itemRateCollection, setItemRateCollection] =
  //   React.useState(itemRateMasterData);

  // React.useEffect(() => {
  //   formik.values.rateList = [...itemRateMasterData];
  // }, [itemRateMasterData]);

  const validationSchema = Yup.object({
    Rate_Details: Yup.array(
      Yup.object({
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
      })
    ).min(itemRateMasterData.length, "All field requered"),
  });

  return (
    <Formik
      // initialValues={formik?.initialValues}
      // onSubmit={formik?.handleSubmit}
      // validationSchema={formik?.validationSchema}
      // enableReinitialize
      initialValues={{ Rate_Details: itemRateMasterData }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        postRateApiCall(orgId, values);
        // console.log(values);
      }}
      enableReinitialize
    >
      {({ values, touched, errors, handleChange, resetForm }) => (
        <Form>
          <FieldArray name="Rate_Details">
            {({ push, remove }) => (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 600 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Items</TableCell>
                      <TableCell>Rate</TableCell>
                      <TableCell>Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {values.Rate_Details.map((item: any, index: number) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {item.name}
                        </TableCell>
                        <TableCell>
                          <Field
                            name={`Rate_Details[${index}].Item_Rate`}
                            value={values?.Rate_Details[index].Item_Rate}
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
                            error={
                              formik?.touched?.itemRate &&
                              Boolean(formik?.errors?.itemRate)
                            }
                            helperText={
                              formik?.touched?.itemRate &&
                              formik?.errors?.itemRate
                            }
                          />
                          <ErrorMessage
                            name={`Rate_Details[${index}].Item_Rate`}
                          >
                            {(errMessage) => (
                              <div className="text-red-500">{errMessage}</div>
                            )}
                          </ErrorMessage>
                          {/* <TextFieldInput
                            placeholder={text.placeholders.rateMaster.itemRate}
                            extraCls={`w-full`}
                            color={`success`}
                            type="number"
                            textinputname={`rateList.${index}.itemRate`}
                            sx={{
                              "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                                {
                                  display: "none",
                                },
                              "& input[type=number]": {
                                MozAppearance: "textfield",
                              },
                            }}
                            // inputLabel={text.label.rateMaster.itemRate}
                            onChange={formik?.handleChange}
                            value={item.itemRate}
                            handleBlur={formik?.handleBlur}
                            error={
                              formik?.touched?.itemRate &&
                              Boolean(formik?.errors?.itemRate)
                            }
                            helperText={
                              formik?.touched?.itemRate &&
                              formik?.errors?.itemRate
                            }
                            clickEnter={formik?.handleSubmit}
                            fullwidthState
                          /> */}
                        </TableCell>
                        <TableCell>{`${day}-${month}-${year}`}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <FlexItemCenter className="w-full  p-5">
                  <FlexBetween className="flex-row-reverse w-full">
                    <ButtonFieldInput
                      // name={
                      //   editData && Object.keys(editData).length > 0 ? text.buttonNames.update
                      //     : text.buttonNames.add
                      // }
                      name={text.buttonNames.add}
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
                      type={`button`}
                      handleClick={resetForm}
                    />
                  </FlexBetween>
                </FlexItemCenter>
              </TableContainer>
            )}
          </FieldArray>
          {/* <pre>{JSON.stringify({ values, errors }, null, 4)}</pre> */}
        </Form>
      )}
    </Formik>
  );

  // return (
  //   <form onSubmit={formik?.handleSubmit}>
  //     <TableContainer component={Paper}>
  //       <Table sx={{ minWidth: 600 }} aria-label="simple table">
  //         <TableHead>
  //           <TableRow>
  //             <TableCell>Items</TableCell>
  //             <TableCell>Rate</TableCell>
  //             <TableCell>Date</TableCell>
  //           </TableRow>
  //         </TableHead>
  //         <TableBody>
  //           {itemRateMasterData.map((item: any, index: number) => (
  //             <TableRow
  //               key={index}
  //               sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
  //             >
  //               <TableCell component="th" scope="row">
  //                 {/* <TextFieldInput
  //                   placeholder={text.placeholders.rateMaster.itemRate}
  //                   extraCls={`w-full`}
  //                   color={`success`}
  //                   type="number"
  //                   textinputname={`rateList.[${index}].name`}
  //                   sx={{
  //                     "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
  //                       {
  //                         display: "none",
  //                       },
  //                     "& input[type=number]": {
  //                       MozAppearance: "textfield",
  //                     },
  //                   }}
  // inputLabel={text.label.rateMaster.itemRate}
  //                   onChange={formik?.handleChange}
  //                   value={item.name}
  // value={item.itemRate}
  //                   handleBlur={formik?.handleBlur}
  //                   error={
  //                     formik?.touched?.itemRate &&
  //                     Boolean(formik?.errors?.itemRate)
  //                   }
  //                   helperText={
  //                     formik?.touched?.itemRate && formik?.errors?.itemRate
  //                   }
  //                   clickEnter={formik?.handleSubmit}
  //                   fullwidthState
  //                 /> */}
  //                 <p>{item.name}</p>
  //               </TableCell>
  //               <TableCell>
  //                 <TextFieldInput
  //                   placeholder={text.placeholders.rateMaster.itemRate}
  //                   extraCls={`w-full`}
  //                   color={`success`}
  //                   type="number"
  //                   textinputname={`rateList.itemRate`}
  //                   textinputname={`itemRate`}
  //                   sx={{
  //                     "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
  //                       {
  //                         display: "none",
  //                       },
  //                     "& input[type=number]": {
  //                       MozAppearance: "textfield",
  //                     },
  //                   }}
  //                   inputLabel={text.label.rateMaster.itemRate}
  //                   onChange={formik?.handleChange}
  //                   onChange={(e) => {
  //                     console.log(e.target.value);
  //                     formik?.handleChange;
  //                     formik?.values?.rateList[0].map((listItem: any) =>
  //                       item.id === listItem.id
  //                         ? { ...ListItem, itemRate: e.target.value }
  //                         : listItem
  //                     );
  //                   }}
  //                   value={formik?.values.itemRate}
  //                   value={item.itemRate}
  //                   handleBlur={formik?.handleBlur}
  //                   error={
  //                     formik?.touched?.itemRate &&
  //                     Boolean(formik?.errors?.itemRate)
  //                   }
  //                   helperText={
  //                     formik?.touched?.itemRate && formik?.errors?.itemRate
  //                   }
  //                   clickEnter={formik?.handleSubmit}
  //                   fullwidthState
  //                 />
  //               </TableCell>
  //               <TableCell>{item.rateDate}</TableCell>
  //             </TableRow>
  //           ))}
  //         </TableBody>
  //       </Table>
  //     </TableContainer>

  //     <FlexItemCenter className="w-full  p-5">
  //       <FlexBetween className="flex-row-reverse w-full">
  //         <ButtonFieldInput
  //           name={
  //             editData && Object.keys(editData).length > 0
  //               ? text.buttonNames.update
  //               : text.buttonNames.add
  //           }
  //           name={text.buttonNames.add}
  //           buttonextracls={`rounded-full bg-blue-500  capitalize text-white`}
  //           variant={`contained`}
  //           loading={postLoaders}
  //           disabled={postLoaders}
  //           type={`submit`}
  //           handleClick={date === null ? handleError : formik?.handleSubmit}
  //           handleClick={() => console.log(formik?.values.rateList[0])}
  //         />
  //         <ButtonFieldInput
  //           name={text.buttonNames.cancel}
  //           buttonextracls={`rounded-full bg-gray-400 capitalize`}
  //           variant={`contained`}
  //           type={`button`}
  //           handleClick={resetFormData}
  //         />
  //       </FlexBetween>
  //     </FlexItemCenter>
  //   </form>
  // );
  // return (
  //   <form onSubmit={formik?.handleSubmit}>
  //     <Grid container spacing={1} className="p-5">
  //       <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
  //         <DropDownField
  //           name={`item`}
  //           dropdownLabel={text.label.rateMaster.item}
  //           placeholder={text.placeholders.addItemMaster.itemType}
  //           color={`success`}
  //           option={formik?.values?.item}
  //           handleChange={formik?.handleChange}
  //           handleBlur={formik?.handleBlur}
  //           selectOption={itemDropdownData}
  //           error={formik?.touched?.item && Boolean(formik?.errors?.item)}
  //           errorText={formik?.touched?.item && formik?.errors?.item}
  //           fullWidthState
  //         />
  //       </Grid>
  //       <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
  //         <TextFieldInput
  //           placeholder={text.placeholders.rateMaster.itemRate}
  //           extraCls={`w-full`}
  //           color={`success`}
  //           textinputname={`itemRate`}
  //           sx={{
  //             "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
  //               {
  //                 display: "none",
  //               },
  //             "& input[type=number]": {
  //               MozAppearance: "textfield",
  //             },
  //           }}
  //           inputLabel={text.label.rateMaster.itemRate}
  //           onChange={formik?.handleChange}
  //           value={formik?.values?.itemRate}
  //           handleBlur={formik?.handleBlur}
  //           error={
  //             formik?.touched?.itemRate && Boolean(formik?.errors?.itemRate)
  //           }
  //           helperText={formik?.touched?.itemRate && formik?.errors?.itemRate}
  //           clickEnter={formik?.handleSubmit}
  //           fullwidthState
  //         />
  //       </Grid>
  //       <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
  //         <DatePickerField
  //           label={text.label.rateMaster.rateDate}
  //           handleChange={handleDateChange}
  //           date={date}
  //           handleError={handleError}
  //           errorMessage={errMessage}
  //           extraCls={`w-full`}
  //           handleBlur={handleError}
  //           color={errMessage ? "error" : "success"}
  //           format="DD-MM-YYYY"
  //           clearable
  //         />
  //       </Grid>
  //     </Grid>
  //     {modalOpen && (
  //       <FlexCenter gap={1}>
  //         <WarningAmberOutlined color="error" />
  //         <Typography
  //           component={`span`}
  //           className="text-sm text-red-500 font-bold"
  //         >
  //           {text.addMsg.rateMaster}
  //         </Typography>
  //       </FlexCenter>
  //     )}
  //     <FlexItemCenter className="w-full  p-5">
  //       <FlexBetween className="flex-row-reverse w-full">
  //         <ButtonFieldInput
  //           name={
  //             editData && Object.keys(editData).length > 0
  //               ? text.buttonNames.update
  //               : text.buttonNames.add
  //           }
  //           buttonextracls={`rounded-full bg-blue-500  capitalize`}
  //           variant={`contained`}
  //           loading={postLoaders}
  //           disabled={postLoaders}
  //           handleClick={date === null ? handleError : formik?.handleSubmit}
  //         />
  //         <ButtonFieldInput
  //           name={text.buttonNames.cancel}
  //           buttonextracls={`rounded-full bg-gray-400 capitalize`}
  //           variant={`contained`}
  //           type={`button`}
  //           handleClick={resetFormData}
  //         />
  //       </FlexBetween>
  //     </FlexItemCenter>
  //   </form>
  // );
};
export default RateMasterForm;
