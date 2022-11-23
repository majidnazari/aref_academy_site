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
import CourseAutocomplete from "components/CourseAutocomplete";

interface EditProps {
  setFormData: Function;
  studentCourse: StudentCourseFormData;
}
interface StudentCourseFormData {
  student_status: string;
  financial_status: string;
  manager_status: string;
  description?: string;
  transferred_to_course_id?: number;
  refusedStatus?: "normal" | "transfer";
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

  const [refusedStatus, setRefusedStatus] = useState<"normal" | "transfer">(
    "normal"
  );

  const handleChangeManagerStatus = (event: SelectChangeEvent<string>) => {
    setMystudentCourse({
      ...mystudentCourse,
      manager_status: event.target.value,
    });
  };

  const handleChangeStudentStatus = (event: SelectChangeEvent<string>) => {
    setMystudentCourse({
      ...mystudentCourse,
      student_status: event.target.value,
      financial_status: "pending",
    });
    setFormData({
      ...studentCourse,
      student_status: event.target.value,
      financial_status: "pending",
    });
  };

  useEffect(() => {
    setFormData(mystudentCourse);
  }, [mystudentCourse]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6} md={6}>
        <FormControl fullWidth sx={{ my: 2 }}>
          <InputLabel id="student_status_label">وضعیت دانش آموز</InputLabel>
          <Select
            labelId="student_status_label"
            label="وضعیت دانش آموز"
            defaultValue=""
            value={mystudentCourse.student_status}
            onChange={handleChangeStudentStatus}
            // error={error.branchId ? true : false}
            displayEmpty
          >
            <MenuItem value="" disabled>
              <em>وضعیت دانش آموز </em>
            </MenuItem>
            <MenuItem value="ok">فعال</MenuItem>
            <MenuItem value="refused">انصراف</MenuItem>
            <MenuItem value="fired">اخراج</MenuItem>
            <MenuItem value="fired_pending">درخواست اخراج</MenuItem>
            <MenuItem value="refused_pending">درخواست انصراف</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <FormControl fullWidth sx={{ my: 2 }}>
          <InputLabel>تایید مدیر</InputLabel>
          <Select
            label="تایید مدیر"
            defaultValue=""
            value={mystudentCourse.manager_status}
            onChange={handleChangeManagerStatus}
            // error={error.branchId ? true : false}
            displayEmpty
          >
            <MenuItem value="" disabled>
              <em>تایید مدیر</em>
            </MenuItem>
            <MenuItem value="pending">در انتظار تایید</MenuItem>
            <MenuItem value="approved">تایید شده</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      {mystudentCourse.student_status === "refused" ? (
        <>
          <Grid item xs={12} sm={3} md={3}>
            <FormControl fullWidth>
              <InputLabel id="refused-status">عادی/جابجایی</InputLabel>
              <Select
                labelId="refused-status"
                label="عادی/جابجایی"
                value={refusedStatus}
                onChange={(e) => {
                  setRefusedStatus(e.target.value as "normal" | "transfer");
                  setMystudentCourse({
                    ...mystudentCourse,
                    refusedStatus: e.target.value as "normal" | "transfer",
                  });
                }}
              >
                <MenuItem value="normal">عادی </MenuItem>
                <MenuItem value="transfer">جابجایی</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </>
      ) : null}
      {mystudentCourse.student_status === "refused" ||
      mystudentCourse.description ? (
        <Grid item xs={12} sm={9} md={9}>
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

      {refusedStatus === "transfer" ? (
        <Grid item xs={12} sm={12} md={12}>
          <CourseAutocomplete
            callBack={(courseId: string) => {
              setMystudentCourse({
                ...mystudentCourse,
                transferred_to_course_id: courseId ? +courseId : undefined,
              });
            }}
          />
        </Grid>
      ) : null}

      <FormHelperText error sx={{ px: 1 }}>
        با تغییر وضعیت دانش آموز تایید حسابداری به حالت تعلیق در می‌آید و نیاز
        به تایید مجدد این بخش خواهد بود
      </FormHelperText>
    </Grid>
  );
};

export default ManagerInputs;
