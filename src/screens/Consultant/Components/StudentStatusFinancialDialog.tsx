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
import { UPDATE_CONSULTANT_FINANCIAL } from "../gql/mutation";
import { GET_A_CONSULTANT_FINANCIAL } from "../gql/query";

import { showError, showSuccess } from "utils/swlAlert";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { getUserData } from "utils/user";

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

const StudentStatusFinancialDialog = ({
  consultantFinancialId,
  refreshData,
  openConsultantFinancialDialog,
  closeConsultantFinancialDialog,
}: {
  consultantFinancialId: number | undefined;
  refreshData: Function;
  openConsultantFinancialDialog: boolean;
  closeConsultantFinancialDialog: Function;
}) => {
  const params = useParams<string>();
  const consultantStudentFinancialId = consultantFinancialId;
  const [open, setOpen] = React.useState(openConsultantFinancialDialog);
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
  const [editConsultantFinancial] = useMutation(UPDATE_CONSULTANT_FINANCIAL);
  const [studentStatus, setStudentStatus] = useState<string>("ok");
  const [financialStatus, setFinancialStatus] = useState<string>("pending");
  const [managerStatus, setManagerStatus] = useState<string>("pending");
  const [financialRefusedStatus, setFinancialRefusedStatus] =
    useState<string>("noMoney");
  const [financialDescription, setFinancialDescription] = useState<string>("");
  const [consultantId, setConsultantId] = useState<number>();
  const [yearId, setYearId] = useState<number>();

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

  const { refetch: refetchConsultantFinancial, loading: isLoading } = useQuery(
    GET_A_CONSULTANT_FINANCIAL,
    {
      variables: {
        id: consultantStudentFinancialId,
      },
      onCompleted: (data) => {
        setStudentId(data.getConsultantFinancial.student_id ?? 1);
        setStudentStatus(data.getConsultantFinancial.student_status);
        setFinancialDescription(data.getConsultantFinancial.description);
        setFinancialStatus(data.getConsultantFinancial.financial_status);
        setManagerStatus(data.getConsultantFinancial.manager_status);
        setFinancialRefusedStatus(
          data.getConsultantFinancial.financial_refused_status
        );
        setConsultantId(data.getConsultantFinancial.consultant_id);
        setYearId(data.getConsultantFinancial.year_id);
      },
      fetchPolicy: "no-cache",
    }
  );

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
    editConsultantFinancial({
      variables: {
        id: consultantFinancialId,
        student_id: studentId,
        consultant_id: consultantId,
        student_status: studentStatus,
        financial_status: financialStatus,
        manager_status: managerStatus,
        financial_refused_status: financialRefusedStatus,
        description: financialDescription,
        year_id: yearId,
      },
    })
      .then(() => {
        showSuccess("ویرایش با موفقبت انجام شد.");
        refreshData(search.student_status);
      })
      .finally(() => {
        setLoading(false);
        setOpen(false);
        closeConsultantFinancialDialog(true);
      });
  };

  const handleCancel = () => {
    setOpen(false);
    closeConsultantFinancialDialog(true);
  };

  const [onetimeTable, setOneTimeTable] = useState<detailsData>();

  //const { fetchMore, refetch } =
  useQuery(GET_A_CONSULTANT_TIME_TABLE, {
    variables: {
      id: consultantStudentFinancialId,
    },
    onCompleted: (data) => {
      setOneTimeTable(data.getConsultantDefinitionDetail);
    },
    fetchPolicy: "no-cache",
  });

  const studentCoursePermission = ["admin", "financial", "manager"];
  const financialPermission = ["admin", "financial"];
  const user = getUserData();

  return (
    <Dialog open={openConsultantFinancialDialog} onClose={handleCancel}>
      <DialogTitle minWidth={600}> تغییر وضعیت دانش آموز </DialogTitle>
      <Grid> </Grid>
      <Grid item xs={12} sm={6} lg={6} md={6} xl={6}>
        <FormControl sx={{ width: "50%", alignItems: "center" }}>
          <Typography variant="h6" component="h6">
            {studentFullName ? studentFullName : " دانش آموزی وجود ندارد"}
          </Typography>
        </FormControl>
        {/* <FormControl sx={{ width: "50%", alignItems: "left" }}>
          <Typography variant="h6" component="h6">
            {startHour} - {endtHour}
          </Typography>
        </FormControl> */}
      </Grid>
      <DialogContent>
        <Grid item xs={12} sm={6} lg={6} md={6} xl={6}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="student-status-label"> وضعیت دانش آموز </InputLabel>
            <Select
              labelId="student-status-label"
              value={studentStatus}
              onChange={(e) => {
                setStudentStatus(e.target.value);
              }}
              input={<OutlinedInput label=" وضعیت دانش آموز " />}
              fullWidth
            >
              <MenuItem value={""}> </MenuItem>
              <MenuItem value={"ok"}> تایید </MenuItem>
              <MenuItem value={"refused"}> انصراف </MenuItem>
              <MenuItem value={"fired"}> اخراج </MenuItem>
              <MenuItem value={"financial_pending"}> عدم تسویه مالی</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </DialogContent>

      <DialogContent>
        <Grid item xs={12} sm={6} lg={6} md={6} xl={6}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="manager-status-label"> تایید مدیر</InputLabel>
            <Select
              labelId="manager-status-label"
              value={managerStatus}
              onChange={(e) => {
                setManagerStatus(e.target.value);
              }}
              input={<OutlinedInput label=" وضعیت تایید مدیر" />}
              fullWidth
            >
              <MenuItem value={""}> </MenuItem>
              <MenuItem value={"pending"}> عدم تایید </MenuItem>
              <MenuItem value={"approved"}> تایید </MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </DialogContent>
      {financialPermission.includes(user.group.name) ? (
        <>
          <DialogContent>
            <Grid item xs={12} sm={6} lg={6} md={6} xl={6}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="financial-status-label">
                  {" "}
                  وضعیت مالی{" "}
                </InputLabel>
                <Select
                  labelId="financial-status-label"
                  value={financialStatus}
                  onChange={(e) => {
                    setFinancialStatus(e.target.value);
                  }}
                  input={<OutlinedInput label=" وضعیت مالی" />}
                  fullWidth
                >
                  <MenuItem value={""}> </MenuItem>
                  <MenuItem value={"approved"}> پرداخت </MenuItem>
                  <MenuItem value={"pending"}> بدهکار </MenuItem>
                  <MenuItem value={"semi_approved"}> عدم تسویه کامل </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </DialogContent>

          <DialogContent>
            <Grid item xs={12} sm={6} lg={6} md={6} xl={6}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="financial-refused-status-label">
                  {" "}
                  وضعیت اخراج دانش آموز{" "}
                </InputLabel>
                <Select
                  labelId="financial-refused-status-label"
                  value={financialRefusedStatus}
                  onChange={(e) => {
                    setFinancialRefusedStatus(e.target.value);
                  }}
                  input={<OutlinedInput label=" وضعیت اخراج دانش آموز" />}
                  fullWidth
                >
                  <MenuItem value={""}> </MenuItem>
                  <MenuItem value={"noMoney"}> پول نداده </MenuItem>
                  <MenuItem value={"not_returned"}> پولی ما ندادیم </MenuItem>
                  <MenuItem value={"returned"}> ما تسویه کردیم </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </DialogContent>
        </>
      ) : null}

      <DialogContent>
        <Grid item xs={12} sm={6} lg={6} md={6} xl={6}>
          <FormControl sx={{ width: "100%" }}>
            <TextField
              fullWidth
              label="توضیحات"
              value={financialDescription}
              onChange={(e) => {
                setFinancialDescription(e.target.value);
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

export default StudentStatusFinancialDialog;
