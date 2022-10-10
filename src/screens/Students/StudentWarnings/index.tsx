import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_A_STUDENT, GET_A_STUDENT_WARNING_HISTORIES } from "./gql/query";
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
  Stack,
  Pagination,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import PaginatorInfo from "interfaces/paginator-info.interface";
import { StudentWarningHistory } from "./dto/student-warning-history.dto";
import CourseName from "components/CourseName";
import moment from "moment-jalaali";
import AddWarning from "./components/AddWarning";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import FeedbackIcon from "@mui/icons-material/Feedback";

const StudentWarnings = () => {
  const { studentId } = useParams<string>();
  const [studentWarningHistories, setStudentWarningHistories] = useState<
    StudentWarningHistory[]
  >([]);
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

  const { data: studentData, loading } = useQuery(GET_A_STUDENT, {
    variables: {
      id: studentId,
    },
  });

  const { fetchMore, loading: courseLoading } = useQuery(
    GET_A_STUDENT_WARNING_HISTORIES,
    {
      variables: {
        first: process.env.REACT_APP_USERS_PER_PAGE
          ? parseInt(process.env.REACT_APP_USERS_PER_PAGE)
          : 10,
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
        setPageInfo(data.getStudentWarningHistories.paginatorInfo);
        setStudentWarningHistories(data.getStudentWarningHistories.data);
      },
      fetchPolicy: "no-cache",
    }
  );

  const handleChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ): void => {
    fetchMore({
      variables: {
        first: process.env.REACT_APP_USERS_PER_PAGE
          ? parseInt(process.env.REACT_APP_USERS_PER_PAGE)
          : 10,
        page: value,
        orderBy: [
          {
            column: "id",
            order: "DESC",
          },
        ],
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        setStudentWarningHistories(
          fetchMoreResult.getStudentWarningHistories.data
        );
        setPageInfo(fetchMoreResult.getCourseStudents.paginatorInfo);
      },
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
          "کامنتهای حسابداری " +
          studentData?.getStudent.first_name +
          " " +
          studentData?.getStudent.last_name
        )}
      </Typography>
      {courseLoading ? <CircularProgress /> : null}
      <AddWarning studentId={studentId ? +studentId : 0} />
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">ردیف</StyledTableCell>
              <StyledTableCell align="left">کامنت</StyledTableCell>
              <StyledTableCell align="left"> پاسخ</StyledTableCell>
              <StyledTableCell align="left"> درس</StyledTableCell>
              <StyledTableCell align="left">ثبت کننده</StyledTableCell>
              <StyledTableCell align="left">پاسخ دهنده</StyledTableCell>
              <StyledTableCell align="left">زمان ایجاد</StyledTableCell>
              <StyledTableCell align="left">زمان پاسخ</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentWarningHistories &&
              studentWarningHistories.map(
                (element: StudentWarningHistory, index: number) => (
                  <StyledTableRow key={element.id}>
                    <StyledTableCell align="left">
                      {pageInfo.perPage * (pageInfo.currentPage - 1) +
                        index +
                        1}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {element.comment}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {element.response === "done" ? (
                        <CheckBoxIcon color="success" />
                      ) : (
                        <FeedbackIcon color="disabled" />
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {element.course ? (
                        <CourseName course={element.course} />
                      ) : (
                        "---"
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <Typography
                        component={"div"}
                        sx={{ fontSize: 9, fontWeight: "bold" }}
                      >
                        {element.user_creator
                          ? element.user_creator?.first_name +
                            " " +
                            element.user_creator?.last_name
                          : null}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <Typography
                        component={"div"}
                        sx={{ fontSize: 9, fontWeight: "bold" }}
                      >
                        {element.user_updater
                          ? element.user_updater?.first_name +
                            " " +
                            element.user_updater?.last_name
                          : null}
                      </Typography>
                    </StyledTableCell>

                    <StyledTableCell align="left">
                      {moment(element.created_at).format("jYYYY/jMM/jDD")}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {moment(element.updated_at).format("jYYYY/jMM/jDD-HH:mm")}
                    </StyledTableCell>
                  </StyledTableRow>
                )
              )}
          </TableBody>
        </Table>
        <Stack spacing={5} sx={{ my: 2 }}>
          <Pagination
            count={pageInfo.lastPage}
            page={pageInfo.currentPage}
            onChange={handleChange}
          />
        </Stack>
      </TableContainer>
    </Container>
  );
};
export default StudentWarnings;
