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
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import { GET_LESSONS } from './gql/query';
import { DELETE_LESSON } from './gql/mutation';
import { useMutation, useQuery } from '@apollo/client';
import PaginatorInfo from '../../interfaces/paginator-info.interface';
import {
    useNavigate
} from "react-router-dom"
import { showSuccess, showConfirm } from "../../utils/swlAlert";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';


interface LessonData {
    id: number;
    name: string;
}

const LessonsScreen = () => {
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
    const [lessons, setLessons] = useState<LessonData[] | null>(null);

    const { fetchMore, refetch } = useQuery(GET_LESSONS, {
        variables: {
            first: process.env.REACT_APP_USERS_PER_PAGE ? parseInt(process.env.REACT_APP_USERS_PER_PAGE) : 10,
            page: 1,
        },
        onCompleted: (data) => {
            setPageInfo(data.getLessons.paginatorInfo);
            setLessons(data.getLessons.data);
        },
        fetchPolicy: "no-cache"
    });

    const [delLesson] = useMutation(DELETE_LESSON)

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

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setLessons([]);
        fetchMore({
            variables: {
                first: process.env.REACT_APP_USERS_PER_PAGE ? parseInt(process.env.REACT_APP_USERS_PER_PAGE) : 10,
                page: value,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                setPageInfo(fetchMoreResult.getYears.paginatorInfo);
                setLessons(fetchMoreResult.getYears.data);
            }
        });
    };

    function deleteUser(id: number) {
        showConfirm(() => {
            delLesson(
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
    if (!lessons) {
        return <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Skeleton width="100%" height={100} />
            <Skeleton variant="rectangular" width="100%" height={300} />
        </Container>
            ;
    }
    if (lessons.length === 0) {
        return <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end"
            >
                <Button
                    variant="contained"
                    startIcon={<AddCircleIcon />}
                    sx={{ mb: 4 }}
                    onClick={() => navigate('/years/create')} >
                    افزودن درس جدید
                </Button>
            </Box>
            <div>
                داده ای وجود ندارد ...
            </div>
        </Container>
    }

    return (<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
        >
            <Button
                variant="contained"
                startIcon={<AddCircleIcon />}
                sx={{ mb: 4 }}
                onClick={() => navigate('/lessons/create')} >
                افزودن درس جدید
            </Button>
        </Box>
        <TableContainer component={Paper}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">ردیف</StyledTableCell>
                        <StyledTableCell align="left">نام</StyledTableCell>
                        <StyledTableCell align="left">ویرایش</StyledTableCell>
                        <StyledTableCell align="left">حذف</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {lessons.map((element: LessonData, index: number) => (
                        <StyledTableRow key={element.id}>
                            <StyledTableCell align="left">
                                {index + 1}
                            </StyledTableCell>
                            <StyledTableCell align="left">{element.name}</StyledTableCell>
                            <StyledTableCell align="left"><Button
                                size="small"
                                onClick={() => {
                                    navigate(`/lessons/edit/${element.id}`);
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
                                    onClick={() => deleteUser(element.id)}
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
    </Container >)
}

export default LessonsScreen;