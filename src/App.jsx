import { Formik } from 'formik'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import DateRangeField from './DateRangeField'

function App() {
  const handleSubmit = () => {
  }

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <Formik initialValues={{}} onSubmit={handleSubmit}>
        {({ initialValues, handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <DateRangeField initialValues={initialValues} />
            </form>
          )
        }}
      </Formik>
    </LocalizationProvider>
  )
}

export default App
