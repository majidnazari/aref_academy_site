import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { GET_COURSE_SESSION_BY_DATE } from "../../Students/StudentCourses/gql/query";
import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import moment from "moment";
import moment_jalali from "moment-jalaali";

import CourseSessionsOrderByDateType from "../dto/CourseSessionsOrderByDateType";
import InnerBox from "./InnerBox";
import HeaderBox from "./HeaderBox";

const ShowWeeklyReport = () => {
  const [courseSessions, setCourseSessions] = useState<
    CourseSessionsOrderByDateType[]
  >([]);

  
  //const [ courseSessions ] =
  useQuery(GET_COURSE_SESSION_BY_DATE, {
    onCompleted: (data) => {
      setCourseSessions(data.getCourseSessionOrderbyDate);
      
    },
    fetchPolicy: "network-only",
  });

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 1,
    },
    verticalAlign: "top",
  }));

  const innerBox = {
    backgroundColor: "purple",
    color: "white",
    borderRadius: "5px",
    boxShadow: 3,
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    py: 2,
    px: 2,
    width: 150,
    m: 1,
    direction: "rtl",
  };
 
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
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          
          <TableRow>
            {(courseSessions || []).map(
              (element_header: CourseSessionsOrderByDateType , index_header: number) => {
               return ( <StyledTableCell align="center" key={index_header}>
                  <HeaderBox element_date={element_header.date} />
                  
                </StyledTableCell>
            )}
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            {(courseSessions || []).map(
              (element: CourseSessionsOrderByDateType, index: number) => (
                <StyledTableCell align="center" key={index}>
                  {
                  <InnerBox details={element?.details || []} />
                  }
                 
                </StyledTableCell>
              )
            )}
          </StyledTableRow>
        </TableBody>
      </Table>
     
    </TableContainer>
  );
};

export default ShowWeeklyReport;
