import React from 'react'
import { Field } from 'formik'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import { TextField } from '@mui/material'

const DateField = React.forwardRef(({ name, onChange, ...props }, ref) => {
  const handleChange = (value) => {
    onChange(value)
  }

  return (
    <Field name={name}>
      {({ field }) => (
        <MobileDatePicker
          value={field.value}
          onChange={handleChange}
          inputFormat="dd.MM.yyyy"
          mask="__.__.____"
          renderInput={props => (
            <TextField {...props} ref={ref} size="small"/>
          )}
          InputProps={{ sx: { pr: 0 } }}
          renderDay={props.renderDay}
          {...props}
        />
      )}
    </Field>
  )
})

export default DateField