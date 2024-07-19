import { FC } from 'react';
import text from '@/languages/en_US.json'
import { FormModal, TextFieldInput } from '@/common';

interface UnitMasterModalProps {
  formik: any,
  handleAdd(): void,
  handleClose(): void,
  itemCategoryModalOpenState: boolean,
  loading: boolean,
  editData: any
}

const ItemCategoryModal: FC<UnitMasterModalProps> = ({ formik, handleAdd, handleClose, itemCategoryModalOpenState, loading, 
  editData }) => {
  return <FormModal
    dialogContent={<TextFieldInput
      placeholder={text.placeholders.addItemCategory}
      extraCls={`w-full`}
      color={`success`}
      textinputname={`itemCategory`}
      variant={`standard`}
      onChange={formik?.handleChange}
      value={formik?.values?.itemCategory}
      handleBlur={formik?.handleBlur}
      error={
        formik?.touched?.itemCategory &&
        Boolean(formik?.errors?.itemCategory)
      }
      helperText={
        formik?.touched?.itemCategory && formik?.errors?.itemCategory
      }
      clickEnter={formik?.handleSubmit}
      fullwidthState autoFocus />}
    dialoguContentTxt={
      editData && Object.keys(editData).length > 0 ?
      text.editMsg.itemCategory :
      text.addMsg.itemCategory}
    dialogTitle={editData && Object.keys(editData).length > 0 ? 
      text.edit.editItemCategory :
      text.add.addItemCategory}
    handleAdd={handleAdd}
    handleClose={handleClose}
    open={itemCategoryModalOpenState}
    loading={loading}
    addTxt={editData && Object.keys(editData).length > 0 ?
      text.buttonNames.update : 
      text.buttonNames.add
    }
  />
}

export default ItemCategoryModal