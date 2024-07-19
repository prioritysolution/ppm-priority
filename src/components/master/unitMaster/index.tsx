import { FC } from 'react'
import text from '@/languages/en_US.json'
import { TableCommon } from '@/common'
import UnitMasterModal from './UnitMasterModal'
import UnitMasterTable from './UnitMasterTable'
import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { notFound } from 'next/navigation'

interface UnitMasterProps {
  openFormDialog: boolean
  handleOpenDialog(): void
  handleCloseModal(): void
  AddUnitMasterFormik: any
  handleEditData: any
  loading: boolean
  postLoaders: boolean,
  token: string,
  editData: any
}

const UnitMaster: FC<UnitMasterProps> = ({ handleOpenDialog, handleCloseModal,
  openFormDialog, AddUnitMasterFormik, handleEditData,
   loading,token, 
  postLoaders,
  editData
 }) => {

  const unitMasterData = useSelector((state: any) => state.unitMasterData?.unitMasterData)

  if(!token) return notFound()

  return <Box className={`min-h-[90vh]`}>
    <TableCommon
      title={text.tableTitles.unitMaster}
      btnName={text.add.addUnitMaster}
      titleTextCls={`font-bold text-black text-3xl`}
      titleCls='mb-5'
      addComponent={<UnitMasterModal handleAdd={AddUnitMasterFormik.handleSubmit}
        handleClose={handleCloseModal} formik={AddUnitMasterFormik}
        editData={editData} 
        unitMasterModalOpenState={openFormDialog}
        formLoader={postLoaders}/>}
      tableComponent={<UnitMasterTable unitDatas={unitMasterData} handleEditData={handleEditData} loading={loading}/>}
      handleOpenButton={handleOpenDialog}
    />
  </Box>
}

export default UnitMaster