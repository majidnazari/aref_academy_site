import { FormControl, Grid, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { useEffect, useState } from 'react';


interface EditProps {
    setFormData: Function;
    consultantFinancial: ConsultantFinancialFormData;
}
interface ConsultantFinancialFormData {
    student_status: string;
    financial_status: string;
    manager_status: string;
}

const ConsultantAdminInputs = ({ setFormData, consultantFinancial }: EditProps) => {
    const [myconsultantFinancial, setMyconsultantFinancial] = useState<ConsultantFinancialFormData>({
        student_status: consultantFinancial.student_status,
        financial_status: consultantFinancial.financial_status,
        manager_status: consultantFinancial.manager_status,
    });
    const handleChangeManagerStatus = (event: SelectChangeEvent<string>) => {
        setMyconsultantFinancial({
            ...myconsultantFinancial,
            manager_status: event.target.value
        });
    };

    const handleChangeStudentStatus = (event: SelectChangeEvent<string>) => {
        setMyconsultantFinancial({
            ...myconsultantFinancial,
            student_status: event.target.value
        });
        setFormData({
            ...consultantFinancial,
            student_status: event.target.value
        });
    };

    const handleChangeFinancialStatus = (event: SelectChangeEvent<string>) => {
        setMyconsultantFinancial({
            ...myconsultantFinancial,
            financial_status: event.target.value
        });
        setFormData({
            ...consultantFinancial,
            financial_status: event.target.value
        });
    };

    useEffect(() => {
        setFormData(myconsultantFinancial);
    }, [myconsultantFinancial]);

    return (
        <Grid container spacing={1} >
            <Grid item xs={12} sm={6} md={4} >
                <FormControl fullWidth sx={{ my: 2 }} >
                    <InputLabel id="student_status_label" >وضعیت دانش آموز</InputLabel>
                    <Select
                        labelId="student_status_label"
                        label="وضعیت دانش آموز"
                        defaultValue=""
                        value={myconsultantFinancial.student_status}
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
            <Grid item xs={12} sm={6} md={4} >
                <FormControl fullWidth sx={{ my: 2 }} >
                    <InputLabel>تایید مدیر</InputLabel>
                    <Select
                        label="تایید مدیر"
                        defaultValue=""
                        value={myconsultantFinancial.manager_status}
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
            <Grid item xs={12} sm={6} md={4}  >
                <FormControl fullWidth sx={{ my: 2 }} >
                    <InputLabel>تایید حسابداری</InputLabel>
                    <Select
                        label="تایید حسابداری"
                        defaultValue=""
                        value={myconsultantFinancial.financial_status}
                        onChange={handleChangeFinancialStatus}
                        displayEmpty
                    >
                        <MenuItem value="" disabled >
                            <em> تایید حسابداری</em>
                        </MenuItem>
                        <MenuItem value="pending">
                            در انتظار تایید
                        </MenuItem>
                        <MenuItem value="semi_approved">
                            عدم پرداخت کامل 
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

export default ConsultantAdminInputs;