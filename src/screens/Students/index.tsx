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
import { GET_FAULTS } from './gql/query';
import { DELETE_FAULT } from './gql/mutation';
import { useMutation, useQuery } from '@apollo/client';
import PaginatorInfo from '../../interfaces/paginator-info.interface';
import {
    useNavigate
} from "react-router-dom"
import { showSuccess, showConfirm } from "../../utils/swlAlert";
import moment from 'moment-jalaali';
import Typography from '@mui/material/Typography';
import PaymentsIcon from '@mui/icons-material/Payments';
import ClassIcon from '@mui/icons-material/Class';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

interface FaultData {
    id: number;
    description: string;
    user: {
        first_name: string;
        last_name: string;
    };
    created_at: string;
}

interface StudentData {
    id: number;
    first_name: string;
    last_name: string;
    phone: string;
    mother_phone: string;
    father_phone: string;
    home_phone: string;
    major: string;
    egucation_level: string;
    description: string;
    parents_job_title: string;
}

interface SearchData {
    first_name: string;
    last_name: string;
    phone: string;
    egucation_level: string;
}
const FaultsScreen = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState<SearchData>({
        first_name: "",
        last_name: "",
        phone: "",
        egucation_level: ""
    }
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
    const [faults, setFaults] = useState<FaultData[] | null>(null);

    const { fetchMore, refetch } = useQuery(GET_FAULTS, {
        variables: {
            first: process.env.REACT_APP_USERS_PER_PAGE ? parseInt(process.env.REACT_APP_USERS_PER_PAGE) : 10,
            page: 1,
            orderBy: [{
                column: 'id',
                order: 'DESC'
            }]
        },
        onCompleted: (data) => {
            setPageInfo(data.getFaults.paginatorInfo);
            setFaults(data.getFaults.data);
        },
        fetchPolicy: "no-cache"
    });

    const [delFault] = useMutation(DELETE_FAULT)

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

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setFaults([]);
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
                setPageInfo(fetchMoreResult.getFaults.paginatorInfo);
                setFaults(fetchMoreResult.getFaults.data);
            }
        });
    };

    function deleteFlault(id: number) {
        showConfirm(() => {
            delFault(
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
    if (!faults) {
        return <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Skeleton width="100%" height={100} />
            <Skeleton variant="rectangular" width="100%" height={300} />
        </Container>
            ;
    }
    if (faults.length === 0) {
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
                    onClick={() => navigate('/faults/create')} >
                    افزودن تخلف جدید
                </Button>
            </Box>
            <div>
                داده ای وجود ندارد ...
            </div>
        </Container>
    }

    return (<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Typography component={'div'} sx={{ fontSize: 18, fontWeight: 'bold', my: 2 }} >
            مدیریت دانش‌آموزان
        </Typography>
        <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
        >
            <Button
                variant="contained"
                startIcon={<AddCircleIcon />}
                sx={{ mb: 4 }}
                onClick={() => navigate('/students/create')} >
                افزودن دانش‌آموز جدید
            </Button>
        </Box>
        <Grid container component={Paper} sx={{ p: 2 }} spacing={2} >
            <Grid item xs={12} md={3} lg={3} >
                <TextField
                    fullWidth
                    label="نام"
                    value={search.first_name}
                    onChange={(e: any) => setSearch({ ...search, first_name: e.target.value })}
                    variant="filled"
                />
            </Grid>
            <Grid item xs={12} md={3} lg={3} >
                <TextField
                    fullWidth
                    label="نام خانوادگی"
                    value={search.last_name}
                    onChange={(e: any) => setSearch({ ...search, first_name: e.target.value })}
                    variant="filled"
                />
            </Grid>
            <Grid item xs={12} md={3} lg={3} >
                <TextField
                    fullWidth
                    label="تلفن"
                    value={search.phone}
                    onChange={(e: any) => setSearch({ ...search, first_name: e.target.value })}
                    variant="filled"
                />
            </Grid>
            <Grid item xs={12} md={3} lg={3} >
                <Button
                    sx={{ mt: 2 }}
                    variant="contained"
                    startIcon={<SearchIcon />}
                    onClick={() => { }}
                >
                    جستجو
                </Button>
            </Grid>
        </Grid>
        <TableContainer component={Paper}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">ردیف</StyledTableCell>
                        <StyledTableCell align="left">
                            نام
                        </StyledTableCell>
                        <StyledTableCell align="left">
                            نام خانوادگی
                        </StyledTableCell>
                        <StyledTableCell align="left">
                            مقطع
                        </StyledTableCell>
                        <StyledTableCell align="left">
                            تلفن
                        </StyledTableCell>
                        <StyledTableCell align="left">
                            کاربر ثبت کننده
                        </StyledTableCell>
                        <StyledTableCell align="left">سوابق مالی</StyledTableCell>
                        <StyledTableCell align="left">کلاسها</StyledTableCell>
                        <StyledTableCell align="left">ویرایش</StyledTableCell>
                        <StyledTableCell align="left">حذف</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {faults.map((element: FaultData, index: number) => (
                        <StyledTableRow key={element.id}>
                            <StyledTableCell align="left">
                                {(pageInfo.perPage * (pageInfo.currentPage - 1)) + index + 1}
                            </StyledTableCell>
                            <StyledTableCell align="left">{element.description}</StyledTableCell>
                            <StyledTableCell align="left"></StyledTableCell>
                            <StyledTableCell align="left"></StyledTableCell>
                            <StyledTableCell align="left">{element.user.first_name} {element.user.last_name}</StyledTableCell>
                            <StyledTableCell align="left">
                                {moment(element.created_at).format("jYYYY/jMM/jDD")}
                            </StyledTableCell>

                            <StyledTableCell align="left"><Button
                                size="small"
                                variant="contained"
                                startIcon={<PaymentsIcon />}
                                color="primary"
                            >
                                مالی
                            </Button></StyledTableCell>
                            <StyledTableCell align="left"><Button
                                size="small"
                                variant="contained"
                                startIcon={<ClassIcon />}
                                color="secondary"
                            >
                                کلاسها
                            </Button></StyledTableCell>
                            <StyledTableCell align="left"><Button
                                size="small"
                                onClick={() => {
                                    navigate(`/students/edit/${element.id}`);
                                }}
                                variant="contained"
                                startIcon={<EditIcon />}
                                color="success"
                            >
                                پروفایل
                            </Button></StyledTableCell>
                            <StyledTableCell align="left">
                                <Button
                                    size="small"
                                    onClick={() => deleteFlault(element.id)}
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

export default FaultsScreen;