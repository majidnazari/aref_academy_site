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
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import { GET_COURSES } from "./gql/query";
import { DELETE_COURSE } from "./gql/mutation";
import { useMutation, useQuery } from "@apollo/client";
import PaginatorInfo from "../../interfaces/paginator-info.interface";
import { useNavigate } from "react-router-dom";
import { showSuccess, showConfirm } from "../../utils/swlAlert";
import { typesObject, educationLevelsObject } from "../../constants";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import CheckIcon from "@mui/icons-material/Check";
import Typography from "@mui/material/Typography";
import SearchCourse from "../../components/SearchCourse";

interface CourseData {
  id: number;
  name: string;
  user: {
    first_name: string;
    last_name: string;
  };
  year: {
    name: string;
  };
  teacher: {
    first_name: string;
    last_name: string;
  };
  lesson: {
    id: number;
    name: string;
  };
  type: string;
  education_level: string;
  financial_status: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  branch: {
    name: string;
  };
  gender: string;
}

class GetCourseVariabls {
  first?: number;
  page?: number;
  orderBy?: { column: string; order: string }[];
  name?: string | undefined;
  lesson_id?: number | undefined;
  gender?: string | undefined;
}
class SearchData {
  name?: string | undefined;
  lesson_id?: number | undefined;
  gender?: string | undefined;
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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const CoursesScreen = () => {
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
  const [courses, setCourses] = useState<CourseData[] | null>(null);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<SearchData>({
    name: undefined,
    lesson_id: undefined,
    gender: undefined,
  });

  const { fetchMore, refetch } = useQuery<any, GetCourseVariabls>(GET_COURSES, {
    variables: {
      first: process.env.REACT_APP_USERS_PER_PAGE
        ? parseInt(process.env.REACT_APP_USERS_PER_PAGE)
        : 10,
      page: 1,
      orderBy: [
        {
          column: "id",
          order: "DESC",
        },
      ],
      name: undefined,
      lesson_id: undefined,
      gender: undefined,
    },
    onCompleted: (data) => {
      setPageInfo(data.getCourses.paginatorInfo);
      setCourses(data.getCourses.data);
    },
    fetchPolicy: "network-only",
  });

  const [delCourse] = useMutation(DELETE_COURSE);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCourses([]);
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
        name: search.name,
        lesson_id: search?.lesson_id ? +search.lesson_id : undefined,
        gender: search.gender,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        setPageInfo(fetchMoreResult.getCourses.paginatorInfo);
        setCourses(fetchMoreResult.getCourses.data);
      },
    });
  };

  function deleteCourse(id: number) {
    showConfirm(() => {
      delCourse({
        variables: {
          id: id,
        },
      }).then(() => {
        refetch();
        showSuccess("حذف با موفقیت انجام شد.");
      });
    });
  }

  const searchMaper = (input: SearchData): Partial<GetCourseVariabls> => {
    return {
      name: input.name,
      lesson_id: input?.lesson_id ? +input.lesson_id : undefined,
      gender: input?.gender && input?.gender !== "" ? input?.gender : undefined,
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

  if (!courses) {
    return (
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Skeleton width="100%" height={100} />
        <Skeleton variant="rectangular" width="100%" height={300} />
      </Container>
    );
  }
  //

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          component={"div"}
          sx={{ fontSize: 18, fontWeight: "bold", my: 2 }}
        >
          مدیریت کلاس‌ها
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          sx={{ mb: 4 }}
          onClick={() => navigate("/courses/create")}
        >
          افزودن کلاس جدید
        </Button>
      </Box>
      <SearchCourse callBack={handleSearch} loading={searchLoading} />
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">ردیف</StyledTableCell>
              <StyledTableCell align="left"> کد</StyledTableCell>
              <StyledTableCell align="left">سال</StyledTableCell>
              <StyledTableCell align="left">دبیر</StyledTableCell>
              <StyledTableCell align="left">کاربر ثبت کننده</StyledTableCell>
              <StyledTableCell align="left">درس پایه</StyledTableCell>
              <StyledTableCell align="left">نوع</StyledTableCell>
              <StyledTableCell align="left">مقطع</StyledTableCell>
              <StyledTableCell align="left">جنسیت</StyledTableCell>
              <StyledTableCell align="left">شعبه</StyledTableCell>
              <StyledTableCell align="left">تایید حسابداری</StyledTableCell>
              <StyledTableCell align="left">جلسات</StyledTableCell>
              <StyledTableCell align="left">ویرایش</StyledTableCell>
              <StyledTableCell align="left">حذف</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((element: CourseData, index: number) => (
              <StyledTableRow key={element.id}>
                <StyledTableCell align="left">
                  {pageInfo.perPage * (pageInfo.currentPage - 1) + index + 1}
                </StyledTableCell>
                <StyledTableCell align="left">{element.name}</StyledTableCell>
                <StyledTableCell align="left">
                  {element.year.name}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {element.teacher.first_name} {element.teacher.last_name}
                </StyledTableCell>

                <StyledTableCell align="left">
                  {element.user.first_name} {element.user.last_name}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {element.lesson?.name}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {typesObject[element.type]}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {educationLevelsObject[element.education_level]}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {element.gender === "male" ? "پسرانه" : "دخترانه"}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {element.branch?.name}
                </StyledTableCell>

                <StyledTableCell align="center">
                  {element.financial_status === "approved" ? (
                    <CheckIcon color="success" />
                  ) : (
                    <ReportProblemIcon color="disabled" />
                  )}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Button
                    size="small"
                    onClick={() => {
                      navigate(`/courses/${element.id}/sessions`);
                    }}
                    variant="contained"
                    // startIcon={<EditIcon />}
                    color="primary"
                  >
                    جلسات
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Button
                    size="small"
                    onClick={() => {
                      navigate(`/courses/edit/${element.id}`);
                    }}
                    variant="contained"
                    startIcon={<EditIcon />}
                    color="success"
                  >
                    ویرایش
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Button
                    size="small"
                    onClick={() => deleteCourse(element.id)}
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
    </Container>
  );
};

export default CoursesScreen;
