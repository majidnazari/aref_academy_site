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
import { useState } from "react";
import moment from "moment";
import moment_jalali from "moment-jalaali";

import CourseSessionsOrderByDateType from "../dto/CourseSessionsOrderByDateType";
import InnerBox from "./InnerBox";

const ShowWeeklyReport = () => {
  const [courseSessions, setCourseSessions] = useState<
    CourseSessionsOrderByDateType[]
  >([]);

  //const [ courseSessions ] =
  useQuery(GET_COURSE_SESSION_BY_DATE, {
    onCompleted: (data) => {
      setCourseSessions(data.getCourseSessionOrderbyDate);
      //console.log(data.getCourseSessionOrderbyDate);
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

  var currentDate = moment();
  let weekStart = currentDate.clone().startOf("week").add(-1, "day");
  let startOfDate =
    currentDate.year() +
    "-" +
    (currentDate.month() + 1) +
    "-" +
    weekStart.date();
  //let endOfDate=currentDate.year()+"-"+(currentDate.month()+1 )+"-"+  weekStart.clone().add(6, 'days').date();
  //console.log(startOfDate + " " + endOfDate);
  //console.log(currentDate.month()+1);

  let index_row = 0;

  return (
    <TableContainer component={Paper} >
      <Table aria-label="customized table">
        <TableHead>
          <TableRow key={index_row++}>
            <StyledTableCell align="center" key={index_row++}>
              شنبه {moment_jalali(startOfDate).format("jYYYY/jMM/jDD")}{" "}
            </StyledTableCell>
            <StyledTableCell align="center" key={index_row++}>
              {" "}
              یکشنبه{" "}
              {moment_jalali(startOfDate).add(1, "day").format("jYYYY/jMM/jDD")}
            </StyledTableCell>
            <StyledTableCell align="center" key={index_row++}>
              دوشنبه{" "}
              {moment_jalali(startOfDate).add(2, "day").format("jYYYY/jMM/jDD")}
            </StyledTableCell>
            <StyledTableCell align="center" key={index_row++}>
              سه شنبه{" "}
              {moment_jalali(startOfDate).add(3, "day").format("jYYYY/jMM/jDD")}
            </StyledTableCell>
            <StyledTableCell align="center" key={index_row++}>
              {" "}
              چهارشنبه{" "}
              {moment_jalali(startOfDate).add(4, "day").format("jYYYY/jMM/jDD")}
            </StyledTableCell>
            <StyledTableCell align="center" key={index_row++}>
              {" "}
              پنج شنبه{" "}
              {moment_jalali(startOfDate).add(5, "day").format("jYYYY/jMM/jDD")}
            </StyledTableCell>
            <StyledTableCell align="center" key={index_row++}>
              جمعه{" "}
              {moment_jalali(startOfDate).add(6, "day").format("jYYYY/jMM/jDD")}
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow >
            {(courseSessions || []).map(
              (element: CourseSessionsOrderByDateType, index: number) => (
                <>
                  {element.date === moment(startOfDate).format("YYYY-MM-DD") ? (
                    <StyledTableCell align="center" >
                      <InnerBox details={element?.details || []} />
                    </StyledTableCell>
                  ) : null}
                  {element.date ===
                  moment(startOfDate).add(1, "day").format("YYYY-MM-DD") ? (
                    <StyledTableCell align="center" >
                      <InnerBox details={element?.details || []} />
                    </StyledTableCell>
                  ) : null}
                  {element.date ===
                  moment(startOfDate).add(2, "day").format("YYYY-MM-DD") ? (
                    <StyledTableCell align="center" >
                      <InnerBox details={element?.details || []} />
                    </StyledTableCell>
                  ) : null}
                  {element.date ===
                  moment(startOfDate).add(3, "day").format("YYYY-MM-DD") ? (
                    <StyledTableCell align="center" >
                      <InnerBox details={element?.details || []} />
                    </StyledTableCell>
                  ) : null}
                  {element.date ===
                  moment(startOfDate).add(4, "day").format("YYYY-MM-DD") ? (
                    <StyledTableCell align="center" >
                      <InnerBox details={element?.details || []} />
                    </StyledTableCell>
                  ) : null}
                  {element.date ===
                  moment(startOfDate).add(5, "day").format("YYYY-MM-DD") ? (
                    <StyledTableCell align="center" >
                      <InnerBox details={element?.details || []} />
                    </StyledTableCell>
                  ) : null}
                  {element.date ===
                  moment(startOfDate).add(6, "day").format("YYYY-MM-DD") ? (
                    <StyledTableCell align="center" >
                      <InnerBox details={element?.details || []} />
                    </StyledTableCell>
                  ) : null}
                </>
              )
            )}
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
  );
};

export default ShowWeeklyReport;
