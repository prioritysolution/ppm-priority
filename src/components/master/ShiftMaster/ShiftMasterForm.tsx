import { ButtonFieldInput, FlexBetween, FlexItemCenter, TextFieldInput, TimeRangePicker } from '@/common'
import { Divider, Grid } from '@mui/material'
import { FC } from 'react'
import text from '@/languages/en_US.json'
import { DateRange } from '@mui/x-date-pickers-pro'
import dayjs, { Dayjs } from 'dayjs'

interface ShiftMasterFormProps {
    formik: any
    handleTimeRange(): void
    timeRange: DateRange<Dayjs>
    handleTimeRangeError(): void
    errorMessage: string
    postLoaders: boolean
    handleResetForm(): void
    editData: any
}

const ShiftMasterForm: FC<ShiftMasterFormProps> = ({ formik, handleTimeRange, handleTimeRangeError, 
    timeRange, errorMessage, postLoaders, editData, handleResetForm }) => {
    return <form onSubmit={formik?.handleSubmit}>
        <FlexItemCenter className='h-[3rem]'>
            <p className='font-bold text-black text-lg px-5'>
                { editData && Object.keys(editData).length > 0 ?
                text.edit.editShiftMaster
                :
                text.add.shiftMaster}
            </p>
        </FlexItemCenter>
        <Divider className='w-full m-0' />
        <Grid container spacing={1} className='p-5'>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <TextFieldInput
                    placeholder={text.placeholders.addShiftMaster.shiftName}
                    extraCls={`w-full`}
                    color={`success`}
                    textinputname={`shiftName`}
                    inputLabel={text.label.addShiftMaster.shiftName}
                    onChange={formik?.handleChange}
                    value={formik?.values?.shiftName}
                    handleBlur={formik?.handleBlur}
                    error={
                        formik?.touched?.shiftName &&
                        Boolean(formik?.errors?.shiftName)
                    }
                    helperText={
                        formik?.touched?.shiftName && formik?.errors?.shiftName
                    }
                    clickEnter={formik?.handleSubmit}
                    fullwidthState autoFocus />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <TimeRangePicker
                    handleTimeRangeChange={handleTimeRange}
                    timeRange={timeRange}
                    timeRangeErrorHandler={handleTimeRangeError}
                    errorMessage={errorMessage}
                    startLabel={`${text.label.addShiftMaster.startTime}`}
                    endLabel={`${text.label.addShiftMaster.endTime}`}
                    extraCls='w-full'
                    color={errorMessage ? 'error' : 'success'}
                    handleBlur={handleTimeRangeError}
                    timeFormat={'HH:mm'}
                />
            </Grid>
        </Grid>
        <FlexItemCenter className='w-full mt-2 p-5'>
            <FlexBetween className='flex-row-reverse w-full'>
                <ButtonFieldInput name={editData && Object.keys(editData).length > 0 ?
                text.buttonNames.update :
                 text.buttonNames.add}
                    buttonextracls={`rounded-full bg-blue-500  capitalize`}
                    variant={`contained`}
                    handleClick={(timeRange[0] === null || timeRange[1] === null) ||
                         (dayjs(timeRange[0]).format('HH:mm') >= dayjs(timeRange[1]).format('HH:mm')) ?
                        handleTimeRangeError
                        : formik?.handleSubmit}
                        loading={postLoaders}
                        disabled={postLoaders}
                />
                <ButtonFieldInput name={text.buttonNames.cancel}
                    buttonextracls={`rounded-full bg-gray-400 capitalize`}
                    variant={`contained`} type={`button`} handleClick={handleResetForm}/>
            </FlexBetween>
        </FlexItemCenter>
    </form>
}

export default ShiftMasterForm