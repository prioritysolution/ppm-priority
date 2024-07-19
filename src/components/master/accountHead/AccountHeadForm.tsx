import { ButtonFieldInput, DropDownField, FlexBetween, FlexItemCenter, TextFieldInput } from '@/common'
import { Divider, Grid } from '@mui/material'
import { FC } from 'react'
import text from '@/languages/en_US.json'

interface AccountHeadFormProps {
    formik: any,
    accountHeadMainDropDown: any
    postLoaders: boolean
    editData: any
}


const AccountHeadForm: FC<AccountHeadFormProps> = ({ formik, accountHeadMainDropDown, postLoaders, editData }) => {
    return <form onSubmit={formik?.handleSubmit}>
        <FlexItemCenter className='h-[3rem]'>
            <p className='font-bold text-black text-lg px-5'>
                { editData && Object.keys(editData).length > 0 ? 
                text.edit.editAccoutnHead : 
                text.add.accountHead}
            </p>
        </FlexItemCenter>
        <Divider className='w-full m-0' />
        <Grid container spacing={1} className='p-5'>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextFieldInput
                    placeholder={text.placeholders.addAccountHead.headName}
                    extraCls={`w-full`}
                    color={`success`}
                    textinputname={`headName`}
                    inputLabel={text.label.addAccountHead.headName}
                    onChange={formik?.handleChange}
                    value={formik?.values?.headName}
                    handleBlur={formik?.handleBlur}
                    error={
                        formik?.touched?.headName &&
                        Boolean(formik?.errors?.headName)
                    }
                    helperText={
                        formik?.touched?.headName && formik?.errors?.headName
                    }
                    clickEnter={formik?.handleSubmit}
                    fullwidthState autoFocus />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <TextFieldInput
                    placeholder={text.placeholders.addAccountHead.headCode}
                    extraCls={`w-full`}
                    color={`success`}
                    textinputname={`headCode`}
                    sx={{
                        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                            display: "none",
                        },
                        "& input[type=number]": {
                            MozAppearance: "textfield",
                        },
                    }}
                    inputLabel={text.label.addAccountHead.headCode}
                    onChange={formik?.handleChange}
                    value={formik?.values?.headCode}
                    handleBlur={formik?.handleBlur}
                    error={
                        formik?.touched?.headCode &&
                        Boolean(formik?.errors?.headCode)
                    }
                    helperText={
                        formik?.touched?.headCode && formik?.errors?.headCode
                    }
                    clickEnter={formik?.handleSubmit}
                    fullwidthState />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <DropDownField
                    name={`mainHead`}
                    dropdownLabel={text.label.addAccountHead.mainHead}
                    // placeholder={text.placeholders.addItemMaster.itemType}
                    color={`success`}
                    option={formik?.values?.mainHead}
                    handleChange={formik?.handleChange}
                    handleBlur={formik?.handleBlur}
                    selectOption={accountHeadMainDropDown}
                    error={
                        formik?.touched?.mainHead &&
                        Boolean(formik?.errors?.mainHead)
                    }
                    errorText={
                        formik?.touched?.mainHead && formik?.errors?.mainHead
                    }
                    fullWidthState
                />
            </Grid>
        </Grid>
        <FlexItemCenter className='w-full mt-2 p-5'>
            <FlexBetween className='flex-row-reverse w-full'>
                <ButtonFieldInput name={
                    editData && Object.keys(editData).length > 0 ?
                    text.buttonNames.update : 
                    text.buttonNames.add}
                    buttonextracls={`rounded-full bg-blue-500  capitalize`}
                    variant={`contained`} loading={postLoaders}
                     disabled={postLoaders}/>
                <ButtonFieldInput name={text.buttonNames.cancel}
                    buttonextracls={`rounded-full bg-gray-400 capitalize`}
                    variant={`contained`} type={`button`} handleClick={formik.resetForm} />
            </FlexBetween>
        </FlexItemCenter>
    </form>
}

export default AccountHeadForm