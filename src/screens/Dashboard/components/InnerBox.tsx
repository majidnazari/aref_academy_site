import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CourseSessionDetailsType from "../dto/CourseSessionDetailsType";

import femalepng from "../../../assets/img/female.png";
import malepng from "../../../assets/img/male.png";

const InnerBox = ({ details }: { details: CourseSessionDetailsType[] }) => {
  const innerBoxEducationUnder12 = {
    backgroundColor: "#02acf5",
    color: "white",
    borderRadius: "5px",
    boxShadow: 3,
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    py: 2,
    px: 2,
    width: 150,
    m: 1,
    direction: "rtl",
    flexDirection: "column",
  };

  const innerBoxEducationEqual12 = {
    backgroundColor: "#0af502",
    color: "black",
    borderRadius: "5px",
    boxShadow: 3,
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    py: 2,
    px: 2,
    width: 150,
    m: 1,
    direction: "rtl",
    flexDirection: "column",
  };

  const innerBoxEducationUpper12 = {
    backgroundColor: "#e1f502",
    color: "black",
    borderRadius: "5px",
    boxShadow: 3,
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    py: 2,
    px: 2,
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
        <Grid item xs={12} md={4} lg={4}>
          <Box sx={checkEducation(detail.education_level)}>
            <Box>
              {" "}
              {detail.start_time}- {detail.end_time}{" "}
            </Box>

            <Box> {detail.class_rome_name} </Box>
            <Box> {detail.course_name}</Box>
            <Box> {detail.name} </Box>
            <Box>{detail.lesson_name}</Box>
            <Box>{detail.teacher_name}</Box>
            <Box>
              <img
                src={detail.gender === "female" ? femalepng : malepng}
                alt=""
                width={30}
              />
            </Box>
            {/* <Box >{detail.education_level}</Box> */}
          </Box>
        </Grid>
      ))}
    </>
  );
};

export default InnerBox;
