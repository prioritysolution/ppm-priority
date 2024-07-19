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

interface BankTransactionTableProps {
  bankTransactionData: any;
  bankTransactionGrandTotal: number;
  handleDeleteBankTransactionData: any;
}

const BankTransactionTable: FC<BankTransactionTableProps> = ({
  bankTransactionData,
  bankTransactionGrandTotal,
  handleDeleteBankTransactionData,
}) => {
  // console.table(bankTransactionData);
  const headerCls = `text-white font-extrabold text-[10px] md:text-xs lg:text-md`;
  return (
    <TableContainer component={Paper}>
      {/* <pre>
        {JSON.stringify(
          { bankTransactionData, bankTransactionGrandTotal },
          null,
          4
        )}
      </pre> */}
      <Table aria-label="simple table">
        <TableHead className="bg-gradient-to-tr from-indigo-500 via-purple-400 to-blue-500">
          <TableRow className={`text-white font-bold`}>
            <TableCell className={headerCls}>Serial No.</TableCell>
            <TableCell className={headerCls} align="center">
              Card/Pos
            </TableCell>
            <TableCell className={headerCls} align="center">
              Amount
            </TableCell>
            <TableCell className={headerCls} align="right">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bankTransactionData && bankTransactionData.length > 0
            ? bankTransactionData.map((data: any, idx: number) => (
                <TableRow
                  key={idx}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {idx + 1}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {data.cardPos}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {data.amount}
                  </TableCell>
                  <TableCell component="th" scope="row" align="right">
                    <ButtonFieldInput
                      name={`Delete`}
                      buttonextracls={`capitalize`}
                      variant={`outlined`}
                      color={"error"}
                      startIcon={<Delete />}
                      handleClick={() => handleDeleteBankTransactionData(idx)}
                    />
                  </TableCell>
                </TableRow>
              ))
            : bankTransactionData.length === 0 && (
                <TableRow>
                  <TableCell>
                    <NoContentPage mainCls={`h-[50vh] w-full`} />
                  </TableCell>
                </TableRow>
              )}
          {bankTransactionData.length > 0 && (
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="center">
                <Typography
                  component={"p"}
                  className="text-red-400 font-bold text-sm"
                >
                  Grand Total:-
                </Typography>
              </TableCell>
              <TableCell
                align="center"
                className="text-green-500 font-semibold text-base"
              >
                {bankTransactionGrandTotal || 0}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BankTransactionTable;
