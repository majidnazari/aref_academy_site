import { GET_COURSE_STUDENT_WITH_ABSENT_PRESENCE } from "../gql/query";
import { useMutation, useQuery } from "@apollo/client";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Container from "@mui/material/Container";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import StatusIcon from "components/StatusIcon";
import AbsencepresenceBtns from "./AbsencepresenceBtns";
import AbsencepresenceSelect from "./AbsencepresenceSelect";
import { GET_A_COURSE } from "../gql/query";
import { UPDATE_STUDENT_WARNING_HISTORY } from "../gql/mutaion";
import CourseName from "components/CourseName";
import Fingerprint from "@mui/icons-material/Fingerprint";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface PropType {
  course_id: number;
  course_session_id: number;
}
const ListStudents = ({ course_id, course_session_id }: PropType) => {
  const [studentList, setStudentList] = useState<any[]>([]);
  const [originalStudentList, setOriginalStudentList] = useState<any[]>([]);
  const [course, setCourse] = useState<any>();
  const [searchName, setSearchName] = useState<string>("");
  const { loading: courseLoading } = useQuery(GET_A_COURSE, {
    variables: {
      id: course_id,
    },
    onCompleted: (data) => {
      setCourse(data.getCourse);
    },
  });

  const { loading, refetch } = useQuery(
    GET_COURSE_STUDENT_WITH_ABSENT_PRESENCE,
    {
      variables: {
        course_id: course_id,
        course_session_id: course_session_id,
        first: 1000,
        page: 1,
      },
      onCompleted: (data) => {
        const tmp = data.getCourseStudentsWithAbsencePresence.data.filter(
          (item: any) => item.cs_student_status === "ok" && item.student
        );
        tmp.sort(function (a: any, b: any) {
          return a?.student?.last_name
            .trim()
            .localeCompare(b?.student?.last_name.trim());
        });
        setStudentList(tmp);
        setOriginalStudentList(tmp);
      },
      fetchPolicy: "no-cache",
    }
  );

  const [updateStudentWarning, { loading: updateLoading }] = useMutation(
    UPDATE_STUDENT_WARNING_HISTORY
  );

  const handleSearch = (inputText: string) => {
    setSearchName(inputText);
    let searchTmp = [...originalStudentList];
    searchTmp = searchTmp.filter((item: any) => {
      const name = item.student.first_name + " " + item.student.last_name;
      if (name.indexOf(inputText) > -1) {
        return item;
      }
      return null;
    });
    setStudentList(searchTmp);
  };

  const handleUpdate = (studentId: number): void => {
    updateStudentWarning({
      variables: {
        student_id: studentId,
        response: "done",
      },
    }).then(() => {
      refetch();
    });
  };

  const updateOriginalList = (
    elementId: number,
    value: string,
    field: string
  ): void => {
    const studentsTmp = [...originalStudentList];
    studentsTmp.map((element: any) => {
      if (element.id === elementId) {
        element[field] = value;
        return element;
      }
      return element;
    });
    setOriginalStudentList(studentsTmp);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography
        component={"div"}
        sx={{ fontSize: 18, fontWeight: "bold", my: 2 }}
      >
        {courseLoading ? (
          <CircularProgress size={10} />
        ) : (
          <CourseName course={course} />
        )}
      </Typography>
      {loading && <CircularProgress sx={{ m: 2 }} />}
      <Grid container component={Paper} sx={{ p: 1, my: 1 }} spacing={2}>
        <Grid md={4}>
          <TextField
            fullWidth
            label="جستجوی نام"
            value={searchName}
            onChange={(e: any) => handleSearch(e.target.value)}
            variant="filled"
          />
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">ردیف</StyledTableCell>
              <StyledTableCell align="left"> نام</StyledTableCell>
              <StyledTableCell align="center"> حضور و غیاب </StyledTableCell>
              <StyledTableCell align="left">برچسب</StyledTableCell>
              <StyledTableCell align="left">مدیر</StyledTableCell>
              <StyledTableCell align="left">حسابداری</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentList.map((element: any, index: number) => (
              <StyledTableRow key={element.id}>
                <StyledTableCell align="left">{index + 1}</StyledTableCell>

                <StyledTableCell align="left">
                  <Box>
                    {element?.student?.first_name.trim()}{" "}
                    {element?.student?.last_name.trim()}
                  </Box>
                  <Box
                    sx={{
                      fontSize: 10,
                    }}
                  >
                    {element.student_warning_comment ? (
                      <>
                        {element.student_warning_comment}
                        <Button
                          size="small"
                          sx={{
                            p: 0,
                            ml: 1,
                          }}
                          color="warning"
                          variant="contained"
                          endIcon={
                            updateLoading ? (
                              <CircularProgress size={10} color="inherit" />
                            ) : (
                              <Fingerprint />
                            )
                          }
                          onClick={() => {
                            handleUpdate(+element?.student.id);
                          }}
                          disabled={updateLoading}
                        >
                          تایید
                        </Button>
                      </>
                    ) : null}
                  </Box>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <AbsencepresenceBtns 
                    id={element.id}
                    ap_status={element.ap_status}
                    callBack={updateOriginalList}
                  />
                </StyledTableCell>
                <StyledTableCell align="left">
                  <AbsencepresenceSelect
                    id={element.id}
                    ap_attendance_status={element.ap_attendance_status}
                    callBack={updateOriginalList}
                  />
                </StyledTableCell>
                <StyledTableCell align="left">
                  <StatusIcon status={element.cs_manager_status} />
                </StyledTableCell>
                <StyledTableCell align="left">
                  <StatusIcon status={element.cs_financial_status} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ListStudents;
