import { ButtonFieldInput, DropDownField, FlexBetween, FlexItemCenter, TextFieldInput } from '@/common'
import { FC } from 'react'
import text from '@/languages/en_US.json'
import { Container, Divider, Drawer, Grid, IconButton, Typography } from '@mui/material'
import { KeyboardArrowLeft } from '@mui/icons-material'

interface TankMasterProps {
    formik: any,
    handleToggleDrawer(): void,
    openTankMasterDrawer: boolean
    productDropDownValue: any
    loading: boolean
    editData: any
}

const TankMasterForm: FC<TankMasterProps> = ({ formik, openTankMasterDrawer, handleToggleDrawer, 
    productDropDownValue, loading, editData }) => {
    const unit = [
        {
            name: 'data',
            value: 'data'
        }
    ]

    const drawerWidth = 700
    return <Drawer
        open={openTankMasterDrawer}
        onClose={handleToggleDrawer}
        anchor='right'
        sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
    >
        <FlexItemCenter className='h-[4rem] px-2' gap={3}>
            <IconButton onClick={handleToggleDrawer}>
                <KeyboardArrowLeft />
            </IconButton>
            <Typography component={`p`} className={`!font-bold text-2xl`}>
                {editData && Object.keys(editData).length > 0  ? text.edit.editTankMaster : text.add.addTank}
            </Typography>
        </FlexItemCenter>
        <Divider />
        <Container className='py-5'>
            <form onSubmit={formik?.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <TextFieldInput
                            placeholder={text.placeholders.tankMaster.tankName}
                            extraCls={`w-full`}
                            color={`success`}
                            textinputname={`tankName`}
                            inputLabel={text.label.tankMaster.tankName}
                            onChange={formik?.handleChange}
                            value={formik?.values?.tankName}
                            handleBlur={formik?.handleBlur}
                            error={
                                formik?.touched?.tankName &&
                                Boolean(formik?.errors?.tankName)
                            }
                            helperText={
                                formik?.touched?.tankName && formik?.errors?.tankName
                            }
                            clickEnter={formik?.handleSubmit}
                            fullwidthState autoFocus />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <DropDownField
                            name={`product`}
                            dropdownLabel={text.label.tankMaster.product}
                            // placeholder={text.placeholders.addItemMaster.unit}
                            color={`success`}
                            option={formik?.values?.product}
                            handleChange={formik?.handleChange}
                            handleBlur={formik?.handleBlur}
                            selectOption={productDropDownValue}
                            error={
                                formik?.touched?.product &&
                                Boolean(formik?.errors?.product)
                            }
                            errorText={
                                formik?.touched?.product && formik?.errors?.product
                            }
                            fullWidthState
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <TextFieldInput
                            inputLabel={text.label.tankMaster.tankDiameter}
                            placeholder={text.placeholders.tankMaster.tankDiameter}
                            extraCls={`w-full`}
                            color={`success`}
                            textinputname={`tankDiameter`}
                            type={'number'}
                            sx={{
                                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                                    display: "none",
                                },
                                "& input[type=number]": {
                                    MozAppearance: "textfield",
                                },
                            }}
                            onChange={formik?.handleChange}
                            value={formik?.values?.tankDiameter}
                            handleBlur={formik?.handleBlur}
                            error={
                                formik?.touched?.tankDiameter &&
                                Boolean(formik?.errors?.tankDiameter)
                            }
                            helperText={
                                formik?.touched?.tankDiameter && formik?.errors?.tankDiameter
                            }
                            clickEnter={formik?.handleSubmit}
                            fullwidthState />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <TextFieldInput
                            inputLabel={text.label.tankMaster.tankLength}
                            placeholder={text.placeholders.tankMaster.tankLength}
                            extraCls={`w-full`}
                            color={`success`}
                            textinputname={`tankLength`}
                            type={'number'}
                            sx={{
                                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                                    display: "none",
                                },
                                "& input[type=number]": {
                                    MozAppearance: "textfield",
                                },
                            }}
                            onChange={formik?.handleChange}
                            value={formik?.values?.tankLength}
                            handleBlur={formik?.handleBlur}
                            error={
                                formik?.touched?.tankLength &&
                                Boolean(formik?.errors?.tankLength)
                            }
                            helperText={
                                formik?.touched?.tankLength && formik?.errors?.tankLength
                            }
                            clickEnter={formik?.handleSubmit}
                            fullwidthState />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <TextFieldInput
                            inputLabel={text.label.tankMaster.maxVolume}
                            placeholder={text.placeholders.tankMaster.maxVolume}
                            extraCls={`w-full`}
                            color={`success`}
                            textinputname={`maxVolume`}
                            type={'number'}
                            sx={{
                                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                                    display: "none",
                                },
                                "& input[type=number]": {
                                    MozAppearance: "textfield",
                                },
                            }}
                            onChange={formik?.handleChange}
                            value={formik?.values?.maxVolume}
                            handleBlur={formik?.handleBlur}
                            error={
                                formik?.touched?.maxVolume &&
                                Boolean(formik?.errors?.maxVolume)
                            }
                            helperText={
                                formik?.touched?.maxVolume && formik?.errors?.maxVolume
                            }
                            clickEnter={formik?.handleSubmit}
                            fullwidthState />
                    </Grid>
                </Grid>
                <FlexItemCenter className='w-full h-[5rem]'>
                    <FlexBetween className='flex-row-reverse w-full'>
                        <ButtonFieldInput
                         name={editData && Object.keys(editData).length > 0 ? text.buttonNames.update : text.buttonNames.add}
                            buttonextracls={`rounded-full bg-blue-500 capitalize`}
                            variant={`contained`} loading={loading} disabled={loading}
                            />
                        <ButtonFieldInput name={text.buttonNames.cancel}
                            buttonextracls={`rounded-full bg-gray-400 capitalize`}
                            variant={`contained`} type={`button`} handleClick={
                                handleToggleDrawer
                                }/>
                    </FlexBetween>
                </FlexItemCenter>
            </form>
        </Container>
    </Drawer>
}

export default TankMasterForm