import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { CREATE_STUDENT } from './gql/mutation'
import { GET_CITIES } from './gql/query'
import { useMutation, useQuery } from '@apollo/client'
import { showSuccess } from '../../utils/swlAlert'
import { Autocomplete, Grid } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { useNavigate } from 'react-router-dom'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import { educationLevelsObject, majorObject } from '../../constants'
import StudentData from './dto/student-data'
import { vmsNationalCode } from 'utils/utils'
import CityData from './dto/city-data'
import CityType from './dto/city-data'

interface ErrorData {
  first_name?: string
  last_name?: string
  phone?: string
  mother_phone?: string
  father_phone?: string
  home_phone?: string
  major?: string
  egucation_level?: string
  description?: string
  parents_job_title?: string
  nationality_code?: string
  concours_year?: string
}

const StudentCreateScreen = () => {
  const [studentInfo, setStudentInfo] = useState<StudentData>({
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
    cities_id: 396,
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<ErrorData>({})
  const [createStudent] = useMutation(CREATE_STUDENT)
  const navigate = useNavigate()
  const [cityOptions, setCityOptions] = useState<CityType[]>([])
  const [skip, setSkip] = useState<Boolean>(true)
  const [loadingCity, setLoadingCity] = useState<boolean>(false)
  const [cityName, setCityName] = useState<string>('')

  const { refetch: refetchCities } = useQuery(GET_CITIES, {
    variables: {
      first: 100,
      page: 1,
      name: '',
      fetchPolicy: 'network-only',
    },
    onCompleted: (data) => {
      if (!skip) {
        setCityOptions(data.getCities.data)
      }
    },
  })

  const createStudentHandler = () => {
    if (!validateForm()) return
    setLoading(true)
    createStudent({
      variables: studentInfo,
    })
      .then(() => {
        showSuccess('دانش آموز جدید با موفقیت اضافه شد.')
        //navigate("/students");
        navigate(-1)
      })
      .finally(() => {
        setLoading(false)
      })
  }

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

  useEffect(() => {
    setLoadingCity(true)
    refetchCities({
      first: 1000,
      page: 1,
      name: cityName,
    }).then(() => {
      setLoadingCity(false)
    })
  }, [cityName])

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <h1>ایجاد دانش‌آموز جدید </h1>

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
            error={error.father_phone ? true : false}
            helperText={error.father_phone ? error.father_phone : ''}
            variant="filled"
          />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <TextField
            fullWidth
            label="تلفن مادر"
            value={studentInfo.mother_phone}
            onChange={(e: any) => setStudentInfo({ ...studentInfo, mother_phone: e.target.value })}
            error={error.mother_phone ? true : false}
            helperText={error.mother_phone ? error.mother_phone : ''}
            variant="filled"
          />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <TextField
            fullWidth
            label="تلفن منزل"
            value={studentInfo.home_phone}
            onChange={(e: any) => setStudentInfo({ ...studentInfo, home_phone: e.target.value })}
            error={error.home_phone ? true : false}
            helperText={error.home_phone ? error.home_phone : ''}
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
              error={error.major ? true : false}
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
            {error.major ? <FormHelperText error>{error.major}</FormHelperText> : ''}
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
            error={error.parents_job_title ? true : false}
            helperText={error.parents_job_title ? error.parents_job_title : ''}
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
            <Autocomplete
              id="city_id"
              options={cityOptions}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label=" شهر "
                  variant="filled"
                  //style={{ width: "100%" }}
                  onChange={(e) => {
                    // alert('inner changes is:' + e.target.value.trim())
                    if (e.target.value.trim().length >= 1) {
                      setSkip(false)
                      setCityName(e.target.value.trim())

                      //setConsultantName(e.target.value.trim())
                    }
                  }}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {/* {loadingCities ? <CircularProgress color="inherit" size={10} /> : null} */}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
              getOptionLabel={(option) => option?.name}
              // style={customStyles}
              style={{ width: '100%' }}
              //value={396}
              onChange={(_event, newTeam) => {
                setStudentInfo({
                  ...studentInfo,
                  cities_id: newTeam?.id ? +newTeam.id : undefined,
                })
              }}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Box mt={2}>
        <Button
          sx={{ float: 'left' }}
          variant="contained"
          startIcon={<AddCircleIcon />}
          color="primary"
          onClick={createStudentHandler}
          disabled={loading}
        >
          ایجاد دانش‌آموز جدید
          {loading ? <CircularProgress size={15} color="primary" /> : null}
        </Button>
        <Button
          sx={{ float: 'right' }}
          variant="contained"
          color="secondary"
          //onClick={() => navigate(`/students`)}
          onClick={() => navigate(-1)}
          disabled={loading}
        >
          <ArrowBackIcon />
          بازگشت
        </Button>
      </Box>
    </Container>
  )
}

export default StudentCreateScreen
