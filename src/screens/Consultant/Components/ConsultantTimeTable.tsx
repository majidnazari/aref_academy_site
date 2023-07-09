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
import {
  GET_BRANCH_CLASSROOMS,
  GET_CONSULTANT_DEFINITION_DETAILS,
} from "../gql/query";
import { CREATE_CONSULTANT_DEFINITION_DETAIL } from "../gql/mutation";
import { useParams } from "react-router-dom";
import StudentData from "utils/student";

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
  backgroundColor: "#02acf5",
  color: "black",
  borderRadius: "5px",
  boxShadow: 3,
  cursor: "pointer",
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

interface getConsultantDefinitionDetailsData {
  date?: string;
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
}

const ConsultantTimeTable = () => {
  const params = useParams<string>();
  const consultantId = params.consultantId;

  const [days, setDays] = useState<string[]>([]);
  const [week, setWeek] = useState<"Current" | "Next">("Current");
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndtTime] = useState<Date | null>(null);
  const [step, setStep] = useState<string>("15");
  const [branchClassRoomId, setBranchClassRoomId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorData>({});
  const [timeTable, setTimeTable] = useState<
    getConsultantDefinitionDetailsData[]
  >([]);

  const { id } = useParams();

  const [insertMultiConsultantTimes] = useMutation(
    CREATE_CONSULTANT_DEFINITION_DETAIL
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
  });

  const { fetchMore, refetch } = useQuery(
    GET_CONSULTANT_DEFINITION_DETAILS,
    {
      variables: {
        session_date_from: "2023-07-10",
        session_date_to: "2023-07-17",
        consultant_id: Number(consultantId),
      },
      onCompleted: (data) => {
        setTimeTable(data.getConsultantDefinitionDetails);
        //console.log(data.getConsultantDefinitionDetails);
      },
      fetchPolicy: "no-cache",
    }
  );

  const handleChange = (event: SelectChangeEvent<typeof days>) => {
    const {
      target: { value },
    } = event;
    setDays(typeof value === "string" ? value.split(",") : value);
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
      week,
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
        showSuccess("وقتهای جدید با موفقیت ایجاد شد");
      })
      .finally(() => {
        setLoading(false);
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

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
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
                setWeek(e.target.value as "Current" | "Next");
              }}
              input={<OutlinedInput label="هفته" />}
            >
              <MenuItem value="Current">جاری</MenuItem>
              <MenuItem value="Next">آتی</MenuItem>
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
        <Grid item xs={12} sm={6} md={3} xl={4}>
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
        <Grid item xs={12} sm={12} md={12} xl={12}>
          <Button
            onClick={() => {
              insertMultiSessions();
            }}
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={15} color="primary" /> : null}
            ذخیره
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <StyledTableCell align="center"> تاریخ </StyledTableCell>
            <StyledTableCell align="center"> زمان مشاوره </StyledTableCell>
          </TableHead>
          <TableBody>
            {timeTable.map((element: getConsultantDefinitionDetailsData) => (
              <TableRow>
                <StyledTableCell align="center">
                  {" "}
                  {element.date}{" "}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {element.details?.map((detail: detailsData) => (
                    <Box sx={consultantBox}>
                      {"ساعت :"} {detail.end_hour}-{detail.start_hour}
                      {" کلاس:"} {detail.branchClassRoom_name}
                      {" دانش آموز:"} {detail?.student?.first_name}{" "}
                      {detail?.student?.last_name} <br/>
                      {"ثبت نامی:"}{" "}
                      {detail?.student?.is_academy_student === 1
                        ? " آکادمی"
                        : "جذب"} <br/>
                      {"کد ملی:"} {detail?.student?.nationality_code}
                    </Box>
                  ))}
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
export default ConsultantTimeTable;
