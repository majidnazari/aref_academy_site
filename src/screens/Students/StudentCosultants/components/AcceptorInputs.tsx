import {
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { useEffect, useState } from "react";

interface EditProps {
  setFormData: Function;
  studentCourse: StudentCourseFormData;
}
interface StudentCourseFormData {
  student_status: string;
  financial_status: string;
  manager_status: string;
  description?: string;
}

const ManagerInputs = ({ setFormData, studentCourse }: EditProps) => {
  const [mystudentCourse, setMystudentCourse] = useState<StudentCourseFormData>(
    {
      student_status: studentCourse.student_status,
      financial_status: studentCourse.financial_status,
      manager_status: studentCourse.manager_status,
      description: studentCourse.description,
    }
  );

  const handleChangeStudentStatus = (event: SelectChangeEvent<string>) => {
    setMystudentCourse({
      ...mystudentCourse,
      student_status: event.target.value,
      manager_status: "pending",
    });
    // setFormData({
    //     ...studentCourse,
    //     student_status: event.target.value,
    //     financial_status: 'pending',
    //     manager_status: 'pending'
    // });
  };

  useEffect(() => {
    setFormData(mystudentCourse);
  }, [mystudentCourse]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={12} md={12}>
        <FormControl fullWidth sx={{ my: 2 }}>
          <InputLabel id="student_status_label">وضعیت دانش آموز</InputLabel>
          <Select
            labelId="student_status_label"
            label="وضعیت دانش آموز"
            defaultValue=""
            value={mystudentCourse.student_status}
            onChange={handleChangeStudentStatus}
            displayEmpty
          >
            <MenuItem value="" disabled>
              <em>وضعیت دانش آموز </em>
            </MenuItem>
            <MenuItem value="ok">فعال</MenuItem>
            <MenuItem value="fired_pending">درخواست اخراج</MenuItem>
            <MenuItem value="refused_pending">درخواست انصراف</MenuItem>
          </Select>
        </FormControl>
        <FormHelperText error>
          با تغییر وضعیت دانش آموز تایید مدیر به حالت تعلیق در می‌آید و نیاز به
          تایید مجدد این بخش خواهد بود
        </FormHelperText>
      </Grid>
      {mystudentCourse.student_status === "fired_pending" ||
      mystudentCourse.student_status === "refused_pending" ? (
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            fullWidth
            label="توضیحات"
            value={mystudentCourse.description}
            onChange={(e: any) =>
              setMystudentCourse({
                ...mystudentCourse,
                description: e.target.value,
              })
            }
            variant="outlined"
          />
        </Grid>
      ) : null}
    </Grid>
  );
};

export default ManagerInputs;
