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
import { Divide_Consultant_Definition_Detail_Time, UPDATE_CONSULTANT_DEFINITION_DETAIL_STUDENT_ID } from "../gql/mutation";
import { GET_CONSULTANT_DEFINITION_DETAIL } from "../gql/query";

import { showError, showSuccess } from "utils/swlAlert";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import moment from "moment";

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

const TimeSpliterDialog = ({
  definitionId,
  refreshData,
  openTimeSpliterDialog,
  closeTimeSplietrDialog,
}: {
  definitionId: string | undefined;
  refreshData: Function;
  openTimeSpliterDialog: boolean;
  closeTimeSplietrDialog: Function;
}) => {
  // const params = useParams<string>();
  // const timeTableId = consultantTimeTableId;
  const [open, setOpen] = React.useState(openTimeSpliterDialog);
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
  const [splitConsultantTimeTable] = useMutation(
    Divide_Consultant_Definition_Detail_Time
  );
  // const [studentStatus, setStudentStatus] = useState<string>("no_action");
  // const [consultantStatus, setConsultantStatus] = useState<string>("present");
  // const [sessionStatus, setSessionStatus] = useState<string>("no_action");
  const [clientTime, setClientTime] = useState<string>("");
  const [startHour, setStartHour] = useState<string>("");
  const [endtHour, setEndHour] = useState<string>("");
  const [diffInMin, setDiffInMin] = useState<number>();
  const [lableDiffInMin, setLableDiffInMin] = useState<string>("");
  const [onetimeTable, setOneTimeTable] = useState<detailsData>();


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

  const { refetch: refetchConsultantDefinitionDetail, loading: isLoading } =
    useQuery(GET_CONSULTANT_DEFINITION_DETAIL, {
      variables: {
        id: definitionId,
      },
      onCompleted: (data) => {
        setStartHour(data.getConsultantDefinitionDetail.start_hour);
        setEndHour(data.getConsultantDefinitionDetail.end_hour);
        const startTime = moment(
          data.getConsultantDefinitionDetail.start_hour,
          "HH:mm"
        );
        const endTime = moment(
          data.getConsultantDefinitionDetail.end_hour,
          "HH:mm:ss"
        );
        const duration = moment.duration(endTime.diff(startTime));
        setDiffInMin(duration.asMinutes());
        const minutes = duration.asMinutes();
        // console.log("DiffInMin is:", minutes);
        setLableDiffInMin("زمان ۱ تا "  +  (minutes -1) + "  دقیقه را میتوانید وارد کنید");
        
      },
      fetchPolicy: "no-cache",
    });

  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAdd = () => {   

    setLoading(true);
    splitConsultantTimeTable({
      variables: {
        definition_id: Number(definitionId),
         division_time: Number(clientTime),
        
      },
    })
      .then(() => {
        showSuccess("ویرایش با موفقبت انجام شد.");
        refreshData();
      })
      .finally(() => {
        setLoading(false);
        setOpen(false);
        closeTimeSplietrDialog(true);
      });
  };

  const handleCancel = () => {
    setOpen(false);
    closeTimeSplietrDialog(true);
  };


  return (
    <Dialog open={openTimeSpliterDialog} onClose={handleCancel}>
      <DialogTitle minWidth={200}> فرم تقسیم تایم مشاور</DialogTitle>
      <Grid> </Grid>

      <DialogContent>
        <Grid item xs={12} sm={3} lg={3} md={3} xl={3}>
          <FormControl sx={{ width: "100%" }}>
            <TextField
              fullWidth
              label={lableDiffInMin}
              value={clientTime}
              onChange={(e) => {
                setClientTime(e.target.value);
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

export default TimeSpliterDialog;
