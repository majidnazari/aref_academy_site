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
import { GET_BRANCHE_CLASS_ROOMS } from './gql/query';
import { DELETE_CLASSROOM } from './gql/mutation';
import { useMutation, useQuery } from '@apollo/client';
import PaginatorInfo from '../../../interfaces/paginator-info.interface';
import {
    useNavigate
} from "react-router-dom"
import { showSuccess, showConfirm } from "../../../utils/swlAlert";
import moment from 'moment-jalaali';
import {
    useParams
} from "react-router-dom";

interface BranchData {
    id: number;
    name: string;
    user: {
        first_name: string;
        last_name: string;
    };
    created_at: string;
    branch: {
        name: string;
    },
    description: string;
}

const BranchesScreen = () => {
    const navigate = useNavigate();
    const params = useParams<string>();
    const branchId = params.branchId ? parseInt(params.branchId) : 0;
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
    const [branches, setBranches] = useState<BranchData[] | null>(null);

    const { fetchMore, refetch } = useQuery(GET_BRANCHE_CLASS_ROOMS, {
        variables: {
            first: process.env.REACT_APP_USERS_PER_PAGE ? parseInt(process.env.REACT_APP_USERS_PER_PAGE) : 10,
            page: 1,
            branch_id: branchId,
            orderBy: [{
                column: 'id',
                order: 'DESC'
            }]
        },
        onCompleted: (data) => {
            setPageInfo(data.getBranchClassRooms.paginatorInfo);
            setBranches(data.getBranchClassRooms.data);
        },
        fetchPolicy: "no-cache"
    });

    const [delClassRoom] = useMutation(DELETE_CLASSROOM)

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
        setBranches([]);
        fetchMore({
            variables: {
                first: process.env.REACT_APP_USERS_PER_PAGE ? parseInt(process.env.REACT_APP_USERS_PER_PAGE) : 10,
                page: value,
                branch_id: branchId,
                orderBy: [{
                    column: 'id',
                    order: 'DESC'
                }]
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                setPageInfo(fetchMoreResult.getBranchClassRooms.paginatorInfo);
                setBranches(fetchMoreResult.getBranchClassRooms.data);
            }
        });
    };

    function deleteClassRoom(id: number) {
        showConfirm(() => {
            delClassRoom(
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
    if (!branches) {
        return <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Skeleton width="100%" height={100} />
            <Skeleton variant="rectangular" width="100%" height={300} />
        </Container>
            ;
    }
    if (branches.length === 0) {
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
                    onClick={() => navigate(`/branches/${branchId}/class-rooms/create`)} >
                    افزودن کلاس فیزیکی جدید
                </Button>
            </Box>
            <div>
                داده ای وجود ندارد ...
            </div>
        </Container>
    }

    return (<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <h4>
            مدیریت کلاس‌های فیزیکی
        </h4>
        <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
        >
            <Button
                variant="contained"
                startIcon={<AddCircleIcon />}
                sx={{ mb: 4 }}
                onClick={() => navigate(`/branches/${branchId}/class-rooms/create`)} >
                افزودن کلاس فیزیکی جدید
            </Button>
        </Box>
        <TableContainer component={Paper}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">ردیف</StyledTableCell>
                        <StyledTableCell align="left">نام</StyledTableCell>
                        <StyledTableCell align="left">شعبه</StyledTableCell>
                        <StyledTableCell align="left">توضیحات</StyledTableCell>
                        <StyledTableCell align="left">کاربر ثبت کننده</StyledTableCell>
                        <StyledTableCell align="left">تاریخ ثبت</StyledTableCell>
                        <StyledTableCell align="left">ویرایش</StyledTableCell>
                        <StyledTableCell align="left">حذف</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {branches.map((element: BranchData, index: number) => (
                        <StyledTableRow key={element.id}>
                            <StyledTableCell align="left">
                                {(pageInfo.perPage * (pageInfo.currentPage - 1)) + index + 1}
                            </StyledTableCell>
                            <StyledTableCell align="left">{element.name}</StyledTableCell>
                            <StyledTableCell align="left">{element.branch.name}</StyledTableCell>
                            <StyledTableCell align="left">{element.description}</StyledTableCell>
                            <StyledTableCell align="left">{element.user?.first_name} {element.user?.last_name}</StyledTableCell>
                            <StyledTableCell align="left">
                                {moment(element.created_at).format("jYYYY/jMM/jDD")}
                            </StyledTableCell>

                            <StyledTableCell align="left"><Button
                                size="small"
                                onClick={() => {
                                    navigate(`/branches/${branchId}/class-rooms/${element.id}`);
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
                                    onClick={() => deleteClassRoom(element.id)}
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

export default BranchesScreen;