import { Theme } from '@emotion/react'
import { SxProps } from '@mui/material'
import { LocalizationProvider, MultiInputTimeRangeField } from '@mui/x-date-pickers-pro'
import { DateRange } from '@mui/x-date-pickers-pro'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Dayjs } from 'dayjs'
import { FC } from 'react'

interface TimeRangePickerProps {
  startLabel?: string,
  endLabel?: string,
  timeRange: DateRange<Dayjs>
  handleTimeRangeChange(): void
  errorMessage: string,
  timeRangeErrorHandler(): void
  handleBlur?(): void
  color?: 'success' | 'error' | 'primary'
  extraCls?: string
  sx?: SxProps<Theme> 
  timeFormat?: string
}

const TimeRangePicker: FC<TimeRangePickerProps> = ({handleTimeRangeChange, startLabel, endLabel, timeRange, 
    color, errorMessage, timeRangeErrorHandler, handleBlur, extraCls, sx, timeFormat}) => {
  return<LocalizationProvider dateAdapter={AdapterDayjs}>
  <MultiInputTimeRangeField
    value={timeRange}
    onChange={handleTimeRangeChange}
    onError={timeRangeErrorHandler}
    slotProps={{
        textField: ({ position }) => ( {
          helperText: errorMessage,
          onBlur: handleBlur,
          color: color,
          label: position === 'start' ? startLabel : endLabel,
        })
      }}
      className={extraCls}
      sx={sx}
      format={timeFormat}
  />
  </LocalizationProvider>
}

export default TimeRangePicker