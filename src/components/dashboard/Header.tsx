import { FlexBetween, FlexBox, FlexItemCenter } from '@/common'
import { Box, Card, Grid, Tooltip, Typography } from '@mui/material'
import { DashBoardHeaderTypes } from '@/types/data-types'
import { DashboardHeaderCardData } from './DashboardHeaderCardData'

const Header = () => {
  return <Grid container columnSpacing={2} rowGap={2} className='max-w-[99vw] mt-5 px-2'>
      {DashboardHeaderCardData.map((cardData: DashBoardHeaderTypes, idx: number) => <Grid item xs={12} sm={6} md={3} lg={2} key={idx}>
      <Card className={`py-5 cursor-pointer w-full px-5`}>
          <FlexItemCenter gap={3}>
        <FlexBetween className='w-full'>
          <Tooltip title={cardData.title} arrow disableInteractive>
            <Typography component={`p`} className={`font-semibold truncate`}>
              {cardData.title}
            </Typography>
          </Tooltip>
            <Box className={`rounded-full`}>
              {cardData.icon}
            </Box>
        </FlexBetween>
          </FlexItemCenter>
      </Card>
      </Grid>
      )}

    </Grid>
}

export default Header