import { Grid, Paper, Box, Typography } from "@mui/material";
import moment from "moment-jalaali";
import { TotalReportDtos } from "../dto/TotalReport.dto";
import ConsultantPieChart from "./ConsultantPieChart";

const ConsultantTotalReportSummary = ({
  totalReport,
}: {
  totalReport: TotalReportDtos;
}) => {
  return (
   
    <Grid container component={Paper} sx={{ my: 2 }}>
      <Grid item xs={12} sm={6} md={6}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
           {/* { console.log("totalReport" , totalReport?.details[0].consultant?.last_name ) } */}
          <Typography
            sx={{
              p: 1,
            }}
          >
            نام مشاور: {totalReport.consultant_fullname }
          </Typography>
          <Typography
            sx={{
              p: 1,
            }}
          >
            تعداد کل دانش آموزان: {totalReport.total_consultant_students}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              p: 1,
            }}
          >
            تعداد کل جلسات مشاوره تعریف شده :{" "}
            {totalReport.total_consultant_definition}
          </Typography>
          <Typography
            sx={{
              p: 1,
            }}
          >
            تعداد دانش آموزان حاضر : {totalReport.total_student_present}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              p: 1,
            }}
          >
            جمع ساعات دانش آموزان حاضر :{" "}
            {totalReport.total_student_present_hours}
          </Typography>
          <Typography
            sx={{
              p: 1,
            }}
          >
            تعداد دانش آموزان غایب : {totalReport.total_student_absence}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              p: 1,
            }}
          >
            جمع ساعات دانش آموزان غایب :{" "}
            {totalReport.total_student_absence_hours}
          </Typography>

          <Typography
            sx={{
              p: 1,
            }}
          >
            تعداد دانش آموزان تاخیر دار : {totalReport.total_student_delay}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              p: 1,
            }}
          >
            مجموع ساعات تاخیر دانش آموزان:{" "}
            {totalReport.total_student_delay_hours}
          </Typography>
          <Typography
            sx={{
              p: 1,
            }}
          >
            مجموع ساعات موظفی مشاور:{" "}
            {totalReport.total_consultant_obligation_hours}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              p: 1,
            }}
          >
            مجموع ساعات حضور مشاور:{" "}
            {totalReport.total_consultant_present_hours}
          </Typography>
          <Typography
            sx={{
              p: 1,
            }}
          >
            مجموع ساعات عدم حضور مشاور:{" "}
            {totalReport.total_consultant_earlier_hours +
              totalReport.total_consultant_absence_hours}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={1} md={1}></Grid>
      <Grid item xs={12} sm={5} md={5}>
        <ConsultantPieChart
          width="100%"        
          series={[           
            //totalReport.total_consultant_obligation_hours,
            totalReport.total_consultant_present_hours,
            totalReport.total_consultant_absence_hours ,
            totalReport.total_consultant_earlier_hours,
          ]}
         
        />
      </Grid>
    </Grid>
  );
};

export default ConsultantTotalReportSummary;
