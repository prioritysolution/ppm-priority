import { FlexBetween, FlexItemCenter } from '@/common'
import { Typography } from '@mui/material'
import { FC } from 'react'
import text from '@/languages/en_US.json'

interface FooterProps {

}

const Footer: FC<FooterProps> = ({ }) => {
  return <FlexItemCenter className='h-[4rem] bg-gradient-to-tr from-blue-500 via-indigo-500 to-sky-400 w-full px-5 py-2'>
    <FlexBetween className='w-full' flexWrap={`wrap`}>
      <Typography component={`h4`} className='!font-semibold !text-white md:!text-sm !text-xs'>
        {text.copyrightBy} &copy; {text.companyDetails.estd} {text.companyDetails.companyName} &diams; {text.rightsReserved} &diams;
      </Typography>
      <Typography component={`h4`} className={`!text-white !font-semibold md:!text-sm !text-xs`}>
        version 1.0.0
      </Typography>
    </FlexBetween>
  </FlexItemCenter>
}

export default Footer