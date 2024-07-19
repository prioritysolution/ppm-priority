import { ButtonFieldInput, CommonLoading, FlexCenter, NoContentPage } from '@/common'
import { Edit } from '@mui/icons-material'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { FC } from 'react'

interface AccountLedgerTableProps {
  loading?: boolean
  AccountLedgerData: any
  editAccountLedger(data: any): void
}

const AccountLedgerTable: FC<AccountLedgerTableProps> = ({AccountLedgerData, loading, editAccountLedger}) => {
  const headerCls = `text-white font-extrabold text-md`
  return  <TableContainer component={Paper}>
  <Table aria-label="simple table">
    <TableHead className='bg-gradient-to-tr from-indigo-500 via-purple-400 to-blue-500'>
      <TableRow className={`text-white font-bold`}>
        <TableCell className={headerCls}>Serial No.</TableCell>
        <TableCell className={headerCls} align='center'>Ledger Name</TableCell>
        <TableCell className={headerCls} align='center'>Under Head</TableCell>
        <TableCell className={headerCls} align='right'>Actions</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {
        loading ?
          <FlexCenter className='w-full h-[50vh]'>
            <CommonLoading imgHeight={90} loadSpaceBetween={5} loadingTextCls='text-3xl font-bold' />
          </FlexCenter> :
          AccountLedgerData && AccountLedgerData.length > 0 ? AccountLedgerData.map((data: any, idx: number) => (
            <TableRow
              key={data.Id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {idx+1}
              </TableCell>
              <TableCell component="th" scope="row" align='center'>
                {data.Acct_Name}
              </TableCell>
              <TableCell component="th" scope="row" align='center'>
                {data.Head_Name}
              </TableCell>
              <TableCell component="th" scope="row" align='right'>
                <ButtonFieldInput name={`edit`} buttonextracls={`capitalize`}
                  variant={`outlined`}
                  startIcon={<Edit />} handleClick={() => editAccountLedger(data)} />
              </TableCell>
            </TableRow>
          ))
            : (loading || (!AccountLedgerData && AccountLedgerData.length === 0)) &&
            <NoContentPage mainCls={`h-[50vh] w-full`} />
      }
    </TableBody>
  </Table>
</TableContainer>
}

export default AccountLedgerTable