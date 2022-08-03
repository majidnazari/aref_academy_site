import { useState } from 'react';
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
    TableCell,
    Button,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import PaginatorInfo from "interfaces/paginator-info.interface";
import StudentCoursesType from "interfaces/studentCourses.interface";
import CourseName from "components/CourseName";
import StatusIcon from "components/StatusIcon";
import moment from 'moment-jalaali';
import EditIcon from '@mui/icons-material/Edit';
import { GET_COURSES_STUDENTS } from './gql/query';
import { useQuery } from '@apollo/client';
import Edit from "components/EditCourseStudentStatus";
import { generateQueryOptions } from "utils/utils";


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

interface EditStudentCourse {
    openDialog: boolean;
    studentCourse: StudentCoursesType;
    key: number,
    id: number
}


const StudentCoursesAlarms = () => {
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

    const [courseStudents, setCourseStudents] = useState<StudentCoursesType[]>([]);
    const [editStudentCourse, setEditStudentCourse] = useState<EditStudentCourse>({
        openDialog: false,
        studentCourse: {} as StudentCoursesType,
        key: 0,
        id: 0
    })

    const { fetchMore, loading, refetch } = useQuery(GET_COURSES_STUDENTS, {
        variables: {
            first: process.env.REACT_APP_USERS_PER_PAGE ? parseInt(process.env.REACT_APP_USERS_PER_PAGE) : 10,
            page: 1,
            ...generateQueryOptions()
        },
        fetchPolicy: 'no-cache',
        onCompleted: (data) => {
            setCourseStudents(data.getCourseStudents.data);
            setPageInfo(data.getCourseStudents.paginatorInfo);
        }
    });


    const handleChange = (event: React.ChangeEvent<unknown>, value: number): void => {
        fetchMore({
            variables: {
                first: process.env.REACT_APP_USERS_PER_PAGE ? parseInt(process.env.REACT_APP_USERS_PER_PAGE) : 10,
                page: value,
                orderBy: [{
                    column: 'id',
                    order: 'DESC'
                }]
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                setCourseStudents(fetchMoreResult.getCourseStudents.data);
                setPageInfo(fetchMoreResult.getCourseStudents.paginatorInfo);
            },
        });
    };
    return (<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        {
            loading ? <CircularProgress /> : null
        }
        <TableContainer component={Paper}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">ردیف</StyledTableCell>
                        <StyledTableCell align="left">
                            دانش آموز
                        </StyledTableCell>
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
                        <StyledTableCell align="left">
                            ویرایش
                        </StyledTableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {courseStudents && courseStudents.map((element: StudentCoursesType, index: number) => (
                        <StyledTableRow key={index}>
                            <StyledTableCell align="left">
                                {(pageInfo.perPage * (pageInfo.currentPage - 1)) + index + 1}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                {
                                    element?.student?.first_name + ' ' + element?.student?.last_name
                                }
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                <CourseName course={element.course} />
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <StatusIcon status={element.student_status} />
                                <Typography component={'div'} sx={{ fontSize: 9, fontWeight: 'bold' }} >
                                    {
                                        element.user_student_status ?
                                            element.user_student_status?.first_name + ' ' + element.user_student_status?.last_name : null
                                    }
                                </Typography>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <StatusIcon status={element.manager_status} />
                                <Typography component={'div'} sx={{ fontSize: 9, fontWeight: 'bold' }} >
                                    {
                                        element?.user_manager ?
                                            element.user_manager?.first_name + ' ' + element.user_manager?.last_name : null
                                    }
                                </Typography>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <StatusIcon status={element.financial_status} />
                                <Typography component={'div'} sx={{ fontSize: 9, fontWeight: 'bold' }} >
                                    {
                                        element.user_financial ?
                                            element.user_financial?.first_name + ' ' + element.user_financial?.last_name : null
                                    }
                                </Typography>
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                {element.user_creator?.first_name + ' ' + element.user_creator?.last_name}
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
                                            id: element.id
                                        })
                                    }}
                                    variant="contained"
                                    startIcon={<EditIcon />}
                                    color="success"
                                >
                                    ویرایش
                                </Button>
                            </StyledTableCell>

                        </StyledTableRow>
                    ))}
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
        <Edit
            openDialog={editStudentCourse.openDialog}
            studentCourse={editStudentCourse.studentCourse}
            key={editStudentCourse.key}
            refresh={refetch}
        />
    </Container>);
}

export default StudentCoursesAlarms;
