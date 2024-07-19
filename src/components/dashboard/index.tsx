import {
  Box,
  Dialog,
  DialogTitle,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { FC } from "react";
import Header from "./Header";
import { DataCards, FlexBox, FlexCenter } from "@/common";
import { BarChart, PieChart } from "@mui/x-charts";
import text from "@/languages/en_US.json";
import PurchaseTable from "./PurchaseTable";
import { notFound } from "next/navigation";
import RateMasterForm from "../master/rateMaster/RateMasterForm";
import { Dayjs } from "dayjs";
import { useDispatch, useSelector } from "react-redux";

interface DashBoardProps {
  handleShowStockData(): void;
  handleShowSaleData(): void;
  handleShowPurchaseData(): void;
  showMonthwiseData: boolean;
  showMonthwiseSale: boolean;
  showAvailableStocksGraph: boolean;
  handleShowPurchaseGraph(): void;
  handleShowSaleGraph(): void;
  handleShowStockGraph(): void;
  token: string;
  AddRateMasterFormik: any;
  errorMessage: string;
  handleRateDate(): void;
  handleRateDateError(): void;
  postLoaders: boolean;
  rateDate: Dayjs | null;
  resetFormData(): void;
  postRateApiCall: any;
}

const DashBoard: FC<DashBoardProps> = ({
  handleShowPurchaseData,
  handleShowSaleData,
  handleShowStockData,
  showAvailableStocksGraph,
  showMonthwiseData,
  showMonthwiseSale,
  handleShowPurchaseGraph,
  handleShowSaleGraph,
  handleShowStockGraph,
  token,
  AddRateMasterFormik,
  errorMessage,
  handleRateDate,
  handleRateDateError,
  postLoaders,
  rateDate,
  resetFormData,
  postRateApiCall,
}) => {
  const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
  const xLabels = [
    "Page A",
    "Page B",
    "Page C",
    "Page D",
    "Page E",
    "Page F",
    "Page G",
  ];

  const cardCls = `h-[23rem] overflow-x-auto max-w-[93vw]`;
  const headerCls = `bg-gradient-to-tr from-blue-600 via-sky-400 to-indigo-600 p-5 h-[2rem] `;

  const modalOpen = useSelector((state: any) => state.login?.modalState);

  // if (!token) notFound();

  return (
    <Box>
      <Box className={`space-y-5 px-2 my-5`}>
        <Header />
        <Grid container columnSpacing={2} rowSpacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <DataCards
              extraCls={cardCls}
              titleCls="h-[2rem]"
              istitle={false}
              isSelectors
              purchasePlaceholder="Purchase"
              allItemsPlaceholder="All items"
              headerCls={headerCls}
              mainTitle={text.dashboardMainTitles.purchaseReports}
              mainTitleCls={`!text-sm !font-bold !text-center h-[2rem] flex items-center justify-center`}
              allItemsdropDownRootCls="h-[2rem]"
              purchasedropDownRootCls="h-[2rem]"
              drpMainCls="h-full"
              handleShowGraph={handleShowPurchaseGraph}
              handleShowData={handleShowPurchaseData}
              graph={showMonthwiseData}
              tableComponent={<PurchaseTable />}
            >
              <FlexBox>
                <BarChart
                  width={500}
                  height={300}
                  series={[
                    // { data: pData, label: 'pv', id: 'pvId' },
                    { data: uData, label: "uv", id: "uvId", color: "#8E44AD" },
                  ]}
                  xAxis={[{ data: xLabels, scaleType: "band" }]}
                />
              </FlexBox>
            </DataCards>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <DataCards
              extraCls={cardCls}
              titleCls="h-[2rem] !font-bold flex items-center uppercase"
              istitle
              isSelectors={false}
              title={text.dashboardCardTitles.availableStock}
              purchasePlaceholder="Purchase"
              allItemsPlaceholder="All items"
              headerCls={headerCls}
              allItemsdropDownRootCls="h-[2rem]"
              purchasedropDownRootCls="h-[2rem]"
              drpMainCls="h-full"
              handleShowGraph={handleShowSaleGraph}
              handleShowData={handleShowSaleData}
              graph={showMonthwiseSale}
              tableComponent={<PurchaseTable />}
            >
              <FlexBox>
                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: 10, label: "series A" },
                        { id: 1, value: 15, label: "series B" },
                        { id: 2, value: 20, label: "series C" },
                      ],
                    },
                  ]}
                  width={300}
                  height={332}
                  slotProps={{
                    legend: {
                      direction: "row",
                      position: { vertical: "top", horizontal: "middle" },
                      padding: 10,
                    },
                  }}
                />
              </FlexBox>
            </DataCards>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <DataCards
              extraCls={cardCls}
              titleCls="h-[2rem]"
              istitle={false}
              isSelectors
              purchasePlaceholder="Purchase"
              allItemsPlaceholder="All items"
              headerCls={headerCls}
              mainTitle={text.dashboardMainTitles.saleReports}
              mainTitleCls={`!text-sm !font-bold !text-center h-[2rem] flex items-center justify-center`}
              allItemsdropDownRootCls="h-[2rem]"
              purchasedropDownRootCls="h-[2rem]"
              drpMainCls="h-full"
              handleShowGraph={handleShowStockGraph}
              handleShowData={handleShowStockData}
              graph={showAvailableStocksGraph}
              tableComponent={<PurchaseTable />}
            >
              <FlexBox>
                <BarChart
                  width={500}
                  height={300}
                  series={[
                    // { data: pData, label: 'pv', id: 'pvId' },
                    { data: uData, label: "uv", id: "uvId" },
                  ]}
                  xAxis={[{ data: xLabels, scaleType: "band" }]}
                />
              </FlexBox>
            </DataCards>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <DataCards
              titleCls="h-[2rem] !font-bold flex items-center uppercase"
              extraCls={cardCls}
              istitle
              title={text.dashboardCardTitles.outStandingList}
              purchasePlaceholder="Purchase"
              allItemsPlaceholder="All items"
              headerCls={headerCls}
              allItemsdropDownRootCls="h-[2rem]"
              purchasedropDownRootCls="h-[2rem]"
              drpMainCls="h-full"
              tableComponent={<PurchaseTable />}
              isSelectors={false}
              isNoGraph
              graph={false}
              handleShowData={() => {}}
              handleShowGraph={() => {}}
            >
              <FlexBox>
                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: 10, label: "series A" },
                        { id: 1, value: 15, label: "series B" },
                        { id: 2, value: 20, label: "series C" },
                      ],
                    },
                  ]}
                  width={400}
                  height={290}
                />
              </FlexBox>
            </DataCards>
          </Grid>
        </Grid>
      </Box>
      <Dialog
        open={modalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle>
          <FlexCenter className="p-0">
            <Typography
              component={`p`}
              className="font-bold text-green-400 text-xl"
            >
              {text.add.rateMaster}
            </Typography>
          </FlexCenter>
        </DialogTitle>
        <Divider />
        <RateMasterForm
          date={rateDate}
          editData={[]}
          errMessage={errorMessage}
          formik={AddRateMasterFormik}
          handleDateChange={handleRateDate}
          handleError={handleRateDateError}
          postRateApiCall={postRateApiCall}
          postLoaders={postLoaders}
          resetFormData={resetFormData}
        />
      </Dialog>
    </Box>
  );
};

export default DashBoard;
