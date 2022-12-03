import { Grid, Paper, Box, Typography } from "@mui/material";
import moment from "moment-jalaali";
import { TotalReportDto } from "../dto/TotalReport.dto";
import CoursePieChart from "./CoursePieChart";

const TotalReportSummary = ({
  totalReport,
}: {
  totalReport: TotalReportDto[];
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
          <Typography
            sx={{
              p: 1,
            }}
          >
            نام دبیر: {totalReport[0].teacher_name}
          </Typography>
          <Typography
            sx={{
              p: 1,
            }}
          >
            تعداد کل دانش آموزان: {totalReport[0].total_students}
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
            تاریخ جلسه نخست:{" "}
            {totalReport[0].start_session !== ""
              ? moment(totalReport[0].start_session).format("jYYYY/jMM/jDD")
              : "--"}
          </Typography>
          <Typography
            sx={{
              p: 1,
            }}
          >
            تاریخ جلسه پایانی:{" "}
            {totalReport[0].end_session !== ""
              ? moment(totalReport[0].end_session).format("jYYYY/jMM/jDD")
              : "--"}
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
            تعداد کل جلسات: {totalReport[0].total_session || "--"}
          </Typography>
          <Typography
            sx={{
              p: 1,
            }}
          >
            تعداد جلسات برگزار شده: {totalReport[0].total_done_session || "--"}
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
            میانگین غیبت در جلسه:{" "}
            {totalReport[0].avg_absent?.toFixed(2) || "--"}
          </Typography>

          <Typography
            sx={{
              p: 1,
            }}
          >
            میانگین تاخیر درهر جلسه :{" "}
            {totalReport[0].avg_dellay?.toFixed(2) || "--"}
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
            بازگشت وجه پس از انصراف:{" "}
            {totalReport[0].total_just_withMoney || "--"}
          </Typography>
          <Typography
            sx={{
              p: 1,
            }}
          >
            عدم بازگشت وجه پس از انصراف:{" "}
            {totalReport[0].total_just_noMoney || "--"}
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
            تعداد جابجایی : {totalReport[0].total_transferred || "--"}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={1} md={1}></Grid>
      <Grid item xs={12} sm={5} md={5}>
        <CoursePieChart
          width="100%"
          series={[
            totalReport[0].total_approved,
            totalReport[0].total_noMoney_semi_pending,
            totalReport[0].total_noMoney,
            totalReport[0].total_fired + totalReport[0].total_refused,
            totalReport[0].total_pending,
          ]}
        />
      </Grid>
    </Grid>
  );
};

export default TotalReportSummary;
