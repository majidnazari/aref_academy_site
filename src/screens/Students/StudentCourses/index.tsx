import {useState} from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_A_STUDENT } from "./gql/query";
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
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import AddStudentCourse from './components/AddStudentCourse';
import PaginatorInfo from "interfaces/paginator-info.interface";


const StudentCourses = () => {
    const { studentId } = useParams<string>();
    const { data: studentData, loading } = useQuery(GET_A_STUDENT, {
        variables: {
            id: studentId
        }
    });
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
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));
    return (<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Typography component={'div'} sx={{ fontSize: 18, fontWeight: 'bold', my: 2 }} >
            {loading ?
                <CircularProgress /> :
                studentData?.getStudent.first_name + ' ' + studentData?.getStudent.last_name
            }
        </Typography>
        <TableContainer component={Paper}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">ردیف</StyledTableCell>
                        <StyledTableCell align="left">
                            نام درس
                        </StyledTableCell>
                        <StyledTableCell align="left">
                            وضعیت دانش آموز
                        </StyledTableCell>
                        <StyledTableCell align="left">
                            تایید مدیر
                        </StyledTableCell>
                        <StyledTableCell align="left">
                            تایید حسابداری
                        </StyledTableCell>
                        <StyledTableCell align="left">
                            کاربر ثبت کننده
                        </StyledTableCell>
                        <StyledTableCell align="left">
                            تاریخ
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* {students && students.map((element: StudentData, index: number) => (
                        <StyledTableRow key={element.id}>
                            <StyledTableCell align="left">
                                {(pageInfo.perPage * (pageInfo.currentPage - 1)) + index + 1}
                            </StyledTableCell>
                            <StyledTableCell align="left">{element.first_name}</StyledTableCell>
                            <StyledTableCell align="left">{element.last_name}</StyledTableCell>
                            <StyledTableCell align="left">
                                {educationLevelsObject[element.egucation_level]}
                            </StyledTableCell>
                            <StyledTableCell align="left">{element.phone}</StyledTableCell>
                            <StyledTableCell align="left">
                                {element.major !== '' ? majorObject[element.major] : '-'}
                            </StyledTableCell>
                        </StyledTableRow>
                    ))} */}
                </TableBody>
            </Table>
            <Stack spacing={5} sx={{ my: 2 }}>
                {/* <Pagination
                    count={pageInfo.lastPage}
                    page={pageInfo.currentPage}
                    onChange={handleChange}
                /> */}
            </Stack>
        </TableContainer>
        <Stack spacing={5} sx={{ my: 2 }}>
            <Pagination
                count={pageInfo.lastPage}
                page={pageInfo.currentPage}
                // onChange={handleChange}
            />
        </Stack>
        <AddStudentCourse />
    </Container>);
}
export default StudentCourses;