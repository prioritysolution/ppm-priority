import { TextFieldInput } from "@/common";
import { FC } from "react";
import text from "@/languages/en_US.json";

interface CashDenomTableProps {
  notes: any;
  denominators: string[];
  handleDenominatorChange(
    event: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number
  ): void;
  totalAmount: number[];
  cashTransactionGrandTotal: number;
  amountTobePaid: number;
  cashOut?: boolean;
}

const CashDenomTable: FC<CashDenomTableProps> = ({
  notes,
  denominators,
  handleDenominatorChange,
  totalAmount,
  cashTransactionGrandTotal,
  amountTobePaid,
  cashOut,
}) => {
  return (
    <>
      <table className="table-auto w-full border-separate border-spacing-5">
        <thead>
          <tr>
            <th>Note</th>
            <th>Denominators</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {notes &&
            notes.length > 0 &&
            notes.map((data: any, idx: number) => (
              <tr key={data.Id}>
                <td align="center" className="text-xs">
                  {data.Note_Value}
                </td>
                <td>
                  <TextFieldInput
                    placeholder={
                      text.placeholders.sale.transactionCash.denominator
                    }
                    // inputLabel={text.label.meterReading.transactionCash.denominator}
                    extraCls={`w-full`}
                    color={`success`}
                    textinputname={`denominator`}
                    type={`number`}
                    sx={{
                      "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                        {
                          display: "none",
                        },
                      "& input[type=number]": {
                        MozAppearance: "textfield",
                      },
                    }}
                    onChange={(e) => handleDenominatorChange(e, idx)}
                    value={denominators[idx]}
                    disabled={
                      amountTobePaid <= 0 || cashOut
                        ? Number(denominators[idx]) === 0 &&
                          (amountTobePaid < data.Note_Value ||
                            amountTobePaid - cashTransactionGrandTotal <
                              data.Note_Value)
                        : Number(denominators[idx]) === 0 &&
                          amountTobePaid - cashTransactionGrandTotal < 0
                    }
                    size={"small"}
                    fullwidthState
                  />
                  {cashOut
                    ? Number(denominators[idx]) > 0 &&
                      amountTobePaid -
                        (cashTransactionGrandTotal - totalAmount[idx]) <
                        data.Note_Value * Number(denominators[idx]) && (
                        <div className={`text-sm text-red-500`}>
                          <p>Please decrease denominator</p>
                        </div>
                      )
                    : Number(denominators[idx]) > 0 &&
                      amountTobePaid -
                        (cashTransactionGrandTotal - totalAmount[idx]) <=
                        data.Note_Value * (Number(denominators[idx]) - 1) && (
                        <div className={`text-sm text-red-500`}>
                          <p>Please decrease denominator</p>
                        </div>
                      )}
                </td>
                <td className="text-xs" align="center">
                  {totalAmount[idx]}
                </td>
              </tr>
            ))}
          {cashTransactionGrandTotal !== 0 && (
            <tr>
              <td></td>
              <td className="text-sm text-red-400 font-semibold" align="center">
                Grand total:-
              </td>
              <td className="text-base text-green-300 font-bold" align="center">
                {cashTransactionGrandTotal}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default CashDenomTable;
