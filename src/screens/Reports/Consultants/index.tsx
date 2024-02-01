import { useState } from 'react'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Skeleton from '@mui/material/Skeleton'
import Button from '@mui/material/Button'
import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'
import { useQuery } from '@apollo/client'
import Typography from '@mui/material/Typography'
import { GET_CONSULTANTS, GET_CONSULTANT_REPORT } from './gql/query'
import { Autocomplete, CircularProgress, FormControl, Grid, MenuItem, OutlinedInput, Select, TextField } from '@mui/material'
import { TotalReportDtos } from './dto/TotalReport.dto'
import ConsultantTotalReportSummary from './components/ConsultantTotalReportSummary'
import { SearchData } from './dto/Search.dto'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import AdapterJalali from '@date-io/date-fns-jalali'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import moment from 'moment'

const ConsultantReport = () => {
  const [consultantOptions, setConsultantOptions] = useState<any[]>([{ label: '', id: '' }])

  const [refetchLoading, setRefetchLoading] = useState<boolean>(false)
  const [search, setSearch] = useState<SearchData>({
    consultant_id: undefined,
    session_date_from: undefined,
    session_date_to: undefined,
    education_level: 0,
  })
  const [educationlevel, setEducationLevel] = useState<number>(0)
  const [totalReport, setTotalReport] = useState<TotalReportDtos[]>([])

  const { refetch } = useQuery(GET_CONSULTANT_REPORT, {
    variables: {
      consultant_id: -1,
      fetchPolicy: 'no-cache',
      skip: true,
    },
    onCompleted(data) {
      setTotalReport(data.getConsultantDefinitionDetailsGenerealReport)
    },
  })

  useQuery(GET_CONSULTANTS, {
    variables: {
      first: 100,
      page: 1,
      orderBy: [
        {
          column: 'id',
          order: 'DESC',
        },
      ],
      fetchPolicy: 'no-cache',
    },
    onCompleted(data) {
      if (data?.getConsultants?.data) {
        const tmp = [{ label: '', id: 0 }]
        setConsultantOptions(tmp)
        for (const i in data.getConsultants.data) {
          const consultant = data.getConsultants.data[i]
          tmp.push({
            id: +consultant.id,
            label: consultant.first_name + ' ' + consultant.last_name,
          })
        }
      }
    },
  })

  const handleSearch = (): void => {
    setRefetchLoading(true)
    let refetchData: SearchData = { ...search }
    refetchData.education_level = refetchData.education_level === 0 ? undefined : refetchData.education_level
    refetchData.session_date_from = refetchData.session_date_from
      ? moment(refetchData.session_date_from).format('YYYY-MM-DD')
      : undefined
    refetchData.session_date_to = refetchData.session_date_to
      ? moment(refetchData.session_date_to).format('YYYY-MM-DD')
      : undefined

    refetch(refetchData)
      .then((res) => {
        setTotalReport(res.data.getConsultantDefinitionDetailsGenerealReport)
        setRefetchLoading(false)
      })
      .catch((err) => {
        setRefetchLoading(false)
      })
  }

  if (!consultantOptions) {
    return (
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Skeleton width="100%" height={100} />
        <Skeleton variant="rectangular" width="100%" height={300} />
      </Container>
    )
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography component={'div'} sx={{ fontSize: 18, fontWeight: 'bold', my: 2 }}>
        گزارش مشاوران
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          padding: 2,
        }}
        component={Paper}
      >
        {consultantOptions && consultantOptions?.length ? (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3} xl={3}>
              <Autocomplete
                onChange={(event: any, newValue: any) => {
                  setSearch({ ...search, consultant_id: newValue?.id })
                }}
                disablePortal
                id="combo-box-demo"
                options={consultantOptions}
                sx={{ width: '100%' }}
                renderInput={(params) => <TextField {...params} label="انتخاب مشاور" />}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3} xl={3}>
              <LocalizationProvider dateAdapter={AdapterJalali}>
                <DatePicker
                  label="از تاریخ"
                  value={search.session_date_from || null}
                  onChange={(newValue) => {
                    if (newValue) {
                      setSearch({
                        ...search,
                        session_date_from: newValue as string,
                      })
                    }
                  }}
                  renderInput={(params) => <TextField {...params} style={{ width: '100%' }} />}
                  mask="____/__/__"
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={6} md={3} xl={3}>
              <LocalizationProvider dateAdapter={AdapterJalali}>
                <DatePicker
                  label="تا تاریخ"
                  value={search.session_date_to || null}
                  onChange={(newValue) => {
                    if (newValue) {
                      setSearch({
                        ...search,
                        session_date_to: newValue as string,
                      })
                    }
                  }}
                  renderInput={(params) => <TextField {...params} style={{ width: '100%' }} />}
                  mask="____/__/__"
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6} md={1} xl={1}>
              <FormControl
                sx={{
                  backgroundColor: 'white',
                  width: '100%',
                }}
              >
                <Select
                  sx={{
                    backgroundColor: 'white',
                    width: '100%',
                    fontSize: 13,
                  }}
                  labelId="week-label"
                  id="week-select"
                  value={educationlevel}
                  onChange={(newValue) => {
                    setEducationLevel(Number(newValue.target.value))
                    setSearch({
                      ...search,
                      education_level: newValue ? Number(newValue.target.value) : undefined,
                    })
                  }}
                  input={<OutlinedInput />}
                >
                  <MenuItem value={0}> همه</MenuItem>
                  <MenuItem value={6}> 6 </MenuItem>
                  <MenuItem value={7}> 7 </MenuItem>
                  <MenuItem value={8}> 8 </MenuItem>
                  <MenuItem value={9}> 9 </MenuItem>
                  <MenuItem value={10}> 10 </MenuItem>
                  <MenuItem value={11}> 11 </MenuItem>
                  <MenuItem value={12}> 12 </MenuItem>
                  <MenuItem value={13}> فارغ التحصیل </MenuItem>
                  <MenuItem value={14}> دانشجو </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={2}
              xl={2}
              sx={{
                alignItems: 'center',
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
                sx={{ mx: 2 }}
                startIcon={<SearchIcon />}
                disabled={refetchLoading}
              >
                جستجو
                {refetchLoading && <CircularProgress size={15} style={{ marginRight: 10, color: '#fff' }} />}
              </Button>
            </Grid>
          </Grid>
        ) : null}
      </Box>

      {totalReport?.length
        ? totalReport.map((element: TotalReportDtos, index: number) => (
            <ConsultantTotalReportSummary totalReport={totalReport[index]} />
          ))
        : null}
    </Container>
  )
}

export default ConsultantReport
