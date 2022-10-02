import { useQuery, useMutation } from "@apollo/client";
import {
  Autocomplete,
  Button,
  FormControl,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { AddWarningInput } from "../dto/add-warning-input.dto";
import { GET_COURSES } from "../gql/query";
import { CREATE_STUDENT_WARNING } from "../gql/mutation";
import { getCourseName } from "components/CourseName";

class AddWarningProps {
  studentId!: number;
}

const AddWarning = ({ studentId }: AddWarningProps) => {
  const [addWarningInput, setAddWarningInput] = useState<AddWarningInput>({
    comment: "",
    course_id: "",
    student_id: studentId,
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

  const [createStudentWarning] = useMutation(CREATE_STUDENT_WARNING);

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

  const saveComment = () => {
    const tmpInput: any = { ...addWarningInput };
    tmpInput.course_id =
      tmpInput.course_id === "" ? undefined : +tmpInput.course_id;

    createStudentWarning({ variables: tmpInput });
  };

  return (
    <Grid container component={Paper} sx={{ p: 1, my: 1 }} spacing={2}>
      <Grid item md={5}>
        <TextField
          fullWidth
          label="کامنت"
          value={addWarningInput.comment}
          onChange={(e: any) => {
            setAddWarningInput({
              ...addWarningInput,
              comment: e.target.value,
            });
          }}
          variant="outlined"
        />
      </Grid>
      <Grid item md={5}>
        <FormControl sx={{ width: "100%" }}>
          {courseOptions.length ? (
            <Autocomplete
              onChange={(event: any, newValue: any) => {
                setAddWarningInput({
                  ...addWarningInput,
                  course_id: newValue?.id,
                });
              }}
              disablePortal
              id="combo-box-demo"
              options={courseOptions}
              sx={{ width: 500 }}
              renderInput={(params) => (
                <TextField {...params} label="انتخاب کلاس" />
              )}
            />
          ) : null}
        </FormControl>
      </Grid>
      <Grid item md={2}>
        <Button
          sx={{
            p: 2,
          }}
          fullWidth
          variant="contained"
          color="info"
          size="medium"
          onClick={saveComment}
        >
          ثبت کامنت
        </Button>
      </Grid>
    </Grid>
  );
};
export default AddWarning;
