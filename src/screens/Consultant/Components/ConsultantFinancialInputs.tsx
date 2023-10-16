import { FormControl, Grid, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { useEffect, useState } from "react";

interface EditProps {
  setFormData: Function;
  consultantFinancial: ConsultantFinancialFormData;
}
interface ConsultantFinancialFormData {
  student_status: string;
  financial_status: string;
  manager_status: string;
  financial_refused_status?: string;
}

const ConsultantFinancialInputs = ({ setFormData, consultantFinancial }: EditProps) => {
  const [myconsultantFinancial, setMyconsultantFinancial] = useState<ConsultantFinancialFormData>(
    {
      student_status: consultantFinancial.student_status,
      financial_status: consultantFinancial.financial_status,
      manager_status: consultantFinancial.manager_status,
      financial_refused_status: consultantFinancial.financial_refused_status || "0",
    }
  );
  const handleChangeFinancialStatus = (event: SelectChangeEvent<string>) => {
    setMyconsultantFinancial({
      ...myconsultantFinancial,
      financial_status: event.target.value,
    });
  };

  const handleChangeFinancialRefusedStatus = (
    event: SelectChangeEvent<string>
  ) => {
    setMyconsultantFinancial({
      ...myconsultantFinancial,
      financial_refused_status: event.target.value,
    });
  };

  const handleChangeStudentStatus = (event: SelectChangeEvent<string>) => {
    setMyconsultantFinancial({
      ...myconsultantFinancial,
      student_status: event.target.value,
    });
    setFormData({
      ...consultantFinancial,
      student_status: event.target.value,
      manager_status: "pending",
    });
  };

  useEffect(() => {
    if (myconsultantFinancial.student_status === "ok") {
      myconsultantFinancial.financial_refused_status = "0";
    }
    setFormData(myconsultantFinancial);
  }, [myconsultantFinancial]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6} md={6}>
        <FormControl fullWidth sx={{ my: 2 }}>
          <InputLabel id="student_status_label">وضعیت دانش آموز</InputLabel>
          <Select
            labelId="student_status_label"
            label="وضعیت دانش آموز"
            defaultValue=""
            value={myconsultantFinancial.student_status}
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
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <FormControl fullWidth sx={{ my: 2 }}>
          <InputLabel>تایید حسابداری</InputLabel>
          <Select
            label="تایید حسابداری"
            defaultValue=""
            value={myconsultantFinancial.financial_status}
            onChange={handleChangeFinancialStatus}
            // error={error.branchId ? true : false}
            displayEmpty
          >
            <MenuItem value="" disabled>
              <em>تایید مدیر</em>
            </MenuItem>
            <MenuItem value="pending">در انتظار تایید</MenuItem>
            <MenuItem value="semi_approved">عدم پرداخت کامل</MenuItem>
            <MenuItem value="approved">تایید شده</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      {myconsultantFinancial.student_status !== "ok" ? (
        <Grid item xs={12} sm={6} md={6}>
          <FormControl fullWidth sx={{ my: 2 }}>
            <InputLabel>وضعیت پرداخت پس از انصراف</InputLabel>
            <Select
              label="وضعیت پرداخت پس از انصراف"
              value={myconsultantFinancial.financial_refused_status}
              onChange={handleChangeFinancialRefusedStatus}
              // error={error.branchId ? true : false}
              displayEmpty
            >
              <MenuItem value="0" disabled selected>
                <em>نامشخص</em>
              </MenuItem>
              <MenuItem value="noMoney">پرداختی نداشته است</MenuItem>
              <MenuItem value="returned">برگشتی داشته است</MenuItem>
              <MenuItem value="not_returned">عدم برگشت وجه</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      ) : null}
    </Grid>
  );
};

export default ConsultantFinancialInputs;
