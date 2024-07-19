"use client"
import { Box } from '@mui/material'
import { FC, ReactNode } from 'react'
import { ButtonFieldInput, FlexBetween, FlexItemCenter } from '..'
import { Add } from '@mui/icons-material'
import dynamic from 'next/dynamic'
const DynamicTypography= dynamic(()=>import('@mui/material/Typography'), {
    ssr: false
})

interface TableCommonProps {
    titleCls: string,
    title: string,
    btnName: string,
    tableComponent: ReactNode,
    addComponent: ReactNode,
    handleOpenButton(): void,
    titleTextCls?: string
}
const TableCommon: FC<TableCommonProps> = ({ titleCls, title, btnName, tableComponent, addComponent, handleOpenButton, titleTextCls }) => {
    return <Box className={`p-5`}>
        <FlexItemCenter className={titleCls}>
        <FlexBetween className='w-full'>
            <DynamicTypography variant={`h6`} className={titleTextCls}>
                {title}
            </DynamicTypography>
            <ButtonFieldInput
                startIcon={<Add />} name={btnName}
                variant={`outlined`} buttonextracls={`rounded-full border-[0.5px] capitalize`} 
                handleClick={handleOpenButton}
                />
        </FlexBetween>
        </FlexItemCenter>
        {tableComponent}
        {addComponent}
    </Box>
}

export default TableCommon