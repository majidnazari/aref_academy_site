import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'
import Button from '@mui/material/Button'
import ClassIcon from '@mui/icons-material/Class'
import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'
import { useQuery } from '@apollo/client'
import PaginatorInfo from 'interfaces/paginator-info.interface'
import { NavLink } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import { GET_CONSULTANTS, GET_STUDENTS, GET_CONSULTANT_FINANCIAL_AND_STUDENT_INFOS } from './gql/query'
import CourseName, { getCourseName } from 'components/CourseName'
import { Autocomplete, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import moment from 'moment-jalaali'
import StatusIcon from 'components/StatusIcon'
import { ConsultantStudentDTO, definitionDetail } from './dto/ConsultantStudentDTO'
import { SelectChangeEvent } from '@material-ui/core'

interface SearchData {
  consultant_id?: number
  student_id?: number
  nationality_code?: string
  phone?: string
  education_level?: string
  major?:string
  student_status?:string
  manager_status?:string
  financial_status?:string
  school_name?:string
  definitionDetail?:definitionDetail
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))
const ConsultantsAndStudentInfosReport = () => {
  const [pageInfo, setPageInfo] = useState<PaginatorInfo>({
    count: 0,
    currentPage: 1,
    firstItem: 0,
    hasMorePages: false,
    lastItem: 0,
    lastPage: 1,
    perPage: 10,
    total: 0,
  })
  const [consultants, setconsultants] = useState<any[]>([{ label: '', id: '' }])
  const [studentds, setStudentds] = useState<any[]>([{ name: '', id: '' }])
  const [studentName, setStudentName] = useState<string>("")

  const [refetchLoading, setRefetchLoading] = useState<boolean>(false)
  const [loadingStudent, setLoadingStudent] = useState<boolean>(false)

  const [search, setSearch] = useState<SearchData>({
    consultant_id: undefined,
    student_id: undefined,
    nationality_code:undefined,
    phone:undefined,
    education_level:undefined,
    major:undefined,
    student_status:undefined,
    manager_status:undefined,
    financial_status:undefined,
    school_name:undefined,
    definitionDetail:undefined
  })
  const [consultantStudents, setConsultantStudents] = useState<ConsultantStudentDTO[]>([])

  const { data: consultantData } = useQuery(GET_CONSULTANTS, {
    variables: {
      first: 1000,
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
        //setconsultants(tmp)
        for (const i in data.getConsultants.data) {
          const consultant = data.getConsultants.data[i]
          tmp.push({
            id: +consultant.id,
            label: consultant.first_name + ' ' + consultant.last_name,
          })
        }
        setconsultants(tmp)
      }
    },
  })

  const { refetch: refetchStudents } = useQuery(GET_STUDENTS, {
    variables: {
      first: 10,
      page: 1,
      full_name: "",
      fetchPolicy: 'network-only',
    },
    onCompleted: (data) => {
      //if (!skip) {
      const tmp: any = []
      data.getStudents.data.map((item: any) => {
        tmp.push({
          id: +item.id,
          name: item.first_name + ' ' + item.last_name + ' ' + item.phone,
        })
        return item
      })
      console.log(" students are in fetch student: " , tmp);
      setStudentds(tmp)
    },
  })

  const { fetchMore, refetch } = useQuery(GET_CONSULTANT_FINANCIAL_AND_STUDENT_INFOS, {
    variables: {
      first: process.env.REACT_APP_USERS_PER_PAGE ? parseInt(process.env.REACT_APP_USERS_PER_PAGE) : 10,
      page: 1,

      orderBy: [
        {
          column: 'id',
          order: 'DESC',
        },
      ],
    },
    fetchPolicy: 'no-cache',
  })

  const handleSearch = (): void => {
    setRefetchLoading(true)
    let refetchData: SearchData = { ...search }
    refetch(refetchData as any)
      .then((res) => {
        setConsultantStudents(res.data.getConsultantFinancialsAndStudentInfosReport.data)
        setPageInfo(res.data.getConsultantFinancialsAndStudentInfosReport.paginatorInfo)
        setRefetchLoading(false)
      })
      .catch((err) => {
        setRefetchLoading(false)
      })

    //refetchTotalReport(refetchData).then((res) => {
    //setTotalReport(res.data.getCourseTotalReport)
    //})
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number): void => {
    fetchMore({
      variables: {
        first: process.env.REACT_APP_USERS_PER_PAGE ? parseInt(process.env.REACT_APP_USERS_PER_PAGE) : 10,
        page: value,
        orderBy: [
          {
            column: 'id',
            order: 'DESC',
          },
        ],
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        //setReport(fetchMoreResult.getCourseStudents.data)
        setPageInfo(fetchMoreResult.getConsultantFinancialsAndStudentInfosReport.paginatorInfo)
      },
    })
  }

  const handleChangeEducationLevel = (event: SelectChangeEvent<string>) => {
    setSearch({
      ...search,
      education_level: event.target.value,
    })
  }
  const handleChangeMajor = (event: SelectChangeEvent<string>) => {
    setSearch({
      ...search,
      major: event.target.value !="" ?  event.target.value : undefined,
    })
  }
  const handleChangeStudentStatus = (event: SelectChangeEvent<string>) => {
   
    setSearch({
      ...search,
      student_status:  event.target.value !="" ?  event.target.value : undefined,
    })
  }
  const handleChangeManagerStatus = (event: SelectChangeEvent<string>) => {
    setSearch({
      ...search,
      manager_status: event.target.value !="" ?  event.target.value : undefined,
    })
  }
  const handleChangeFinancialStatus = (event: SelectChangeEvent<string>) => {
    setSearch({
      ...search,
      financial_status: event.target.value !="" ?  event.target.value : undefined,
    })
  }
  const handleChangeSessionConsultantStatus = (event: SelectChangeEvent<definitionDetail>) => {
    setSearch({
      ...search,
      //definitionDetail : event.target.value !="" ?  convertSessionValue(event.target.value) : undefined,
    })
  }
  
  const convertSessionValue=(SessionValue : definitionDetail)=>{

    if(SessionValue.remote){
      return "remote";
    }
    if(SessionValue.single_meet){
      return "single_meet";
    }
    if(SessionValue.compensatory_meet){
      return "compensatory_meet";
    }

    return '';
      // switch(SessionValue){
      //   case "remote":
      //     return "remote";
      //   case "single_meet":
      //     return "single_meet";
      //   case "compensatory_meet":
      //     return "compensatory_meet";
      //   default :
      //     return "";    
      // }
  }
  useEffect(() => {
    //alert(studentName);
    setLoadingStudent(true);
    refetchStudents({
        first: 100,
        page: 1,
        full_name: studentName      
    }).then(() => {
      setLoadingStudent(false);
      
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentName])

  // useEffect(() => {
  //   if (consultantData?.getConsultants?.data) {
  //     const tmp = [{ label: '', id: 0 }]
  //     setconsultants(tmp)
  //     for (const i in consultantData.getConsultants.data) {
  //       const consultant = consultantData.getConsultants.data[i]
  //       tmp.push({
  //         id: +consultant.id,
  //         label: consultant.first_name + ' ' + consultant.last_name,
  //       })
  //     }
  //   }
  // }, [consultantData])

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography component={'div'} sx={{ fontSize: 18, fontWeight: 'bold', my: 2 }}>
        گزارش دانش آموزان مشاوران
      </Typography>
      <Box sx={{ mb: 1, marginLeft: 1 }}>
        <Grid container sx={{ p: 1 }} spacing={1}>
          <Grid item xs={12} sm={6} md={6} xl={2} lg={2} >
            <FormControl
                    sx={{
                      mr: 1,
                      width: "100%",
                    }}
               >
                {consultants.length ? (
                  <Autocomplete
                    onChange={(_event: any, newValue: any) => {
                      setSearch({ ...search, consultant_id: newValue?.id })
                    }}
                    disablePortal
                    id="combo-box-demo"
                    options={consultants}
                    
                    renderInput={(params) => <TextField {...params} label="انتخاب مشاور" />}
                  />
                ) : null}
              </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6} xl={2} lg={2} >
            <FormControl
                    sx={{
                      mr: 1,
                      width: "100%",
                    }}
                  >
                    {studentds.length ? (
                      <Autocomplete
                        id="student-names"
                        options={studentds}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="دانش آموز"
                            variant="outlined"
                            onChange={(e) => {
                              if (e.target.value.trim().length >= 1) {
                                //setSkip(false)
                                setStudentName(e.target.value.trim())
                              }
                            }}
                            InputProps={{
                              ...params.InputProps,
                              endAdornment: (
                                <React.Fragment>
                                  {loadingStudent ? <CircularProgress color="inherit" /> : null}
                                  {params.InputProps.endAdornment}
                                </React.Fragment>
                              ),
                            }}
                          />
                        )}
                        getOptionLabel={(option) => option.name}
                        value={search?.student_id}
                        onChange={(_event, newTeam) => {
                          setSearch({
                            ...search,
                            student_id: newTeam?.id ? +newTeam.id : undefined,
                          })
                        }}
                      />
                    ) : null}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6} xl={2} lg={2} >
            <FormControl
                    sx={{
                      mr: 1,
                      width: "100%",
                    }}
               >
               <TextField
                    fullWidth
                    label="کد ملی "
                    value={search.nationality_code}
                    onChange={(e: any) =>
                      setSearch({ ...search, nationality_code: e.target.value })
                    }
                    variant="filled"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                  />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6} xl={2} lg={2} >
            <FormControl
                    sx={{
                      mr: 1,
                      width: "100%",
                    }}
               >
               <TextField
                    fullWidth
                    label="موبایل"
                    value={search.phone}
                    onChange={(e: any) =>
                      setSearch({ ...search, phone: e.target.value })
                    }
                    variant="filled"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                  />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6} xl={2} lg={2} >
            <FormControl
                    sx={{
                      mr: 1,
                      width: "100%",
                    }}
               >
               
               <InputLabel id="education-level-id">مقطع تحصیلی</InputLabel>
                  <Select
                    labelId="gender-select-id"
                    id="genderId"
                    label="مقطع تحصیلی"
                    value={search.education_level || ''}
                    onChange={handleChangeEducationLevel}
                    variant="filled"
                  >
                    <MenuItem value={''}>همه</MenuItem>
                    <MenuItem value="6">۶</MenuItem>
                    <MenuItem value="7">۷</MenuItem>
                    <MenuItem value="8">۸</MenuItem>
                    <MenuItem value="9">۹</MenuItem>
                    <MenuItem value="10">۱۰</MenuItem>
                    <MenuItem value="11">۱۱</MenuItem>
                    <MenuItem value="12">۱۲</MenuItem>
                    <MenuItem value="13">۱۳</MenuItem>
                    <MenuItem value="14">۱۴</MenuItem>
                  </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6} xl={2} lg={2} >
            <FormControl
                    sx={{
                      mr: 1,
                      width: "100%",
                    }}
               >
               <TextField
                    fullWidth
                    label=" مدرسه "
                    value={search.school_name}
                    onChange={(e: any) =>
                      setSearch({ ...search, school_name: e.target.value })
                    }
                    variant="filled"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                  />
            </FormControl>
          </Grid>
          {/* <Grid item xs={12} sm={6} md={6} xl={2} lg={2} >
            <Box>
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
            </Box>
          </Grid> */}
          {/* {totalReport.length ? <TotalReportSummary totalReport={totalReport} /> : null} */}
        </Grid>    
      </Box>
      <Box sx={{ mb: 1, marginLeft: 1 }}>
        <Grid container sx={{ p: 1 }} spacing={1}>          
          <Grid item xs={12} sm={6} md={6} xl={2} lg={2} >
            <FormControl
                    sx={{
                      mr: 1,
                      width: "100%",
                    }}
               >
               
               <InputLabel id="education-level-id">رشته تحصیلی</InputLabel>
                  <Select
                    labelId="gender-select-id"
                    id="genderId"
                    label="رشته تحصیلی"
                    value={search.major || ''}
                    onChange={handleChangeMajor}
                    variant="filled"
                  >
                    <MenuItem value={''}>همه</MenuItem>
                    <MenuItem value="mathematics">ریاضی</MenuItem>
                    <MenuItem value="experimental">تجربی</MenuItem>
                    <MenuItem value="humanities">انسانی</MenuItem>
                    <MenuItem value="art">هنر</MenuItem>
                    <MenuItem value="other">سایر</MenuItem>
                   
                  </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6} xl={2} lg={2} >
            <FormControl
                    sx={{
                      mr: 1,
                      width: "100%",
                    }}
               >
               
               <InputLabel id="student-status"> وضعیت دانش آموز</InputLabel>
                  <Select
                    labelId="student-status-select-id"
                    id="genderId"
                    label="وضعیت دانش آموز"
                    value={search.student_status || ''}
                    onChange={handleChangeStudentStatus}
                    variant="filled"
                  >
                    <MenuItem value={''}>همه</MenuItem>
                    <MenuItem value="ok">تایید شده</MenuItem>
                    <MenuItem value="refused">انصراف داده</MenuItem>
                    <MenuItem value="fired">اخراج شده</MenuItem>
                    <MenuItem value="financial_pending">در انتظار تایید مالی</MenuItem>
                    <MenuItem value="fire_pending">درخواست اخراج</MenuItem>
                    <MenuItem value="refuse_pending">درخواست انصراف</MenuItem>
                   
                  </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6} xl={2} lg={2} >
            <FormControl
                    sx={{
                      mr: 1,
                      width: "100%",
                    }}
               >
               
               <InputLabel id="manager-status"> وضعیت تایید مدیر </InputLabel>
                  <Select
                    labelId="manager-status-select-id"
                    id="manager-statusId"
                    label="وضعیت تایید مدیر "
                    value={search.manager_status || ''}
                    onChange={handleChangeManagerStatus}
                    variant="filled"
                  >
                    <MenuItem value={''}>همه</MenuItem>
                    <MenuItem value="approved">تایید شده</MenuItem>
                    <MenuItem value="pending">عدم تایید </MenuItem>                    
                   
                  </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6} xl={2} lg={2} >
            <FormControl
                    sx={{
                      mr: 1,
                      width: "100%",
                    }}
               >
               
               <InputLabel id="financial-status"> وضعیت تایید مالی </InputLabel>
                  <Select
                    labelId="financial_status-select-id"
                    id="financial_statusId"
                    label="وضعیت تایید مالی "
                    value={search.financial_status || ''}
                    onChange={handleChangeFinancialStatus}
                    variant="filled"
                  >
                    <MenuItem value={''}>همه</MenuItem>
                    <MenuItem value="approved">تایید شده</MenuItem>
                    <MenuItem value="pending">عدم تایید </MenuItem>                    
                    <MenuItem value="semi_approved">عدم پرداخت کامل </MenuItem>                    
                   
                  </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6} xl={2} lg={2} >
            <FormControl
                    sx={{
                      mr: 1,
                      width: "100%",
                    }}
               >
               
               <InputLabel id="SessionConsultantStatus">  وضعیت جلسه مشاوره</InputLabel>
                  <Select
                    labelId="SessionConsultantStatus-select-id"
                    id="SessionConsultantStatusId"
                    label="وضعیت تایید مالی "
                    //value={convertSessionValue(search?.definitionDetail)}
                    onChange={handleChangeSessionConsultantStatus}
                    variant="filled"
                  >
                    <MenuItem value={''}>همه</MenuItem>
                    <MenuItem value="single_meet">تک جلسه </MenuItem>
                    <MenuItem value="remote">غیر حصوری  </MenuItem>                    
                    <MenuItem value="compensatory_meet">جبرانی</MenuItem>                    
                   
                  </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6} xl={2} lg={2} >
            <Box>
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
            </Box>
          </Grid>
          
        </Grid>    
      </Box>               
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">ردیف</StyledTableCell>
              <StyledTableCell align="left"> مشاور </StyledTableCell>
              <StyledTableCell align="left"> دانش آموز </StyledTableCell>
              <StyledTableCell align="left">موبایل</StyledTableCell>
              <StyledTableCell align="left">کد ملی</StyledTableCell>
              <StyledTableCell align="left"> مقطع تحصیلی </StyledTableCell>
              <StyledTableCell align="left"> رشته </StyledTableCell>
              <StyledTableCell align="left"> مدرسه </StyledTableCell>
              <StyledTableCell align="left">وضعیت دانش آموز</StyledTableCell>
              <StyledTableCell align="left">تایید مدیر </StyledTableCell>
              <StyledTableCell align="left">تایید مالی </StyledTableCell>

              <StyledTableCell align="left">ثبت کننده</StyledTableCell>
              <StyledTableCell align="left">تاریخ درج</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {consultantStudents.length > 0 &&
              consultantStudents.map((element: ConsultantStudentDTO, index: number) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="left">{pageInfo.perPage * (pageInfo.currentPage - 1) + index + 1}</StyledTableCell>
                  <StyledTableCell align="left">
                    {element?.consultant?.first_name} {element?.consultant?.last_name}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {element?.studentInfos?.first_name} {element?.studentInfos?.last_name}
                  </StyledTableCell>
                  <StyledTableCell align="left">{element?.studentInfos?.phone}</StyledTableCell>
                  <StyledTableCell align="left">{element?.studentInfos?.nationality_code}</StyledTableCell>
                  <StyledTableCell align="left">{element?.studentInfos?.education_level}</StyledTableCell>
                  <StyledTableCell align="left">{element?.studentInfos?.major}</StyledTableCell>
                  <StyledTableCell align="left">{element?.studentInfos?.school_name}</StyledTableCell>
                  <StyledTableCell align="left">
                    <StatusIcon status={element?.student_status ? element?.student_status : ''} />
                    <Typography component={'div'} sx={{ fontSize: 9, fontWeight: 'bold' }}>
                      {element.student_status ? element.student_status : null}
                    </Typography>
                  </StyledTableCell>

                  <StyledTableCell align="left">
                    <StatusIcon status={element.manager_status ? element.manager_status : ''} />
                    <Typography component={'div'} sx={{ fontSize: 9, fontWeight: 'bold' }}>
                      {element?.manager ? element.manager?.first_name + ' ' + element.manager?.last_name : null}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <StatusIcon status={element.financial_status ? element.financial_status : ''} />
                    <Typography component={'div'} sx={{ fontSize: 9, fontWeight: 'bold' }}>
                      {element.financial ? element.financial?.first_name + ' ' + element.financial?.last_name : null}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {element?.user?.first_name} {element?.user?.last_name}
                  </StyledTableCell>
                  <StyledTableCell align="left">{element?.created_at}</StyledTableCell>
                  {/* <StyledTableCell align="left">
                    <FinancialRefusedStatus financial_refused_status={element.financial_refused_status} />
                  </StyledTableCell> */}

                  <StyledTableCell align="left"></StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
        <Stack spacing={5} sx={{ my: 2 }}>
          <Pagination count={pageInfo.lastPage} page={pageInfo.currentPage} onChange={handleChange} />
        </Stack>
      </TableContainer>
    </Container>
  )
}

export default ConsultantsAndStudentInfosReport
