import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_COURSE_SESSIONS } from '../gql/query';
import { DELETE_SESSION } from '../gql/mutation';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import PaginatorInfo from '../../../interfaces/paginator-info.interface';
import moment from 'moment-jalaali';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { showSuccess, showConfirm } from "../../../utils/swlAlert";


interface IProps {
    courseId: number;
}

interface SessionData {
    id: number;
    name: string;
    start_date: string;
    start_time: string;
    end_time: string;
    special: boolean;
    user: {
        first_name: string;
        last_name: string;
    };

    course: {
        name: string;
        teacher: {
            first_name: string;
            last_name: string;
        };
        lesson: string;

    };
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
const ListSessions = ({ courseId }: IProps) => {
    const [sessions, setSessions] = useState<SessionData[]>([]);
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
    const { loading, error, fetchMore, refetch } = useQuery(GET_COURSE_SESSIONS, {
        variables: {
            first: process.env.REACT_APP_USERS_PER_PAGE ? parseInt(process.env.REACT_APP_USERS_PER_PAGE) : 10,
            page: 1,
            course_id: courseId,
            orderBy: [{
                column: 'start_date',
                order: 'ASC'
            }]
        },
        onCompleted: (data) => {
            setPageInfo(data.getCourseSessions.paginatorInfo);
            setSessions(data.getCourseSessions.data);
        },
        fetchPolicy: "no-cache"
    });

    const [delSession] = useMutation(DELETE_SESSION);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setSessions([]);
        fetchMore({
            variables: {
                first: process.env.REACT_APP_USERS_PER_PAGE ? parseInt(process.env.REACT_APP_USERS_PER_PAGE) : 10,
                page: value,
                course_id: courseId,
                orderBy: [{
                    column: 'start_date',
                    order: 'ASC'
                }]
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                setPageInfo(fetchMoreResult.getCourseSessions.paginatorInfo);
                setSessions(fetchMoreResult.getCourseSessions.data);
            }
        });
    };

    function deleteSession(id: number) {
        showConfirm(() => {
            delSession(
                {
                    variables: {
                        id: id
                    }
                }
            ).then(() => {
                refetch();
                showSuccess('حذف با موفقیت انجام شد.');
            });
        });
    };

    if (error) {
        return <Typography sx={{
            display: 'flex',
            justifyContent: 'center',
        }} >خطا در نمایش داده ها! {error.message}</Typography>;
    }
    return (loading ? (<Typography sx={{
        display: 'flex',
        justifyContent: 'center',
    }} ><CircularProgress size={40} color="primary" /></Typography>) :
        <TableContainer component={Paper}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">ردیف</StyledTableCell>
                        <StyledTableCell align="left">شروع</StyledTableCell>
                        <StyledTableCell align="left">ساعت شروع	</StyledTableCell>
                        <StyledTableCell align="left">ساعت پایان</StyledTableCell>
                        <StyledTableCell align="left">فوق العاده</StyledTableCell>
                        <StyledTableCell align="left"> نام</StyledTableCell>
                        <StyledTableCell align="left">دبیر</StyledTableCell>
                        <StyledTableCell align="left">کاربر ثبت کننده</StyledTableCell>
                        <StyledTableCell align="left">شناسه</StyledTableCell>

                        <StyledTableCell align="left">ویرایش</StyledTableCell>
                        <StyledTableCell align="left">حذف</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sessions.map((element: SessionData, index: number) => (
                        <StyledTableRow key={element.id}>
                            <StyledTableCell align="left">
                                {(pageInfo.perPage * (pageInfo.currentPage - 1)) + index + 1}
                            </StyledTableCell>

                            <StyledTableCell align="left">
                                {moment(element.start_date).format('jYYYY/jMM/jDD')}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                {moment(element.start_time, "HH:mm:ss").format('HH:mm')}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                {moment(element.end_time, "HH:mm:ss").format('HH:mm')}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                {element.special ? 'بله' : 'خیر'}
                            </StyledTableCell>
                            <StyledTableCell align="left">{element.name !== '' ? element.name : '---'}</StyledTableCell>
                            <StyledTableCell align="left">{element.course.teacher.first_name} {element.course.teacher.last_name}</StyledTableCell>
                            <StyledTableCell align="left">{element.user.first_name} {element.user.last_name}</StyledTableCell>

                            <StyledTableCell align="left">
                                {element.id}
                            </StyledTableCell>

                            <StyledTableCell align="left"><Button
                                size="small"
                                onClick={() => {
                                    //navigate(`/courses/edit/${element.id}`);
                                }}
                                variant="contained"
                                startIcon={<EditIcon />}
                                color="success"
                            >
                                ویرایش
                            </Button></StyledTableCell>
                            <StyledTableCell align="left">
                                <Button
                                    size="small"
                                    onClick={
                                        () => deleteSession(element.id)
                                    }
                                    variant="contained"
                                    startIcon={<DeleteIcon />}
                                    color="error"
                                >
                                    حذف
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
    );
}

export default ListSessions;