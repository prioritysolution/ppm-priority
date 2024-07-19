import { FC } from 'react'
import { FlexCenter, FlexItemCenter } from '..'
import Image from 'next/image'
import { loading } from '@/Images'
import { Typography } from '@mui/material'

interface CommonLoadingProps {
  loadSpaceBetween: number,
  imgHeight: number,
  loadingTextCls?: string,
  loadingText?: string
}

const CommonLoading: FC<CommonLoadingProps> = ({imgHeight, loadSpaceBetween, loadingText, loadingTextCls}) => {
  return <FlexCenter className='w-full h-full'>
    <FlexItemCenter gap={loadSpaceBetween}>
    <Image src={loading} alt={`loading`} height={imgHeight} priority/>
    <Typography component={`span`} className={loadingTextCls}>
      {loadingText ?? 'Loading...'}
    </Typography>
    </FlexItemCenter>
  </FlexCenter>
}

export default CommonLoading