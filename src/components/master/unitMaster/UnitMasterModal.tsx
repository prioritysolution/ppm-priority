import { FC } from 'react';
import text from '@/languages/en_US.json'
import { FormModal, TextFieldInput } from '@/common';

interface UnitMasterModalProps {
  formik: any,
  handleAdd(): void,
  handleClose(): void,
  unitMasterModalOpenState: boolean,
  formLoader: boolean,
  editData: any
}

const UnitMasterModal: FC<UnitMasterModalProps> = ({ formik, handleAdd, handleClose,
  unitMasterModalOpenState, formLoader, editData }) => {
  return <FormModal
    dialogContent={<TextFieldInput
      placeholder={text.placeholders.addUnitMaster}
      extraCls={`w-full`}
      color={`success`}
      textinputname={`itemName`}
      variant={`standard`}
      onChange={formik?.handleChange}
      value={formik?.values?.itemName}
      handleBlur={formik?.handleBlur}
      error={
        formik?.touched?.itemName &&
        Boolean(formik?.errors?.itemName)
      }
      helperText={
        formik?.touched?.itemName && formik?.errors?.itemName
      }
      clickEnter={formik?.handleSubmit}
      fullwidthState autoFocus />}
    dialoguContentTxt={
      editData && Object.keys(editData)?.length > 0 ?
        text.editMsg.unitmaster
        : text.addMsg.unitmaster}
    dialogTitle={
      editData && Object.keys(editData)?.length > 0 ?
        text.edit.editUnitMaster :
        text.add.addUnitMaster
    }
    handleAdd={handleAdd}
    handleClose={handleClose}
    open={unitMasterModalOpenState}
    loading={formLoader}
    addTxt={(editData && Object.keys(editData).length > 0) ? text.buttonNames.update : text.buttonNames.add }
  />
}

export default UnitMasterModal