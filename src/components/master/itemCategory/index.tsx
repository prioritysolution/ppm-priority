import { TableCommon } from '@/common'
import { FC } from 'react'
import text from '@/languages/en_US.json'
import ItemCategoryModal from './ItemCategoryModal'
import ItemCategoryTable from './ItemCategoryTable'
import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { notFound } from 'next/navigation'
interface ItemCategoryProps {
  handleOpenModal(): void
  handleCloseModal(): void
  openAddItemModal: boolean
  AddItemCategoryFormik: any
  handleEditData(data: any): void
  loading: boolean
  postLoaders: boolean
  editData: any
  token: string
}

const ItemCategory: FC<ItemCategoryProps> = ({ handleCloseModal, handleOpenModal,
  openAddItemModal, AddItemCategoryFormik, handleEditData, loading, postLoaders, editData, token }) => {

  const ItemCategoryData = useSelector((state: any) => state.itemCategoryData?.itemCategoryData)

  if (!token) return notFound()
  return <Box className={`min-h-[90vh]`}>
    <TableCommon
      title={text.tableTitles.itemCategory}
      btnName={text.add.addItemCategory}
      titleTextCls={`font-bold text-black text-3xl`}
      titleCls='mb-5'
      addComponent={<ItemCategoryModal handleAdd={AddItemCategoryFormik.handleSubmit}
        handleClose={handleCloseModal} formik={AddItemCategoryFormik}
        itemCategoryModalOpenState={openAddItemModal}
        loading={postLoaders} editData={editData} />}
      handleOpenButton={handleOpenModal}
      tableComponent={<ItemCategoryTable itemDatas={ItemCategoryData} handleEditData={handleEditData} loading={loading} />}
    />
  </Box>
}

export default ItemCategory