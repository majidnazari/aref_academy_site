import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import moment from "moment-jalaali";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Edit from "components/EditCourseStudentStatus";
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
import CourseName from "components/CourseName";
import StatusIcon from "components/StatusIcon";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { showError } from "utils/swlAlert";
import SumPresents from "components/SumPresents";

interface Data {
  student: string;
  course: string;
  total_present: string;
  student_status: string;
  manager_status: string;
  financial_status: string;
  user_creator: string;
  created_at: string;
  edit?: string;
}

interface EditStudentCourse {
  openDialog: boolean;
  studentCourse: StudentCoursesType;
  key: number;
  id: number;
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
    id: "total_present",
    sortable: false,
    disablePadding: false,
    label: "تعداد حضور",
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
  {
    id: "edit",
    sortable: false,
    disablePadding: false,
    label: "ویرایش",
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
        نوتیفیکیشن ها
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

  const { fetchMore, refetch, error } = useQuery(GET_COURSES_STUDENTS, {
    variables: {
      first: process.env.REACT_APP_USERS_PER_PAGE
        ? parseInt(process.env.REACT_APP_USERS_PER_PAGE)
        : 10,
      page: 1,
      ...generateQueryOptions(),
      orderBy: [
        {
          column: "created_at",
          order: "DESC",
        },
      ],
    },
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      setCourseStudents(data.getCourseStudents.data);
      setPageInfo(data.getCourseStudents.paginatorInfo);
    },
  });

  const [editStudentCourse, setEditStudentCourse] = useState<EditStudentCourse>(
    {
      openDialog: false,
      studentCourse: {} as StudentCoursesType,
      key: 0,
      id: 0,
    }
  );

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

  const reloadData = (field: string, order: string) => {
    refetch({
      first: process.env.REACT_APP_USERS_PER_PAGE
        ? parseInt(process.env.REACT_APP_USERS_PER_PAGE)
        : 10,
      page: 1,
      ...generateQueryOptions(),
      orderBy: [
        {
          column: field,
          order: order,
        },
      ],
    });
  };

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
                          <SumPresents element={element} />
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
                      <TableCell align="left">
                        <Button
                          size="small"
                          onClick={() => {
                            setEditStudentCourse({
                              openDialog: true,
                              studentCourse: element,
                              key: editStudentCourse.key + 1,
                              id: element.id,
                            });
                          }}
                          variant="contained"
                          startIcon={<EditIcon />}
                          color="success"
                        >
                          ویرایش
                        </Button>
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
      <Edit
        openDialog={editStudentCourse.openDialog}
        studentCourse={editStudentCourse.studentCourse}
        key={editStudentCourse.key}
        refresh={refetch}
      />
    </Box>
  );
}
