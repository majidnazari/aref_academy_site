import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CourseSessionDetailsType from "../dto/CourseSessionDetailsType";

import FaceIcon from "@mui/icons-material/Face";
import malepng from "../../../assets/img/male.png";
import Face2Icon from "@mui/icons-material/Face2";

const InnerBox = ({ details }: { details: CourseSessionDetailsType[] }) => {
  const innerBoxEducationUnder12 = {
    backgroundColor: "#02acf5",
    color: "black",
    borderRadius: "5px",
    boxShadow: 3,
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    p: 0,
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
    justifyContent: "center",
    p: 0,
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
    justifyContent: "center",
    p: 0,
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

  return (
    <>
      {details?.map((detail, index: number) => (
        <Grid item xs={12} md={4} lg={4} key={index}>
          <Box sx={checkEducation(detail.education_level)}>
            <Box sx={{mt:1}}>
              {" "}
              {detail.start_time?.substring(0,5)}- {detail.end_time?.substring(0,5)}{" "}
            </Box>

            <Box> {detail.class_rome_name} </Box>
            <Box> {detail.course_name}</Box>
            <Box> {detail.name} </Box>
            <Box>{detail.lesson_name}</Box>
            <Box>{detail.teacher_name}</Box>
            <Box>{detail.education_level}</Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#dae4e963",
                p:1
              }}
            >
              <Box sx={{ px: 1 }}>
                {detail.gender === "female" ? "دخترانه" : "پسرانه"}
              </Box>

              {detail.gender === "female" ? <Face2Icon fontSize="small" /> : <FaceIcon />}
            </Box>
          </Box>
        </Grid>
      ))}
    </>
  );
};

export default InnerBox;
