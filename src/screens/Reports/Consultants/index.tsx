import React, { useEffect, useState } from "react";
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
import ClassIcon from "@mui/icons-material/Class";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import { useQuery } from "@apollo/client";
import PaginatorInfo from "interfaces/paginator-info.interface";
import { NavLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { GET_CONSULTANTS, GET_CONSULTANT_REPORT } from "./gql/query";
import CourseName, { getCourseName } from "components/CourseName";
import { Autocomplete, CircularProgress, Grid, TextField } from "@mui/material";
import moment from "moment-jalaali";
import StatusIcon from "components/StatusIcon";
import { TotalReportDtos } from "./dto/TotalReport.dto";
import ConsultantTotalReportSummary from "./components/ConsultantTotalReportSummary";
import FinancialRefusedStatus from "components/FinancialRefusedStatus";
import { SearchData } from "./dto/Search.dto";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AdapterJalali from "@date-io/date-fns-jalali";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

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
const ConsultantReport = () => {
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
  const [consultantOptions, setConsultantOptions] = useState<any[]>([
    { label: "", id: "" },
  ]);

  const [refetchLoading, setRefetchLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<SearchData>({
    consultant_id: undefined,
    session_date_from: undefined, //  moment().subtract(30,'days').format("YYYY-MM-DD"),
    session_date_to: undefined, //  moment().format("YYYY-MM-DD"),
  });
  const [report, setReport] = useState<TotalReportDtos[]>([]);
  const [totalReport, setTotalReport] = useState<TotalReportDtos[]>([]);

  const {
    fetchMore,
    refetch,
    data: consultantData,
  } = useQuery(GET_CONSULTANT_REPORT, {
    variables: {
      consultant_id: -1,
      // first: 1000,
      // page: 1,
      // orderBy: [
      //   {
      //     column: "id",
      //     order: "DESC",
      //   },
      // ],
      fetchPolicy: "no-cache",
      skip: true,
    },
    onCompleted(data) {
      //console.log(data);
      setTotalReport(data.getConsultantDefinitionDetailsGenerealReport);
    },
  });

  const consultants = useQuery(GET_CONSULTANTS, {
    variables: {
      first: 100,
      page: 1,
      orderBy: [
        {
          column: "id",
          order: "DESC",
        },
      ],
      fetchPolicy: "no-cache",
    },
    onCompleted(data) {
      // console.log("consultant are: ", data);
      if (data?.getConsultants?.data) {
        const tmp = [{ label: "", id: 0 }];
        setConsultantOptions(tmp);
        for (const i in data.getConsultants.data) {
          const consultant = data.getConsultants.data[i];
          tmp.push({
            id: +consultant.id,
            label: consultant.first_name + " " + consultant.last_name,
          });
        }
      }
    },
  });

  const handleSearch = (): void => {
    setRefetchLoading(true);
    let refetchData: SearchData = { ...search };
    refetch(refetchData as any)
      .then((res) => {
        setTotalReport(res.data.getConsultantDefinitionDetailsGenerealReport);
        // setReport(res.data.getCourseStudents.data);
        // setPageInfo(res.data.getCourseStudents.paginatorInfo);
        setRefetchLoading(false);
      })
      .catch((err) => {
        setRefetchLoading(false);
      });

    // refetchTotalReport(refetchData).then((res) => {
    //   setTotalReport(res.data.getConsultantDefinitionDetailsGenerealReport);
    // });
  };

  // const handleChange = (
  //   event: React.ChangeEvent<unknown>,
  //   value: number
  // ): void => {
  //   fetchMore({
  //     variables: {
  //       first: process.env.REACT_APP_USERS_PER_PAGE
  //         ? parseInt(process.env.REACT_APP_USERS_PER_PAGE)
  //         : 10,
  //       page: value,
  //       orderBy: [
  //         {
  //           column: "id",
  //           order: "DESC",
  //         },
  //       ],
  //     },
  //     updateQuery: (prev, { fetchMoreResult }) => {
  //       setReport(fetchMoreResult.getCourseStudents.data);
  //       setPageInfo(fetchMoreResult.getCourseStudents.paginatorInfo);
  //     },
  //   });
  // };

  if (!consultantOptions) {
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
        گزارش مشاوران
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          padding: 2,
        }}
        component={Paper}
      >
        {consultantOptions && consultantOptions?.length ? (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3} xl={3}>
              <Autocomplete
                onChange={(event: any, newValue: any) => {
                  setSearch({ ...search, consultant_id: newValue?.id });
                }}
                disablePortal
                id="combo-box-demo"
                options={consultantOptions}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField {...params} label="انتخاب مشاور" />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3} xl={3}>
              <LocalizationProvider dateAdapter={AdapterJalali}>
                <DatePicker
                  label="از تاریخ"
                  value={search.session_date_from || null}
                  onChange={(newValue) => {
                    if (newValue) {
                      setSearch({
                        ...search,
                        session_date_from: newValue as string,
                      });
                    }
                  }}
                  renderInput={(params) => (
                    <TextField {...params} style={{ width: "100%" }} />
                  )}
                  mask="____/__/__"
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={6} md={3} xl={3}>
              <LocalizationProvider dateAdapter={AdapterJalali}>
                <DatePicker
                  label="تا تاریخ"
                  value={search.session_date_to || null}
                  onChange={(newValue) => {
                    if (newValue) {
                      setSearch({
                        ...search,
                        session_date_to: newValue as string,
                      });
                    }
                  }}
                  renderInput={(params) => (
                    <TextField {...params} style={{ width: "100%" }} />
                  )}
                  mask="____/__/__"
                />
              </LocalizationProvider>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              xl={3}
              sx={{
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
                sx={{ mx: 2 }}
                startIcon={<SearchIcon />}
                disabled={refetchLoading}
              >
                جستجو
                {refetchLoading && (
                  <CircularProgress
                    size={15}
                    style={{ marginRight: 10, color: "#fff" }}
                  />
                )}
              </Button>
            </Grid>
          </Grid>
        ) : null}
      </Box>

      {totalReport?.length
        ? totalReport.map((element: TotalReportDtos, index: number) => (
            <ConsultantTotalReportSummary totalReport={totalReport[index]} />
          ))
        : null}

      {/* <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">ردیف</StyledTableCell>
              <StyledTableCell align="left">
                {" "}
                نام و نام خانوادگی
              </StyledTableCell>
              <StyledTableCell align="left">تلفن</StyledTableCell>
              <StyledTableCell align="left">وضعیت</StyledTableCell>
              <StyledTableCell align="left">تایید مدیر</StyledTableCell>
              <StyledTableCell align="left">تایید حسابداری</StyledTableCell>
              <StyledTableCell align="left">پس از انصراف</StyledTableCell>
              <StyledTableCell align="left">ثبت کننده</StyledTableCell>
              <StyledTableCell align="left">تاریخ درج</StyledTableCell>
              <StyledTableCell align="left"> کلاسهای دانش آموز</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {report.length > 0 &&
              report.map((element: ReportData, index: number) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="left">
                    {pageInfo.perPage * (pageInfo.currentPage - 1) + index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {element?.student?.first_name} {element?.student?.last_name}
                    <Box sx={{ fontSize: 10, pt: 1 }}>
                      {element.description !== ""
                        ? "توضیحات:" + element.description
                        : null}

                      {element.transferred_course ? (
                        <div>
                          {" جابجایی:"}
                          <CourseName course={element.transferred_course} />
                        </div>
                      ) : null}
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {element?.student?.phone}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <StatusIcon status={element?.student_status} />
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
                  </StyledTableCell>

                  <StyledTableCell align="left">
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
                  </StyledTableCell>
                  <StyledTableCell align="left">
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
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <FinancialRefusedStatus
                      financial_refused_status={
                        element.financial_refused_status
                      }
                    />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {element.user_creator.first_name}{" "}
                    {element.user_creator.last_name}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {moment(element.created_at).format("jYYYY/jMM/jDD")}
                  </StyledTableCell>

                  <StyledTableCell align="left">
                    <Button
                      size="small"
                      // onClick={() => navigate(`/students/${element.student.id}/courses`)}
                      variant="contained"
                      startIcon={<ClassIcon />}
                      color="primary"
                    >
                      <NavLink
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                        }}
                        to={`/students/${element?.student?.id}/courses`}
                        target="_blank"
                      >
                        کلاسهای دانش آموز
                      </NavLink>
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
      </TableContainer> */}
    </Container>
  );
};

export default ConsultantReport;
