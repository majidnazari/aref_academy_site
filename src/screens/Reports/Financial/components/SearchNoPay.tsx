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
import { getCourseName } from "components/CourseName";
import { SelectChangeEvent } from "@mui/material/Select";

const SearchNoPay = ({ callBack }: { callBack: Function }) => {
  const [search, setSearch] = useState<{
    course_id: number | undefined;
    total_present: number;
    financial_status: string;
  }>({
    financial_status: "pending",
    course_id: undefined,
    total_present: 3,
  });

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
      <Grid item xs={12} md={7}>
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
          <InputLabel id="gender-select-id">تعداد جلسه حضور</InputLabel>
          <Select
            labelId="gender-select-id"
            id="genderId"
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
      <Grid item xs={12} md={2}>
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

export default SearchNoPay;
