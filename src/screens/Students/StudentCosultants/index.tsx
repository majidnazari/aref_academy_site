import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_A_STUDENT,
  GET_A_STUDENT_CONSULTANTS,
  GET_CONSULTANT_FINANCIAL_OF_ONE_STUDENT,
} from "./gql/query";
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
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import AddStudentConsultant from "./components/AddStudentConsultant";
import PaginatorInfo from "interfaces/paginator-info.interface";
import CourseName from "components/CourseName";
import StatusIcon from "components/StatusIcon";
import moment from "moment-jalaali";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Edit from "components/EditCourseStudentStatus";
import { showSuccess, showConfirm } from "utils/swlAlert";
import FinancialRefusedStatus from "components/FinancialRefusedStatus";
import { useNavigate } from "react-router-dom";
import ConsultantFinancialType from "screens/Consultant/dto/consultantFinancial.interface";
import { UPDATE_CONSULTANT_FINANCIAL } from "screens/Consultant/gql/mutation";
import EditAdminConsultantFinancialStatus from "screens/Consultant/Components/EditAdminConsultantFinancialStatus";
import StudentStatusFinancialDialog from "screens/Consultant/Components/StudentStatusFinancialDialog";
import { getUserData } from "utils/user";
interface EditStudentFinancial {
  consultantFinancialId: number | undefined;
  openConsultantFinancialDialog: boolean;
}

const StudentFinancial = () => {
  const navigate = useNavigate();
  const { studentId } = useParams<string>();
  const [studentConsultants, setStudentConsultants] = useState<any[]>([]);
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
  const [consultantFinancialId, setConsultantFinancialId] = useState<
    number | undefined
  >();
  const [
    financialStudentStatusOpenDialog,
    setFinancialStudentStatusOpenDialog,
  ] = useState<boolean>(false);

  const [editStudentFinancial, setEditStudentFinancial] =
    useState<EditStudentFinancial>({
      consultantFinancialId: consultantFinancialId,
      openConsultantFinancialDialog: true,
    });

  const { data: studentData, loading } = useQuery(GET_A_STUDENT, {
    variables: {
      id: studentId,
    },
  });
  const [editConsultantfinancial] = useMutation(UPDATE_CONSULTANT_FINANCIAL);

  const handleAddStudentStatus = (studentConsultantFinancialId: number) => {
    //alert(studentConsultantFinancialId);
    setConsultantFinancialId(
      studentConsultantFinancialId ? studentConsultantFinancialId : 0
    );
    setFinancialStudentStatusOpenDialog(true);
  };
  const { refetch, loading: courseLoading } = useQuery(
    GET_CONSULTANT_FINANCIAL_OF_ONE_STUDENT,
    {
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
        //console.log(data);
        setPageInfo(data.getConsultantFinancials.paginatorInfo);
        setStudentConsultants(data.getConsultantFinancials.data);
      },
      fetchPolicy: "no-cache",
    }
  );
  const refreshConsultantFinancial = () => {
    refetch();
  };
  const closeDialog = () => {
    setFinancialStudentStatusOpenDialog(false);
  };
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
              <StyledTableCell align="left">نام مشاور</StyledTableCell>
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
            {studentConsultants &&
              studentConsultants.map(
                (element: ConsultantFinancialType, index: number) => (
                  <StyledTableRow key={element.id}>
                    <StyledTableCell align="left">
                      {pageInfo.perPage * (pageInfo.currentPage - 1) +
                        index +
                        1}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {/* <CourseName course={element.course} /> */}
                      <Box sx={{ fontSize: 10, pt: 1 }}>
                        {element.consultant?.first_name}
                        {element.consultant?.last_name}
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <StatusIcon status={element.student_status} />
                      <Typography
                        component={"div"}
                        sx={{ fontSize: 9, fontWeight: "bold" }}
                      >
                        {/* {element.user_student_status
                          ? element.user_student_status?.first_name +
                            " " +
                            element.user_student_status?.last_name
                          : null} */}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <StatusIcon status={element.manager_status} />
                      <Typography
                        component={"div"}
                        sx={{ fontSize: 9, fontWeight: "bold" }}
                      >
                        {/* {element?.user_manager
                          ? element.user_manager?.first_name +
                            " " +
                            element.user_manager?.last_name
                          : null} */}
                      </Typography>
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      <StatusIcon status={element.financial_status} />
                      <Typography
                        component={"div"}
                        sx={{ fontSize: 9, fontWeight: "bold" }}
                      >
                        {/* {element.user_financial
                        ? element.user_financial?.first_name +
                          " " +
                          element.user_financial?.last_name
                        : null} */}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {/* {element.financial_refused_status} */}
                      <FinancialRefusedStatus
                        financial_refused_status={
                          element.financial_refused_status
                        }
                      />
                    </StyledTableCell>

                    <StyledTableCell align="left">
                      {moment(element.created_at).format("jYYYY/jMM/jDD")}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <Button
                        size="small"
                        onClick={() => handleAddStudentStatus(element.id)}
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

      {!loading && studentData.getStudent.nationality_code ? (
        <AddStudentConsultant studentId={studentId} refetch={refetch} />
      ) : (
        <Alert severity="error">
          جهت افزودن درس به این دانش آموز کد ملی را در قسمت
          <Button
            onClick={() => {
              navigate(`/students/edit/${studentId}`);
            }}
          >
            پروفایل
          </Button>
          وارد کنید
        </Alert>
      )}
      {consultantFinancialId ? (
        <StudentStatusFinancialDialog
          consultantFinancialId={consultantFinancialId}
          refreshData={refreshConsultantFinancial}
          openConsultantFinancialDialog={financialStudentStatusOpenDialog}
          closeConsultantFinancialDialog={closeDialog}
        />
      ) : null}
    </Container>
  );
};
export default StudentFinancial;
