import { TableCommon } from '@/common'
import { Box } from '@mui/material'
import { FC } from 'react'
import text from '@/languages/en_US.json'
import { notFound } from 'next/navigation'
import { useSelector } from 'react-redux'
import StaffMasterForm from './StaffTableForm'
import StaffMasterTable from './StaffTable'
import { Dayjs } from 'dayjs'

interface StaffMasterProps {
    handleCloseDrawer(): void
    handleOpenDrawer(): void,
    staffDrawerOpen: boolean,
    AddStaffFormik: any
    errorMessage: string
    handleJoiningDate(): void
    handleJoiningDateError(): void
    handleStaffMobileChange(number: string): void
    joiningDate: Dayjs | null
    staffMobile: string
    postLoaders: boolean
    loader: boolean
    token: string
    handleEditData(data: any): void
}


const StaffMaster: FC<StaffMasterProps> = ({ handleCloseDrawer, handleOpenDrawer, staffDrawerOpen, AddStaffFormik, token, handleEditData,
    errorMessage, handleJoiningDate, handleJoiningDateError, handleStaffMobileChange, joiningDate, staffMobile, postLoaders, loader }) => {

    const staffTypeDropDownValue = useSelector((state: any) => state.staff?.staffType)?.map((data: any) => {
        return {
            name: data.Option_Name,
            value: data.Option_Id
        }
    })

    const staffDesignationDropdown = useSelector((state: any) => state.staff?.staffDesignation)?.map((data: any) => {
        return {
            name: data.Option_Name,
            value: data.Option_Id
        }
    })

    const staffData= useSelector((state: any) => state.staff?.staffData)

    if (!token) return notFound()
    return <Box className={`min-h-[90vh]`}>
        <TableCommon
            title={text.tableTitles.staffMaster}
            btnName={text.add.addStaffMaster}
            titleTextCls={`font-bold text-black text-3xl`}
            titleCls='mb-5'
            addComponent={<StaffMasterForm
                handleCloseDrawer={handleCloseDrawer}
                openStaffMaster={staffDrawerOpen}
                errorMessage={errorMessage}
                formik={AddStaffFormik}
                handleJoiningDate={handleJoiningDate}
                handleJoiningDateError={handleJoiningDateError}
                handleStaffMobile={handleStaffMobileChange}
                staffDesignationDropDownValue={staffDesignationDropdown}
                joiningDate={joiningDate}
                staffMobile={staffMobile}
                staffTypeDropdownValue={staffTypeDropDownValue}
                loading={postLoaders}
            />}
            handleOpenButton={handleOpenDrawer}
            tableComponent={<StaffMasterTable StaffMasterDatas={staffData}
                loader={loader} handleEditData={handleEditData}
            />}
        />
    </Box>
}
export default StaffMaster