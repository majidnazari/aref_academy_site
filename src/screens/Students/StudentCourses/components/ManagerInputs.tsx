import { FormControl, FormHelperText, Grid, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { useEffect, useState } from 'react';


interface EditProps {
    setFormData: Function;
    studentCourse: StudentCourseFormData;
}
interface StudentCourseFormData {
    student_status: string;
    financial_status: string;
    manager_status: string;
}

const ManagerInputs = ({ setFormData, studentCourse }: EditProps) => {
    const [mystudentCourse, setMystudentCourse] = useState<StudentCourseFormData>({
        student_status: studentCourse.student_status,
        financial_status: studentCourse.financial_status,
        manager_status: studentCourse.manager_status,
    });
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
            financial_status: 'pending'
        });
        setFormData({
            ...studentCourse,
            student_status: event.target.value,
            financial_status: 'pending'
        });
    };

    useEffect(() => {
        setFormData(mystudentCourse);
    }, [mystudentCourse]);

    return (
        <Grid container spacing={1} >
            <Grid item xs={12} sm={6} md={6} >
                <FormControl fullWidth sx={{ my: 2 }} >
                    <InputLabel id="student_status_label" >وضعیت دانش آموز</InputLabel>
                    <Select
                        labelId="student_status_label"
                        label="وضعیت دانش آموز"
                        defaultValue=""
                        value={mystudentCourse.student_status}
                        onChange={handleChangeStudentStatus}
                        // error={error.branchId ? true : false}
                        displayEmpty
                    >
                        <MenuItem value="" disabled >
                            <em>وضعیت دانش آموز	</em>
                        </MenuItem>
                        <MenuItem value="ok">
                            فعال
                        </MenuItem>
                        <MenuItem value="refused">انصراف</MenuItem>
                        <MenuItem value="fired">اخراج</MenuItem>
                        <MenuItem value="fired_pending">درخواست اخراج</MenuItem>
                        <MenuItem value="refused_pending">درخواست انصراف</MenuItem>
                    </Select>
                    <FormHelperText error >
                        با تغییر وضعیت دانش آموز تایید حسابداری به حالت تعلیق در می‌آید و نیاز به تایید مجدد این بخش خواهد بود
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6} >
                <FormControl fullWidth sx={{ my: 2 }} >
                    <InputLabel>تایید مدیر</InputLabel>
                    <Select
                        label="تایید مدیر"
                        defaultValue=""
                        value={mystudentCourse.manager_status}
                        onChange={handleChangeManagerStatus}
                        // error={error.branchId ? true : false}
                        displayEmpty
                    >
                        <MenuItem value="" disabled >
                            <em>تایید مدیر</em>
                        </MenuItem>
                        <MenuItem value="pending">
                            در انتظار تایید
                        </MenuItem>
                        <MenuItem value="approved">
                            تایید شده
                        </MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    )
}

export default ManagerInputs;