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

const ComponentStudentDialog = ({
  consultantTimeTableId,
  refreshData,
  studentIdsOfOneConsultant,
  openDialog,
  //setDialogOpen
  closeDialog,
}: {
  consultantTimeTableId: string | undefined;
  refreshData: Function;
  studentIdsOfOneConsultant: number[] | undefined;
  closeDialog: Function;
  openDialog: boolean;
  //setDialogOpen:Function;
}) => {
  //console.log("component student dialog studentIdsOfOneConsultant are :", studentIdsOfOneConsultant);

  const params = useParams<string>();
  const timeTableId = consultantTimeTableId;

  const [open, setOpen] = React.useState(openDialog);
  // const [dialogrefreshData, setDialogRefreshData] = React.useState(refreshData);
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
  const customStyles = {
    width: 300,
    margin: "2px",
  };

  const { refetch: refetchStudents } = useQuery(GET_STUDENTS, {
    variables: {
      first: 100,
      page: 1,
      full_name: "",
      ids: studentIdsOfOneConsultant,
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
    //skip: true,
  });

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
  //     skip: Boolean(studentIdsOfOneConsultant),
  //   }
  // );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAdd = () => {
    setLoading(true);
    editConsultantTimeTable({
      variables: {
        id: consultantTimeTableId,
        student_id: search?.student_id,
      },
    })
      .then(() => {
        showSuccess("ویرایش با موفقبت انجام شد.");
        refreshData();
        //refreshData(search.student_id);
        // setDialogRefreshData(true);
      })
      .finally(() => {
        setLoading(false);
        setOpen(false);
        closeDialog(true);
      });
  };

  const handleCancel = () => {
    setOpen(false);
    closeDialog(true);
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
          <DialogTitle>افزودن دانش آموز</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
           
           </DialogContentText> */}

            {/* <TextField
              autoFocus
              margin="dense"
              id="name"
              label="جلسه مشاوره "
              type="text"
              fullWidth
              variant="standard"
            /> */}

            <FormControl
              sx={{
                m: 1,
                width: "90%",
              }}
            >
              <Autocomplete
                id="student-names"
                options={studentOptions || studentIdsOfOneConsultant}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="دانش آموز"
                    variant="outlined"
                    onChange={(e) => {
                      if (e.target.value.trim().length >= 1) {
                        setSkip(false);
                        setStudentName(e.target.value.trim());
                      }
                    }}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loadingStudent ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
                getOptionLabel={(option) => option.name}
                value={search?.student_id}
                style={customStyles}
                onChange={(_event, newTeam) => {
                  setSearch({
                    ...search,
                    student_id: newTeam?.id ? +newTeam.id : undefined,
                  });
                }}
              />
            </FormControl>
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
            <Button color="success" variant="contained" onClick={handleAdd}>
              افزودن
            </Button>
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

export default ComponentStudentDialog;
