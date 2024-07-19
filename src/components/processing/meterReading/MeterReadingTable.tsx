import { ButtonFieldInput, NoContentPage } from "@/common";
import { Delete } from "@mui/icons-material";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { FC } from "react";

interface MeterReadingTableProps {
  meterReading: any;
  meterReadingGrandTotal: number;
  handleDelete: any;
}

const MeterReadingTable: FC<MeterReadingTableProps> = ({
  meterReading,
  meterReadingGrandTotal,
  handleDelete,
}) => {
  // const calculateGrandTotal=()=>{
  //   let grandTotal= 0;
  //   meterReading.forEach((data: any)=>{
  //     data.forEach(data.)
  //   })
  // }

  const headerCls = `text-white font-extrabold text-[10px] md:text-xs lg:text-md`;
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead className="bg-gradient-to-tr from-indigo-500 via-purple-400 to-blue-500">
          <TableRow className={`text-white font-bold`}>
            <TableCell className={headerCls}>Serial No.</TableCell>
            <TableCell className={headerCls} align="center">
              Item Name
            </TableCell>
            <TableCell className={headerCls} align="center">
              Opening Reading
            </TableCell>
            <TableCell className={headerCls} align="center">
              Closing Reading
            </TableCell>
            <TableCell className={headerCls} align="center">
              Testing
            </TableCell>
            <TableCell className={headerCls} align="center">
              Credit Quantity
            </TableCell>
            <TableCell className={headerCls} align="center">
              Net Sell
            </TableCell>
            <TableCell className={headerCls} align="center">
              Item rate
            </TableCell>
            <TableCell className={headerCls} align="center">
              Total amount
            </TableCell>
            <TableCell className={headerCls} align="right">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        {/* <pre>{JSON.stringify({ meterReading }, null, 4)}</pre> */}
        <TableBody>
          {meterReading && meterReading.length > 0
            ? meterReading.map((data: any, idx: number) => (
                <TableRow
                  key={idx}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {idx + 1}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {data.itemName}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {data.openingReading}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {data.closingReading}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {data.testing}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {data.creditQuantity}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {data.closingReading - data.openingReading - data.testing}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {data.itemRate}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {data.totalAmount}
                  </TableCell>
                  <TableCell component="th" scope="row" align="right">
                    <ButtonFieldInput
                      name={`delete`}
                      buttonextracls={`capitalize`}
                      variant={`outlined`}
                      color={"error"}
                      startIcon={<Delete />}
                      handleClick={() => handleDelete(idx)}
                    />
                  </TableCell>
                </TableRow>
              ))
            : meterReading.length === 0 && (
                <NoContentPage mainCls={`h-[50vh] w-full`} />
              )}
          {meterReading.length > 0 && (
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell align="center">
                <Typography
                  component={"p"}
                  className="text-red-400 font-bold text-lg"
                >
                  Grand Total:-
                </Typography>
              </TableCell>
              <TableCell
                align="center"
                className="text-green-500 font-semibold text-sm"
              >
                {meterReadingGrandTotal}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MeterReadingTable;
