import {
  ButtonFieldInput,
  CommonLoading,
  FlexCenter,
  NoContentPage,
} from "@/common";
import {
  Box,
  Dialog,
  DialogTitle,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import text from "@/languages/en_US.json";
import { Add, Edit } from "@mui/icons-material";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import dayjs from "dayjs";
import { FC, useState } from "react";
import EditRateMasterForm from "./EditRateMasterForm";

interface RateMasterTableProps {
  loader: boolean;
  postLoader: boolean;
  RateMasterDatas: any;
  editDataHandler(data: any): void;
  editRateApiCall: any;
}

const RateMasterTable: FC<RateMasterTableProps> = ({
  RateMasterDatas,
  loader,
  postLoader,
  editDataHandler,
  editRateApiCall,
}) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editData, setEditData] = useState([]);

  const headerCls = `text-white font-extrabold text-md`;
  return (
    <div className=" flex flex-col items-end gap-5">
      <ButtonFieldInput
        startIcon={<Add />}
        name={`Add rate`}
        variant={`outlined`}
        buttonextracls={`rounded-full border-[0.5px] capitalize`}
        handleClick={() => {}}
      />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead className="bg-gradient-to-tr from-indigo-500 via-purple-400 to-blue-500">
            <TableRow className={`text-white font-bold`}>
              <TableCell className={headerCls}>Serial No.</TableCell>
              <TableCell className={headerCls} align="center">
                Item Name
              </TableCell>
              <TableCell className={headerCls} align="center">
                Rate
              </TableCell>
              <TableCell className={headerCls} align="center">
                Date
              </TableCell>
              <TableCell className={headerCls} align="right">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loader ? (
              <FlexCenter className="w-full h-[50vh]">
                <CommonLoading
                  imgHeight={90}
                  loadSpaceBetween={5}
                  loadingTextCls="text-3xl font-bold"
                />
              </FlexCenter>
            ) : RateMasterDatas && RateMasterDatas.length > 0 ? (
              RateMasterDatas.map((data: any, idx: number) => (
                <TableRow
                  key={idx}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {idx + 1}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {data.Item_Name}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {data.Item_Rate}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {dayjs(new Date(data.Valid_Date)).format("MM-DD-YYYY")}
                  </TableCell>
                  <TableCell component="th" scope="row" align="right">
                    <ButtonFieldInput
                      name={`edit`}
                      buttonextracls={`capitalize`}
                      variant={`outlined`}
                      startIcon={<Edit />}
                      handleClick={() => {
                        setOpenEditModal(true);
                        setEditData(data);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              (loader ||
                (!RateMasterDatas && RateMasterDatas.length === 0)) && (
                <NoContentPage mainCls={`h-[50vh] w-full`} />
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={openEditModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle className=" w-full">
          <FlexCenter className="p-0">
            <Typography
              component={`p`}
              className="font-bold text-green-400 text-xl"
            >
              {text.edit.editRate}
            </Typography>
          </FlexCenter>
        </DialogTitle>
        <Divider />
        <EditRateMasterForm
          editData={editData}
          setOpenEditModal={setOpenEditModal}
          postLoaders={postLoader}
          editRateApiCall={editRateApiCall}
        />
        {/* <RateMasterForm
          date={rateDate}
          editData={[]}
          errMessage={errorMessage}
          formik={AddRateMasterFormik}
          handleDateChange={handleRateDate}
          handleError={handleRateDateError}
          postRateApiCall={postRateApiCall}
          postLoaders={postLoaders}
          resetFormData={resetFormData}
        /> */}
      </Dialog>
    </div>
  );
};

export default RateMasterTable;
