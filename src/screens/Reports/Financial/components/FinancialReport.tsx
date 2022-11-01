import { useQuery } from "@apollo/client";
import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Stack,
  Pagination,
  Box,
  TableHead,
  TableSortLabel,
} from "@mui/material";
import CourseName from "components/CourseName";
import StatusIcon from "components/StatusIcon";
import PaginatorInfo from "interfaces/paginator-info.interface";
import StudentCoursesType from "interfaces/studentCourses.interface";
import moment from "moment-jalaali";
import { useState, useEffect } from "react";
import { showError } from "utils/swlAlert";
import { GET_COURSES_STUDENTS } from "../gql/query";
import { visuallyHidden } from "@mui/utils";
import SearchFinancial from "./SearchFinancial";
import { SearchProps } from "../dto/search-dto";

interface Data {
  student: string;
  course: string;
  student_status: string;
  manager_status: string;
  financial_status: string;
  user_creator: string;
  created_at: string;
  edit?: string;
}

type Order = "asc" | "desc";
interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  sortable: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "student",
    sortable: false,
    disablePadding: true,
    label: "دانش آموز",
  },
  {
    id: "course",
    sortable: false,
    disablePadding: false,
    label: "درس",
  },
  {
    id: "student_status",
    sortable: true,
    disablePadding: false,
    label: "وضعیت دانش آموز",
  },
  {
    id: "manager_status",
    sortable: true,
    disablePadding: false,
    label: "تایید مدیر",
  },
  {
    id: "financial_status",
    sortable: true,
    disablePadding: false,
    label: "تایید مالی",
  },
  {
    id: "user_creator",
    sortable: false,
    disablePadding: false,
    label: "ثبت کننده",
  },
  {
    id: "created_at",
    sortable: true,
    disablePadding: false,
    label: "تاریخ ایجاد",
  },
];

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">ردیف</TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.sortable ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const FinancialReport = () => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<string>("created_at");
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
  const [courseStudents, setCourseStudents] = useState<StudentCoursesType[]>(
    []
  );
  const [searchData, setSearchData] = useState<SearchProps>({});
  const [searchLoading, setSearchLoading] = useState<boolean>(false);

  const { fetchMore, refetch, error } = useQuery(GET_COURSES_STUDENTS, {
    variables: {
      first: process.env.REACT_APP_USERS_PER_PAGE
        ? parseInt(process.env.REACT_APP_USERS_PER_PAGE)
        : 10,
      page: 1,
      orderBy: [
        {
          column: "created_at",
          order: "DESC",
        },
      ],
    },
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      setCourseStudents(data.getCourseStudents.data);
      setPageInfo(data.getCourseStudents.paginatorInfo);
    },
  });

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    reloadData(property, isAsc ? "DESC" : "ASC");
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ): void => {
    const variables = {
      first: process.env.REACT_APP_USERS_PER_PAGE
        ? parseInt(process.env.REACT_APP_USERS_PER_PAGE)
        : 10,
      page: value,
      ...searchData,
      orderBy: [
        {
          column: orderBy,
          order: order.toUpperCase(),
        },
      ],
    };
    fetchMore({
      variables,
      updateQuery: (prev, { fetchMoreResult }) => {
        setCourseStudents(fetchMoreResult.getCourseStudents.data);
        setPageInfo(fetchMoreResult.getCourseStudents.paginatorInfo);
      },
    }).catch((e) => {
      showError(e);
    });
  };

  useEffect(() => {
    if (error) {
      console.log({ error });
    }
  }, [error]);

  useEffect(() => {
    refetch({
      first: process.env.REACT_APP_USERS_PER_PAGE
        ? parseInt(process.env.REACT_APP_USERS_PER_PAGE)
        : 10,
      ...searchData,
      page: 1,
      orderBy: [
        {
          column: "created_at",
          order: "DESC",
        },
      ],
    });
  }, [searchData]);

  const reloadData = (field: string, order: string) => {
    setSearchLoading(true);
    refetch({
      first: process.env.REACT_APP_USERS_PER_PAGE
        ? parseInt(process.env.REACT_APP_USERS_PER_PAGE)
        : 10,
      page: 1,
      ...searchData,
      orderBy: [
        {
          column: field,
          order: order,
        },
      ],
    }).then(() => {
      //setSearchLoading(false);
    });
  };
  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
      <SearchFinancial
        callBack={setSearchData}
      />
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size="medium"
        >
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={courseStudents.length}
          />
          <TableBody>
            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
        rows.slice().sort(getComparator(order, orderBy)) */}
            {
              //stableSort(courseStudents, getComparator(order, orderBy))
              courseStudents.map((element, index) => {
                return (
                  <TableRow hover tabIndex={-1} key={index}>
                    <TableCell padding="checkbox">
                      {pageInfo.perPage * (pageInfo.currentPage - 1) +
                        index +
                        1}
                    </TableCell>
                    <TableCell component="th" scope="row" padding="none">
                      {element?.student?.first_name +
                        " " +
                        element?.student?.last_name}
                    </TableCell>
                    <TableCell align="left">
                      <CourseName course={element.course} />
                    </TableCell>
                    <TableCell align="left">
                      <StatusIcon status={element.student_status} />
                      <Typography
                        component={"div"}
                        sx={{ fontSize: 9, fontWeight: "bold" }}
                      >
                        {element.user_student_status
                          ? element.user_student_status?.first_name +
                            " " +
                            element.user_student_status?.last_name
                          : null}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <StatusIcon status={element.manager_status} />
                      <Typography
                        component={"div"}
                        sx={{ fontSize: 9, fontWeight: "bold" }}
                      >
                        {element?.user_manager
                          ? element.user_manager?.first_name +
                            " " +
                            element.user_manager?.last_name
                          : null}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <StatusIcon status={element.financial_status} />
                      <Typography
                        component={"div"}
                        sx={{ fontSize: 9, fontWeight: "bold" }}
                      >
                        {element.user_financial
                          ? element.user_financial?.first_name +
                            " " +
                            element.user_financial?.last_name
                          : null}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      {" "}
                      {element.user_creator?.first_name +
                        " " +
                        element.user_creator?.last_name}
                    </TableCell>
                    <TableCell align="left">
                      {moment(element.created_at).format("jYYYY/jMM/jDD")}
                    </TableCell>
                  </TableRow>
                );
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={5} sx={{ my: 2 }}>
        <Pagination
          count={pageInfo.lastPage}
          page={pageInfo.currentPage}
          onChange={handleChangePage}
        />
      </Stack>
    </Paper>
  );
};

export default FinancialReport;
