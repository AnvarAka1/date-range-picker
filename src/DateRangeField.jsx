import React, { useCallback, useRef, useState } from 'react'
import DateField from './DateField'
import { Grid, styled } from '@mui/material'
import { useField } from 'formik'
import { PickersDay } from '@mui/x-date-pickers'

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== 'dayIsBetween' && prop !== 'isFirstDay' && prop !== 'isLastDay'
})(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
  ...(dayIsBetween && {
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.dark
    }
  }),
  ...(isFirstDay && {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%'
  }),
  ...(isLastDay && {
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%'
  })
}))

const FROM = 'from'
const TO = 'to'
const CLOSED = 'closed'

function DateRangeField() {
  const fromRef = useRef(null)
  const toRef = useRef(null)
  const [state, setState] = useState(CLOSED)
  const [fromDateField, , fromDateHelpers] = useField('fromDate')
  const [toDateField, , toDateHelpers] = useField('toDate')

  const fromDate = fromDateField.value
  const toDate = toDateField.value

  const renderWeekPickerDay = useCallback((date, selectedDates, pickersDayProps) => {
    if (!fromDate) {
      return <PickersDay {...pickersDayProps} />
    }

    const selectedDate = date.startOf('day')
    const startDate = fromDate.startOf('day')
    const endDate = toDate ? toDate.startOf('day') : startDate

    const dayIsBetween = selectedDate >= startDate && selectedDate <= endDate
    const isFirstDay = selectedDate.equals(startDate)
    const isLastDay = selectedDate.equals(endDate)

    return (
      <CustomPickersDay
        {...pickersDayProps}
        disableMargin
        dayIsBetween={dayIsBetween}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
      />
    )
  }, [fromDate, toDate])


  const handleFromChange = value => {
    toRef.current.focus()
    setState(TO)
    fromDateHelpers.setValue(value)
  }

  const handleToChange = value => {
    const selectedDate = value.startOf('day')
    const startDate = fromDate.startOf('day')
    const endDate = toDate && toDate.startOf('day')

    const isDateOutsideInterval = (
      selectedDate < startDate ||
      (toDate && selectedDate > endDate)
    )

    if (isDateOutsideInterval) {
      fromDateHelpers.setValue(value)
      toDateHelpers.setValue(null)

      return
    }

    toDateHelpers.setValue(value)
  }

  return (
    <Grid container={true} spacing={3}>
      <Grid item={true} xs={12} lg={6}>
        <DateField
          ref={fromRef}
          name="fromDate"
          open={false}
          onOpen={() => setState(FROM)}
        />
      </Grid>
      <Grid item={true} xs={12} lg={6}>
        <DateField
          ref={toRef}
          name="toDate"
          open={state !== CLOSED}
          renderDay={renderWeekPickerDay}
          onOpen={() => setState(FROM)}
          onClose={() => setState(CLOSED)}
          onChange={state === FROM ? handleFromChange : handleToChange}
        />
      </Grid>
    </Grid>
  )
}

export default DateRangeField