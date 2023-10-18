import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import {
  GET_A_CONSULTANT_TIME_TABLE,
  GET_STUDENTS,
  GET_CONSULTANT_FINANCIALS,
  GET_A_CONSULTANT_FINANCIAL,
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
import { UPDATE_CONSULTANT_FINANCIAL } from "../gql/mutation";

import { showError, showSuccess } from "utils/swlAlert";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { getUserData, useAuth } from "utils/user";

interface ConsultantFinancialType {
  id: number;
  student_status: string;
  financial_status: string;
  manager_status: string;
}

const EditManagerConsultantFinancialStatus = ({
  consultantFinancialId,
  refreshData,
  openConsultantFinancialDialog,
  closeConsultantFinancialDialog,
}: //closeStudentStatusDialog,
{
  consultantFinancialId: number;
  refreshData: Function;
  openConsultantFinancialDialog: boolean;
  closeConsultantFinancialDialog: Function;
}) => {
  const params = useParams<string>();
  // const financialId = consultantTimeTableId;
  const [open, setOpen] = React.useState(openConsultantFinancialDialog);
  const [skip, setSkip] = useState<Boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [studentName, setStudentName] = useState<string>("");
  const [loadingStudent, setLoadingStudent] = useState<boolean>(false);
  const [loadingConsultantStudent, setLoadingConsultantStudent] =
    useState<boolean>(false);
  const [studentOptions, setStudentOptions] = useState<any[]>([]);
  const [studentFullName, setStudentFullName] = useState<string>();
  const [search, setSearch] = useState<SearchProps>({});
  const [editConsultantTimeTable] = useMutation(
    UPDATE_CONSULTANT_DEFINITION_DETAIL_STUDENT_ID
  );
  const [editConsultantfinancial] = useMutation(UPDATE_CONSULTANT_FINANCIAL);
  const [studentStatus, setStudentStatus] = useState<string>("no_action");
  const [managerStatus, setManagerStatus] = useState<string>("pending");
  const [financialStatus, setFinancialStatus] = useState<string>("pending");
  const [financialDescription, setFinancialDescription] = useState<string>("");

  const [consultantId, setConsultantId] = useState<number>(0);
  const [studentId, setStudentId] = useState<number>(0);
  const [branchId, setBranchId] = useState<number>(0);
  const [yearId, setYearId] = useState<number>(0);

  

  // const userInfo = useAuth();
  // const navigate = useNavigate();

  // if (!userInfo) {
  //   navigate("/signout");
  // }

  const { refetch: refetchConsultantFinancial, loading: isLoading } = useQuery(
    GET_A_CONSULTANT_FINANCIAL,
    {
      variables: {
        id: consultantFinancialId,
      },
      onCompleted: (data) => {
       
        setStudentStatus(data.getConsultantFinancial.student_status);
        setManagerStatus(data.getConsultantFinancial.manager_status);
        setFinancialStatus(data.getConsultantFinancial.financial_status);
        setFinancialDescription(data.getConsultantFinancial.description);

        setConsultantId(data.getConsultantFinancial.consultant_id);
        setStudentId(data.getConsultantFinancial.student_id);
        setBranchId(data.getConsultantFinancial.branch_id);
        setYearId(data.getConsultantFinancial.year_id);
      },
      fetchPolicy: "no-cache",
    }
  );

  // React.useEffect(() => {

  //   setLoadingStudent(true);
  //   refetchStudents({
  //     first: 1,
  //     page: 1,
  //     ids: studentId,
  //   }).then((data) => {
  //     //console.log("data is:" , data);
  //     setLoadingStudent(false);
  //   });
  // }, [studentId]);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleAdd = () => {
    editConsultantfinancial({
      variables: {
        consultant_id: consultantId,
        student_id: studentId,
        branch_id: branchId,
        year_id: yearId,

        manager_status: managerStatus,  
        student_status: studentStatus,
        description: financialDescription,
      },
      onCompleted(data, clientOptions) {   

        showSuccess("ویرایش با موفقیت انجام شد.");
        refreshData();
      },
    });
  };

 
  const handleCancel = () => {
    setOpen(false);
    closeConsultantFinancialDialog(true);
  };

  return (
    
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle minWidth={600}> فرم وضعیت دانش آموز</DialogTitle>
      <Grid> </Grid>
      <DialogContent>  

        <FormControl sx={{ width: "45%", alignItems: "center", margin: "2px" }}>
          <InputLabel id="session-time-label"> وضعیت دانش آموز </InputLabel>
          <Select
            labelId="session-time-label"
            value={studentStatus}
            onChange={(e) => {
              setStudentStatus(e.target.value);
            }}
            input={<OutlinedInput label=" وضعیت دانش آموز " />}
            fullWidth
          >
            <MenuItem value="ok"> فعال </MenuItem>
            <MenuItem value="refused">انصراف</MenuItem>
            <MenuItem value="fired">اخراج</MenuItem>
            <MenuItem value={"financial_pending"}> در انتظار پرداخت </MenuItem>
          </Select>
        </FormControl> 

        <FormControl sx={{ width: "50%", alignItems: "left", margin: "2px" }}>
          <InputLabel id="session-time-label"> مدیر مشاور</InputLabel>
          <Select
            labelId="session-time-label"
            value={managerStatus}
            onChange={(e) => {
              setManagerStatus(e.target.value);
            }}
            input={<OutlinedInput label=" مدیر مشاور" />}
            fullWidth
          >
            <MenuItem value="approved">تایید شده</MenuItem>
            <MenuItem value="pending">عدم تایید</MenuItem>
          </Select>
        </FormControl>
       
      </DialogContent>
     

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

      <DialogActions>
        <Button onClick={handleCancel}>بستن</Button>
        <Button
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

export default EditManagerConsultantFinancialStatus;
