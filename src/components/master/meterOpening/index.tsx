import { Box, Grid } from "@mui/material";
import { FC } from "react";
import text from "@/languages/en_US.json";
import dynamic from "next/dynamic";
import MeterOpeningForm from "./MeterOpeningForm";
import MeterOpeningTable from "./MeterTable";
import { Dayjs } from "dayjs";
import { useSelector } from "react-redux";
const DynamicTypography = dynamic(() => import("@mui/material/Typography"), {
  ssr: false,
});

interface MeterOpeningProps {
  openingDate: Dayjs | null;
  errorMessage: string;
  addMeterFormik: any;
  handleOpeningDateChange(): void;
  handleOpeningDateError(): void;
  postLoaders: boolean;
  resetFormHandler(): void;
  loader: boolean;
  handleEditData(data: any): void;
  editData: any;
}

const MeterOpening: FC<MeterOpeningProps> = ({
  addMeterFormik,
  errorMessage,
  handleOpeningDateChange,
  handleOpeningDateError,
  openingDate,
  postLoaders,
  resetFormHandler,
  loader,
  handleEditData,
  editData,
}) => {
  const meterOpeningData = useSelector(
    (state: any) => state.meterOpening?.meterOpeningData
  );

  const pumpOptionData = useSelector(
    (state: any) => state.pumpMasterData.pumpMasterData
  )?.map((data: any) => {
    return {
      name: data.Pump_Name,
      value: data.Id,
    };
  });

  const nozzleOptionData = useSelector(
    (state: any) => state.pumpMasterData.nozzleData
  )?.map((data: any) => {
    return {
      name: data.Nozzle_Name,
      value: data.Id,
    };
  });

  const financialYear = useSelector(
    (state: any) => state.sideBarData?.financialYear
  );

  // if (!token) notFound()
  return (
    <Box className={`min-h-[85vh] p-5`}>
      {/* <FlexBetween className='w-full'> */}
      <DynamicTypography
        variant={`h6`}
        className="font-bold text-black text-3xl mb-5"
      >
        {text.tableTitles.MeterOpening}
      </DynamicTypography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
          <MeterOpeningTable
            meterOpeningTable={meterOpeningData}
            loader={loader}
            handleEditData={handleEditData}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
          <Box className="shadow-md rounded-md border-t">
            <MeterOpeningForm
              date={openingDate}
              errMessage={errorMessage}
              formik={addMeterFormik}
              handleDateChange={handleOpeningDateChange}
              handleDateError={handleOpeningDateError}
              nozzleOptions={nozzleOptionData}
              postLoaders={postLoaders}
              pumpOptions={pumpOptionData}
              resetFormHandle={resetFormHandler}
              editData={editData}
              financialYear={financialYear}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MeterOpening;
