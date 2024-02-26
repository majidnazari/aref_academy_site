import { Grid, Paper, Box, Typography } from '@mui/material'
import moment from 'moment-jalaali'
// import { TotalReportDtos } from '../dto/totalReport.consultant_statics?.dto'
import ConsultantPieChart from './ConsultantPieChart'
import { AllTotalConsultantReport, TotalConsultantReport } from '../dto/TotalConsultantReport.dto'
import ConsultantPieChart_2 from './ConsultantPieChart_2'

const ConsultantTotalReportSummary_2 = ({ totalReport }: { totalReport: AllTotalConsultantReport }) => {
  return (
    <Grid container component={Paper} sx={{ my: 2 }}>
      <Grid item xs={12} sm={6} md={6}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          {/* {console.log('totalReport.consultant_statics?', totalReport.consultant_statics?)} */}
          <Typography
            sx={{
              p: 1,
            }}
          >
            نام مشاور: {totalReport.consultant_fullname}
          </Typography>
          <Typography
            sx={{
              p: 1,
            }}
          >
            تعداد کل دانش آموزان ثبت نام شده: {totalReport.consultant_statics?.sum_students_registered}
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
            تعداد کل تایید مالی: {totalReport.consultant_statics?.sum_financial_financial_status_approved}
          </Typography>
          <Typography
            sx={{
              p: 1,
            }}
          >
            تعداد کل عدم پرداخت کامل : {totalReport.consultant_statics?.sum_financial_financial_status_semi_approved}
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
            تعداد کل پرداخت نشده: {totalReport.consultant_statics?.sum_financial_financial_status_pending}
          </Typography>
          <Typography
            sx={{
              p: 1,
            }}
          >
            تعداد کل انصراف : {totalReport.consultant_statics?.sum_financial_student_status_refused}
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
            تعداد کل انسانی : {totalReport.consultant_statics?.sum_students_major_humanities}
          </Typography>

          <Typography
            sx={{
              p: 1,
            }}
          >
            تعداد کل تجربی: {totalReport.consultant_statics?.sum_students_major_experimental}
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
            تعداد کل ریاضی: {totalReport.consultant_statics?.sum_students_major_mathematics}
          </Typography>
          <Typography
            sx={{
              p: 1,
            }}
          >
            تعداد کل هنر: {totalReport.consultant_statics?.sum_students_major_art}
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
            تعداد کل سایر : {totalReport.consultant_statics?.sum_students_major_other}
          </Typography>
          <Typography
            sx={{
              p: 1,
            }}
          >
            تعداد کل دانش آموزان مقطع ششم:{totalReport.consultant_statics?.sum_students_education_level_6}
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
            تعداد کل دانش آموزان مقطع هفتم: {totalReport.consultant_statics?.sum_students_education_level_7}
          </Typography>
          <Typography
            sx={{
              p: 1,
            }}
          >
            تعداد کل دانش آموزان مقطع هشتم:{totalReport.consultant_statics?.sum_students_education_level_8}
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
            تعداد کل دانش آموزان مقطع نهم: {totalReport.consultant_statics?.sum_students_education_level_9}
          </Typography>
          <Typography
            sx={{
              p: 1,
            }}
          >
            تعداد کل دانش آموزان مقطع دهم:{totalReport.consultant_statics?.sum_students_education_level_10}
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
            تعداد کل دانش آموزان مقطع یازدهم: {totalReport.consultant_statics?.sum_students_education_level_11}
          </Typography>
          <Typography
            sx={{
              p: 1,
            }}
          >
            تعداد کل دانش آموزان مقطع دوازدهم:{totalReport.consultant_statics?.sum_students_education_level_12}
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
            تعداد کل دانش آموزان مقطع فارغ: {totalReport.consultant_statics?.sum_students_education_level_13}
          </Typography>
          <Typography
            sx={{
              p: 1,
            }}
          >
            تعداد کل دانش آموزان دانشجو:{totalReport.consultant_statics?.sum_students_education_level_14}
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
            تعداد کل تک جلسه : {totalReport.consultant_statics?.sum_single_meet_1}
          </Typography>
          <Typography
            sx={{
              p: 1,
            }}
          >
            تعداد کل غیر حضوری : {totalReport.consultant_statics?.sum_remote_1}
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
            تعداد کل جلسات جبرانی : {totalReport.consultant_statics?.sum_compensatory_meet_1}
          </Typography>
          <Typography
            sx={{
              p: 1,
            }}
          >
            تعداد کل جلسات تعریف شده مشاور : {totalReport.consultant_statics?.sum_is_defined_consultant_session}
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
            زمان کل جلسات تعریف شده(ساعت) :{' '}
            {(Number(totalReport.consultant_statics?.sum_is_defined_consultant_session_in_minutes) / 60).toFixed(1)}
          </Typography>
          <Typography
            sx={{
              p: 1,
            }}
          >
            تعداد کل جلسات برگزار شده : {totalReport.consultant_statics?.sum_is_filled_consultant_session}
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
            زمان کل جلسات برگزار شده(ساعت) :{' '}
            {(Number(totalReport.consultant_statics?.sum_is_filled_consultant_session_in_minutes) / 60).toFixed(1)}
          </Typography>
          <Typography
            sx={{
              p: 1,
            }}
          >
            تعداد کل جلسات غایب (دانش آموز) : {totalReport.consultant_statics?.sum_student_status_absent}
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
            تعداد کل جلسات غایب (مشاور):  {totalReport.consultant_statics?.sum_consultant_status_absent }
          </Typography>
          <Typography
              sx={{
                p: 1,
              }}
            >
             زمان کل تاخیر و تعجیل جلسات مشاور (ساعت): 
             {((
              (Number(totalReport.consultant_statics?.sum_session_status_earlier_5min_finished) * 5 ) +
              (Number(totalReport.consultant_statics?.sum_session_status_earlier_10min_finished )* 10) +
              (Number(totalReport.consultant_statics?.sum_session_status_earlier_15min_finished )* 15) +
              (Number(totalReport.consultant_statics?.sum_session_status_earlier_15min_more_finished) * 20) +
              (Number(totalReport.consultant_statics?.sum_session_status_later_5min_started )* 5 )+
              (Number(totalReport.consultant_statics?.sum_session_status_later_10min_started) * 10 )+
              (Number(totalReport.consultant_statics?.sum_session_status_later_15min_started) * 15) +
              (Number(totalReport.consultant_statics?.sum_session_status_later_15min_more_started) * 20 )
              ) / 60).toFixed(1)}
        </Typography>
         
        </Box>
      </Grid>
      <Grid item xs={12} sm={1} md={1}></Grid>
      <Grid item xs={12} sm={5} md={5}>
        <ConsultantPieChart_2
          width="100%"
          series={[
            totalReport.consultant_statics?.sum_financial_financial_status_approved
              ? totalReport.consultant_statics?.sum_financial_financial_status_approved
              : 0,
            totalReport.consultant_statics?.sum_financial_financial_status_semi_approved
              ? totalReport.consultant_statics?.sum_financial_financial_status_semi_approved
              : 0,
            totalReport.consultant_statics?.sum_financial_financial_status_pending
              ? totalReport.consultant_statics?.sum_financial_financial_status_pending
              : 0,
          ]}
        />
      </Grid>
    </Grid>
  )
}

export default ConsultantTotalReportSummary_2
