import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TitleBox from 'components/TitleBox';
import GroupIcon from '@mui/icons-material/Group';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from "react-router-dom"
import ClassIcon from '@mui/icons-material/Class';
import LogoutIcon from '@mui/icons-material/Logout';
import { GET_COURSES_AT_SPECIALTIME } from  "../Students/StudentCourses/gql/query";
import { GET_COURSE_SESSION_BY_DATE } from  "../Students/StudentCourses/gql/query";

import { useQuery } from '@apollo/client';
import { useState } from 'react';
import PaginatorInfo from 'interfaces/paginator-info.interface';
import moment from 'moment';
import moment_jalali from "moment-jalaali";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  
}));

const DashboardScreen = () => {
    const navigate = useNavigate();

    const [pageInfo, setPageInfo] = useState<PaginatorInfo>({
      count: 0,
      currentPage: 1,
      firstItem: 0,
      hasMorePages: false,
      lastItem: 0,
      lastPage: 1,
      perPage: 10,
      total: 0,
  });
  interface CourseSessionsOrderByDate {

     
      date:String;
      details:CourseSessionDetails[];
  }
  interface CourseSessionDetails {
        id : number;
        name: String;
        start_date: String;
        start_time: String;
        end_time: String;
        course_id: number;
        course_name:String;
        lesson_name: String;
        teacher_name: String;
  }

  const [courseSessions, setCourseSessions] = useState<CourseSessionsOrderByDate[] >([]);


  var currentDate = moment();
  let weekStart =currentDate.clone().startOf('week').add(-1,'day');
  let startOfDate=currentDate.year()+"-"+(currentDate.month()+1) +"-"+  weekStart.date();
  let endOfDate=currentDate.year()+"-"+(currentDate.month()+1 )+"-"+  weekStart.clone().add(6, 'days').date();
  //console.log(startOfDate + " " + endOfDate);
  //console.log(currentDate.month()+1);
  

    const { fetchMore, refetch, loading } = useQuery(GET_COURSE_SESSION_BY_DATE, {
      variables: {
        // first: process.env.REACT_APP_USERS_PER_PAGE
        //   ? parseInt(process.env.REACT_APP_USERS_PER_PAGE)
        //   : 10,
        // page: 1,
        session_date_from:startOfDate,
        session_date_to:endOfDate,
        // orderBy: [
        //   {
        //     column: "id",
        //     order: "DESC",
        //   },
        //],        
      },
      onCompleted: (data) => {
        //setPageInfo(data.getCourseTotalReportAtSpecialTime.paginatorInfo);
        setCourseSessions(data.getCourseSessionOrderbyDate);
        console.log(data.getCourseSessionOrderbyDate);
      },
      fetchPolicy: "network-only",
    });

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));

    return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}  >
        <Grid container spacing={2}>
            <Grid item xs={12} md={4} lg={4}>
                <Box
                    sx={{
                        backgroundColor: "success.main",
                        color: "white",
                        borderRadius: "5px",
                        boxShadow: 3,
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'center',
                        py: 2
                    }}
                    onClick={() => {
                        navigate('courses');
                    }}
                >
                    <TitleBox title="مدیریت کلاسها" number="" icon={<ClassIcon sx={{ mt: 1 }} fontSize="large" />} />
                </Box>
            </Grid>

            <Grid item xs={12} md={4} lg={4}>
                <Box
                    sx={{
                        backgroundColor: "info.main",
                        color: "white",
                        borderRadius: "5px",
                        boxShadow: 3,
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'center',
                        py: 2
                    }}
                    onClick={() => {
                        navigate('students');
                    }}
                >
                    <TitleBox title="مدیریت دانش‌آموزان" number="" icon={<GroupIcon sx={{ mt: 1 }} fontSize="large" />} />
                </Box>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
                <Box
                    sx={{
                        backgroundColor: "text.secondary",
                        color: "white",
                        borderRadius: "5px",
                        boxShadow: 3,
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'center',
                        py: 2
                    }}
                    onClick={() => {
                        navigate('users');
                    }}
                >
                    <TitleBox
                        title="خروج"
                        number=""
                        icon={<LogoutIcon sx={{ mt: 1 }} fontSize="large" />}
                    />
                </Box>
            </Grid>
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
                <Box
                    sx={{
                        backgroundColor: "white",
                        color: "white",
                        borderRadius: "5px",
                        boxShadow: 3,
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'center',
                        py: 2,
                        mt:1
                    }}
                    // onClick={() => {
                    //     navigate('students');
                    // }}
                >
                  <TableContainer component={Paper}>
                      <Table aria-label="customized table">
                        <TableHead>
                          <TableRow>
                            <StyledTableCell align="center">شنبه  {moment_jalali(startOfDate).format('jYYYY/jMM/jDD')} </StyledTableCell>
                            <StyledTableCell align="center"> یکشنبه {moment_jalali(startOfDate).add(1,"day").format('jYYYY/jMM/jDD')}</StyledTableCell>
                            <StyledTableCell align="center">دوشنبه {moment_jalali(startOfDate).add(2,"day").format('jYYYY/jMM/jDD')}</StyledTableCell>
                            <StyledTableCell align="center">سه شنبه {moment_jalali(startOfDate).add(3,"day").format('jYYYY/jMM/jDD')}</StyledTableCell>
                            <StyledTableCell align="center"> چهارشنبه {moment_jalali(startOfDate).add(4,"day").format('jYYYY/jMM/jDD')}</StyledTableCell>
                            <StyledTableCell align="center"> پنج شنبه {moment_jalali(startOfDate).add(5,"day").format('jYYYY/jMM/jDD')}</StyledTableCell>
                            <StyledTableCell align="center">جمعه {moment_jalali(startOfDate).add(6,"day").format('jYYYY/jMM/jDD')}</StyledTableCell>
                          
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <StyledTableRow >    
                          {courseSessions.map((element: CourseSessionsOrderByDate,index:number) => (                                                      
                              <> 
                              {
                                element.date==moment(startOfDate).format('YYYY-MM-DD') 
                                ?
                                <StyledTableCell align="center" >
                                  {
                                      element.details.map((element_detail: CourseSessionDetails) =>(
                                        <Grid item xs={12} md={4} lg={4}>
                                            <Box
                                                sx={{
                                                    backgroundColor: "purple",
                                                    color: "white",
                                                    borderRadius: "5px",
                                                    boxShadow: 3,
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    py: 2,
                                                    px:2,
                                                    width:200,
                                                    m:1
                                                    
                                                }}                                        
                                            >
                                                {element_detail.start_time} - {element_detail.end_time}<br></br>                                            
                                                {element_detail.course_name}<br></br>
                                                {element_detail.name}<br></br>
                                                {element_detail.lesson_name}<br></br>
                                                {element_detail.teacher_name}<br></br>
                                              </Box>
                                        </Grid>
                                        
  
                                      )) 
                                  }  
                                </StyledTableCell>
                                :null
                               
                              }                            
                              {
                                element.date==moment(startOfDate).add(1,"day").format('YYYY-MM-DD') 
                                ?
                                <StyledTableCell align="center" >
                                  {
                                      element.details.map((element_detail: CourseSessionDetails) =>(
                                        <Grid item xs={12} md={4} lg={4}>
                                            <Box
                                                sx={{
                                                    backgroundColor: "purple",
                                                    color: "white",
                                                    borderRadius: "5px",
                                                    boxShadow: 3,
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    py: 2,
                                                    px:2,
                                                    width:200,
                                                    m:3
                                                    
                                                }}                                        
                                            >
                                                {element_detail.start_time} - {element_detail.end_time}<br></br>                                            
                                                {element_detail.course_name}<br></br>
                                                {element_detail.name}<br></br>
                                                {element_detail.lesson_name}<br></br>
                                                {element_detail.teacher_name}<br></br>
                                              </Box>
                                        </Grid>
                                        
  
                                      )) 
                                  }  
                                </StyledTableCell>
                                :null
                               
                              }
                              {
                                element.date==moment(startOfDate).add(2,"day").format('YYYY-MM-DD') 
                                ?
                                <StyledTableCell align="center" >
                                  {
                                      element.details.map((element_detail: CourseSessionDetails) =>(
                                        <Grid item xs={12} md={4} lg={4}>
                                            <Box
                                                sx={{
                                                    backgroundColor: "purple",
                                                    color: "white",
                                                    borderRadius: "5px",
                                                    boxShadow: 3,
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    py: 2,
                                                    px:2,
                                                    width:200,
                                                    m:1
                                                    
                                                }}                                        
                                            >
                                                {element_detail.start_time} - {element_detail.end_time}<br></br>                                            
                                                {element_detail.course_name}<br></br>
                                                {element_detail.name}<br></br>
                                                {element_detail.lesson_name}<br></br>
                                                {element_detail.teacher_name}<br></br>
                                              </Box>
                                        </Grid>
                                        
  
                                      )) 
                                  }  
                                </StyledTableCell>
                                :null
                               
                              }
                              {
                                element.date==moment(startOfDate).add(3,"day").format('YYYY-MM-DD') 
                                ?
                                <StyledTableCell align="center" >
                                  {
                                      element.details.map((element_detail: CourseSessionDetails) =>(
                                        <Grid item xs={12} md={4} lg={4}>
                                            <Box
                                                sx={{
                                                    backgroundColor: "purple",
                                                    color: "white",
                                                    borderRadius: "5px",
                                                    boxShadow: 3,
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    py: 2,
                                                    px:2,
                                                    width:200,
                                                    m:1
                                                    
                                                }}                                        
                                            >
                                                {element_detail.start_time} - {element_detail.end_time}<br></br>                                            
                                                {element_detail.course_name}<br></br>
                                                {element_detail.name}<br></br>
                                                {element_detail.lesson_name}<br></br>
                                                {element_detail.teacher_name}<br></br>
                                              </Box>
                                        </Grid>
                                        
  
                                      )) 
                                  }  
                                </StyledTableCell>
                                :null
                               
                              } 
                              {
                                element.date==moment(startOfDate).add(4,"day").format('YYYY-MM-DD') 
                                ?
                                <StyledTableCell align="center" >
                                  {
                                      element.details.map((element_detail: CourseSessionDetails) =>(
                                        <Grid item xs={12} md={4} lg={4}>
                                            <Box
                                                sx={{
                                                    backgroundColor: "purple",
                                                    color: "white",
                                                    borderRadius: "5px",
                                                    boxShadow: 3,
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    py: 2,
                                                    px:2,
                                                    width:200,
                                                    m:1
                                                    
                                                }}                                        
                                            >
                                                {element_detail.start_time} - {element_detail.end_time}<br></br>                                            
                                                {element_detail.course_name}<br></br>
                                                {element_detail.name}<br></br>
                                                {element_detail.lesson_name}<br></br>
                                                {element_detail.teacher_name}<br></br>
                                              </Box>
                                        </Grid>
                                        
  
                                      )) 
                                  }  
                                </StyledTableCell>
                                :null
                               
                              }
                              {
                                element.date==moment(startOfDate).add(5,"day").format('YYYY-MM-DD') 
                                ?
                                <StyledTableCell align="center" >
                                  {
                                      element.details.map((element_detail: CourseSessionDetails) =>(
                                        <Grid item xs={12} md={4} lg={4}>
                                            <Box
                                                sx={{
                                                    backgroundColor: "purple",
                                                    color: "white",
                                                    borderRadius: "5px",
                                                    boxShadow: 3,
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    py: 2,
                                                    px:2,
                                                    width:200,
                                                    m:1
                                                }}                                        
                                            >
                                                {element_detail.start_time} - {element_detail.end_time}<br></br>                                            
                                                {element_detail.course_name}<br></br>
                                                {element_detail.name}<br></br>
                                                {element_detail.lesson_name}<br></br>
                                                {element_detail.teacher_name}<br></br>
                                              </Box>
                                        </Grid>
                                        
  
                                      )) 
                                  }  
                                </StyledTableCell>
                                :null
                               
                              }
                              {
                                element.date==moment(startOfDate).add(6,"day").format('YYYY-MM-DD') 
                                ?
                                <StyledTableCell align="center" >
                                  {
                                      element.details.map((element_detail: CourseSessionDetails) =>(
                                        <Grid item xs={12} md={4} lg={4}>
                                            <Box
                                                sx={{
                                                    backgroundColor: "purple",
                                                    color: "white",
                                                    borderRadius: "5px",
                                                    boxShadow: 3,
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    py: 2,
                                                    px:2,
                                                    width:200,
                                                    m:1
                                                    
                                                }}                                        
                                            >
                                                {element_detail.start_time} - {element_detail.end_time}<br></br>                                            
                                                {element_detail.course_name}<br></br>
                                                {element_detail.name}<br></br>
                                                {element_detail.lesson_name}<br></br>
                                                {element_detail.teacher_name}<br></br>
                                              </Box>
                                        </Grid>
                                        
  
                                      )) 
                                  }  
                                </StyledTableCell>
                                :null
                               
                              }                                
                            
                              </>
                            
                          ))}
                          </StyledTableRow>
                        </TableBody>
                      </Table>
                      {/* <Stack spacing={5} sx={{ my: 2 }}>
                        <Pagination
                          count={pageInfo.lastPage}
                          page={pageInfo.currentPage}
                          onChange={handleChange}
                        />
                      </Stack> */}
                  </TableContainer>
                </Box>
        </Grid>    
    </Container>)
}

export default DashboardScreen;