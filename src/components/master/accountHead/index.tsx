import { Box, Grid } from '@mui/material'
import { FC } from 'react'
import AccountHeadTable from './AccountHeadTable'
import AccountHeadForm from './AccountHeadForm'
import text from '@/languages/en_US.json'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import { useSelector } from 'react-redux'
const DynamicTypography = dynamic(() => import('@mui/material/Typography'), {
    ssr: false
})

interface AccountHeadProps {
    addAccountHeadFormik: any
    token: string
    loader: boolean
    postLoaders: boolean
    editAccountHead(data: any): any
    editData: any
}

const AccountHead: FC<AccountHeadProps> = ({ addAccountHeadFormik, token, loader, postLoaders, editAccountHead, editData }) => {
    const accountHeadMainDropDown = useSelector((state: any) => state.accountHeadData?.accountHeadMainData)?.map((data: any) => {
        return {
            name: data.Main_Head_Name,
            value: data.Id
        }
    })

    const accountHeadData= useSelector((state: any) => state.accountHeadData?.accountHeadData)
    const tableData = [
        {
            si: 1,
            itemName: 'diesel',
            itemUnit: 20
        }
    ]
    if (!token) notFound()
    return <Box className={`min-h-[85vh] p-5`}>
        {/* <FlexBetween className='w-full'> */}
        <DynamicTypography variant={`h6`} className='font-bold text-black text-3xl mb-5'>
            {text.tableTitles.accountHead}
        </DynamicTypography>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <AccountHeadTable AccountHeadDatas={accountHeadData} handleEditData={editAccountHead} loader={loader} />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <Box className='shadow-md rounded-md border-t'>
                    <AccountHeadForm formik={addAccountHeadFormik}
                     accountHeadMainDropDown={accountHeadMainDropDown} postLoaders={postLoaders} editData={editData}/>
                </Box>
            </Grid>
        </Grid>
    </Box>
}

export default AccountHead