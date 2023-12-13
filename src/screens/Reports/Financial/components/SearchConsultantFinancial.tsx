import { useQuery } from "@apollo/client";
import {
  Autocomplete,
  FormControl,
  Grid,
  TextField,
  CircularProgress,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { GET_COURSES, GET_STUDENTS, GET_CONSULTANTS } from "../gql/query";
import { SearchConsultantProps, SearchProps } from "../dto/search-dto";
import { getCourseName } from "components/CourseName";
import { SelectChangeEvent } from "@mui/material/Select";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AdapterJalali from "@date-io/date-fns-jalali";

const SearchConsultantFinancial = ({ callBack }: { callBack: Function }) => {
  const [search, setSearch] = useState<SearchConsultantProps>({
    student_id: undefined,
    consultant_id: undefined,
    total_present: undefined,
    financial_status: undefined,
    manager_status: undefined,
    student_status: undefined,
    date_from: undefined,
    date_to: undefined,
    description: undefined,
    financial_refused_status: undefined,
  });

  const [consultantOptions, setConsultantOptions] = useState<any[]>([
    { label: "", id: "" },
  ]);
  const [studentOptions, setStudentOptions] = useState<any[]>([]);
  const [loadingStudent, setLoadingStudent] = useState<boolean>(false);
  const [studentName, setStudentName] = useState<string>("");

  const { data: coursesData } = useQuery(GET_COURSES, {
    variables: {
      first: 1000,
      page: 1,
      orderBy: [
        {
          column: "id",
          order: "DESC",
        },
      ],
      fetchPolicy: "no-cache",
    },
  });

  const [skip, setSkip] = useState<Boolean>(true);
  const [lessonName, setLessonName] = useState<string>("");
  const [loadingLesson, setLoadingLesson] = useState<boolean>(false);
  const [lessonOptions, setLessonOptions] = useState<any[]>([]);

  const { refetch: refetchStudents } = useQuery(GET_STUDENTS, {
    variables: {
      first: 10,
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
        // console.log(tmp);

        setStudentOptions(tmp);
      }
    },
  });

  useEffect(() => {
    setLoadingStudent(true);
    refetchStudents({
      first: 1000,
      page: 1,
      full_name: studentName,
    }).then(() => {
      setLoadingStudent(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentName]);

  // const students = useQuery(GET_STUDENTS, {
  //   variables: {
  //     first: 100,
  //     page: 1,
  //     orderBy: [
  //       {
  //         column: "id",
  //         order: "DESC",
  //       },
  //     ],
  //     fetchPolicy: "no-cache",
  //   },
  //   onCompleted(data) {

  //     if (data?.getStudents?.data) {
  //       const tmp = [{ label: "", id: 0 }];
  //       setStudentOptions(tmp);
  //       for (const i in data.getStudents.data) {
  //         const student = data.getStudents.data[i];
  //         tmp.push({
  //           id: +student.id,
  //           label: student.first_name + " " + student.last_name,
  //         });
  //       }
  //     }
  //   },
  // });

  const consultants = useQuery(GET_CONSULTANTS, {
    variables: {
      first: 100,
      page: 1,
      orderBy: [
        {
          column: "id",
          order: "DESC",
        },
      ],
      fetchPolicy: "no-cache",
    },
    onCompleted(data) {
      // console.log("consultant are: ", data);
      if (data?.getConsultants?.data) {
        const tmp = [{ label: "", id: 0 }];
        setConsultantOptions(tmp);
        for (const i in data.getConsultants.data) {
          const consultant = data.getConsultants.data[i];
          tmp.push({
            id: +consultant.id,
            label: consultant.first_name + " " + consultant.last_name,
          });
        }
      }
    },
  });

  // useEffect(() => {
  //   setLoadingLesson(true);
  //   refetchLessons({
  //     first: 1000,
  //     page: 1,
  //     full_name: lessonName,
  //   }).then(() => {
  //     setLoadingLesson(false);
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [lessonName]);

  // useEffect(() => {
  //   if (coursesData?.getCourses?.data) {
  //     const tmp = [{ label: "", id: 0 }];
  //     setCourseOptions(tmp);
  //     for (const i in coursesData.getCourses.data) {
  //       const course = coursesData.getCourses.data[i];
  //       tmp.push({
  //         id: +course.id,
  //         label: getCourseName(course),
  //       });
  //     }
  //   }
  // }, [coursesData]);

  return (
    <Grid container sx={{ p: 1 }} spacing={2}>
      <Grid item xs={12} md={3}>
        <FormControl
          sx={{
            mr: 1,
          }}
          fullWidth
        >
          <Autocomplete
            id="student-names"
            options={studentOptions}
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
                    <React.Fragment>
                      {loadingStudent ? (
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
      </Grid>
      <Grid item xs={12} md={3}>
        <FormControl
          sx={{
            mr: 1,
            width: "100%",
          }}
        >
          {consultantOptions.length ? (
            <Autocomplete
              onChange={(event: any, newValue: any) => {
                setSearch({ ...search, consultant_id: newValue?.id });
              }}
              disablePortal
              id="combo-box-demo"
              options={consultantOptions}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField {...params} label="انتخاب مشاور" />
              )}
            />
          ) : null}
        </FormControl>
      </Grid>
      <Grid item xs={12} md={2}>
        <FormControl
          sx={{
            width: "100%",
            mr: 1,
          }}
        >
          <InputLabel id="gender-select-id">وضعیت مالی</InputLabel>
          <Select
            labelId="gender-select-id"
            id="genderId"
            label="وضعیت مالی"
            value={search.financial_status || ""}
            onChange={(event: SelectChangeEvent<string>) => {
              if (!event.target.value)
                setSearch({
                  ...search,
                  financial_status: undefined,
                });
              setSearch({
                ...search,
                financial_status: event.target.value as
                  | "approved"
                  | "pending"
                  | "semi_approved",
              });
            }}
            variant="outlined"
          >
            <MenuItem value={""}>همه</MenuItem>
            <MenuItem value="approved">تایید شده</MenuItem>
            <MenuItem value="semi_approved">عدم پرداخت کامل</MenuItem>
            <MenuItem value="pending">پرداخت نشده</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={2}>
        <FormControl
          sx={{
            width: "100%",
            mr: 1,
          }}
        >
          <InputLabel id="gender-select-id">وضعیت مدیر</InputLabel>
          <Select
            labelId="gender-select-id"
            id="genderId"
            label="وضعیت مدیر"
            value={search.manager_status || ""}
            onChange={(event: SelectChangeEvent<string>) => {
              if (!event.target.value)
                setSearch({
                  ...search,
                  manager_status: undefined,
                });
              setSearch({
                ...search,
                manager_status: event.target.value as "approved" | "pending",
              });
            }}
            variant="outlined"
          >
            <MenuItem value={""}>همه</MenuItem>
            <MenuItem value="approved">تایید شده</MenuItem>
            <MenuItem value="pending">عدم تایید</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={2}>
        <FormControl
          sx={{
            width: "100%",
            mr: 1,
          }}
        >
          <InputLabel id="gender-select-id">وضعیت دانش آموز</InputLabel>
          <Select
            labelId="gender-select-id"
            id="genderId"
            label="وضعیت دانش آموز"
            value={search.student_status || ""}
            onChange={(event: SelectChangeEvent<string>) => {
              if (!event.target.value)
                setSearch({
                  ...search,
                  student_status: undefined,
                });
              setSearch({
                ...search,
                student_status: event.target.value as
                  | "ok"
                  | "refused"
                  | "fired"
                  | "financial_pending"
                  | "forbidden"
                  | "fired_pending"
                  | "refused_pending",
              });
            }}
            variant="outlined"
          >
            <MenuItem value={""}>همه</MenuItem>
            <MenuItem value="ok">تایید شده</MenuItem>
            <MenuItem value="refused">انصراف</MenuItem>
            <MenuItem value="fired">اخراج</MenuItem>
            <MenuItem value="refused_pending">در انتظار انصراف</MenuItem>
            <MenuItem value="fired_pending">در انتظار اخراج</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={3} xl={3}>
        <LocalizationProvider dateAdapter={AdapterJalali}>
          <DatePicker
            label="از تاریخ"
            value={search.date_from || null}
            onChange={(newValue) => {
              console.log("source from_date", newValue);
              if (newValue) {
                setSearch({
                  ...search,
                  date_from: newValue as string,
                });
              }
            }}
            renderInput={(params) => (
              <TextField {...params} style={{ width: "100%" }} />
            )}
            mask="____/__/__"
          />
        </LocalizationProvider>
      </Grid>

      <Grid item xs={12} sm={6} md={3} xl={3}>
        <LocalizationProvider dateAdapter={AdapterJalali}>
          <DatePicker
            label="تا تاریخ"
            value={search.date_to || null}
            onChange={(newValue) => {
              if (newValue) {
                setSearch({
                  ...search,
                  date_to: newValue as string,
                });
              }
            }}
            renderInput={(params) => (
              <TextField {...params} style={{ width: "100%" }} />
            )}
            mask="____/__/__"
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12} md={2}>
        <FormControl
          sx={{
            width: "100%",
            mr: 1,
          }}
        >
          <InputLabel id="total-select-id">تعداد جلسه حضور</InputLabel>
          <Select
            labelId="total-select-id"
            id="total_present"
            label="تعداد جلسه حضور"
            value={String(search.total_present)}
            onChange={(event: SelectChangeEvent<string>) => {
              setSearch({
                ...search,
                total_present: +event.target.value,
              });
            }}
            variant="outlined"
          >
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
            <MenuItem value="4">4</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={4}>
        <Button
          variant="contained"
          color="info"
          size="large"
          onClick={() => {
            const tmp: any = { ...search };
            for (const i in tmp) {
              if (tmp[i] === "") tmp[i] = undefined;
            }
            console.log("tmp is:", tmp);
            callBack(tmp);
          }}
        >
          جستجو
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchConsultantFinancial;
