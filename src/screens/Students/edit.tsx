import { useState } from 'react'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { EDIT_STUDENT } from './gql/mutation'
import { useMutation, useQuery } from '@apollo/client'
import { GET_A_STUDENT, GET_CITIES } from './gql/query'
import { showSuccess } from '../../utils/swlAlert'
import { Autocomplete, Grid } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { useNavigate } from 'react-router-dom'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import { educationLevelsObject, majorObject } from '../../constants'
import { useParams } from 'react-router-dom'
import StudentData from './dto/student-data'
import { vmsNationalCode } from 'utils/utils'
import CityType from './dto/city-data'

interface ErrorData {
  first_name?: string
  last_name?: string
  phone?: string
  egucation_level?: string
  nationality_code?: string
}

const StudentEditScreen = () => {
  const { studentId } = useParams<string>()
  const [studentInfo, setStudentInfo] = useState<StudentData>({
    id: '0',
    first_name: '',
    last_name: '',
    phone: '',
    mother_phone: '',
    father_phone: '',
    home_phone: '',
    major: '',
    egucation_level: '',
    parents_job_title: '',
    nationality_code: '',
    concours_year: '',
    cities_id: 0,
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<ErrorData>({})
  const [editStudent] = useMutation(EDIT_STUDENT)
  const [cityOptions, setCityOptions] = useState<CityType[] | undefined>(undefined)
  const navigate = useNavigate()

  useQuery(GET_A_STUDENT, {
    variables: {
      id: studentId,
    },
    onCompleted: (data) => {
      let studentInfoRead = data.getStudent
      for (let key in data.getStudent) {
        if (key === '__typename') {
          continue
        }
        studentInfoRead = {
          ...studentInfoRead,
          [key]: data.getStudent[key] ? data.getStudent[key] : '',
        }
      }
      setStudentInfo(studentInfoRead)
      refetchCities().then((res) => {
        setCityOptions(res.data.getCities.data)
      })
    },
  })

  const editStudentHandler = () => {
    if (!validateForm()) return
    setLoading(true)
    editStudent({
      variables: studentInfo,
    })
      .then(() => {
        showSuccess('ویرایش با موفقبت انجام شد.')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const { refetch: refetchCities } = useQuery(GET_CITIES, {
    variables: {
      first: 1000,
      page: 1,
      name: '',
      fetchPolicy: 'network-only',
    },
    skip: true,
  })

  const validateForm = () => {
    let out = true
    let result: ErrorData = {}
    setError({})
    if (!studentInfo.first_name) {
      result = { ...result, first_name: 'نام را وارد کنید.' }
      out = false
    }
    if (!studentInfo.last_name) {
      result = { ...result, last_name: 'نام خانوادگی را وارد کنید.' }
      out = false
    }
    if (!vmsNationalCode(studentInfo.nationality_code)) {
      result = { ...result, nationality_code: 'کدملی را صحیح وارد کنید.' }
      out = false
    }
    if (!studentInfo.phone) {
      result = { ...result, phone: 'تلفن همراه را وارد کنید.' }
      out = false
    }
    if (!studentInfo.egucation_level) {
      result = { ...result, egucation_level: 'مقطع را وارد کنید.' }
      out = false
    }
    setError(result)
    return out
  }

  const handleChangeEducationLevel = (e: SelectChangeEvent<string>) => {
    setStudentInfo({ ...studentInfo, egucation_level: e.target.value })
  }

  const handleChangeMajor = (e: SelectChangeEvent<string>) => {
    setStudentInfo({ ...studentInfo, major: e.target.value })
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <h1> ویرایش دانش‌آموز </h1>

      <Grid container component={Paper} sx={{ p: 2 }} spacing={2}>
        <Grid item xs={12} md={4} lg={4}>
          <TextField
            fullWidth
            label="نام"
            value={studentInfo.first_name}
            onChange={(e: any) => setStudentInfo({ ...studentInfo, first_name: e.target.value })}
            error={error.first_name ? true : false}
            helperText={error.first_name ? error.first_name : ''}
            variant="filled"
          />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <TextField
            fullWidth
            label="نام خانوادگی"
            value={studentInfo.last_name}
            onChange={(e: any) => setStudentInfo({ ...studentInfo, last_name: e.target.value })}
            error={error.last_name ? true : false}
            helperText={error.last_name ? error.last_name : ''}
            variant="filled"
          />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <TextField
            fullWidth
            label="کدملی"
            value={studentInfo.nationality_code}
            onChange={(e: any) =>
              setStudentInfo({
                ...studentInfo,
                nationality_code: e.target.value,
              })
            }
            error={error.nationality_code ? true : false}
            helperText={error.nationality_code ? error.nationality_code : ''}
            variant="filled"
          />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <TextField
            fullWidth
            label="تلفن"
            value={studentInfo.phone}
            onChange={(e: any) => setStudentInfo({ ...studentInfo, phone: e.target.value })}
            error={error.phone ? true : false}
            helperText={error.phone ? error.phone : ''}
            variant="filled"
          />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <TextField
            fullWidth
            label="تلفن پدر"
            value={studentInfo.father_phone}
            onChange={(e: any) => setStudentInfo({ ...studentInfo, father_phone: e.target.value })}
            variant="filled"
          />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <TextField
            fullWidth
            label="تلفن مادر"
            value={studentInfo.mother_phone}
            onChange={(e: any) => setStudentInfo({ ...studentInfo, mother_phone: e.target.value })}
            variant="filled"
          />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <TextField
            fullWidth
            label="تلفن منزل"
            value={studentInfo.home_phone}
            onChange={(e: any) => setStudentInfo({ ...studentInfo, home_phone: e.target.value })}
            variant="filled"
          />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <FormControl sx={{ width: '100%' }}>
            <Select
              defaultValue=""
              id="grouped-select"
              value={studentInfo.major}
              onChange={handleChangeMajor}
              variant="filled"
              displayEmpty
            >
              <MenuItem value="" disabled>
                <em>رشته</em>
              </MenuItem>
              {Object.keys(majorObject).map((key, index) => (
                <MenuItem key={index} value={key}>
                  {majorObject[key]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <FormControl sx={{ width: '100%' }}>
            <Select
              defaultValue=""
              value={studentInfo.egucation_level}
              onChange={handleChangeEducationLevel}
              error={error.egucation_level ? true : false}
              variant="filled"
              displayEmpty
            >
              <MenuItem value="" disabled>
                <em> مقطع</em>
              </MenuItem>
              {Object.keys(educationLevelsObject).map((key, index) => (
                <MenuItem key={index} value={key}>
                  {educationLevelsObject[key]}
                </MenuItem>
              ))}
            </Select>
            {error.egucation_level ? <FormHelperText error>{error.egucation_level}</FormHelperText> : ''}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <TextField
            fullWidth
            label="اطلاعات شغلی والدین"
            value={studentInfo.parents_job_title}
            onChange={(e: any) =>
              setStudentInfo({
                ...studentInfo,
                parents_job_title: e.target.value,
              })
            }
            variant="filled"
          />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <TextField
            fullWidth
            label="سال کنکور"
            value={studentInfo.concours_year}
            onChange={(e: any) => setStudentInfo({ ...studentInfo, concours_year: e.target.value })}
            variant="filled"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} xl={2} lg={2}>
          <FormControl
            sx={{
              mr: 1,
              width: '100%',
            }}
          >
            {!cityOptions && <CircularProgress size={15} />}
            {cityOptions && (
              <Autocomplete
                id="city_id"
                options={cityOptions}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label=" شهر "
                    variant="filled"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: <>{params.InputProps.endAdornment}</>,
                    }}
                  />
                )}
                getOptionLabel={(option) => option?.name}
                style={{ width: '100%' }}
                defaultValue={cityOptions.find((item) => item.id === String(studentInfo?.cities_id))}
                onChange={(_event, newTeam) => {
                  setStudentInfo({
                    ...studentInfo,
                    cities_id: newTeam?.id ? +newTeam.id : undefined,
                  })
                }}
              />
            )}
          </FormControl>
        </Grid>
      </Grid>
      <Box mt={2}>
        <Button
          sx={{ float: 'left' }}
          variant="contained"
          startIcon={<AddCircleIcon />}
          color="primary"
          onClick={editStudentHandler}
          disabled={loading}
        >
          ویرایش دانش‌آموز
          {loading ? <CircularProgress size={15} color="primary" /> : null}
        </Button>
        <Button
          sx={{ float: 'right' }}
          variant="contained"
          color="secondary"
          onClick={() => navigate(-1)} //</Box>navigate(`/students`)}
          disabled={loading}
        >
          <ArrowBackIcon />
          بازگشت
        </Button>
      </Box>
    </Container>
  )
}

export default StudentEditScreen
