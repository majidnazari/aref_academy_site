import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TitleBox from 'components/TitleBox';
import GroupIcon from '@mui/icons-material/Group';
import { Box,TableContainer ,Table,TableBody,TableHead,TableCell,TableRow,Paper,Pagination,Stack} from '@mui/material';
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import Skeleton from "@mui/material/Skeleton"; 
import { useNavigate } from "react-router-dom"
import ClassIcon from '@mui/icons-material/Class';
import LogoutIcon from '@mui/icons-material/Logout';
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";

const DashboardScreen = () => {
    const navigate = useNavigate();

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
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }} >
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

        <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">ردیف</StyledTableCell>
              <StyledTableCell align="left"> کد</StyledTableCell>
              <StyledTableCell align="left">سال</StyledTableCell>
              <StyledTableCell align="left">دبیر</StyledTableCell>
              <StyledTableCell align="left">کاربر ثبت کننده</StyledTableCell>
              <StyledTableCell align="left">درس پایه</StyledTableCell>
              <StyledTableCell align="left">نوع</StyledTableCell>
              <StyledTableCell align="left">مقطع</StyledTableCell>
              <StyledTableCell align="left">جنسیت</StyledTableCell>
              <StyledTableCell align="left">شعبه</StyledTableCell>
              <StyledTableCell align="left">تایید حسابداری</StyledTableCell>
              <StyledTableCell align="left">جلسات</StyledTableCell>
              <StyledTableCell align="left">ویرایش</StyledTableCell>
              <StyledTableCell align="left">حذف</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {courses.map((element: CourseData, index: number) => (
              <StyledTableRow key={element.id}>
                <StyledTableCell align="left">
                  {pageInfo.perPage * (pageInfo.currentPage - 1) + index + 1}
                </StyledTableCell>
                <StyledTableCell align="left">{element.name}</StyledTableCell>
                <StyledTableCell align="left">
                  {element.year.name}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {element.teacher.first_name} {element.teacher.last_name}
                </StyledTableCell>

                <StyledTableCell align="left">
                  {element.user.first_name} {element.user.last_name}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {element.lesson?.name}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {typesObject[element.type]}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {educationLevelsObject[element.education_level]}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {element.gender === "male" ? "پسرانه" : "دخترانه"}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {element.branch?.name}
                </StyledTableCell>

                <StyledTableCell align="center">
                  {element.financial_status === "approved" ? (
                    <CheckIcon color="success" />
                  ) : (
                    <ReportProblemIcon color="disabled" />
                  )}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Button
                    size="small"
                    onClick={() => {
                      navigate(`/courses/${element.id}/sessions`);
                    }}
                    variant="contained"
                    // startIcon={<EditIcon />}
                    color="primary"
                  >
                    جلسات
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Button
                    size="small"
                    onClick={() => {
                      navigate(`/courses/edit/${element.id}`);
                    }}
                    variant="contained"
                    startIcon={<EditIcon />}
                    color="success"
                  >
                    ویرایش
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Button
                    size="small"
                    onClick={() => deleteCourse(element.id)}
                    variant="contained"
                    startIcon={<DeleteIcon />}
                    color="error"
                  >
                    حذف
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))} */}
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
    </Container>)
}

export default DashboardScreen;