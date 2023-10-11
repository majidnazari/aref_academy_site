import { useState } from "react";
import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { dayOfWeeksObject } from "../../../constants/index";
import AdapterJalali from "@date-io/date-fns-jalali";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { Button, Container, TableContainer } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment";
import { styled } from "@mui/material/styles";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { useMutation, useQuery } from "@apollo/client";
import FormHelperText from "@mui/material/FormHelperText";
import { showSuccess } from "utils/swlAlert";
import { GET_BRANCH_CLASSROOMS, GET_CONSULTANT_SHOW_TIMES } from "../gql/query";
import { CREATE_CONSULTANT_DEFINITION_DETAIL } from "../gql/mutation";
import { useParams } from "react-router-dom";
import StudentData from "utils/student";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ComponentStudentDialog from "./ComponentStudentDialog";
import { Link, useNavigate } from "react-router-dom";
import moment_jalali from "moment-jalaali";
import "../../../../src/assets/stringDate.css";
import { DatePicker } from "@mui/x-date-pickers";
import { SearchAllConsultantProps } from "../dto/search-consultant-showalltime";
import SearchAllConsultantTimes from "./SearchAllConsultantTimes";
import StudentStatusComponent from "./StudentStatusDialog";

import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import HourglassDisabledIcon from "@mui/icons-material/HourglassDisabled";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const daysOfWeek = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه شنبه",
  "چهارشنبه",
  "پنج شنبه",
  "جمعه",
];

const consultantBox = {
  backgroundColor: "#DDDBDA",
  color: "black",
  borderRadius: "5px",
  boxShadow: 3,
  display: "inline-block",
  ustifyContent: "flex-end",
  alignItems: "flex-end",
  p: 2,
  width: 160,
  m: 1,
  direction: "rtl",
  whiteSpace: "pre-wrap",
};

interface ErrorData {
  days?: string;
  startTime?: string;
  endTime?: string;
  branch_classroom_id?: string;
}

interface ConsultantData {
  first_name?: string;
  last_name?: string;
}

interface getConsultantsTimeShowData {
  consultant?: ConsultantData;
  details?: detailsData[];
}

interface detailsData {
  consultant_id: number;
  id: string;
  consultant_first_name: string;
  student_id: string;
  student: StudentData;
  branch_class_room_id: number;
  start_hour: string;
  end_hour: string;
  session_date: string;
  branchClassRoom_name: string;
  student_status: string;
}
class SearchData {
  consultant_id?: number;
  target_date?: string;
}

const ShowAllConsultantsTimes = () => {
  const params = useParams<string>();
  const consultantId = params.consultantId;

  const [studentId, setStudentId] = useState<number>();
  const [timeTable, setTimeTable] = useState<getConsultantsTimeShowData[]>([]);
  const [dialogconsultantTimeTableId, setDialogConsultantTimeTableId] =
    useState<string>();
  const [dialogrefreshData, setDialogRefreshData] = useState<boolean>(false);
  const [studentDialogOpen, setStudentDialogOpen] = useState<boolean>(false);
  const [studentStatusDialogOpen, setStudentStatusDialogOpen] =
    useState<boolean>(false);

  const consultantNotFilledStudentBox = {
    backgroundColor: "#adadad",
    width: 160,
    color: "black",
    borderRadius: "5px",
    boxShadow: 3,
    minHeight: "200px",
    mx: 1,
    p: 1,
  };
  const consultantFilledStudentBox = {
    backgroundColor: "#00BFFF",
    width: 160,
    color: "black",
    borderRadius: "5px",
    boxShadow: 3,
    minHeight: "200px",
    mx: 1,
    p: 1,
  };

  const current_date = moment().format("YYYY-MM-DD");
  const next_date = moment().add(7, "days").format("YYYY-MM-DD");

  const { fetchMore, refetch } = useQuery(GET_CONSULTANT_SHOW_TIMES, {
    variables: {
      consultant_id: Number(consultantId),
      target_date: moment().format("YYYY-MM-DD"),
    },
    onCompleted: (data) => {
      setTimeTable(data.getConsultantsTimeShow);
    },
    fetchPolicy: "no-cache",
  });

  const [nextWeekFlag, setNextWeekFlag] = useState<Boolean>(true);

  const nextWeek = () => {
    setTimeTable([]);
    fetchMore({
      variables: {
        next_week: true,
        consultant_id: Number(consultantId),
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        setTimeTable(fetchMoreResult.getConsultantDefinitionDetails);
        //setToday(fetchMoreResult.getCourseSessionOrderbyDate.today);
        setNextWeekFlag(false);
      },
    });
  };

  const previousWeek = () => {
    setTimeTable([]);
    fetchMore({
      variables: {
        next_week: false,
        consultant_id: Number(consultantId),
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        setTimeTable(fetchMoreResult.getConsultantDefinitionDetails);
        // setToday(fetchMoreResult.getCourseSessionOrderbyDate.today);
        setNextWeekFlag(true);
      },
    });
  };

  const refreshStudent = () => {
    refetch();
  };

  const [searchData, setSearchData] = useState<SearchAllConsultantProps>({});
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<SearchData>({
    consultant_id: undefined,
    target_date: current_date,
  });  

  const closeDialog = () => {
    setStudentDialogOpen(false);
  };
  const closeStudentStatusDialog = () => {
    setStudentStatusDialogOpen(false);
  };  

  const refreshConsultantDefinition = () => {
    refetch();
  };

  const searchMaper = (input: SearchData) => {
    return {
      consultant_id: input?.consultant_id
        ? Number(input.consultant_id)
        : undefined,
      target_date: input?.target_date
        ? moment(input.target_date).format("YYYY-MM-DD")
        : current_date,
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

  const handleAddStudent = (defenitionId: string) => {
    setDialogConsultantTimeTableId(defenitionId);
    setStudentDialogOpen(true);
  };
  
  const handleAddStudentStatus = (defenitionId: string) => {
    //alert(defenitionId);
    setDialogConsultantTimeTableId(defenitionId);
    setStudentStatusDialogOpen(true);
  };

  const convertStudentStatus = (studentStatus: string) => {
    switch (studentStatus) {
      case "no_action":
        return (
          <HourglassDisabledIcon
            sx={{
              color: "black",
              fontSize: 13,
              fontWeight: 800,
              textAlign: "right",
            }}
          />
        );
      case "present":
        return (
          <CoPresentIcon
            sx={{
              color: "black",
              fontSize: 13,
              fontWeight: 800,
              textAlign: "right",
            }}
          />
        );
      case "absent":
        return (
          <CancelPresentationIcon
            sx={{
              color: "black",
              fontSize: 13,
              fontWeight: 800,
              textAlign: "right",
            }}
          />
        );
    }
  };

  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
      <SearchAllConsultantTimes callBack={handleSearch} />

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        {studentDialogOpen && (
          <ComponentStudentDialog
            consultantTimeTableId={dialogconsultantTimeTableId}
            refreshData={refreshConsultantDefinition}
            openDialog={studentDialogOpen}            
            closeDialog={closeDialog}
          />
        )}

        {studentStatusDialogOpen && (
          <StudentStatusComponent
            consultantTimeTableId={dialogconsultantTimeTableId}
            refreshData={refreshConsultantDefinition}
            openStudentStatusDialog={studentStatusDialogOpen}
            closeStudentStatusDialog={closeStudentStatusDialog}
          />
        )}

        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
            <TableRow >
                <StyledTableCell
                  align="center"
                  width="50"
                  sx={{
                    fontSize: 25,
                    fontWeight: 800,
                    textAlign: "center",
                  }}
                >
                  {" "}
                  مشاوران{" "}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  sx={{
                    fontSize: 25,
                    fontWeight: 800,
                    textAlign: "center",
                  }}
                >
                  {" "}
                  برنامه روزانه مشاور
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {timeTable.map(
                (element: getConsultantsTimeShowData, index: number) => (
                  <TableRow key={index}>
                    <StyledTableCell align="center">
                      <a href="#" id="dateOfWeekString">
                        <span> </span>
                        {element.consultant?.first_name}
                        {"    "}
                        {element.consultant?.last_name} {"    "}
                        <span></span>
                        <span></span>
                        <span></span>
                      </a>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <Box sx={{ display: "flex", flexDirection: "row" }}>
                        {element.details?.map(
                          (detail: detailsData, detailIndex: number) => (
                            <Box key={detailIndex}>
                              <Box
                                sx={{
                                  border: 1,
                                  borderColor: "#0288d1",
                                  fontSize: 18,
                                  fontWeight: 800,
                                  textAlign: "center",
                                  backgroundColor: "white",
                                  color: "#0288d1",
                                  borderRadius: "5px",
                                  boxShadow: 3,
                                  display: "inline-block",
                                  ustifyContent: "flex-end",
                                  alignItems: "flex-end",
                                  p: 2,
                                  width: 160,
                                  m: 1,
                                  direction: "rtl",
                                  whiteSpace: "pre-wrap",
                                }}
                              >
                                {detail.end_hour}-{detail.start_hour}
                              </Box>
                              <Box
                                sx={
                                  detail?.student
                                    ? consultantFilledStudentBox
                                    : consultantNotFilledStudentBox
                                }                               
                              >
                                 <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                              >
                               
                                <Button
                                  startIcon={
                                    <PersonAddAlt1Icon
                                      sx={{ textAlign: "right" }}
                                    />
                                  }
                                  sx={{
                                    color: "black",
                                    fontSize: 13,
                                    fontWeight: 800,
                                    textAlign: "right",
                                  }}
                                  onClick={() => handleAddStudent(detail.id)}
                                >
                                  {" "}
                                </Button>
                               
                                {detail?.student_id ? (
                                  <Button
                                    startIcon={
                                      <ManageAccountsIcon
                                        sx={{ textAlign: "left" }}
                                      />
                                    }
                                    sx={{
                                      color: "black",
                                      fontSize: 13,
                                      fontWeight: 800,
                                      textAlign: "left",
                                    }}
                                    onClick={() =>
                                      handleAddStudentStatus(detail.id)
                                    }
                                  >
                                    {" "}
                                  </Button>
                                ) : null}
                              </Box>
                               
                                {detail?.student ? (
                                  <Box>
                                    <Box>
                                      کلاس : {detail.branchClassRoom_name}
                                    </Box>
                                    <Box>
                                      دانش آموز : {detail?.student?.first_name}{" "}
                                      {detail?.student?.last_name}
                                    </Box>
                                    <Box>
                                      ثبت نامی :{" "}
                                      {detail?.student?.is_academy_student === 1
                                        ? " آکادمی"
                                        : "جذب"}{" "}
                                    </Box>
                                    <Box>
                                      کد ملی :
                                      {detail?.student?.nationality_code}
                                    </Box>

                                    <Box>
                                    {convertStudentStatus(
                                      detail?.student_status
                                    )}
                                  </Box>

                                  </Box>
                                ) : null}
                              </Box>
                            </Box>
                          )
                        )}
                      </Box>
                    </StyledTableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              m: 1,
            }}
          >
            {/* <Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={previousWeek}
              startIcon={<ArrowForwardIcon />}
              disabled={nextWeekFlag ? true : false}
            >
              قبل
            </Button>
            <Button
              size="small"
              endIcon={<ArrowBackIcon />}
              onClick={nextWeek}
              variant="outlined"
              color="primary"
              disabled={nextWeekFlag ? false : true}
            >
              بعد
            </Button> */}
          </Box>
        </TableContainer>
      </Container>
    </Paper>
  );
};
export default ShowAllConsultantsTimes;
