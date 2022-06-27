import { FormControl, Grid, MenuItem } from '@mui/material';
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

const FinancialInputs = ({ setFormData, studentCourse }: EditProps) => {
    const [mystudentCourse, setMystudentCourse] = useState<StudentCourseFormData>({
        student_status: studentCourse.student_status,
        financial_status: studentCourse.financial_status,
        manager_status: studentCourse.manager_status,
    });
    const handleChangeFinancialStatus = (event: SelectChangeEvent<string>) => {
        setMystudentCourse({
            ...mystudentCourse,
            financial_status: event.target.value,
        });
    };

    const handleChangeStudentStatus = (event: SelectChangeEvent<string>) => {
        setMystudentCourse({
            ...mystudentCourse,
            student_status: event.target.value
        });
        setFormData({
            ...studentCourse,
            student_status: event.target.value,
            manager_status: 'pending'
        });
    };

    useEffect(() => {
        setFormData(mystudentCourse);
    }, [mystudentCourse, setFormData]);

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
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6} >
                <FormControl fullWidth sx={{ my: 2 }} >
                    <InputLabel>تایید حسابداری</InputLabel>
                    <Select
                        label="تایید حسابداری"
                        defaultValue=""
                        value={mystudentCourse.financial_status}
                        onChange={handleChangeFinancialStatus}
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

export default FinancialInputs;