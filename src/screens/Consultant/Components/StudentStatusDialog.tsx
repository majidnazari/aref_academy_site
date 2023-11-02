import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import {
  GET_A_CONSULTANT_TIME_TABLE,
  GET_STUDENTS,
  GET_CONSULTANT_FINANCIALS,
} from "../gql/query";
import {
  Autocomplete,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import { SearchProps } from "../dto/search-student-status";
import { UPDATE_CONSULTANT_DEFINITION_DETAIL_STUDENT_ID } from "../gql/mutation";
import { GET_CONSULTANT_DEFINITION_DETAIL } from "../gql/query";

import { showError, showSuccess } from "utils/swlAlert";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

interface detailsData {
  id: string;
  consultant_id: number;
  consultant_first_name: string;
  student_id: string;
  // student: StudentData;
  branch_class_room_id: number;
  start_hour: string;
  end_hour: string;
  session_date: string;
  branchClassRoom_name: string;
}

const StudentStatusComponent = ({
  consultantTimeTableId,

  refreshData,
  openStudentStatusDialog,
  closeStudentStatusDialog,
}: {
  consultantTimeTableId: string | undefined;

  refreshData: Function;
  openStudentStatusDialog: boolean;
  closeStudentStatusDialog: Function;
}) => {
  const params = useParams<string>();
  const timeTableId = consultantTimeTableId;
  const [open, setOpen] = React.useState(openStudentStatusDialog);
  const [skip, setSkip] = useState<Boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [studentName, setStudentName] = useState<string>("");
  const [loadingStudent, setLoadingStudent] = useState<boolean>(false);
  const [loadingConsultantStudent, setLoadingConsultantStudent] =
    useState<boolean>(false);
  const [studentOptions, setStudentOptions] = useState<any[]>([]);
  const [studentId, setStudentId] = useState<number>(1);
  const [studentFullName, setStudentFullName] = useState<string>();
  const [search, setSearch] = useState<SearchProps>({});
  const [editConsultantTimeTable] = useMutation(
    UPDATE_CONSULTANT_DEFINITION_DETAIL_STUDENT_ID
  );
  const [studentStatus, setStudentStatus] = useState<string>("no_action");
  const [consultantStatus, setConsultantStatus] = useState<string>("no_action");
  const [sessionStatus, setSessionStatus] = useState<string>("no_action");
  const [studentDescription, setStudentDescription] = useState<string>("");
  const [startHour, setStartHour] = useState<string>("");
  const [endtHour, setEndHour] = useState<string>("");

  const customStyles = {
    width: 500,
    margin: "2px",
  };

  const divStyle = {
    backgroundColor: "blue",
    color: "white",
    padding: "10px",
    borderRadius: "5px",
    width: "800px",
  };

  // const { refetch: refetchStudentFinancials } = useQuery(
  //   GET_CONSULTANT_FINANCIALS,
  //   {
  //     variables: {
  //       first: 100,
  //       page: 1,
  //       full_name: "",
  //       consultant_id: Number(params.consultantId),
  //       fetchPolicy: "network-only",
  //     },
  //     onCompleted: (data) => {
  //       //if (!skip) {
  //       const studentId: number[] = [];
  //       data.getConsultantFinancials.data.map((item: any) => {
  //         studentId.push(Number(item.student_id));
  //         return item;
  //       });
  //       // }

  //       setStudentId(studentId);
  //       refetchStudents({
  //         first: 1000,
  //         page: 1,
  //         full_name: studentName,
  //         ids: studentId,
  //       });
  //     },
  //   }
  // );

  const { refetch: refetchConsultantDefinitionDetail, loading: isLoading } =
    useQuery(GET_CONSULTANT_DEFINITION_DETAIL, {
      variables: {
        id: timeTableId,
      },
      onCompleted: (data) => {
        setStudentId(data.getConsultantDefinitionDetail.student_id ?? 1);
        setStudentStatus(data.getConsultantDefinitionDetail.student_status);
        setStudentDescription(
          data.getConsultantDefinitionDetail.absent_present_description
        );
        setStartHour(data.getConsultantDefinitionDetail.start_hour);
        setEndHour(data.getConsultantDefinitionDetail.end_hour);
        setConsultantStatus(data.getConsultantDefinitionDetail.consultant_status);
        setSessionStatus(data.getConsultantDefinitionDetail.session_status);
      },
      fetchPolicy: "no-cache",
    });

  const { refetch: refetchStudents, loading: studentLoading } = useQuery(
    GET_STUDENTS,
    {
      variables: {
        first: 1,
        page: 1,
        full_name: "",
        ids: studentId,
        fetchPolicy: "network-only",
      },
      onCompleted: (data) => {
        const tmp =
          data.getStudents.data[0].first_name +
          " " +
          data.getStudents.data[0].last_name;
        setStudentFullName(tmp);
        //alert(studentId);

        // if (!skip) {
        // const tmp: any = [];
        // data.getStudents.data.map((item: any) => {
        //   tmp.push({
        //     id: +item.id,
        //     name: item.first_name + " " + item.last_name + " " + item.phone,
        //   });
        //   return item;
        // });
        // setStudentOptions(tmp);
        //}
      },
      skip: true,
    }
  );

  React.useEffect(() => {
    setLoadingStudent(true);
    refetchStudents({
      first: 1,
      page: 1,
      ids: studentId,
    }).then((data) => {
      //console.log("data is:" , data);
      setLoadingStudent(false);
    });
  }, [studentId]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAdd = () => {
    if (studentId === 1) {
      showError("دانش آموزی انتخاب نشده است.");
      return null;
    }

    setLoading(true);
    editConsultantTimeTable({
      variables: {
        id: consultantTimeTableId,
        student_id: studentId,
        student_status: studentStatus,
        consultant_status: consultantStatus,
        session_status: sessionStatus,
        absent_present_description: studentDescription,
      },
    })
      .then(() => {
        showSuccess("ویرایش با موفقبت انجام شد.");
        refreshData(search.student_status);
      })
      .finally(() => {
        setLoading(false);
        setOpen(false);
        closeStudentStatusDialog(true);
      });
  };

  const handleCancel = () => {
    setOpen(false);
    closeStudentStatusDialog(true);
  };

  const [onetimeTable, setOneTimeTable] = useState<detailsData>();

  //const { fetchMore, refetch } =
  useQuery(GET_A_CONSULTANT_TIME_TABLE, {
    variables: {
      id: timeTableId,
    },
    onCompleted: (data) => {
      setOneTimeTable(data.getConsultantDefinitionDetail);
    },
    fetchPolicy: "no-cache",
  });

  return (
    <Dialog open={openStudentStatusDialog} onClose={handleCancel}>
      <DialogTitle minWidth={600}> تغییر وضعیت دانش آموز </DialogTitle>
      <Grid> </Grid>
      <Grid item xs={12} sm={6} lg={6} md={6} xl={6}>
        <FormControl sx={{ width: "50%", alignItems: "center" }}>
          <Typography variant="h6" component="h6">
            {studentFullName ? studentFullName : " دانش آموزی وجود ندارد"}
          </Typography>
        </FormControl>
        <FormControl sx={{ width: "50%", alignItems: "left" }}>
          <Typography variant="h6" component="h6">
            {startHour} - {endtHour}
          </Typography>
        </FormControl>
      </Grid>

      <DialogContent>
        <Grid item xs={12} sm={6} lg={6} md={6} xl={6}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="session-status-label">
              {" "}
              وضعیت تاخیر و تعجیل جلسه
            </InputLabel>
            <Select
              labelId="session-status-label"
              value={sessionStatus}
              onChange={(e) => {
                setSessionStatus(e.target.value);
              }}
              input={<OutlinedInput label=" وضعیت تاخیر وتعجیل جلسه" />}
              fullWidth
            >
              <MenuItem value={"no_action"}> بدون تغییر</MenuItem>
              <MenuItem value={"earlier_5min_finished"}>
                {" "}
                تعجیل ۵ دقیقه ای{" "}
              </MenuItem>
              <MenuItem value={"earlier_10min_finished"}>
                {" "}
                تعجیل ۱۰ دقیقه ای{" "}
              </MenuItem>
              <MenuItem value={"earlier_15min_finished"}>
                {" "}
                تعجیل ۱۵ دقیقه ای{" "}
              </MenuItem>
              <MenuItem value={"earlier_15min_more_finished"}>
                {" "}
                تعجیل بیشتر از ۱۵ دقیقه{" "}
              </MenuItem>
              <MenuItem value={"later_5min_started"}>
                {" "}
                تاخیر ۵ دقیقه ای{" "}
              </MenuItem>
              <MenuItem value={"later_10min_started"}>
                {" "}
                تاخیر ۱۰ دقیقه ای{" "}
              </MenuItem>
              <MenuItem value={"later_15min_started"}>
                {" "}
                تاخیر ۱۵ دقیقه ای{" "}
              </MenuItem>
              <MenuItem value={"later_15min_more_started"}>
                {" "}
                تاخیر بیشتر از ۱۵ دقیقه{" "}
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </DialogContent>
      <DialogContent>
        <Grid item xs={12} sm={6} lg={6} md={6} xl={6}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="consultant-status-label"> وضعیت مشاور </InputLabel>
            <Select
              labelId="consultant-status-label"
              value={consultantStatus}
              onChange={(e) => {
                setConsultantStatus(e.target.value);
              }}
              input={<OutlinedInput label=" وضعیت مشاور" />}
              fullWidth
            >
              <MenuItem value={"no_action"}> بدون تغییر</MenuItem>
              <MenuItem value={"absent"}> حاضر </MenuItem>
              <MenuItem value={"present"}> غایب </MenuItem>
              <MenuItem value={"dellay5"}> تاخیر ۵ دقیقه ای </MenuItem>
              <MenuItem value={"dellay10"}> تاخیر ۱۰ دقیقه ای </MenuItem>
              <MenuItem value={"dellay15"}> تاخیر ۱۵ دقیقه ای </MenuItem>
              <MenuItem value={"dellay15more"}>
                {" "}
                تاخیر بیشتر از ۱۵ دقیقه{" "}
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </DialogContent>
      <DialogContent>
        <Grid item xs={12} sm={6} lg={6} md={6} xl={6}>
          <FormControl sx={{ width: "100%" }}>
            <TextField
              fullWidth
              label="توضیحات"
              value={studentDescription}
              onChange={(e) => {
                setStudentDescription(e.target.value);
              }}
            />
          </FormControl>
        </Grid>
      </DialogContent>

      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: 5,
        }}
      >
        <Button color="error" variant="contained" onClick={handleCancel}>
          انصراف
        </Button>
        <Button
          color="success"
          variant="contained"
          onClick={handleAdd}
          disabled={isLoading}
          endIcon={isLoading && <CircularProgress size={15} />}
        >
          {" "}
          ذخیره{" "}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StudentStatusComponent;
