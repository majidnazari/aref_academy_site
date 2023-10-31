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
import { showConfirm, showSuccess } from "utils/swlAlert";
import {
  GET_BRANCH_CLASSROOMS,
  GET_CONSULTANT_SHOW_TIMES,
  GetConsultantStudentsByDefinitionId,
} from "../gql/query";
import {
  COPY_STUDENT_TO_NEXT_WEEK,
  CREATE_CONSULTANT_DEFINITION_DETAIL,
  DELETE_CONSULTANTN_DEFINITION_STUDENT_ID,
  DELETE_ONE_SESSION_OF_TIME_TABLE,
  UPDATE_CONSULTANT_DEFINITION_DETAIL_STUDENT_ID,
} from "../gql/mutation";
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
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";


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
  id: number;
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

const convertStudentStatusTheme = (student_status: string) => {
  switch (student_status) {
    case "present":
      return consultantPresentStudentBox;
    case "absent":
      return consultantAbsentStudentBox;
    case "dellay":
      return consultantDellayStudentBox;
    default:
      return consultantNotFilledStudentBox;
  }
};

const consultantNotFilledStudentBox = {
  backgroundColor: "#ebebeb",
  width: 160,
  color: "black",
  borderRadius: "5px",
  boxShadow: 3,
  cursor: "pointer",
  minHeight: "240px",
  mx: 1,
  p: 1,
};
const consultantFilledStudentBox = {
  backgroundColor: "#1bebeb",
  width: 160,
  color: "black",
  borderRadius: "5px",
  boxShadow: 3,
  cursor: "pointer",
  minHeight: "240px",
  mx: 1,
  p: 1,
};
const consultantPresentStudentBox = {
  backgroundColor: "#ace1a3",
  width: 160,
  color: "black",
  borderRadius: "5px",
  boxShadow: 3,
  cursor: "pointer",
  minHeight: "240px",
  mx: 1,
  p: 1,
};

const consultantAbsentStudentBox = {
  backgroundColor: "#efaf77",
  width: 160,
  color: "black",
  borderRadius: "5px",
  boxShadow: 3,
  cursor: "pointer",
  minHeight: "240px",
  mx: 1,
  p: 1,
};

const consultantDellayStudentBox = {
  backgroundColor: "#f1f16f",
  width: 160,
  color: "black",
  borderRadius: "5px",
  boxShadow: 3,
  cursor: "pointer",
  minHeight: "240px",
  mx: 1,
  p: 1,
};

const ShowAllConsultantsTimes = () => {
  const params = useParams<string>();
  const consultantId = params.consultantId;

  const [studentId, setStudentId] = useState<number>();
  const [studentIds, setStudentIds] = useState<number[]>();
  const [timeTable, setTimeTable] = useState<getConsultantsTimeShowData[]>([]);
  const [dialogconsultantTimeTableId, setDialogConsultantTimeTableId] =
    useState<string>();
  const [dialogrefreshData, setDialogRefreshData] = useState<boolean>(false);
  const [studentDialogOpen, setStudentDialogOpen] = useState<boolean>(false);
  const [studentStatusDialogOpen, setStudentStatusDialogOpen] =
    useState<boolean>(false);

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

  const { refetch: refetchConsultantStudentsByDefinitionId, data: students } =
    useQuery(GetConsultantStudentsByDefinitionId, {
      variables: {
        id: -1,
      },
      onCompleted: (data) => {
        setStudentIds(data.GetConsultantStudentsByDefinitionId);
      },
      fetchPolicy: "no-cache",
      skip: true,
    });
    const navigate = useNavigate();


  const [nextWeekFlag, setNextWeekFlag] = useState<Boolean>(true);

  // const nextWeek = () => {
  //   setTimeTable([]);
  //   fetchMore({
  //     variables: {
  //       next_week: true,
  //       consultant_id: Number(consultantId),
  //     },
  //     updateQuery: (prev, { fetchMoreResult }) => {
  //       setTimeTable(fetchMoreResult.getConsultantDefinitionDetails);
  //       //setToday(fetchMoreResult.getCourseSessionOrderbyDate.today);
  //       setNextWeekFlag(false);
  //     },
  //   });
  // };

  // const previousWeek = () => {
  //   setTimeTable([]);
  //   fetchMore({
  //     variables: {
  //       next_week: false,
  //       consultant_id: Number(consultantId),
  //     },
  //     updateQuery: (prev, { fetchMoreResult }) => {
  //       setTimeTable(fetchMoreResult.getConsultantDefinitionDetails);
  //       // setToday(fetchMoreResult.getCourseSessionOrderbyDate.today);
  //       setNextWeekFlag(true);
  //     },
  //   });
  // };

  // const refreshStudent = () => {
  //   refetch();
  // };

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
  const [deleteConsultantTimeTableStudentId] = useMutation(
    DELETE_CONSULTANTN_DEFINITION_STUDENT_ID
  );

  const [deleteOneSessionTimeTable] = useMutation(
    DELETE_ONE_SESSION_OF_TIME_TABLE
  );

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

  const [copyStudentToNextWeek] = useMutation(COPY_STUDENT_TO_NEXT_WEEK);

  const handleSearch = (searchData: SearchData): void => {
    setSearchLoading(true);
    setSearch({ ...searchData });
    const refetchData: SearchData = { ...searchData };

    refetch(searchMaper(refetchData)).then(() => {
      setSearchLoading(false);
    });
  };

  const handleAddStudent = (defenitionId: string) => {
   
    refetchConsultantStudentsByDefinitionId({
      id: +defenitionId,
    }).then((res) => {
      //console.log("res is " ,res);
    });
    
    setDialogConsultantTimeTableId(defenitionId);
    setStudentDialogOpen(true);
  };

  const handleAddStudentStatus = (defenitionId: string) => {
    
    setDialogConsultantTimeTableId(defenitionId);
    setStudentStatusDialogOpen(true);
  };

  const [ConsultantTimeTableStudentStatus] = useMutation(
    UPDATE_CONSULTANT_DEFINITION_DETAIL_STUDENT_ID
  );

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

  

  const consultantRedirect = (consultant_id: number | undefined) => {
  
    navigate('/consultant/' + consultant_id + "/select-one");
  };
  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
      <SearchAllConsultantTimes callBack={handleSearch} />

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        {studentDialogOpen && (
          <ComponentStudentDialog
            studentIdsOfOneConsultant={studentIds}
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
              <TableRow>
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
                      <a
                        href="#"
                        id="dateOfWeekString"
                        onClick={() =>
                          consultantRedirect(element.consultant?.id)
                        }
                      >
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
                          (detail: detailsData, index_details: number) => (
                            <Box key={index_details}>
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
                                sx={convertStudentStatusTheme(
                                  detail?.student_status
                                )}
                                key={index_details}
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
                                    {detail?.branchClassRoom_name}
                                  </Button>
                                  {/* <StudentStatusComponent
                                  consultantTimeTableId={detail.id}                                  
                                  refreshData={refreshStudent}
                                /> */}

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

                                {detail?.student_id ? (
                                  <Box>
                                    {/* <Box>
                                    کلاس : {detail.branchClassRoom_name}
                                  </Box> */}
                                    <Box
                                      sx={{
                                        fontWeight: 800,
                                        pl: 1,
                                      }}
                                    >
                                      {detail?.student?.first_name}{" "}
                                      {detail?.student?.last_name}
                                    </Box>
                                    {/* <Box>
                                    ثبت نامی :{" "}
                                    {detail?.student?.is_academy_student === 1
                                      ? " آکادمی"
                                      : "جذب"}{" "}
                                  </Box> */}
                                    <Box
                                      sx={{
                                        fontWeight: 800,
                                        pl: 1,
                                      }}
                                    >
                                      {detail?.student?.phone}
                                    </Box>
                                    <Box
                                      display={"flex"}
                                      justifyContent={"space-between"}
                                      mt={1}
                                    >
                                      <Button
                                        color="success"
                                        variant="contained"
                                        sx={{
                                          fontSize: 13,
                                        }}
                                        onClick={() => {
                                          ConsultantTimeTableStudentStatus({
                                            variables: {
                                              id: detail.id,
                                              student_id: detail.student_id,
                                              student_status: "present",
                                            },
                                          }).then(() => {
                                            showSuccess(
                                              "وضعیت دانش آموز با موفقیت به حاضر تغییر کرد."
                                            );
                                            refetch();
                                          });
                                        }}
                                      >
                                        {"حاضر "}
                                      </Button>
                                      <Button
                                        color="warning"
                                        variant="contained"
                                        sx={{
                                          fontSize: 13,
                                        }}
                                        onClick={() => {
                                          ConsultantTimeTableStudentStatus({
                                            variables: {
                                              id: detail.id,
                                              student_id: detail.student_id,
                                              student_status: "absent",
                                            },
                                          }).then(() => {
                                            showSuccess(
                                              "وضعیت دانش آموز با موفقیت به غایب تغییر کرد."
                                            );
                                            refetch();
                                          });
                                        }}
                                      >
                                        {"غایب "}
                                      </Button>
                                    </Box>
                                    <Box>
                                      <FormControl
                                        sx={{
                                          mt: 2,

                                          backgroundColor: "white",
                                          width: "100%",
                                        }}
                                      >
                                        <Select
                                          sx={{
                                            height: 35,
                                            backgroundColor: "white",
                                            width: "100%",
                                            fontSize: 13,
                                          }}
                                          labelId="week-label"
                                          id="week-select"
                                          value={detail?.student_status}
                                          onClick={() => {
                                            ConsultantTimeTableStudentStatus({
                                              variables: {
                                                id: detail.id,
                                                student_id: detail.student_id,
                                                student_status: "dellay",
                                              },
                                            }).then(() => {
                                              showSuccess(
                                                "وضعیت دانش آموز با موفقیت به تاخیر تغییر کرد."
                                              );
                                              refetch();
                                            });
                                          }}
                                          input={<OutlinedInput />}
                                        >
                                          <MenuItem value=""></MenuItem>
                                          <MenuItem value="dellay">
                                            تاخیر
                                          </MenuItem>
                                          {/* <MenuItem value="dellay10">
                                          تاخیر ۱۰ دقیقه
                                        </MenuItem>
                                        <MenuItem value="dellay15">
                                          تاخیر ۱۵ دقیقه
                                        </MenuItem>
                                        <MenuItem value="dellay15more">
                                          تاخیر بیشتر از ۱۵ دقیقه
                                        </MenuItem> */}
                                        </Select>
                                      </FormControl>
                                    </Box>

                                    {detail?.student_id ? (
                                      <Box
                                      display={"flex"}
                                      justifyContent={"space-between"}
                                      >
                                        <Button
                                          color="error"
                                          variant="contained"
                                          onClick={() => {
                                            showConfirm(async () =>
                                              deleteConsultantTimeTableStudentId(
                                                {
                                                  variables: {
                                                    id: detail.id,
                                                  },
                                                }
                                              ).then(() => {
                                                showSuccess(
                                                  "حذف با موفقیت انجام شد."
                                                );
                                                refetch();
                                              })
                                            );
                                          }}
                                          sx={{
                                            mt: 2,
                                            fontSize: 13,
                                          }}
                                        >
                                          {" حذف "}
                                        </Button>
                                        <Button
                                        color="info"
                                        variant="contained"
                                        onClick={() => {
                                          showConfirm(async () =>
                                            copyStudentToNextWeek({
                                              variables: {
                                                id: detail.id,
                                              },
                                            }).then(() => {
                                              showSuccess(
                                                "کپی با موفقیت انجام شد."
                                              );
                                              refetch();
                                            })
                                          );
                                        }}
                                        sx={{
                                          mt: 2,
                                          fontSize: 13,
                                        }}
                                      >
                                        {"کپی"}
                                      </Button>
                                      </Box>
                                    ) : null}
                                  </Box>
                                ) : (
                                  <Button
                                    color="error"
                                    variant="contained"
                                    onClick={() => {
                                      showConfirm(async () =>
                                        deleteOneSessionTimeTable({
                                          variables: {
                                            id: detail.id,
                                          },
                                        }).then(() => {
                                          showSuccess(
                                            "حذف  جلسه با موفقیت انجام شد."
                                          );
                                          refetch();
                                        })
                                      );
                                    }}
                                    sx={{
                                      mt: 2,
                                      fontSize: 13,
                                    }}
                                  >
                                    {" حذف جلسه  "}
                                  </Button>
                                )}
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
          </Box>
        </TableContainer>
      </Container>
    </Paper>
  );
};
export default ShowAllConsultantsTimes;
