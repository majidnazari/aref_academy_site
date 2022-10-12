import { Box, Button, CircularProgress, FormControl, Paper, Typography } from "@mui/material";
// import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { GET_COURSES } from "../gql/query";
import { useQuery, useMutation } from "@apollo/client";
import { CREATE_STUDENT_COURSE } from "../gql/mutation";
import { useEffect, useState } from "react";
import { getCourseName } from "components/CourseName";
import { showSuccess } from "utils/swlAlert";

interface Props {
  studentId: string | undefined;
  refetch: Function;
}

const AddStudentCourse = ({ studentId, refetch }: Props) => {
  const [courseId, setCourseId] = useState<string | undefined>("");
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

  const [createStudentCourse, { loading: addStudentLoading }] = useMutation(
    CREATE_STUDENT_COURSE
  );

  const insertStudentCourse = () => {
    const input = {
      variables: {
        student_id: studentId ? parseInt(studentId) : 0,
        course_id: courseId ? parseInt(courseId) : null,
        status: "ok",
      },
    };
    createStudentCourse(input).then(() => {
      showSuccess("درس با موفقیت اضافه شد");
      refetch();
    });
  };

  // const handleChangeCourse = (e: SelectChangeEvent<string>) => {
  //     setCourseId(e.target.value)
  // }

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
    <Box component={Paper} sx={{ p: 1, my: 2 }}>
      <Typography
        component={"div"}
        sx={{ fontSize: 18, fontWeight: "bold", my: 2 }}
      >
        افزودن درس
      </Typography>
      <Box>
        <FormControl sx={{ width: 500 }}>
          {/* <Select
                    defaultValue=""
                    value={courseId}
                    onChange={handleChangeCourse}
                    variant="filled"
                    displayEmpty
                >
                    <MenuItem value="" disabled >
                        <em>
                            انتخاب درس
                            {loading && <span> درحال بارگزاری...</span>}
                        </em>
                    </MenuItem>
                    {coursesData && Object.keys(coursesData.getCourses.data).map((key, index) => (
                        <MenuItem key={index} value={coursesData.getCourses.data[key].id}>
                            <CourseName course={coursesData.getCourses.data[key]} />
                        </MenuItem>
                    ))
                    }
                </Select> */}
          {courseOptions.length ? (
            <Autocomplete
              onChange={(event: any, newValue: any) => {
                setCourseId(newValue?.id);
              }}
              disablePortal
              id="combo-box-demo"
              options={courseOptions}
              sx={{ width: 500 }}
              renderInput={(params) => (
                <TextField {...params} label="انتخاب درس" />
              )}
            />
          ) : null}
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, mx: 1 }}
          onClick={() => {
            insertStudentCourse();
          }}
          disabled={addStudentLoading}
          endIcon={
            addStudentLoading ? (
              <CircularProgress color="inherit" size={10} />
            ) : null
          }
        >
          افزودن
        </Button>
      </Box>
    </Box>
  );
};

export default AddStudentCourse;
