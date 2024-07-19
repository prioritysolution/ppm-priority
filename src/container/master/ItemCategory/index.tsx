"use client"
import ItemCategory from "@/components/master/itemCategory"
import { ItemCategoryHooks } from "./Hooks"
import { useEffect } from "react"
import getSessionStorageData from "@/utils/getSessionStorageData"

const ItemCategoryContainer = () => {
  const orgId = getSessionStorageData('orgId')
  const token = getSessionStorageData('token')
  const { handleOpenModal,
    handleCloseModal,
    openAddItemModal,
    AddItemCategoryFormik,
    getItemCategoryApiCall,
    handleEditData,
    loading,
    postLoaders,
    editData
  } = ItemCategoryHooks()

  useEffect(() => {
    if (token && orgId) {
      getItemCategoryApiCall(orgId)
    }
  }, [token, orgId])
  
  return <ItemCategory handleOpenModal={handleOpenModal}
    handleCloseModal={handleCloseModal}
    openAddItemModal={openAddItemModal}
    AddItemCategoryFormik={AddItemCategoryFormik}
    handleEditData={handleEditData}
    loading={loading}
    postLoaders={postLoaders}
    editData={editData}
    token={token}
  />
}

export default ItemCategoryContainer