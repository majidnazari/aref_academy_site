import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import {
  Autocomplete,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
  Slide,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { TransitionProps } from "@mui/material/transitions";
import { useState, forwardRef, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_STUDENTS } from "../gql/query";
import { CREATE_STUDENT_COURSE, CREATE_STUDENT } from "../gql/mutaion";
import { showSuccess } from "utils/swlAlert";
import { vmsNationalCode } from "utils/utils";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class SearchData {
  id?: number | undefined;
  first_name?: string | undefined;
  phone?: string | undefined;
  last_name?: string | undefined;
  nationality_code?: string | undefined;
}

const AddStudentQuikly = ({
  reloadList,
  courseId,
}: {
  reloadList: Function;
  courseId: number;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [loadingMobile, setLoadingMobile] = useState<boolean>(false);
  const [mobileOptions, setMobileOptions] = useState<any[]>([]);
  const [search, setSearch] = useState<SearchData>({
    first_name: "",
    phone: undefined,
    last_name: "",
    nationality_code:"",
  });
  const [error, setError] = useState<SearchData>({});
  const [skip, setSkip] = useState<Boolean>(true);

  useEffect(()=>{
    setSearch({
      first_name: "",
      phone: undefined,
      last_name: "",
      nationality_code:""
    });

  },[]);

  const { refetch: refetchPhones } = useQuery(GET_STUDENTS, {
    variables: {
      first: 1,
      page: 1,
      phone: "",
      fetchPolicy: "network-only",
    },
    onCompleted: (data) => {
      if (!skip) {
        setMobileOptions(data.getStudents.data);
      }
    },
  });

  const [createCourseStudent, { loading: addClassLoading }] = useMutation(
    CREATE_STUDENT_COURSE
  );
  const [createStudent, { loading: addStudentLoading }] =
    useMutation(CREATE_STUDENT);

  const createNewStudentAndAddToClass = () => {
    reloadList();
    if (!validateForm()) {
      return;
    }
    if (search.id) {
      createCourseStudent({
        variables: {
          course_id: courseId,
          student_id: +search.id,
        },
      }).then(() => {
        showSuccess("دانش آموز با موفقیت به کلاس اضافه شد");
        setOpen(false);
        setSearch({
          first_name: "",
          phone: undefined,
          last_name: "",
          nationality_code:""
        });
        reloadList();
      });
    } else {
      createStudent({
        variables: {
          first_name: search.first_name,
          last_name: search.last_name,
          phone: search.phone,
          nationality_code:search.nationality_code,
        },
      }).then((res) => {
        console.log("createStudent", res);
      });
    }
  };

  const validateForm = (): boolean => {
    const tmpError: SearchData = {};
    let out = true;
    if (!search.phone || search.phone === "") {
      tmpError.phone = "تلفن همراه را وارد کنید";
      out = false;
    }
    if (!search.first_name || search.first_name === "") {
      tmpError.first_name = "نام را وارد کنید";
      out = false;
    }
    if (!search.last_name || search.last_name === "") {
      tmpError.last_name = " نام خانوادگی را وارد کنید";
      out = false;
    }
    if (!vmsNationalCode(search.nationality_code)) {
      tmpError.nationality_code = " کد ملی را وارد کنید";
      out = false;
    }
    setError(tmpError);
    return out;
  };

  useEffect(() => {
    setLoadingMobile(true);
    refetchPhones({
      first: 1000,
      page: 1,
      phone: search.phone,
    }).then(() => {
      setLoadingMobile(false);
    });
  }, [search.phone]);

  return (
    <>
      <Box
        sx={{
          "& > :not(style)": { m: 1 },
          position: "fixed",
          right: "10px",
          bottom: "10px",
        }}
      >
        <Fab
          color="secondary"
          aria-label="add"
          onClick={() => {
            setOpen(true);
          }}
        >
          <AddIcon />
        </Fab>
      </Box>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          setOpen(false);
        }}
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
      >
        <DialogTitle>افزودن دانش آموز به این کلاس</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item md={6} sm={12}>
              <Autocomplete
                freeSolo
                id="student-mobiles"
                options={mobileOptions}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="موبایل"
                    variant="filled"
                    onChange={(e) => {
                      if (e.target.value.trim().length >= 1) {
                        setSkip(false);
                        setSearch({
                          id: undefined,
                          first_name: "",
                          last_name: "",
                          nationality_code: "",
                          phone: e.target.value.trim(),
                        });
                      }
                    }}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loadingMobile ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
                getOptionLabel={(option) => option.phone || ""}
                style={{ width: 270 }}
                // value={search.phone || ""}
                onChange={(_event, newTeam) => {
                  setSearch({
                    id: newTeam?.id ? newTeam.id : undefined,
                    first_name: newTeam?.first_name ? newTeam.first_name : "",
                    phone: newTeam?.phone ? newTeam.phone : "",
                    last_name: newTeam?.last_name ? newTeam.last_name : "",
                    nationality_code: newTeam?.nationality_code ? newTeam.nationality_code : "",
                  });
                }}
              />
              {error.phone ? (
                <FormHelperText error>{error.phone}</FormHelperText>
              ) : (
                ""
              )}
            </Grid>

            <Grid item md={6} sm={12}>
              <TextField
                fullWidth
                label="کد ملی"
                id="nationality_code"
                value={search.nationality_code}
                onChange={(e: any) =>
                  setSearch({ ...search, nationality_code: e.target.value })
                }
                variant="filled"
                error={error.nationality_code ? true : false}
                helperText={error.nationality_code ? error.nationality_code : ""}
              />
            </Grid>

            <Grid item md={6} sm={12}>
              <TextField
                fullWidth
                label="نام"
                id="first_name"
                value={search.first_name}
                onChange={(e: any) =>
                  setSearch({ ...search, first_name: e.target.value })
                }
                variant="filled"
                error={error.first_name ? true : false}
                helperText={error.first_name ? error.first_name : ""}
              />
            </Grid>
            <Grid item md={6} sm={12}>
              <TextField
                fullWidth
                id="last_name"
                label="نام خانوادگی"
                value={search.last_name}
                onChange={(e: any) =>
                  setSearch({ ...search, last_name: e.target.value })
                }
                variant="filled"
                error={error.last_name ? true : false}
                helperText={error.last_name ? error.last_name : ""}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              createNewStudentAndAddToClass();
            }}
            disabled={addClassLoading || addStudentLoading}
            endIcon={
              addClassLoading || addStudentLoading ? (
                <CircularProgress color="inherit" size={10} />
              ) : null
            }
          >
            ذخیره
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            انصراف
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default AddStudentQuikly;
