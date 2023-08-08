import React, { useState } from "react";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import { useQuery } from "@apollo/client";
import PaginatorInfo from "../../interfaces/paginator-info.interface";
import { useNavigate } from "react-router-dom";

import { Typography } from "@mui/material";
import SearchConsultant from "../../components/SearchConsultant";
import { GET_CONSULTANTS } from "./gql/query";

class SearchData {
  email?: string;
  first_name?: string;
  last_name?: string;
}
interface ConsultantData {
  id: string;
  email?: string;
  first_name?: string;
  last_name?: string;
}

class GetConsultantUserVariabls {
  first?: number;
  page?: number;
  orderBy?: { column: string; order: string }[];
  email?: string;
  first_name?: string;
  last_name?: string;
}

const ConsultantScreen = () => {
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
    first_name: undefined,
    last_name: undefined,
    email: undefined,
  });

  const [consultant_state, setConsultant_state] = useState<
    ConsultantData[] | null
  >(null);

  ///  the firt time is loading
  const { fetchMore, refetch } = useQuery<any, GetConsultantUserVariabls>(
    GET_CONSULTANTS,
    {
      variables: {
        first: process.env.REACT_APP_USERS_PER_PAGE
          ? parseInt(process.env.REACT_APP_USERS_PER_PAGE)
          : 10,
        page: 1,
        orderBy: [
          {
            column: "_id",
            order: "DESC",
          },
        ],
        first_name: undefined,
        last_name: undefined,
        email: undefined,
      },
      onCompleted: (data) => {
        setPageInfo(data.getUsers.paginatorInfo);
        setConsultant_state(data.getUsers.data);
      },
      fetchPolicy: "network-only",
    }
  );

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
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setConsultant_state([]);
    fetchMore({
      variables: {
        first: process.env.REACT_APP_USERS_PER_PAGE
          ? parseInt(process.env.REACT_APP_USERS_PER_PAGE)
          : 10,
        page: value,
        orderBy: [
          {
            column: "id",
            order: "DESC",
          },
        ],
        first_name: search?.first_name ? search.first_name : undefined,
        last_name: search?.last_name ? search.last_name : undefined,
        email: search?.email ? search.email : undefined,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        setPageInfo(fetchMoreResult.getUsers.paginatorInfo);
        setConsultant_state(fetchMoreResult.getUsers.data);
      },
    });
  };

  const searchMaper = (
    input: SearchData
  ): Partial<GetConsultantUserVariabls> => {
    return {
      first_name: input?.first_name ? input.first_name : undefined,
      last_name: input?.last_name ? input.last_name : undefined,
      email: input?.email ? input.email : undefined,
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

  if (!consultant_state) {
    return (
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Skeleton width="100%" height={100} />
        <Skeleton variant="rectangular" width="100%" height={300} />
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography
        component={"div"}
        sx={{ fontSize: 18, fontWeight: "bold", my: 2 }}
      >
        مدیریت مشاور
      </Typography>
      <SearchConsultant callBack={handleSearch} loading={searchLoading} />
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">ردیف</StyledTableCell>
              <StyledTableCell align="left"> نام </StyledTableCell>
              <StyledTableCell align="left"> نام خانوادگی </StyledTableCell>
              <StyledTableCell align="left"> نام کاربری </StyledTableCell>
              <StyledTableCell align="left"> تعریف جلسات حضور </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {consultant_state.map((element: ConsultantData, index: number) => (
              <StyledTableRow key={element.id}>
                <StyledTableCell align="left">
                  {pageInfo.perPage * (pageInfo.currentPage - 1) + index + 1}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {element.first_name}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {element.last_name}{" "}
                </StyledTableCell>
                <StyledTableCell align="left">{element.email} </StyledTableCell>

                <StyledTableCell align="left">
                  <Button
                    size="small"
                    onClick={() => {
                      navigate(`/consultant/${element.id}/timetable`);
                    }}
                    variant="contained"
                    startIcon={<EditIcon />}
                    color="primary"
                  >
                    جلسات حضور
                  </Button>
                </StyledTableCell>
                {/* <StyledTableCell align="left">
                  <Button
                    size="small"
                    onClick={() => {
                      navigate(`/consultant/${element.id}/add-user-consultant`);
                    }}
                    variant="contained"
                    startIcon={<PersonAddAltIcon />}
                    color="info"
                  >
                    دانش آموزان
                  </Button>
                </StyledTableCell> */}
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
    </Container>
  );
};

export default ConsultantScreen;
