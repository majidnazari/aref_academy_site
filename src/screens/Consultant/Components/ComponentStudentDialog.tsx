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
import { GET_A_CONSULTANT_TIME_TABLE, GET_STUDENTS } from "../gql/query";
import {
  Autocomplete,
  CircularProgress,
  FormControl,
  Grid,
} from "@mui/material";
import { SearchProps } from "../dto/search-student";
import { UPDATE_CONSULTANT_DEFINITION_DETAIL_STUDENT_ID } from "../gql/mutation";
import { showSuccess } from "utils/swlAlert";
import FaceIcon from "@mui/icons-material/Face";

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
  parentStudentId,
}: {
  consultantTimeTableId: string;
  refreshData: any;
  parentStudentId: number | undefined;
}) => {
  const params = useParams<string>();
  const timeTableId = consultantTimeTableId;

  const [open, setOpen] = React.useState(false);
  const [skip, setSkip] = useState<Boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [lessonName, setLessonName] = useState<string>("");
  const [loadingLesson, setLoadingLesson] = useState<boolean>(false);
  const [lessonOptions, setLessonOptions] = useState<any[]>([]);
  const [search, setSearch] = useState<SearchProps>({});
  const [editConsultantTimeTable] = useMutation(
    UPDATE_CONSULTANT_DEFINITION_DETAIL_STUDENT_ID
  );

  const { refetch: refetchLessons } = useQuery(GET_STUDENTS, {
    variables: {
      first: 1,
      page: 1,
      full_name: "",
      fetchPolicy: "network-only",
    },
    onCompleted: (data) => {
      if (!skip) {
        const tmp: any = [];
        data.getStudents.data.map((item: any) => {
          tmp.push({
            id: +item.id,
            name: item.first_name + " " + item.last_name + " " + item.phone,
          });
          return item;
        });
        //console.log(tmp);
        setLessonOptions(tmp);
      }
    },
  });

  React.useEffect(() => {
    setLoadingLesson(true);
    refetchLessons({
      first: 1000,
      page: 1,
      full_name: lessonName,
    }).then(() => {
      setLoadingLesson(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonName]);

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
        refreshData(search.student_id);
      })
      .finally(() => {
        setLoading(false);
        setOpen(false);
      });
  };

  const handleCancel = () => {
    setOpen(false);
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

            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="جلسه مشاوره "
              type="text"
              fullWidth
              variant="standard"
            />
            <FormControl
              sx={{
                m: 1,
                width: "100%",
              }}
            >
              <Autocomplete
                id="lesson-names"
                options={lessonOptions}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="دانش آموز"
                    variant="outlined"
                    onChange={(e) => {
                      if (e.target.value.trim().length >= 1) {
                        setSkip(false);
                        setLessonName(e.target.value.trim());
                      }
                    }}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {loadingLesson ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
                getOptionLabel={(option) => option.name}
                value={search?.student_id}
                onChange={(_event, newTeam) => {
                  setSearch({
                    ...search,
                    student_id: newTeam?.id ? +newTeam.id : undefined,
                  });
                }}
              />
            </FormControl>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleCancel}>انصراف</Button>
            <Button onClick={handleAdd}>افزودن</Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <Button sx={{ color: "red" }} onClick={handleClickOpen}>
          دانش آموز +
        </Button>
       
      </div>
    </div>
  );
};

export default ComponentStudentDialog;
