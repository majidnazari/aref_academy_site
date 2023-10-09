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
} from "@mui/material";
import { SearchProps } from "../dto/search-student-status";
import { UPDATE_CONSULTANT_DEFINITION_DETAIL_STUDENT_ID } from "../gql/mutation";
import { GET_CONSULTANT_DEFINITION_DETAIL } from "../gql/query";

import { showSuccess } from "utils/swlAlert";
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
  closeStudentStatusDialog
}: {
  consultantTimeTableId: string | undefined;
  refreshData: Function;
  openStudentStatusDialog:boolean;
  closeStudentStatusDialog:Function;
}) => {
  const params = useParams<string>();
  const timeTableId = consultantTimeTableId;

  console.log("component student status is:" , timeTableId);
  console.log("component student status setOpen is:" , openStudentStatusDialog);

  const [open, setOpen] = React.useState(openStudentStatusDialog);
  const [skip, setSkip] = useState<Boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [studentName, setStudentName] = useState<string>("");
  const [loadingStudent, setLoadingStudent] = useState<boolean>(false);
  const [loadingConsultantStudent, setLoadingConsultantStudent] =
    useState<boolean>(false);
  const [studentOptions, setStudentOptions] = useState<any[]>([]);
  const [studentIds, setStudentIds] = useState<number[]>([]);
  const [search, setSearch] = useState<SearchProps>({});
  const [editConsultantTimeTable] = useMutation(
    UPDATE_CONSULTANT_DEFINITION_DETAIL_STUDENT_ID
  );
  const [studentStatus, setStudentStatus] = useState<string>("no_action");
  const [studentDescription, setStudentDescription] = useState<string>("");

  const customStyles = {
    width: 300,
    margin: "2px",
  };

  // const { refetch: refetchStudents } = useQuery(GET_STUDENTS, {
  //   variables: {
  //     first: 1,
  //     page: 1,
  //     full_name: "",
  //     ids: [1],
  //     fetchPolicy: "network-only",
  //   },
  //   onCompleted: (data) => {
  //     // if (!skip) {
  //     const tmp: any = [];
  //     data.getStudents.data.map((item: any) => {
  //       tmp.push({
  //         id: +item.id,
  //         name: item.first_name + " " + item.last_name + " " + item.phone,
  //       });
  //       return item;
  //     });
  //     setStudentOptions(tmp);
  //     //}
  //   },
  // });

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
  //       const studentIds: number[] = [];
  //       data.getConsultantFinancials.data.map((item: any) => {
  //         studentIds.push(Number(item.student_id));
  //         return item;
  //       });
  //       // }

  //       setStudentIds(studentIds);
  //       refetchStudents({
  //         first: 1000,
  //         page: 1,
  //         full_name: studentName,
  //         ids: studentIds,
  //       });
  //     },
  //   }
  // );

  const { refetch:refetchConsultantDefinitionDetail } = useQuery(GET_CONSULTANT_DEFINITION_DETAIL, {
    variables: {
      id: timeTableId,
    },
    onCompleted: (data) => {
      console.log("the row  and GET_CONSULTANT_DEFINITION_DETAIL" + timeTableId + " is:" ,data.getConsultantDefinitionDetail);
      setStudentIds(data.getConsultantDefinitionDetail.student_id);
      alert("student id is:" + data.getConsultantDefinitionDetail.student_id)
    },
    fetchPolicy: "no-cache",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAdd = () => {
    alert( search?.student_status);
    alert( search?.absent_present_description);
    setLoading(true);
    editConsultantTimeTable({
      variables: {
        id: consultantTimeTableId,
        student_id: studentIds,
        student_status: search?.student_status,
        absent_present_description: search?.absent_present_description,
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
    <div>
      <div>
        {/* <FaceIcon fontSize="small" onClick={handleClickOpen} /> */}

        <Dialog open={open} onClose={handleCancel}>
          <DialogTitle> تغییر وضعیت دانش آموز </DialogTitle><Grid></Grid>
          <DialogContent>            
            <Grid item xs={12} sm={6} md={2} xl={2}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="session-time-label">
                  {" "}
                  وضعیت دانش آموز{" "}
                </InputLabel>
                <Select
                  labelId="session-time-label"
                  value={studentStatus}
                  onChange={(e) => {
                    setStudentStatus(e.target.value);
                  }}
                  input={<OutlinedInput label=" وضعیت دانش آموز " />}
                  fullWidth
                >
                  <MenuItem value={"no_action"}> بدون تغییر</MenuItem>
                  <MenuItem value={"absent"}> غایب </MenuItem>
                  <MenuItem value={"present"}> حاضر </MenuItem>
                  <MenuItem value={"dellay"}> تاخیر </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </DialogContent>
          <DialogContent>
            <Grid item xs={12} sm={6} md={2} xl={2}>
              <FormControl
                sx={{ width: "100%" }}
              >
                <TextField
                  fullWidth
                  label="توضیحات"
                  value={studentDescription}
                  onChange={(e) => {
                    setStudentDescription(e.target.value )
                  }}
                  
                />
              </FormControl>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleCancel}>انصراف</Button>
            <Button onClick={handleAdd}> ذخیره </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <Button
          endIcon={<ManageAccountsIcon />}
          onClick={handleClickOpen}
        ></Button>
      </div>
    </div>
  );
};

export default StudentStatusComponent;
