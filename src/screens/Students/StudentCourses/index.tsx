import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_A_STUDENT, GET_A_STUDENT_COURSES } from "./gql/query";
import { DELETE_STUDENT_COURSE } from "./gql/mutation";
import {
  CircularProgress,
  Container,
  Paper,
  Table,
  TableContainer,
  TableHead,
  Typography,
  TableRow,
  TableBody,
  Button,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import AddStudentCourse from "./components/AddStudentCourse";
import PaginatorInfo from "interfaces/paginator-info.interface";
import StudentCoursesType from "interfaces/studentCourses.interface";
import CourseName from "components/CourseName";
import StatusIcon from "components/StatusIcon";
import moment from "moment-jalaali";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Edit from "components/EditCourseStudentStatus";
import { showSuccess, showConfirm } from "utils/swlAlert";
import FinancialRefusedStatus from "components/FinancialRefusedStatus";

interface EditStudentCourse {
  openDialog: boolean;
  studentCourse: StudentCoursesType;
  key: number;
  id: number;
}

const StudentCourses = () => {
  const { studentId } = useParams<string>();
  const [studentCourses, setStudentCourses] = useState<StudentCoursesType[]>(
    []
  );
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
  const [editStudentCourse, setEditStudentCourse] = useState<EditStudentCourse>(
    {
      openDialog: false,
      studentCourse: {} as StudentCoursesType,
      key: 0,
      id: 0,
    }
  );

  const { data: studentData, loading } = useQuery(GET_A_STUDENT, {
    variables: {
      id: studentId,
    },
  });

  const { refetch, loading: courseLoading } = useQuery(GET_A_STUDENT_COURSES, {
    variables: {
      first: 200,
      page: 1,
      student_id: studentId ? parseInt(studentId) : 0,
      orderBy: [
        {
          column: "id",
          order: "DESC",
        },
      ],
    },
    onCompleted: (data) => {
      setPageInfo(data.getCourseStudents.paginatorInfo);
      setStudentCourses(data.getCourseStudents.data);
    },
    fetchPolicy: "no-cache",
  });

  const [deleteCourseStudent] = useMutation(DELETE_STUDENT_COURSE);

  const deleteCourseStudentHandler = (id: number) => {
    showConfirm(() => {
      deleteCourseStudent({
        variables: {
          id,
        },
      }).then(() => {
        refetch();
        showSuccess("حذف با موفقیت انجام شد.");
      });
    });
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

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography
        component={"div"}
        sx={{ fontSize: 18, fontWeight: "bold", my: 2 }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          studentData?.getStudent.first_name +
          " " +
          studentData?.getStudent.last_name
        )}
      </Typography>
      {courseLoading ? <CircularProgress /> : null}
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">ردیف</StyledTableCell>
              <StyledTableCell align="left">نام درس</StyledTableCell>
              <StyledTableCell align="left">وضعیت دانش آموز</StyledTableCell>
              <StyledTableCell align="left">تایید مدیر</StyledTableCell>
              <StyledTableCell align="left">تایید حسابداری</StyledTableCell>
              <StyledTableCell align="left">پس از انصراف</StyledTableCell>
              <StyledTableCell align="left">تاریخ</StyledTableCell>
              <StyledTableCell align="left">ویرایش</StyledTableCell>
              <StyledTableCell align="left">حذف</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentCourses &&
              studentCourses.map(
                (element: StudentCoursesType, index: number) => (
                  <StyledTableRow key={element.id}>
                    <StyledTableCell align="left">
                      {pageInfo.perPage * (pageInfo.currentPage - 1) +
                        index +
                        1}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <CourseName course={element.course} />
                      <Box sx={{ fontSize: 10, pt: 1 }}>
                        {element.description !== ""
                          ? "توضیحات:" + element.description
                          : null}

                        {element.transferred_course ? " جابجایی:" : null}
                        {element.transferred_course ? (
                          <CourseName course={element.transferred_course} />
                        ) : null}
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <StatusIcon status={element.student_status} />
                      <Typography
                        component={"div"}
                        sx={{ fontSize: 9, fontWeight: "bold" }}
                      >
                        {element.user_student_status
                          ? element.user_student_status?.first_name +
                            " " +
                            element.user_student_status?.last_name
                          : null}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <StatusIcon status={element.manager_status} />
                      <Typography
                        component={"div"}
                        sx={{ fontSize: 9, fontWeight: "bold" }}
                      >
                        {element?.user_manager
                          ? element.user_manager?.first_name +
                            " " +
                            element.user_manager?.last_name
                          : null}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <StatusIcon status={element.financial_status} />
                      <Typography
                        component={"div"}
                        sx={{ fontSize: 9, fontWeight: "bold" }}
                      >
                        {element.user_financial
                          ? element.user_financial?.first_name +
                            " " +
                            element.user_financial?.last_name
                          : null}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {/* {element.financial_refused_status} */}
                      <FinancialRefusedStatus financial_refused_status={element.financial_refused_status} />
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {moment(element.created_at).format("jYYYY/jMM/jDD")}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <Button
                        size="small"
                        onClick={() => {
                          setEditStudentCourse({
                            openDialog: true,
                            studentCourse: element,
                            key: editStudentCourse.key + 1,
                            id: element.id,
                          });
                        }}
                        variant="contained"
                        startIcon={<EditIcon />}
                        color="success"
                      >
                        ویرایش
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {element.student_status === "ok" &&
                      element.manager_status === "pending" &&
                      element.financial_status === "pending" ? (
                        <Button
                          size="small"
                          onClick={() => deleteCourseStudentHandler(element.id)}
                          variant="contained"
                          startIcon={<DeleteIcon />}
                          color="error"
                        >
                          حذف
                        </Button>
                      ) : (
                        ""
                      )}
                    </StyledTableCell>
                  </StyledTableRow>
                )
              )}
          </TableBody>
        </Table>
      </TableContainer>
      <AddStudentCourse studentId={studentId} refetch={refetch} />
      <Edit
        openDialog={editStudentCourse.openDialog}
        studentCourse={editStudentCourse.studentCourse}
        key={editStudentCourse.key}
        refresh={refetch}
      />
    </Container>
  );
};
export default StudentCourses;
