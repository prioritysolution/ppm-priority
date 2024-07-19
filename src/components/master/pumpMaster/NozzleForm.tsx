import { ButtonFieldInput, DropDownField, FlexBetween, FlexItemCenter, TextFieldInput } from '@/common'
import { Box, Divider, Grid } from '@mui/material'
import { FC } from 'react'
import text from '@/languages/en_US.json'
import NozzleTable from './NozzleTable'
import { nozzleData } from '@/types/data-types'

interface NozzleFormProps {
    formik: any
    addNozzleData: any
    tankMasterData: any
    handleNozzleDelete(id: number): void
    handleNozzleEdit(editData: nozzleData): void
}

const NozzleForm: FC<NozzleFormProps> = ({ formik, addNozzleData, tankMasterData, handleNozzleDelete, handleNozzleEdit }) => {

    // console.log(addNozzleData)
    return <Box className={`pb-5`}>
        <form onSubmit={formik?.handleSubmit}>
            <FlexItemCenter className='h-[3rem]'>
                <p className='font-bold text-black text-lg px-5'>
                    {text.add.addNozzle}
                </p>
            </FlexItemCenter>
            <Divider className='w-full m-0' />
            <Grid container spacing={1} className='p-5'>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <TextFieldInput
                        placeholder={text.placeholders.addPumpMaster.nozzleName}
                        extraCls={`w-full`}
                        color={`success`}
                        textinputname={`nozzleName`}
                        inputLabel={text.label.addPumpMaster.nozzleName}
                        onChange={formik?.handleChange}
                        value={formik?.values?.nozzleName}
                        handleBlur={formik?.handleBlur}
                        error={
                            formik?.touched?.nozzleName &&
                            Boolean(formik?.errors?.nozzleName)
                        }
                        helperText={
                            formik?.touched?.nozzleName && formik?.errors?.nozzleName
                        }
                        clickEnter={formik?.handleSubmit}
                        fullwidthState autoFocus />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <DropDownField
                        name={`tankName`}
                        dropdownLabel={text.label.addPumpMaster.selectTank}
                        // placeholder={text.placeholders.addItemMaster.itemType}
                        color={`success`}
                        option={formik?.values?.tankName}
                        handleChange={formik?.handleChange}
                        handleBlur={formik?.handleBlur}
                        selectOption={tankMasterData}
                        error={
                            formik?.touched?.tankName &&
                            Boolean(formik?.errors?.tankName)
                        }
                        errorText={
                            formik?.touched?.tankName && formik?.errors?.tankName
                        }
                        fullWidthState
                    />
                </Grid>
            </Grid>
            <FlexItemCenter className='w-full mt-2 p-5'>
                <FlexBetween className='flex-row-reverse w-full'>
                    <ButtonFieldInput name={text.buttonNames.add}
                        buttonextracls={`rounded-full bg-blue-500  capitalize`}
                        variant={`contained`} />
                    <ButtonFieldInput name={text.buttonNames.cancel}
                        buttonextracls={`rounded-full bg-gray-400 capitalize`}
                        variant={`contained`} type={`button`} />
                </FlexBetween>
            </FlexItemCenter>
        </form>
        <Box className={`p-5`}>
            <NozzleTable addNozzleData={addNozzleData} 
            handleNozzleDelete={handleNozzleDelete} 
            handleNozzleEdit={handleNozzleEdit}
            />
        </Box>
    </Box>
}

export default NozzleForm