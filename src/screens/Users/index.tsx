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
import { GET_USERS } from './gql/query';
import { DELETE_USER } from './gql/mutation';
import { useMutation, useQuery } from '@apollo/client';
import PaginatorInfo from '../../interfaces/paginator-info.interface';
import {
    useNavigate
} from "react-router-dom"
import { showSuccess, showConfirm } from "../../utils/swlAlert";
import { Typography } from '@mui/material';

import SearchUser from "../../components/SearchUser";


class SearchData {
    first_name?: string;
    last_name?: string;
    email?: string;
    group_id?: number;
    branch_id?: number;
}

class GetUserVariabls {
    first?: number;
    page?: number;
    orderBy?: { column: string; order: string }[];
    first_name?: string | undefined;
    last_name?: string | undefined;
    email?: string | undefined;
    group_id?: number | undefined;
    branch_id?: number | undefined;
  }
interface UserData {
    first?: number;
    page?: number;
    orderBy?: { column: string; order: string }[];
    id: number;
    email?: string;
    first_name?: string;
    last_name?: string;
    group?: {
        persian_name: string;
    };
    branch?: {
        name: string;
    }
}

const UersScreen = () => {
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
    const [users, setUsers] = useState<UserData[]>();
    const [searchLoading, setSearchLoading] = useState<boolean>(false);
    const [search, setSearch] = useState<SearchData>({
        first_name: undefined,
        last_name: undefined,
        email: undefined,
        group_id: undefined,
        branch_id: undefined,
    })

    const { fetchMore, refetch } = useQuery<any, GetUserVariabls>(GET_USERS, {
        variables: {
            first: process.env.REACT_APP_USERS_PER_PAGE ? parseInt(process.env.REACT_APP_USERS_PER_PAGE) : 10,
            page: 1,
            orderBy: [{
                column: '_id',
                order: 'DESC'
            }],            
            first_name: undefined,
            last_name: undefined,
            email: undefined,
            group_id: undefined,
            branch_id: undefined,
        },
        onCompleted: (data) => {         
            setPageInfo(data.getUsers.paginatorInfo);
            setUsers(data.getUsers.data);
        },
        fetchPolicy: "no-cache"
    });

    const [delUser] = useMutation(DELETE_USER)

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
        setUsers([]);
        fetchMore({
            variables: {
                first: process.env.REACT_APP_USERS_PER_PAGE ? parseInt(process.env.REACT_APP_USERS_PER_PAGE) : 10,
                page: value,
                orderBy: [{
                    column: 'id',
                    order: 'DESC'
                }],
                first_name: search?.first_name ? search.first_name : undefined,
                last_name: search?.last_name ? search.last_name : undefined,
                email: search?.email ? search.email : undefined,
                group_id: search?.group_id ? search.group_id : undefined,
                branch_id: search?.branch_id ? search.branch_id : undefined,
            },
            
            updateQuery: (prev, { fetchMoreResult }) => {
                setPageInfo(fetchMoreResult.getUsers.paginatorInfo);
                setUsers(fetchMoreResult.getUsers.data);
            }
        });
    };

    const searchMaper = (input: SearchData): Partial<GetUserVariabls> => {
        return {
            first_name: input?.first_name ? input.first_name : undefined,
            last_name: input?.last_name ? input.last_name : undefined,
            email: input?.email ? input.email : undefined,
            group_id: input?.group_id ? Number(input.group_id) : undefined,
            branch_id: input?.branch_id ? Number(input.branch_id) : undefined,
            //lessonId: input?.lessonId ? Number(input.lessonId) : undefined,
            //   gender: input?.gender && input?.gender !== "" ? input?.gender : undefined,
        };
    };
    const handleSearch = (searchData: SearchData): void => {
        setSearchLoading(true);
        setSearch({ ...searchData });
        const refetchData: SearchData = { ...searchData };
        refetch(searchMaper(refetchData)).then(() => {
            setSearchLoading(false);
        });
    };

    function deleteUser(id: number) {
        showConfirm(() => {
            delUser(
                {
                    variables: {
                        id: id
                    }
                }
            ).then(() => {
                refetch();
                showSuccess('کابر با موفقیت حذف شد.');
            });
        });
    };

    if (!users ) {
        return <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Skeleton width="100%" height={100} />
            <Skeleton variant="rectangular" width="100%" height={300} />
        </Container>
            ;
    }   

    return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Typography component={'div'} sx={{ fontSize: 18, fontWeight: 'bold', my: 3 }} >
            مدیریت کاربران
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
                onClick={() => navigate('/users/create')} >
                افزودن کاربر جدید
            </Button>
        </Box>
        <SearchUser callBack={handleSearch} loading={searchLoading} />
        <TableContainer component={Paper}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">ردیف</StyledTableCell>
                        <StyledTableCell align="left">نام</StyledTableCell>
                        <StyledTableCell align="left">نام خانوادگی</StyledTableCell>
                        <StyledTableCell align="left">نام کاربری</StyledTableCell>
                        <StyledTableCell align="left">گروه کاربری</StyledTableCell>
                        <StyledTableCell align="left">شعبه</StyledTableCell>
                        <StyledTableCell align="left">ویرایش</StyledTableCell>
                        <StyledTableCell align="left">حذف</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((element: UserData, index: number) => (
                        <StyledTableRow key={element.id}>
                            <StyledTableCell align="left">
                                {index + 1}
                            </StyledTableCell>
                            <StyledTableCell align="left">{element.first_name}</StyledTableCell>
                            <StyledTableCell align="left">{element.last_name}</StyledTableCell>
                            <StyledTableCell align="left">{element.email}</StyledTableCell>
                            <StyledTableCell align="left">{element.group?.persian_name}</StyledTableCell>
                            <StyledTableCell align="left">{element?.branch?.name || '--'}</StyledTableCell>
                            <StyledTableCell align="left"><Button
                                size="small"
                                onClick={() => {
                                    navigate(`/users/edit/${element.id}`);
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

export default UersScreen;