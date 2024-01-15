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
import {
  Button,
  Container,
  Stack,
  Switch,
  TableContainer,
} from "@mui/material";
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
import { showConfirm, showError, showSuccess } from "utils/swlAlert";
import {
  GET_A_USER,
  GET_BRANCH_CLASSROOMS,
  GET_CONSULTANT_DEFINITION_DETAILS,
  GetConsultantStudentsByDefinitionId,
} from "../gql/query";
import {
  CREATE_CONSULTANT_DEFINITION_DETAIL,
  DELETE_CONSULTANTN_DEFINITION_STUDENT_ID,
  UPDATE_CONSULTANT_DEFINITION_DETAIL_STUDENT_ID,
  CPOY_TIME_TABLE_OF_CONSULTANT,
  COPY_STUDENT_TO_NEXT_WEEK,
  DELETE_ONE_SESSION_OF_TIME_TABLE,
  COPY_ONE_DAY_CONSULTANT_TIME_TABLE,
} from "../gql/mutation";
import { useParams } from "react-router-dom";
import StudentData from "utils/student";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ComponentStudentDialog from "./ComponentStudentDialog";
import { Link, useNavigate } from "react-router-dom";
import moment_jalali from "moment-jalaali";
import "../../../../src/assets/stringDate.css";
import StudentStatusComponent from "./StudentStatusDialog";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ComponentDeleteStudentDialog from "./ComponentDeleteStudentDialog";
import ShowPhone from "screens/Students/components/ShowPhone";
import momentj from "moment-jalaali";
import { format } from "path";

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

const consultantNotFilledStudentBox = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",

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
  backgroundColor: "#ed2a2a",
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

const convertStudentStatusTheme = (student_status: string) => {
  switch (student_status) {
    case "present":
      return consultantPresentStudentBox;
    case "absent":
      return consultantAbsentStudentBox;
    case "dellay5":
    case "dellay10":
    case "dellay15":
    case "dellay15more":
      return consultantDellayStudentBox;
    default:
      return consultantNotFilledStudentBox;
  }
};

const converConsultantFinancial = (finnacial_status: string) => {
  switch (finnacial_status) {
    case "approved":
      return "پرداخت کرده";
    case "semi_approved":
      return "عدم تسویه کامل";
    case "pending":
      return "در انتظار پرداخت";
    default:
      return "ندارد";
  }
};

const converConsultantFinancialCode = (finnacial_status: string) => {
  switch (finnacial_status) {
    case "approved":
      return "green";
    case "semi_approved":
      return "orange";
    case "pending":
      return "red";
    default:
      return "#8E02FC";
  }
};
interface ErrorData {
  days?: string;
  startTime?: string;
  endTime?: string;
  branch_classroom_id?: string;
}

interface getConsultantDefinitionDetailsData {
  id: number;
  date?: string;
  details?: detailsData[];
}
interface ConsultantFinancial {
  id: string;
  financial_status: string;
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
  copy_to_next_week: boolean;
  user_student_status_full_name: String;
  student_status_updated_at: Date;
  compensatory_of_definition_detail_id: number;
  compensatory_for_definition_detail_id: number;
  compensatory_meet: boolean;
  single_meet: boolean;
  remote: boolean;
  consultant_financial: ConsultantFinancial;
}

enum Week {
  Current = "Current",
  Next = "Next",
  Next2week = "Next2week",
  Next3week = "Next3week",
  Next4week = "Next4week",
}

const ConsultantTimeTable = () => {
  const params = useParams<string>();
  const consultantId = params.consultantId;

  const [days, setDays] = useState<string[]>([]);
  const [week, setWeek] = useState<Week>(Week.Current);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndtTime] = useState<Date | null>(null);
  const [step, setStep] = useState<string>("15");
  const [studentIds, setStudentIds] = useState<number[]>([1]);
  const [studentFullName, setStudentFullName] = useState<string>();
  const [consultantFullName, setConsultantFullName] = useState<string>("");
  const [branchClassRoomId, setBranchClassRoomId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorData>({});
  const [timeTable, setTimeTable] = useState<
    getConsultantDefinitionDetailsData[]
  >([]);
  const [open, setOpen] = useState<boolean>(false);
  const [dialogconsultantTimeTableId, setDialogConsultantTimeTableId] =
    useState<string>();
  const [dialogrefreshData, setDialogRefreshData] = useState<boolean>(false);
  const [studentDialogOpen, setStudentDialogOpen] = useState<boolean>(false);
  const [studentStatusDialogOpen, setStudentStatusDialogOpen] =
    useState<boolean>(false);
  const [studentDeleteDialogOpen, setStudentDeleteDialogOpen] =
    useState<boolean>(false);
  // const [studentDeleteDialogClose, setStudentDeleteDialogClose] =useState<boolean>(false);

  const [studentStatus, setStudentStatus] = useState<string>("no_action");
  const [singleMeet, setSingleMeet] = useState<boolean>(false);
  const [compensatoryMeet, setCompensatoryMeet] = useState<boolean>(false);
  const [remoteMeet, setRemoteMeet] = useState<boolean>(false);

  const [listKey, setListKey] = useState<number>(0);

  const { id } = useParams();
  let navigate = useNavigate();

  const [insertMultiConsultantTimes] = useMutation(
    CREATE_CONSULTANT_DEFINITION_DETAIL
  );
  const [insertCopyMultiConsultantTimes] = useMutation(
    CPOY_TIME_TABLE_OF_CONSULTANT
  );

  const [deleteConsultantTimeTableStudentId] = useMutation(
    DELETE_CONSULTANTN_DEFINITION_STUDENT_ID
  );

  const [deleteOneSessionTimeTable] = useMutation(
    DELETE_ONE_SESSION_OF_TIME_TABLE
  );

  const [copyStudentToNextWeek] = useMutation(COPY_STUDENT_TO_NEXT_WEEK);
  const [copyOneDayConsultantTimeTable] = useMutation(
    COPY_ONE_DAY_CONSULTANT_TIME_TABLE
  );

  const [ConsultantTimeTableStudentStatus] = useMutation(
    UPDATE_CONSULTANT_DEFINITION_DETAIL_STUDENT_ID
  );

  const { data: branchClassroomsData } = useQuery(GET_BRANCH_CLASSROOMS, {
    variables: {
      first: 1000,
      page: 1,
      orderBy: [
        {
          column: "id",
          order: "DESC",
        },
      ],
    },
    onCompleted: (data) => {
      //setTimeTable(data.getConsultantDefinitionDetails);
    },
  });

  // const current_date = moment().format("YYYY-MM-DD");
  // const next_date = moment().add(7, "days").format("YYYY-MM-DD");

  const current_date = moment().format("YYYY-MM-DD");
  const next_date = moment().add(7, "days").format("YYYY-MM-DD");
  const next2week_date = moment().add(14, "days").format("YYYY-MM-DD");
  const next3week_date = moment().add(21, "days").format("YYYY-MM-DD");
  const next4week_date = moment().add(28, "days").format("YYYY-MM-DD");

  const { fetchMore, refetch } = useQuery(GET_CONSULTANT_DEFINITION_DETAILS, {
    variables: {
      consultant_id: Number(consultantId),
    },
    onCompleted: (data) => {
      setTimeTable(data.getConsultantDefinitionDetails);
    },
    fetchPolicy: "no-cache",
  });

  const { data: consultantDetails } = useQuery(GET_A_USER, {
    variables: {
      id: consultantId,
    },
    onCompleted: (data) => {
      // console.log("user is: " ,data);
      setConsultantFullName(
        data.getUser.first_name + " " + data.getUser.last_name
      );
    },
  });

  const handleChange = (event: SelectChangeEvent<typeof days>) => {
    const {
      target: { value },
    } = event;
    setDays(typeof value === "string" ? value.split(",") : value);
  };

  const handleAddStudent = (defenitionId: string) => {
    //alert("one is:" + defenitionId);
    refetchConsultantStudentsByDefinitionId({
      id: +defenitionId,
    }).then((res) => {
      //console.log("res is " ,res);
    });
    setDialogConsultantTimeTableId(defenitionId);
    setStudentDialogOpen(true);
  };

  const handleAddStudentStatus = (defenitionId: string) => {
    //alert(defenitionId);
    setDialogConsultantTimeTableId(defenitionId);
    setStudentStatusDialogOpen(true);
  };
  const handleDeleteStudentForm = (
    defenitionId: string,
    studentName: string
  ) => {
    setStudentFullName(studentName);
    setDialogConsultantTimeTableId(defenitionId);
    setStudentDeleteDialogOpen(true);
  };

  const closeDialog = () => {
    setStudentDialogOpen(false);
  };
  const closeStudentStatusDialog = () => {
    setStudentStatusDialogOpen(false);
  };

  const closeStudentDeleteDialog = () => {
    setStudentDeleteDialogOpen(false);
  };

  const handleChangeBranchClassRoomId = (event: SelectChangeEvent<string>) => {
    setBranchClassRoomId(event.target.value);
  };

  const insertMultiSessions = () => {
    if (!validation()) return;
    setLoading(true);
    const daysTmp = [];
    for (let i = 0; i < days.length; i++) {
      daysTmp.push(dayOfWeeksObject[days[i]]);
    }
    const variables = {
      //consultant_id: +(id as string),
      days: daysTmp,
      week:week,
      start_hour: moment(startTime).format("HH:mm"),
      end_hour: moment(endTime).format("HH:mm"),
      step: +step,
      branch_class_room_id: Number(branchClassRoomId),
      consultant_id: Number(consultantId),
    };
    insertMultiConsultantTimes({ variables })
      .then(() => {
        refetch();
        setLoading(false);
        showSuccess("زمانبندی جدید با موفقیت ایجاد شد");
        //showPreviousWeekBeforeRefresh();
      })
      .finally(() => {
        setLoading(false);
        changeWeek(week);
      });
  };

  const validation = () => {
    let out = true;
    let result: ErrorData = {};
    setError({});
    if (days.length === 0) {
      result = { ...result, days: "لطفا روز های دوره را انتخاب کنید" };
      out = false;
    }

    if (!startTime) {
      result = { ...result, startTime: "لطفا ساعت شروع را انتخاب کنید" };
      out = false;
    }
    if (!endTime) {
      result = { ...result, endTime: "لطفا ساعت پایان را انتخاب کنید" };
      out = false;
    }
    if (!branchClassRoomId) {
      result = {
        ...result,
        branch_classroom_id: "محل برگزاری جلسات را انتخاب کنید",
      };
      out = false;
    }
    setError(result);
    return out;
  };
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
        setWeek(Week.Next);
      },
    });
  };

  const { refetch: refetchConsultantStudentsByDefinitionId } = useQuery(
    GetConsultantStudentsByDefinitionId,
    {
      variables: {
        id: -1,
      },
      onCompleted: (data) => {
        setStudentIds(data.GetConsultantStudentsByDefinitionId);
      },
      fetchPolicy: "no-cache",
      skip: true,
    }
  );

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
        setWeek(Week.Current);
      },
    });
  };

  const refreshStudent = () => {
    refetch();
  };
  const refreshConsultantDefinition = () => {
    refetch();
    //showPreviousWeekBeforeRefresh();
    changeWeek(week);
  };
  const convertDayIntoShamsi = (day: string) => {
    switch (day) {
      case "Saturday":
        return "شنبه";
      case "Sunday":
        return "یکشنبه";
      case "Monday":
        return "دوشنبه";
      case "Tuesday":
        return "سه شنبه";
      case "Wednesday":
        return "چهارشنبه";
      case "Thursday":
        return "پنج شنبه";
      case "Friday":
        return "جمعه";
    }
  };

  const changeWeek = (inputWeek: Week) => {
    setTimeTable([]);
    fetchMore({
      variables: {
        week: inputWeek,
        consultant_id: Number(consultantId),
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        setTimeTable(fetchMoreResult.getConsultantDefinitionDetails);
        // setToday(fetchMoreResult.getCourseSessionOrderbyDate.today);
        //setNextWeekFlag(true);
        //setWeek(Week.Current);
      },
    });
  };

  const copyPlan = (inputWeek:Week) => {
    if (week === "Current") {
      showError("امکان کپی به هفته جاری وجود ندارد.");
      return null;
    }

    showConfirm(() => {
      // alert(consultantId);
      insertCopyMultiConsultantTimes({
        variables: {
          consultant_id: consultantId ? Number(consultantId) : 0,
          week:inputWeek
        },
      }).then(() => {
        refetch();
        //nextWeek();
        showSuccess("کپی زمانبندی جدید با موفقیت ایجاد شد");
        changeWeek(inputWeek);
      });
    });
  };

  // const showPreviousWeekBeforeRefresh = () => {
  //   if (week === "Current") {
  //     previousWeek();
  //   }
  //   if (week === "Next") {
  //     nextWeek();
  //   }
  // };

  const changeStudentStatus = (
    id: string,
    student_id: string,
    student_status: string
  ) => {
    ConsultantTimeTableStudentStatus({
      variables: {
        id: id,
        student_id: student_id,
        student_status: student_status,
      },
    }).then(() => {
      showSuccess("وضعیت دانش آموز با موفقیت به تاخیر تغییر کرد.");
      refetch();
      changeWeek(week);
      //showPreviousWeekBeforeRefresh();
      setStudentStatus(student_status);
    });
  };

  // const checkCompensatory = (id: string) => {
  //   alert(id);
  // };

  return consultantFullName ? (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Grid>
        <h1> مشاور: {consultantFullName} </h1>
      </Grid>
      {studentDialogOpen && (
        <ComponentStudentDialog
          consultantTimeTableId={dialogconsultantTimeTableId}
          studentIdsOfOneConsultant={studentIds}
          refreshData={refreshConsultantDefinition}
          openDialog={studentDialogOpen}
          closeDialog={closeDialog}
        />
      )}

      {studentDeleteDialogOpen && (
        <ComponentDeleteStudentDialog
          consultantTimeTableId={dialogconsultantTimeTableId}
          studentName={studentFullName}
          refreshData={refreshConsultantDefinition}
          openStudentDeleteDialog={studentDeleteDialogOpen}
          closeStudentDeleteDialog={closeStudentDeleteDialog}
        />
      )}
      {studentStatusDialogOpen && (
        <StudentStatusComponent
          consultantTimeTableId={dialogconsultantTimeTableId}
          consultantId={String(consultantId)}
          refreshData={refreshConsultantDefinition}
          openStudentStatusDialog={studentStatusDialogOpen}
          closeStudentStatusDialog={closeStudentStatusDialog}
        />
      )}

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} xl={4}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="demo-multiple-checkbox-label">
              انتخاب روزهای هفته
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={days}
              onChange={handleChange}
              input={<OutlinedInput label="انتخاب روزهای هفته" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {daysOfWeek.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={days.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
            {error.days ? (
              <FormHelperText error>{error.days}</FormHelperText>
            ) : (
              ""
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={2} xl={2}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="week-label">هفته</InputLabel>
            <Select
              labelId="week-label"
              id="week-select"
              value={week}
              onChange={(e) => {
                setWeek(e.target.value as Week);
                changeWeek(e.target.value as Week);
                //nextWeek();
              }}
              input={<OutlinedInput label="هفته" />}
            >
              <MenuItem value="Current">جاری</MenuItem>
              <MenuItem value="Next">یک هفته بعد</MenuItem>
              <MenuItem value="Next2week">دو هفته بعد</MenuItem>
              <MenuItem value="Next3week">سه هفته بعد</MenuItem>
              <MenuItem value="Next4week">چهار هفته بعد</MenuItem>
            </Select>
            {error.days ? (
              <FormHelperText error>{error.days}</FormHelperText>
            ) : (
              ""
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4} xl={3}>
          <LocalizationProvider dateAdapter={AdapterJalali}>
            <MobileTimePicker
              label="ساعت شروع"
              value={startTime}
              onChange={(newValue) => {
                setStartTime(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} style={{ width: "100%" }} />
              )}
            />
          </LocalizationProvider>
          {error.startTime ? (
            <FormHelperText error>{error.startTime}</FormHelperText>
          ) : (
            ""
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={3} xl={3}>
          <LocalizationProvider dateAdapter={AdapterJalali}>
            <MobileTimePicker
              label="ساعت پایان"
              value={endTime}
              onChange={(newValue) => {
                setEndtTime(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} style={{ width: "100%" }} />
              )}
            />
          </LocalizationProvider>
          {error.endTime ? (
            <FormHelperText error>{error.endTime}</FormHelperText>
          ) : (
            ""
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={2} xl={2}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="session-time-label">زمان هر جلسه</InputLabel>
            <Select
              labelId="session-time-label"
              value={step}
              onChange={(e) => {
                setStep(e.target.value);
              }}
              input={<OutlinedInput label="زمان هر جلسه" />}
              fullWidth
            >
              <MenuItem value={15}>۱۵ دقیقه</MenuItem>
              <MenuItem value={20}>۲۰ دقیقه</MenuItem>
              <MenuItem value={30}>۳۰ دقیقه</MenuItem>
              <MenuItem value={45}>۴۵ دقیقه</MenuItem>
              <MenuItem value={60}>۶۰ دقیقه</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={2} xl={4}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="special-label">محل برگزاری</InputLabel>
            <Select
              labelId="special-label"
              value={branchClassRoomId}
              onChange={handleChangeBranchClassRoomId}
              input={<OutlinedInput label="محل برگزاری" />}
            >
              {branchClassroomsData &&
                branchClassroomsData.getBranchClassRooms.data.map(
                  (item: any) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.branch.name + " - " + item.name}
                    </MenuItem>
                  )
                )}
            </Select>
            {error.branch_classroom_id ? (
              <FormHelperText error>{error.branch_classroom_id}</FormHelperText>
            ) : (
              ""
            )}
          </FormControl>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          xl={6}
          sx={{
            display: "flex",
            justifyContent: "end",
            //width: "30%",
          }}
        >
          <FormControl >
            <Button
             size="small"
              onClick={() => {
                insertMultiSessions();
              }}
              variant="contained"
              disabled={loading}
            >
              {loading ? <CircularProgress size={15} color="primary" /> : null}
              ذخیره
            </Button>
           
            {nextWeekFlag || true ? (
              <Stack direction="row">
                <Button
                  onClick={() => {
                    copyPlan(week);
                  }}
                  size="small"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    mt: 1,
                  }}
                >
                  {loading ? (
                    <CircularProgress size={15} color="primary" />
                  ) : null}
                  کپی  از هفته جاری به
                </Button>
                <FormControl sx={{ width: "100%" }}>
                  
                  <Select
                   size="small"
                    labelId="week-label"
                    id="week_select_to_create"
                    value={week}
                    sx={{
                      mt: 1,
                    }}
                    onChange={(e) => {
                      setWeek(e.target.value as Week);
                      changeWeek(e.target.value as Week);
                      //nextWeek();
                    }}
                                     >
                    <MenuItem value="Current">
                      جاری{" "}
                      {momentj(current_date)
                        .subtract(2, "days")
                        .format("jYYYY/jMM/jDD")}
                    </MenuItem>
                    <MenuItem value="Next">
                      یک هفته بعد{" "}
                      {momentj(next_date)
                        .subtract(2, "days")
                        .format("jYYYY/jMM/jDD")}
                    </MenuItem>
                    <MenuItem value="Next2week">
                      دو هفته بعد{" "}
                      {momentj(next2week_date)
                        .subtract(2, "days")
                        .format("jYYYY/jMM/jDD")}
                    </MenuItem>
                    <MenuItem value="Next3week">
                      سه هفته بعد{" "}
                      {momentj(next3week_date)
                        .subtract(2, "days")
                        .format("jYYYY/jMM/jDD")}
                    </MenuItem>
                    <MenuItem value="Next4week">
                      چهار هفته بعد{" "}
                      {momentj(next4week_date)
                        .subtract(2, "days")
                        .format("jYYYY/jMM/jDD")}
                    </MenuItem>
                  </Select>
                  {error.days ? (
                    <FormHelperText error>{error.days}</FormHelperText>
                  ) : (
                    ""
                  )}
                </FormControl>
              </Stack>
            ) : null}
          </FormControl>
        </Grid>
      </Grid>
      <TableContainer
        component={Paper}
        sx={{
          mt: 1,
        }}
      >
        <Table>
          <TableBody>
            <TableRow>
              {/* <StyledTableCell
                align="center"
                sx={{
                  fontSize: 25,
                  fontWeight: 800,
                  textAlign: "center",
                  backgroundColor: "white",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    m: 1,
                  }}
                >
                  <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    onClick={previousWeek}
                    startIcon={<ArrowForwardIcon />}
                    disabled={nextWeekFlag ? true : false}
                  >
                    هفته جاری
                  </Button>
                </Box>
              </StyledTableCell> */}
              <StyledTableCell
                align="center"
                sx={{
                  fontSize: 25,
                  fontWeight: 300,
                  textAlign: "center",
                  backgroundColor: "white",
                }}
              >
                <FormControl sx={{ width: "30%" }}>
                  <InputLabel id="week-label">انتخاب هفته برای نمایش </InputLabel>
                  <Select
                    labelId="week-label"
                    id="week-select"
                    value={week}
                    onChange={(e) => {
                      setWeek(e.target.value as Week);
                      changeWeek(e.target.value as Week);
                      //nextWeek();
                    }}
                    input={<OutlinedInput label="انتخاب هفته برای نمایش " />}
                  >
                    <MenuItem value="Current">
                      جاری{" "}
                      {momentj(current_date)
                        .subtract(2, "days")
                        .format("jYYYY/jMM/jDD")}
                    </MenuItem>
                    <MenuItem value="Next">
                      یک هفته بعد{" "}
                      {momentj(next_date)
                        .subtract(2, "days")
                        .format("jYYYY/jMM/jDD")}
                    </MenuItem>
                    <MenuItem value="Next2week">
                      دو هفته بعد{" "}
                      {momentj(next2week_date)
                        .subtract(2, "days")
                        .format("jYYYY/jMM/jDD")}
                    </MenuItem>
                    <MenuItem value="Next3week">
                      سه هفته بعد{" "}
                      {momentj(next3week_date)
                        .subtract(2, "days")
                        .format("jYYYY/jMM/jDD")}
                    </MenuItem>
                    <MenuItem value="Next4week">
                      چهار هفته بعد{" "}
                      {momentj(next4week_date)
                        .subtract(2, "days")
                        .format("jYYYY/jMM/jDD")}
                    </MenuItem>
                  </Select>
                  {error.days ? (
                    <FormHelperText error>{error.days}</FormHelperText>
                  ) : (
                    ""
                  )}
                </FormControl>
              </StyledTableCell>
              {/* <StyledTableCell
                align="center"
                sx={{
                  fontSize: 25,
                  fontWeight: 800,
                  textAlign: "center",
                  backgroundColor: "white",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                    m: 1,
                  }}
                >
                  <Button
                    size="small"
                    endIcon={<ArrowBackIcon />}
                    onClick={nextWeek}
                    variant="outlined"
                    color="primary"
                    disabled={nextWeekFlag ? false : true}
                  >
                    هفته آتی
                  </Button>
                </Box>
              </StyledTableCell> */}
            </TableRow>
          </TableBody>
        </Table>
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
                تاریخ{" "}
              </StyledTableCell>
              <StyledTableCell
                align="center"
                sx={{
                  fontSize: 25,
                  fontWeight: 800,
                  textAlign: "center",
                }}
              >
                زمان مشاوره
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {timeTable.map(
              (element: getConsultantDefinitionDetailsData, index: number) => (
                <TableRow key={index}>
                  <StyledTableCell align="center">
                    <>
                      <Box className="dateOfWeekString">
                        {moment_jalali(element.date?.toString()).format(
                          "jYYYY/jMM/jDD"
                        )}{" "}
                        <br />
                        {convertDayIntoShamsi(
                          moment_jalali(element.date).format("dddd")
                        )}
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </Box>
                      {week === "Current" &&
                      typeof element.details !== "undefined" &&
                      element.details.length > 0 ? (
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={() => {
                            showConfirm(async () =>
                              //alert(element.date?.toString())
                              //alert(consultantId)

                              copyOneDayConsultantTimeTable({
                                variables: {
                                  consultant_id: Number(consultantId),
                                  session_date: element.date?.toString(),
                                },
                              }).then(() => {
                                showSuccess("کپی  کل روز با موفقیت انجام شد.");
                                refetch();
                                changeWeek(week);
                                //showPreviousWeekBeforeRefresh();
                              })
                            );
                          }}
                          sx={{
                            mt: 2,
                            fontSize: 13,
                          }}
                        >
                          {" کپی کل روز "}
                        </Button>
                      ) : null}
                    </>
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
                              sx={
                                convertStudentStatusTheme(
                                  detail?.student_status
                                )
                                // {
                                //   display: "flex",
                                //   flexDirection: "column",
                                //   justifyContent: "space-between",
                                //   minHeight:260,
                                //   p:1
                                // }
                              }
                              key={index_details}
                              id="sag"
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
                                    <ShowPhone phone={detail?.student?.phone} />
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
                                      // onClick={() => {
                                      //   ConsultantTimeTableStudentStatus({
                                      //     variables: {
                                      //       id: detail.id,
                                      //       student_id: detail.student_id,
                                      //       student_status: "present",
                                      //     },
                                      //   }).then(() => {
                                      //     showSuccess(
                                      //       "وضعیت دانش آموز با موفقیت به حاضر تغییر کرد."
                                      //     );
                                      //     refetch();
                                      //     showPreviousWeekBeforeRefresh();
                                      //     setStudentStatus("present");

                                      //   });
                                      // }}
                                      onClick={() => {
                                        changeStudentStatus(
                                          detail.id,
                                          detail.student_id,
                                          "present"
                                        );
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
                                      // onClick={() => {
                                      //   ConsultantTimeTableStudentStatus({
                                      //     variables: {
                                      //       id: detail.id,
                                      //       student_id: detail.student_id,
                                      //       student_status: "absent",
                                      //     },
                                      //   }).then(() => {
                                      //     showSuccess(
                                      //       "وضعیت دانش آموز با موفقیت به غایب تغییر کرد."
                                      //     );
                                      //     refetch();
                                      //     showPreviousWeekBeforeRefresh();
                                      //     setStudentStatus("absent");

                                      //   });
                                      // }}

                                      onClick={() => {
                                        changeStudentStatus(
                                          detail.id,
                                          detail.student_id,
                                          "absent"
                                        );
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
                                        // value={detail?.student_status}
                                        // onClick={(e) => {
                                        //   ConsultantTimeTableStudentStatus({
                                        //     variables: {
                                        //       id: detail.id,
                                        //       student_id: detail.student_id,
                                        //       student_status: e,
                                        //     },
                                        //   }).then(() => {
                                        //     showSuccess(
                                        //       "وضعیت دانش آموز با موفقیت به تاخیر تغییر کرد."
                                        //     );
                                        //     refetch();
                                        //   });
                                        // }}
                                        value={detail.student_status}
                                        onChange={(e) => {
                                          changeStudentStatus(
                                            detail.id,
                                            detail.student_id,
                                            e.target.value
                                          );
                                          // alert(detail.id);
                                          // alert(detail.student_id);
                                          // setStudentStatus(e.target.value);
                                        }}
                                        input={<OutlinedInput />}
                                      >
                                        <MenuItem value=""></MenuItem>

                                        <MenuItem value="dellay5">
                                          تاخیر ۵ دقیقه{" "}
                                        </MenuItem>
                                        <MenuItem value="dellay10">
                                          تاخیر ۱۰ دقیقه
                                        </MenuItem>
                                        <MenuItem value="dellay15">
                                          تاخیر ۱۵ دقیقه
                                        </MenuItem>
                                        <MenuItem value="dellay15more">
                                          تاخیر بیشتر از ۱۵ دقیقه
                                        </MenuItem>
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
                                            deleteConsultantTimeTableStudentId({
                                              variables: {
                                                id: detail.id,
                                              },
                                            }).then(() => {
                                              showSuccess(
                                                "حذف با موفقیت انجام شد."
                                              );
                                              refetch();
                                              changeWeek(week);
                                              //showPreviousWeekBeforeRefresh();
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
                                        disabled={
                                          detail.copy_to_next_week ||
                                          detail.compensatory_meet
                                        }
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
                                              changeWeek(week);
                                              //showPreviousWeekBeforeRefresh();
                                            })
                                          );
                                        }}
                                        sx={{
                                          mt: 2,
                                          fontSize: 13,
                                        }}
                                      >
                                        {"کپی"}
                                        {detail.copy_to_next_week}
                                      </Button>
                                    </Box>
                                  ) : null}
                                  <Box>
                                    <Switch
                                      checked={
                                        detail.single_meet === true
                                          ? detail.single_meet
                                          : false
                                      }
                                      size="small"
                                      onClick={() => {
                                        //alert(detail.single_meet);
                                        ConsultantTimeTableStudentStatus({
                                          variables: {
                                            id: detail.id,
                                            student_id: detail.student_id,
                                            single_meet: !detail.single_meet,
                                          },
                                        }).then(() => {
                                          showSuccess(
                                            "وضعیت  تک جلسه تغییر کرد."
                                          );
                                          refetch();
                                          changeWeek(week);
                                          //showPreviousWeekBeforeRefresh();
                                        });
                                      }}
                                    />{" "}
                                    تک جلسه{" "}
                                  </Box>
                                  <Box>
                                    <Switch
                                      checked={
                                        detail.remote === true
                                          ? detail.remote
                                          : false
                                      }
                                      size="small"
                                      onClick={() => {
                                        //alert(detail.remote);
                                        ConsultantTimeTableStudentStatus({
                                          variables: {
                                            id: detail.id,
                                            student_id: detail.student_id,
                                            remote: !detail.remote,
                                          },
                                        }).then(() => {
                                          showSuccess(
                                            "وضعیت  تک جلسه تغییر کرد."
                                          );
                                          refetch();
                                          changeWeek(week);
                                          //showPreviousWeekBeforeRefresh();
                                        });
                                      }}
                                    />{" "}
                                    غیر حضوری{" "}
                                  </Box>
                                  <Box
                                    bgcolor={converConsultantFinancialCode(
                                      detail?.consultant_financial
                                        ?.financial_status
                                    )}
                                    sx={{
                                      my: 1,
                                      px: 1,
                                    }}
                                    borderRadius={1}
                                  >
                                    {converConsultantFinancial(
                                      detail?.consultant_financial
                                        ?.financial_status
                                    )}
                                  </Box>
                                  {detail?.user_student_status_full_name ? (
                                    <Box>
                                      {"کاربر ثبت کننده: "}
                                      {
                                        detail.user_student_status_full_name
                                      }{" "}
                                      {"  "}
                                      <Box
                                        sx={{
                                          direction: "rtl",
                                        }}
                                      >
                                        {detail?.student_status_updated_at
                                          ? momentj(
                                              detail.student_status_updated_at
                                            ).format("jYYYY/jMM/jDD-HH:mm")
                                          : null}
                                      </Box>
                                      {/* {detail?.student_status_updated_at} */}
                                    </Box>
                                  ) : null}
                                </Box>
                              ) : (
                                <Button
                                  color="error"
                                  variant="outlined"
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
                                        changeWeek(week);
                                        //showPreviousWeekBeforeRefresh();
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
      </TableContainer>
    </Container>
  ) : null;
};
export default ConsultantTimeTable;
