import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { useQuery } from "@apollo/client";
import { GET_COURSES_STUDENTS } from "./gql/query";
import { generateQueryOptions } from "utils/utils";
import { useEffect, useState } from "react";
import StudentCoursesType from "interfaces/studentCourses.interface";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import PaginatorInfo from "interfaces/paginator-info.interface";
interface Data {
  student: string;
  course: string;
  student_status: string;
  manager_status: string;
  financial_status: string;
  user_creator: string;
  created_at: string;
  //   edit?: string;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "student",
    numeric: false,
    disablePadding: true,
    label: "دانش آموز",
  },
  {
    id: "course",
    numeric: true,
    disablePadding: false,
    label: "درس",
  },
  {
    id: "student_status",
    numeric: true,
    disablePadding: false,
    label: "وضعیت دانش آموز",
  },
  {
    id: "manager_status",
    numeric: true,
    disablePadding: false,
    label: "تایید مدیر",
  },
  {
    id: "financial_status",
    numeric: true,
    disablePadding: false,
    label: "تایید مالی",
  },
  {
    id: "user_creator",
    numeric: true,
    disablePadding: false,
    label: "ثبت کننده",
  },
  {
    id: "created_at",
    numeric: true,
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
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const EnhancedTableToolbar = () => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Nutrition
      </Typography>

      <Tooltip title="Filter list">
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

export default function StudentCoursesAlarms() {
  const [order, setOrder] = useState<Order>("desc");
  const [orderBy, setOrderBy] = useState<keyof Data>("created_at");
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
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
  const [courseStudents, setCourseStudents] = useState<Data[]>([]);

  const { fetchMore, loading, refetch } = useQuery(GET_COURSES_STUDENTS, {
    variables: {
      first: process.env.REACT_APP_USERS_PER_PAGE
        ? parseInt(process.env.REACT_APP_USERS_PER_PAGE)
        : 10,
      page: 1,
      ...generateQueryOptions(),
      orderBy: [
        {
          column: orderBy,
          order: order.toUpperCase(),
        },
      ],
    },
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      console.log("onCompleted");
      setCourseStudents(courseStudentMaper(data.getCourseStudents.data));
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
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ): void => {
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
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        setCourseStudents(
          courseStudentMaper(fetchMoreResult.getCourseStudents.data)
        );
        setPageInfo(fetchMoreResult.getCourseStudents.paginatorInfo);
      },
    });
  };

  //   const handleChangeRowsPerPage = (
  //     event: React.ChangeEvent<HTMLInputElement>
  //   ) => {
  //     setRowsPerPage(parseInt(event.target.value, 10));
  //     setPage(0);
  //   };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const courseStudentMaper = (input: StudentCoursesType[]): Data[] => {
    // let mapedArray: Data[] = [];
    const mapedArray: Data[] = input.map((element) => {
      const tmp: Data = {
        student:
          element?.student?.first_name + " " + element?.student?.last_name,
        course: element.course.name,
        student_status: element.student_status,
        manager_status: element.manager_status,
        financial_status: element.financial_status,
        user_creator:
          element.user_creator?.first_name +
          " " +
          element.user_creator?.last_name,
        created_at: element.created_at,
      };
      return tmp;
    });
    return mapedArray;
  };

  useEffect(() => {
    console.log("useEffect");
    refetch({
      first: process.env.REACT_APP_USERS_PER_PAGE
        ? parseInt(process.env.REACT_APP_USERS_PER_PAGE)
        : 10,
      page: 1,
      ...generateQueryOptions(),
      orderBy: [
        {
          column: orderBy,
          order: order.toUpperCase(),
        },
      ],
    }).then(() => {
      console.log("test231312");
    });
  }, [order, orderBy]);

  // Avoid a layout jump when reaching the last page with empty rows.
  //   const emptyRows =
  //     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
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
                      <TableCell padding="checkbox">{index + 1}</TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {element.student}
                      </TableCell>
                      <TableCell align="left">{element.course}</TableCell>
                      <TableCell align="left">
                        {element.student_status}
                      </TableCell>
                      <TableCell align="left">
                        {element.manager_status}
                      </TableCell>
                      <TableCell align="left">
                        {element.financial_status}
                      </TableCell>
                      <TableCell align="left">{element.user_creator}</TableCell>
                      <TableCell align="left">{element.created_at}</TableCell>
                    </TableRow>
                  );
                })
              }
              {/* {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
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
        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
