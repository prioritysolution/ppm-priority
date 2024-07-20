import { Box, Divider, Grid } from "@mui/material";
import { FC } from "react";
import text from "@/languages/en_US.json";
import dynamic from "next/dynamic";
import RateMasterTable from "./RateMasterTable";
import RateMasterForm from "./RateMasterForm";
import { FlexItemCenter } from "@/common";
import { Dayjs } from "dayjs";
import { notFound } from "next/navigation";
import { useSelector } from "react-redux";
import EditRateMasterForm from "./EditRateMasterForm";
const DynamicTypography = dynamic(() => import("@mui/material/Typography"), {
  ssr: false,
});

interface RateMasterProps {
  loader: boolean;
  rateDate: Dayjs | null;
  dateErrorMessage: string;
  handleDateChange(): void;
  handleDateError(): void;
  postLoaders: boolean;
  rateMasterFormik: any;
  token: string;
  editDataHandler(data: any): void;
  editData: any;
  resetFormData(): void;
  editRateApiCall: any;
}

const RateMaster: FC<RateMasterProps> = ({
  dateErrorMessage,
  loader,
  rateDate,
  editData,
  resetFormData,
  handleDateChange,
  handleDateError,
  postLoaders,
  rateMasterFormik,
  token,
  editDataHandler,
  editRateApiCall,
}) => {
  const rateData = useSelector((state: any) => state.rate?.rateMasterData);

  if (!token) notFound();
  return (
    <Box className={`min-h-[85vh] w-full p-5`}>
      {/* <FlexBetween className='w-full'> */}
      <DynamicTypography
        variant={`h6`}
        className="font-bold text-black text-3xl mb-5"
      >
        {text.tableTitles.rateMaster}
      </DynamicTypography>
      <Grid className="px-5">
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6} className="w-full">
          <RateMasterTable
            RateMasterDatas={rateData}
            loader={loader}
            postLoader={postLoaders}
            editDataHandler={editDataHandler}
            editRateApiCall={editRateApiCall}
          />
        </Grid>
        {/* <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
          <Box className="shadow-md rounded-md border-t px-5">
            <>
              <FlexItemCenter className="h-[3rem]">
                <p className="font-bold text-black text-lg px-5">
                  {editData && Object.keys(editData).length > 0
                    ? text.edit.editRate
                    : text.add.rateMaster}
                </p>
              </FlexItemCenter>
              <Divider className="w-full m-0" />
            </>
            <EditRateMasterForm
              editData={editData}
              setEditData={setEditData}
              postLoaders={postLoaders}
              editRateApiCall={editRateApiCall}
            />
          </Box>
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default RateMaster;
