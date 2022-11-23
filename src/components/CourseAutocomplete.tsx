import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_COURSES } from "screens/Courses/gql/query";
import { getCourseName } from "components/CourseName";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";

const CourseAutocomplete = ({ callBack }: { callBack: Function }) => {
  const [courseOptions, setCourseOptions] = useState<any[]>([
    { label: "", id: "" },
  ]);

  const { loading } = useQuery(GET_COURSES, {
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
    onCompleted: (res) => {
      const tmp = [];
      for (const i in res.getCourses.data) {
        const course = res.getCourses.data[i];
        tmp.push({
          id: +course.id,
          label: getCourseName(course),
        });
      }
      setCourseOptions(tmp);
    },
  });

  return (
    <>
      {courseOptions.length ? (
        <Autocomplete
          onChange={(event: any, newValue: any) => {
            callBack(newValue?.id);
          }}
          disablePortal
          options={courseOptions}
          fullWidth
          renderInput={(params) =>
            loading ? (
              <CircularProgress />
            ) : (
              <TextField {...params} label="انتخاب کلاس" />
            )
          }
        />
      ) : null}
    </>
  );
};

export default CourseAutocomplete;
