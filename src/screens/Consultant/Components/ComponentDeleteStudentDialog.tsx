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
  Typography,
} from "@mui/material";
import { SearchProps } from "../dto/search-student";
import { UPDATE_CONSULTANT_DEFINITION_DETAIL_STUDENT_ID } from "../gql/mutation";
import { showSuccess } from "utils/swlAlert";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

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

const customStyles = {
  width: 300,
  margin: "2px",
};

const ComponentDeleteStudentDialog = ({
  consultantTimeTableId,
  studentName,
  refreshData,
  openStudentDeleteDialog,
  closeStudentDeleteDialog,
}: {
  consultantTimeTableId: string | undefined;
  studentName: string | undefined;
  refreshData: Function;
  closeStudentDeleteDialog: Function;
  openStudentDeleteDialog: boolean;
}) => {
  //console.log("component student dialog is:", consultantTimeTableId);

  const params = useParams<string>();
  const timeTableId = consultantTimeTableId;

  const [open, setOpen] = React.useState(openStudentDeleteDialog);
  const [skip, setSkip] = useState<Boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [studentFullName, setStudentFullName] = useState<string>("");
  const [loadingStudent, setLoadingStudent] = useState<boolean>(false);
  const [loadingConsultantStudent, setLoadingConsultantStudent] =
    useState<boolean>(false);
  const [studentOptions, setStudentOptions] = useState<any[]>([]);
  const [studentIds, setStudentIds] = useState<number[]>([]);
  const [search, setSearch] = useState<SearchProps>({});
  const [editConsultantTimeTable] = useMutation(
    UPDATE_CONSULTANT_DEFINITION_DETAIL_STUDENT_ID
  );

  useQuery(GET_A_CONSULTANT_TIME_TABLE, {
    variables: {
      id: timeTableId,
    },
    onCompleted: (data) => {
      //console.log("data is:", data);
      setOneTimeTable(data.getConsultantDefinitionDetail);
    },
    fetchPolicy: "no-cache",
  });

  const { refetch: refetchStudents } = useQuery(GET_STUDENTS, {
    variables: {
      first: 1,
      page: 1,
      full_name: "",
      ids: [1],
      fetchPolicy: "network-only",
    },
    onCompleted: (data) => {
      // if (!skip) {
      const tmp: any = [];
      data.getStudents.data.map((item: any) => {
        tmp.push({
          id: +item.id,
          name: item.first_name + " " + item.last_name + " " + item.phone,
        });
        return item;
      });
      setStudentOptions(tmp);
      //}
    },
  });

  const { refetch: refetchStudentFinancials } = useQuery(
    GET_CONSULTANT_FINANCIALS,
    {
      variables: {
        first: 100,
        page: 1,
        full_name: "",
        consultant_id: Number(params.consultantId),
        fetchPolicy: "network-only",
      },
      onCompleted: (data) => {
        //if (!skip) {
        const studentIds: number[] = [];
        data.getConsultantFinancials.data.map((item: any) => {
          studentIds.push(Number(item.student_id));
          return item;
        });
        // }

        setStudentIds(studentIds);
        refetchStudents({
          first: 1000,
          page: 1,
          full_name: studentName,
          ids: studentIds,
        });
      },
    }
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDelete = () => {
    setLoading(true);
    editConsultantTimeTable({
      variables: {
        id: consultantTimeTableId,
        student_id: null,
      },
    })
      .then(() => {
        showSuccess("ویرایش با موفقبت انجام شد.");
        refreshData();
      })
      .finally(() => {
        setLoading(false);
        setOpen(false);
        closeStudentDeleteDialog(true);
      });
  };

  const handleCancel = () => {
    setOpen(false);
    closeStudentDeleteDialog(true);
  };

  const [onetimeTable, setOneTimeTable] = useState<detailsData>();

  //const { fetchMore, refetch } =

  return (
    <div>
      <div>
        {/* <FaceIcon fontSize="small" onClick={handleClickOpen} /> */}

        <Dialog open={open} onClose={handleCancel}>
          <DialogTitle sx={{ textAlign: "left" }}>
            تایید حذف دانش آموز{" "}
            <Typography
              variant="h6"
              component="h6"
              sx={{ fontSize: 9, fontWeight: "bold" }}
            >
             
              {onetimeTable?.start_hour
                ? onetimeTable.start_hour + " " + onetimeTable.end_hour
                : null}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <FormControl style={customStyles}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label=" دانش اموز "
                //label={studentName ? " دانش آموز " : " دانش آموز "}
                //placeholder=" دانش آموز "
                //value={inputValue}
                type="text"
                fullWidth
                variant="standard"
                value={studentName}
              />

              {/* <Typography
                variant="h6"
                component="h6"
                sx={{ fontSize: 9, fontWeight: "bold" }}
              >
                {onetimeTable?.start_hour
                  ? onetimeTable.start_hour + " " + onetimeTable.end_hour
                  : null}
              </Typography> */}
            </FormControl>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleCancel}>انصراف</Button>
            <Button onClick={handleDelete}>حذف</Button>
          </DialogActions>
        </Dialog>
      </div>
      <div style={{ textAlign: "right" }}>
        <Button
          startIcon={<PersonAddAlt1Icon sx={{ textAlign: "right" }} />}
          sx={{
            color: "black",
            fontSize: 13,
            fontWeight: 800,
            textAlign: "right",
          }}
          onClick={handleClickOpen}
        ></Button>
      </div>
    </div>
  );
};

export default ComponentDeleteStudentDialog;
