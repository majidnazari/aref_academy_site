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
//import { GET_COSULTANT_TESTS } from './gql/query';
import { GET_COSULTANT_TESTS } from './gql/query';
import { DELETE_CONSULTANT_TEST } from './gql/mutation';
//import { DELETE_FAULT } from './gql/mutation';
import { useMutation, useQuery } from '@apollo/client';
import PaginatorInfo from '../../interfaces/paginator-info.interface';
import { useNavigate } from "react-router-dom"
import { showSuccess, showConfirm } from "../../utils/swlAlert";
import moment from 'moment-jalaali';
import { Typography } from '@mui/material';
import { Refresh } from '@mui/icons-material';
import SearchConsultantTest from "../../components/SearchConsultantTest";

class SearchData {
    code?: number;
    lessonId?: number;
    level?: TestLevel;
    subject?: string;
}
interface ConsultantTestData {

    _id: string;
    subject: string;
    lessonId: number;
    level: TestLevel;
    code: number;

}
export enum TestLevel {
    A,
    B,
    C,
    D,
}
class GetConsultantTestVariabls {
    first?: number;
    page?: number;
    orderBy?: { column: string; order: string }[];
    code?: number;
    // lesson_id?: number | undefined;
    //gender?: string | undefined;
    lessonId?: number;
    subject?: string;
    level?: TestLevel;

}

const ConsultantTestScreen = () => {
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

    const [searchLoading, setSearchLoading] = useState<boolean>(false);
    const [search, setSearch] = useState<SearchData>({
        code: undefined,
        lessonId: undefined,
        level: undefined,
        subject: undefined,
    })

    const [deleteConsultant] = useMutation(DELETE_CONSULTANT_TEST);

    function delConsultant(id: string) {
        //console.log("id is:", id);
        showConfirm(() => {
            deleteConsultant({
                variables: { _id: id }
            }).then(() => {
                refetch()
                showSuccess("حذف با موفقت انجام شد. ");

            });
        });
    }
    const [consultant_test_state, setConsultant_test_state] = useState<ConsultantTestData[] | null>(null);

    ///  the firt time is loading 
    const { fetchMore, refetch } = useQuery<any, GetConsultantTestVariabls>(GET_COSULTANT_TESTS, {
        variables: {
            first: process.env.REACT_APP_USERS_PER_PAGE ? parseInt(process.env.REACT_APP_USERS_PER_PAGE) : 10,
            page: 1,
            orderBy: [{
                column: '_id',
                order: 'DESC'
            }],
            code: undefined,
            subject: undefined,
            level: undefined,
            //   lesson_id: undefined,
            //   gender: undefined,
        },
        onCompleted: (data) => {
            setPageInfo(data.tests.paginatorInfo);
            setConsultant_test_state(data.tests.data);
        },
        fetchPolicy: "network-only",
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

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setConsultant_test_state([]);
        fetchMore({
            variables: {
                first: process.env.REACT_APP_USERS_PER_PAGE ? parseInt(process.env.REACT_APP_USERS_PER_PAGE) : 10,
                page: value,
                orderBy: [{
                    column: 'id',
                    order: 'DESC'
                }],
                code: search?.code ? +search.code : undefined,
                subject: search?.subject ? +search.subject : undefined,
                level: search?.level ? +search.level : undefined,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                setPageInfo(fetchMoreResult.tests.paginatorInfo);
                setConsultant_test_state(fetchMoreResult.tests.data);
            }
        });
    };


    const searchMaper = (input: SearchData): Partial<GetConsultantTestVariabls> => {
        return {
            code: input?.code ? Number(input.code) : undefined,
            subject: input?.subject ? input.subject : undefined,
            level: input?.level ? input.level : undefined,
            lessonId: input?.lessonId ? Number(input.lessonId) : undefined,
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

    if (!consultant_test_state) {
        return <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Skeleton width="100%" height={100} />
            <Skeleton variant="rectangular" width="100%" height={300} />
        </Container>
            ;
    }
   

    return (<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Typography component={'div'} sx={{ fontSize: 18, fontWeight: 'bold', my: 2 }} >
            مدیریت مشاور
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
                onClick={() => navigate('/consultant/create')} >
                افزودن مشاور جدید
            </Button>
        </Box>
        <SearchConsultantTest callBack={handleSearch} loading={searchLoading} />
        <TableContainer component={Paper}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">ردیف</StyledTableCell>
                        <StyledTableCell align="left">کد تست</StyledTableCell>
                        <StyledTableCell align="left"> شماره درس </StyledTableCell>
                        <StyledTableCell align="left"> سطح </StyledTableCell>
                        <StyledTableCell align="left"> عنوان </StyledTableCell>
                        <StyledTableCell align="left">ویرایش</StyledTableCell>
                        <StyledTableCell align="left">حذف</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {consultant_test_state.map((element: ConsultantTestData, index: number) => (
                        <StyledTableRow key={element._id}>
                            <StyledTableCell align="left">
                                {(pageInfo.perPage * (pageInfo.currentPage - 1)) + index + 1}
                            </StyledTableCell>
                            <StyledTableCell align="left">{element.code}</StyledTableCell>
                            <StyledTableCell align="left">{element.lessonId} </StyledTableCell>
                            <StyledTableCell align="left">{element.level} </StyledTableCell>
                            <StyledTableCell align="left">{element.subject} </StyledTableCell>

                            <StyledTableCell align="left"><Button
                                size="small"
                                onClick={() => {
                                    navigate(`/consultant-test/edit/${element._id}`);
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
                                    onClick={() => delConsultant(element._id)}
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

export default ConsultantTestScreen;

