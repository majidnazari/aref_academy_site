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
import { GET_COURSES, GET_STUDENTS } from "../gql/query";
import { SearchProps } from "../dto/search-dto";
import { getCourseName } from "components/CourseName";
import { SelectChangeEvent } from "@mui/material/Select";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AdapterJalali from "@date-io/date-fns-jalali";

const SearchFinancial = ({ callBack }: { callBack: Function }) => {
  const [search, setSearch] = useState<SearchProps>({});

  const [courseOptions, setCourseOptions] = useState<any[]>([
    { label: "", id: "" },
  ]);
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
        console.log(tmp);

        setLessonOptions(tmp);
      }
    },
  });

  useEffect(() => {
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

  useEffect(() => {
    if (coursesData?.getCourses?.data) {
      const tmp = [{ label: "", id: 0 }];
      setCourseOptions(tmp);
      for (const i in coursesData.getCourses.data) {
        const course = coursesData.getCourses.data[i];
        tmp.push({
          id: +course.id,
          label: getCourseName(course),
        });
      }
    }
  }, [coursesData]);

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
      </Grid>
      <Grid item xs={12} md={3}>
        <FormControl
          sx={{
            mr: 1,
            width: "100%",
          }}
        >
          {courseOptions.length ? (
            <Autocomplete
              onChange={(event: any, newValue: any) => {
                setSearch({ ...search, course_id: newValue?.id });
              }}
              disablePortal
              id="combo-box-demo"
              options={courseOptions}
              renderInput={(params) => (
                <TextField {...params} label="انتخاب کلاس" />
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
            value={search.from_date || null}
            onChange={(newValue) => {
              if (newValue) {
                setSearch({
                  ...search,
                  from_date: newValue as string,
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
            value={search.to_date || null}
            onChange={(newValue) => {
              if (newValue) {
                setSearch({
                  ...search,
                  to_date: newValue as string,
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
            callBack(tmp);
          }}
        >
          جستجو
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchFinancial;
