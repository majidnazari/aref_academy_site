import { Grid, Paper, Box, Typography } from '@mui/material'
import moment from 'moment-jalaali'
import { TotalReportDtos } from '../dto/TotalReport.dto'
import ConsultantPieChart from './ConsultantPieChart'
import { TotalConsultantReport } from '../dto/TotalConsultantReport.dto'

const ConsultantTotalReportSummary_2 = ({ totalReport }: { totalReport: TotalConsultantReport }) => {
  return (
    <Grid container component={Paper} sx={{ my: 2 }}>
      <Grid item xs={12} sm={6} md={6}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          {/* { console.log("totalReport" , totalReport?.details[0].consultant?.last_name ) } */}
          <Typography
            sx={{
              p: 1,
            }}
          >
            نام مشاور: {totalReport.consultant_id}
          </Typography>
          <Typography
            sx={{
              p: 1,
            }}
          >
            تعداد کل دانش آموزان ثبت نام شده: {totalReport.sum_students_registered}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            sx={{
              p: 1,
            }}
          >
            تعداد کل تایید مالی: {totalReport.sum_financial_financial_status_approved}
          </Typography>
          <Typography
            sx={{
              p: 1,
            }}
          >
            تعداد کل عدم پرداخت کامل : {totalReport.sum_financial_financial_status_semi_approved}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            sx={{
              p: 1,
            }}
          >
            تعداد کل پرداخت نشده: {totalReport.sum_financial_financial_status_pending}
          </Typography>
          <Typography
            sx={{
              p: 1,
            }}
          >
            تعداد کل انصراف : {totalReport.sum_financial_student_status_refused}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            sx={{
              p: 1,
            }}
          >
            تعداد کل انسانی : {totalReport.sum_students_major_humanities}
          </Typography>

          <Typography
            sx={{
              p: 1,
            }}
          >
            تعداد کل تجربی: {totalReport.sum_students_major_experimental}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            sx={{
              p: 1,
            }}
          >
            تعداد کل ریاضی: {totalReport.sum_students_major_mathematics}
          </Typography>
          <Typography
            sx={{
              p: 1,
            }}
          >
            تعداد کل هنر: {totalReport.sum_students_major_art}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            sx={{
              p: 1,
            }}
          >
            تعداد کل سایر : {totalReport.sum_students_major_other}
          </Typography>
          <Typography
            sx={{
              p: 1,
            }}
          >
            تعداد کل دانش آموزان مقطع ششم:{totalReport.sum_students_education_level_6}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            sx={{
              p: 1,
            }}
          >
            تعداد کل دانش آموزان مقطع هفتم: {totalReport.sum_students_education_level_7}
          </Typography>
          <Typography
            sx={{
              p: 1,
            }}
          >
            تعداد کل دانش آموزان مقطع هشتم:{totalReport.sum_students_education_level_8}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            sx={{
              p: 1,
            }}
          >
            تعداد کل دانش آموزان مقطع نهم: {totalReport.sum_students_education_level_9}
          </Typography>
          <Typography
            sx={{
              p: 1,
            }}
          >
            تعداد کل دانش آموزان مقطع دهم:{totalReport.sum_students_education_level_10}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            sx={{
              p: 1,
            }}
          >
            تعداد کل دانش آموزان مقطع یازدهم: {totalReport.sum_students_education_level_11}
          </Typography>
          <Typography
            sx={{
              p: 1,
            }}
          >
            تعداد کل دانش آموزان مقطع دوازدهم:{totalReport.sum_students_education_level_12}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            sx={{
              p: 1,
            }}
          >
            تعداد کل دانش آموزان مقطع فارغ: {totalReport.sum_students_education_level_13}
          </Typography>
          <Typography
            sx={{
              p: 1,
            }}
          >
            تعداد کل دانش آموزان دانشجو:{totalReport.sum_students_education_level_14}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            sx={{
              p: 1,
            }}
          >
            تعداد کل تک جلسه : {totalReport.sum_single_meet_1}
          </Typography>
          <Typography
            sx={{
              p: 1,
            }}
          >
            تعداد کل غیر حضوری : {totalReport.sum_remote_1}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            sx={{
              p: 1,
            }}
          >
            تعداد کل جلسات جبرانی : {totalReport.sum_compensatory_meet_1}
          </Typography>
          <Typography
            sx={{
              p: 1,
            }}
          >
            تعداد کل جلسات تعریف شده مشاور : {totalReport.sum_is_defined_consultant_session}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            sx={{
              p: 1,
            }}
          >
            زمان کل جلسات تعریف شده(ساعت) : {(Number(totalReport.sum_is_defined_consultant_session_in_minutes) / 60).toFixed(1)}
          </Typography>
          <Typography
            sx={{
              p: 1,
            }}
          >
            تعداد کل جلسات برگزار شده : {totalReport.sum_is_filled_consultant_session}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            sx={{
              p: 1,
            }}
          >
            زمان کل جلسات برگزار شده(ساعت) : {(Number(totalReport.sum_is_filled_consultant_session_in_minutes) / 60).toFixed(1)}
          </Typography>
          {/* <Typography
            sx={{
              p: 1,
            }}
          >
            تعداد کل جلسات برگزار شده : {totalReport.sum_is_filled_consultant_session}
          </Typography> */}
        </Box>
      </Grid>
      <Grid item xs={12} sm={1} md={1}></Grid>
      {/* <Grid item xs={12} sm={5} md={5}>
        <ConsultantPieChart
          width="100%"
          series={
            [
              //totalReport.total_consultant_obligation_hours,
              // totalReport.total_consultant_present_hours,
              // totalReport.total_consultant_absence_hours,
              // totalReport.total_consultant_earlier_hours,
            ]
          }
        />
      </Grid> */}
    </Grid>
  )
}

export default ConsultantTotalReportSummary_2
