import React, { useState } from 'react';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { GET_COURSES } from './gql/query';
import { useQuery } from '@apollo/client';
import PaginatorInfo from 'interfaces/paginator-info.interface';
import {
    useNavigate
} from "react-router-dom"
import { typesObject, educationLevelsObject } from 'constants/index';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import CheckIcon from '@mui/icons-material/Check';
import Typography from '@mui/material/Typography';

interface CourseData {
    id: number;
    name: string;
    user: {
        first_name: string;
        last_name: string;
    };
    year: {
        name: string;
    };
    teacher: {
        first_name: string;
        last_name: string;
    };
    lesson: {
        id: number;
        name: string;
    };
    type: string;
    education_level: string;
    financial_status: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    branch: {
        name: string;
    }
}

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
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
const AbsencePresencesReportScreen = () => {
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
    const [courses, setCourses] = useState<CourseData[] | null>(null);

    const { fetchMore, refetch } = useQuery(GET_COURSES, {
        variables: {
            first: process.env.REACT_APP_USERS_PER_PAGE ? parseInt(process.env.REACT_APP_USERS_PER_PAGE) : 10,
            page: 1,
            orderBy: [{
                column: 'id',
                order: 'DESC'
            }]
        },
        onCompleted: (data) => {
            setPageInfo(data.getCourses.paginatorInfo);
            setCourses(data.getCourses.data);
        },
        fetchPolicy: "no-cache"
    });

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCourses([]);
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
                setPageInfo(fetchMoreResult.getCourses.paginatorInfo);
                setCourses(fetchMoreResult.getCourses.data);
            }
        });
    };


    if (!courses) {
        return <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Skeleton width="100%" height={100} />
            <Skeleton variant="rectangular" width="100%" height={300} />
        </Container>
            ;
    }
    if (courses.length === 0) {
        return <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <div>
                داده ای وجود ندارد ...
            </div>
        </Container>
    }

    return (<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Typography component={'div'} sx={{ fontSize: 18, fontWeight: 'bold', my: 2 }} >
            گزارش حضور غیاب انتخاب کلاس
        </Typography>
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
                        <StyledTableCell align="left">شعبه</StyledTableCell>
                        <StyledTableCell align="left">تایید حسابداری</StyledTableCell>
                        <StyledTableCell align="left">جلسات</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {courses.map((element: CourseData, index: number) => (
                        <StyledTableRow key={element.id}>
                            <StyledTableCell align="left">
                                {(pageInfo.perPage * (pageInfo.currentPage - 1)) + index + 1}
                            </StyledTableCell>
                            <StyledTableCell align="left">{element.name}</StyledTableCell>
                            <StyledTableCell align="left">{element.year.name}</StyledTableCell>
                            <StyledTableCell align="left">{element.teacher.first_name} {element.teacher.last_name}</StyledTableCell>

                            <StyledTableCell align="left">{element.user.first_name} {element.user.last_name}</StyledTableCell>
                            <StyledTableCell align="left">
                                {element.lesson?.name}
                            </StyledTableCell>
                            <StyledTableCell align="left">{typesObject[element.type]}</StyledTableCell>
                            <StyledTableCell align="left">{educationLevelsObject[element.education_level]}</StyledTableCell>
                            <StyledTableCell align="left">{element.branch?.name}</StyledTableCell>

                            <StyledTableCell align="center">
                                {element.financial_status === 'approved' ?
                                    (<CheckIcon color="success" />) : (<ReportProblemIcon color="disabled" />)
                                }
                            </StyledTableCell>
                            <StyledTableCell align="left"><Button
                                size="small"
                                onClick={() => {
                                    navigate(`/reports/absence-presences/${element.id}/sessions`);
                                }}
                                variant="contained"
                                startIcon={<FactCheckIcon />}
                                color="primary"
                            >
                                جلسات
                            </Button></StyledTableCell>
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
    </Container >)
}

export default AbsencePresencesReportScreen;