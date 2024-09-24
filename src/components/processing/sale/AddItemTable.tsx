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

interface AddItemTableProps {
  additionalItem: any;
  itemGrandTotal: number;
  handleDelete: any;
}

const AddItemTable: FC<AddItemTableProps> = ({
  additionalItem,
  itemGrandTotal,
  handleDelete,
}) => {
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
              Quantity
            </TableCell>
            <TableCell className={headerCls} align="center">
              Item rate
            </TableCell>
            <TableCell className={headerCls} align="center">
              CGST
            </TableCell>
            <TableCell className={headerCls} align="center">
              SGST
            </TableCell>
            <TableCell className={headerCls} align="center">
              IGST
            </TableCell>
            <TableCell className={headerCls} align="center">
              Round Off
            </TableCell>
            <TableCell className={headerCls} align="center">
              Total amount
            </TableCell>
            <TableCell className={headerCls} align="right">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {additionalItem && additionalItem.length > 0
            ? additionalItem.map((data: any, idx: number) => (
                <TableRow
                  key={idx}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {/* <pre>{JSON.stringify({ additionalItem }, null, 4)}</pre> */}
                  <TableCell component="th" scope="row">
                    {idx + 1}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {data.itemName}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {data.itemQnty}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {data.itemRate}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {data.cgst}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {data.sgst}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {data.igst}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {data.roundOff}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {data.totalAmount}
                  </TableCell>
                  <TableCell component="th" scope="row" align="right">
                    <ButtonFieldInput
                      name={`Delete`}
                      buttonextracls={`capitalize`}
                      variant={`outlined`}
                      color={"error"}
                      startIcon={<Delete />}
                      handleClick={() => handleDelete(idx)}
                    />
                  </TableCell>
                </TableRow>
              ))
            : additionalItem.length === 0 && (
                <NoContentPage mainCls={`h-[50vh] w-full`} />
              )}
          {additionalItem.length > 0 && (
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
                {itemGrandTotal}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AddItemTable;
