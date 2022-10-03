import { useQuery, useMutation } from "@apollo/client";
import {
  Autocomplete,
  Button,
  FormControl,
  FormHelperText,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { AddWarningInput } from "../dto/add-warning-input.dto";
import { GET_COURSES } from "../gql/query";
import { CREATE_STUDENT_WARNING } from "../gql/mutation";
import { getCourseName } from "components/CourseName";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

class AddWarningProps {
  studentId!: number;
}

const comments = [
  " دانش آموز ثبت نام نکرده",
  "دانش آموز تسویه حساب نکرده",
  "دانش آموز باید چک بدهد",
  "دانش آموز باید شهریه را واریز کند",
  "قسط دانش آموز معوق شده",
];
const AddWarning = ({ studentId }: AddWarningProps) => {
  const [addWarningInput, setAddWarningInput] = useState<AddWarningInput>({
    comment: "",
    course_id: "",
    student_id: studentId,
  });

  const [courseOptions, setCourseOptions] = useState<any[]>([
    { label: "", id: "" },
  ]);
  const [commentError, setCommentError] = useState<string>("");

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

  const handleChangeComment = (e: SelectChangeEvent<string>) => {
    setAddWarningInput({ ...addWarningInput, comment: e.target.value });
  };

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
    setCommentError("");
    if (addWarningInput.comment === "") {
      setCommentError("لطفا کامنت را وارد کنید");
      return;
    }
    const tmpInput: any = { ...addWarningInput };
    tmpInput.course_id =
      tmpInput.course_id === "" ? undefined : +tmpInput.course_id;

    createStudentWarning({ variables: tmpInput });
  };

  return (
    <Grid container component={Paper} sx={{m:1, p: 1, my: 1 }} spacing={2}>
      <Grid  md={12}>
        <Typography>ثبت کامنت جدید</Typography>
      </Grid>
      <Grid  md={5}>
        <FormControl sx={{ width: "100%" }}>
          <Select
            defaultValue=""
            value={addWarningInput.comment}
            onChange={handleChangeComment}
            error={commentError !== "" ? true : false}
            variant="outlined"
            displayEmpty
          >
            <MenuItem value="" disabled>
              <em>کامنت</em>
            </MenuItem>
            {comments.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
          {commentError ? (
            <FormHelperText error>{commentError}</FormHelperText>
          ) : (
            ""
          )}
        </FormControl>
      </Grid>
      <Grid  md={5}>
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
      <Grid  md={2}>
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
