import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CourseSessionDetailsType from "../dto/CourseSessionDetailsType";
import CourseSessionsOrderByDateType from "../dto/CourseSessionsOrderByDateType";

import FaceIcon from "@mui/icons-material/Face";
import malepng from "../../../assets/img/male.png";
import Face2Icon from "@mui/icons-material/Face2";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import moment_jalali from "moment-jalaali";
import { showError } from "utils/swlAlert";

const InnerBox = ({
  details,
  todayDate,
  data,
}: {
  details: CourseSessionDetailsType[];
  todayDate: String | undefined;
  data: CourseSessionsOrderByDateType;
}) => {
  const innerBoxEducationUnder12 = {
    backgroundColor: "#02acf5",
    color: "black",
    borderRadius: "5px",
    boxShadow: 3,
    cursor: "pointer",
    display: "flex",
    ustifyContent: "flex-end",
    alignItems: "flex-end",
    p: 2,
    width: 150,
    m: 1,
    direction: "rtl",
    flexDirection: "column",
  };

  const innerBoxEducationEqual12 = {
    backgroundColor: "#7aeb83",
    color: "black",
    borderRadius: "5px",
    boxShadow: 3,
    cursor: "pointer",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    p: 2,
    width: 150,
    m: 1,
    direction: "rtl",
    flexDirection: "column",
  };

  const innerBoxEducationUpper12 = {
    backgroundColor: "#e6a00b",
    color: "black",
    borderRadius: "5px",
    boxShadow: 3,
    cursor: "pointer",
    display: "flex",
    ustifyContent: "flex-end",
    alignItems: "flex-end",
    p: 2,
    width: 150,
    m: 1,
    direction: "rtl",
    flexDirection: "column",
  };

  const checkEducation = (education_level: any) => {
    let educationNumber = Number(education_level);

    if (educationNumber === 12) {
      return innerBoxEducationEqual12;
    } else if (educationNumber > 12) {
      return innerBoxEducationUpper12;
    } else {
      return innerBoxEducationUnder12;
    }
  };

  const convertCourseType = (courseType: String | undefined) => {
    switch (courseType) {
      case "public":
        return "عمومی";
      case "private":
        return "خصوصی";
      case "semi-private":
        return "نیمه خصوصی";
      case "master":
        return "ویژه";
      default:
        return "نعیین نشده";
    }
  };
  const navigate = useNavigate();
  const jalali_date = moment_jalali(todayDate?.toString()).format(
    "jYYYY/jMM/jDD"
  ); 

  return (
    <>
      {data.details?.map((detail, index: number) => (
        <Grid
          item
          xs={12}
          md={4}
          lg={4}
          key={index}
          onClick={() => {
            jalali_date ===
            moment_jalali(data.date?.toString()).format("jYYYY/jMM/jDD")
              ? navigate(
                  `reports/absence-presences/details/${detail.course_id}/${detail.id}`
                )
              : showError('فقط در روز جاری حضور غیاب امکان پذیر است.');
              
          }}
        >
          <Box sx={checkEducation(detail.education_level)}>
            <Box sx={{ mt: 1 }}>
              {" ساعت:"}
              {detail.end_time?.substring(0, 5)}-{" "}
              {detail.start_time?.substring(0, 5)}
            </Box>

            <Box>
              {"کلاس:"} {detail?.class_rome_name}{" "}
            </Box>
            <Box>
              {" "}
              {"نام دوره:"}
              {detail?.course_name}
            </Box>
            {/* <Box> {detail.name} </Box> */}
            <Box>
              {" "}
              {"درس:"}
              {detail?.lesson_name}
            </Box>
            <Box>
              {"دبیر:"}
              {detail?.teacher_name}
            </Box>
            <Box>
              {"نوع:"}
              {convertCourseType(detail?.course_type)}
            </Box>
            <Box>
              {"شعبه:"}
              {detail?.branche_name}
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#dae4e963",
                p: 1,
                width:120
              }}
            >
              {/* <Box sx={{ px: 1 }}>
                {detail.gender === "female" ? "دخترانه" : "پسرانه"}
              </Box> */}
              <Box sx={{ px: 1 }}>{"مقطع :"}{detail?.education_level}</Box>

              {detail.gender === "female" ? (
                <Face2Icon fontSize="small" />
              ) : (
                <FaceIcon />
              )}
            </Box>
          </Box>
        </Grid>
      ))}
    </>
  );
};

export default InnerBox;
