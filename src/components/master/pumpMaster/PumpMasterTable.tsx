import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FC } from 'react'
import { ButtonFieldInput, CommonLoading, FlexCenter, NoContentPage } from '@/common';
import { Edit } from '@mui/icons-material';

interface PumpMasterTableProps {
  PumpMasterData: any,
  handleEditData(data: any): void,
  loading?: boolean
}

const PumpMasterTable: FC<PumpMasterTableProps> = ({ PumpMasterData, loading, handleEditData }) => {

  const headerCls = `text-white font-extrabold text-md`
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead className='bg-gradient-to-tr from-indigo-500 via-purple-400 to-blue-500'>
          <TableRow className={`text-white font-bold`}>
            <TableCell className={headerCls}>Serial No.</TableCell>
            <TableCell className={headerCls} align='center'>No of nozzle</TableCell>
            <TableCell className={headerCls} align='center'>Pump name</TableCell>
            <TableCell className={headerCls} align='right'>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            loading ?
              <FlexCenter className='w-full h-[50vh]'>
                <CommonLoading imgHeight={90} loadSpaceBetween={5} loadingTextCls='text-3xl font-bold' />
              </FlexCenter> :
              PumpMasterData && PumpMasterData.length > 0 ? PumpMasterData.map((data: any, idx: number) => (
                <TableRow
                  key={data.Id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {idx+1}
                  </TableCell>
                  <TableCell component="th" scope="row" align='center'>
                    {data.No_Of_Nozzle}
                  </TableCell>
                  <TableCell component="th" scope="row" align='center'>
                    {data.Pump_Name}
                  </TableCell>
                  <TableCell component="th" scope="row" align='right'>
                    <ButtonFieldInput name={`edit`} buttonextracls={`capitalize`}
                      variant={`outlined`}
                      startIcon={<Edit />} handleClick={() => handleEditData(data)} />
                  </TableCell>
                </TableRow>
              ))
                : (loading || (!PumpMasterData && PumpMasterData.length === 0)) &&
                <NoContentPage mainCls={`h-[50vh] w-full`} />
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PumpMasterTable