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

import { showError, showSuccess } from "utils/swlAlert";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

interface ConsultantFinancialType {
  id: number;
  student_status: string;
  financial_status: string;
  manager_status: string;
}

const EditConsultantFinancialStatus = ({
  consultantFinancialId,
  //refreshData,
  openConsultantFinancialDialog,
  closeConsultantFinancialDialog,
}: //closeStudentStatusDialog,
{
  consultantFinancialId: number;
  // refreshData: Function;
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
  const [studentId, setStudentId] = useState<number>(1);
  const [studentFullName, setStudentFullName] = useState<string>();
  const [search, setSearch] = useState<SearchProps>({});
  const [editConsultantTimeTable] = useMutation(
    UPDATE_CONSULTANT_DEFINITION_DETAIL_STUDENT_ID
  );
  const [studentStatus, setStudentStatus] = useState<string>("no_action");
  const [managerStatus, setManagerStatus] = useState<string>("pending");
  const [financialStatus, setFinancialStatus] = useState<string>("pending");
  const [financialDescription, setFinancialDescription] = useState<string>("");

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
    // if(studentId===1){
    //   showError("دانش آموزی انتخاب نشده است.");
    //   return null;
    // }
  };

  //   setLoading(true);
  //   editConsultantTimeTable({
  //     variables: {
  //       id: consultantTimeTableId,
  //       student_id: studentId,
  //       student_status: studentStatus,
  //       absent_present_description: studentDescription,
  //     },
  //   })
  //     .then(() => {
  //       showSuccess("ویرایش با موفقبت انجام شد.");
  //       refreshData(search.student_status);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //       setOpen(false);
  //       closeStudentStatusDialog(true);
  //     });
  // };

  const handleCancel = () => {
    setOpen(false);
    closeConsultantFinancialDialog(true);
  };

  // const [onetimeTable, setOneTimeTable] = useState<detailsData>();

  //const { fetchMore, refetch } =
  // useQuery(GET_A_CONSULTANT_TIME_TABLE, {
  //   variables: {
  //     id: timeTableId,
  //   },
  //   onCompleted: (data) => {
  //     setOneTimeTable(data.getConsultantDefinitionDetail);
  //   },
  //   fetchPolicy: "no-cache",
  // });

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle minWidth={600}> مالی مشاور دانش آموز</DialogTitle>
      <Grid> </Grid>
      <DialogContent>
        <FormControl sx={{ width: "30%", alignItems: "center", margin: "2px" }}>
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
            <MenuItem value="ok">تایید شده</MenuItem>
            <MenuItem value="refused">انصراف</MenuItem>
            <MenuItem value="fired">اخراج</MenuItem>
            <MenuItem value={"financial_pending"}> در انتظار پرداخت </MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ width: "30%", alignItems: "left", margin: "2px" }}>
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

        {/* <Grid item xs={12} sm={4} lg={4} md={4} xl={4}> */}
        <FormControl sx={{ width: "30%", margin: "2px" }}>
          <InputLabel id="session-time-label"> وضعیت مالی </InputLabel>
          <Select
            labelId="session-time-label"
            value={financialStatus}
            onChange={(e) => {
              setFinancialStatus(e.target.value);
            }}
            input={<OutlinedInput label=" وضعیت مالی  " />}
            fullWidth
          >
            <MenuItem value="pending">در انتظار تایید</MenuItem>
            <MenuItem value="semi_approved">عدم پرداخت کامل</MenuItem>
            <MenuItem value="approved">تایید شده</MenuItem>
          </Select>
        </FormControl>
        {/* </Grid> */}
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
        <Button onClick={handleCancel}>انصراف</Button>
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

export default EditConsultantFinancialStatus;
