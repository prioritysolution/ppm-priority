import { Box, Grid } from '@mui/material'
import { FC } from 'react'
import text from '@/languages/en_US.json'
import dynamic from 'next/dynamic'
import ShiftMasterTable from './ShiftMasterTable'
import ShiftMasterForm from './ShiftMasterForm'
import { useSelector } from 'react-redux'
import { notFound } from 'next/navigation'
import { DateRange, DateValidationError, TimeRangeValidationError } from '@mui/x-date-pickers-pro'
import dayjs, { Dayjs } from 'dayjs'
const DynamicTypography = dynamic(() => import('@mui/material/Typography'), {
    ssr: false
})
interface ShiftMasterProps {
    formik: any
    loader: boolean
    token: string
    handleTimeRange(): void
    timeRange: DateRange<Dayjs>
    handleTimeRangeError(): void
    errorMessage: string
    timeRangeError: any
    postLoaders: boolean
    handleEditData(data: any): void
    handleResetFormData(): void
    editData: any
}

const ShiftMaster: FC<ShiftMasterProps> = ({ formik, loader, token, handleTimeRange, handleTimeRangeError,
    timeRange, errorMessage, postLoaders, handleEditData, editData, handleResetFormData }) => {

    const shiftMasterData = useSelector((state: any) => state.shiftMasterData?.shiftMasterData)

    if (!token) return notFound()

    // console.log(addNozzleData, '*data')
    return <Box className={`min-h-[85vh] p-5`}>
        {/* <FlexBetween className='w-full'> */}
        <DynamicTypography variant={`h6`} className='font-bold text-black text-3xl mb-5'>
            {text.tableTitles.shiftMaster}
        </DynamicTypography>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <ShiftMasterTable shiftMasterData={shiftMasterData} handleEditData={handleEditData} loading={loader} />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <Box className='shadow-md rounded-md border-t'>
                    <ShiftMasterForm formik={formik}
                        handleTimeRange={handleTimeRange}
                        handleTimeRangeError={handleTimeRangeError}
                        timeRange={timeRange}
                        errorMessage={errorMessage}
                        postLoaders={postLoaders}
                        handleResetForm={handleResetFormData}
                        editData={editData}
                    />
                </Box>
            </Grid>
        </Grid>
    </Box>
}

export default ShiftMaster