import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CourseSessionDetailsType from "../dto/CourseSessionDetailsType";
//import Face3OutlinedIcon from '@mui/icons-material/Face3Outlined';

const InnerBox = ({ details }: { details: CourseSessionDetailsType[] }) => {
  const innerBox = {
    backgroundColor: "purple",
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
    flexDirection:"column",
    
  };

  const smallBox = {
    backgroundColor: "green",
    color: "black",   
    cursor: "pointer",
    display: "block",
    justifyContent: "center",
    py: 2,
    px: 2,
    width: 150,
    m: 1,
    direction: "rtl",
    
  };

  return (
    <>
      {details?.map((detail, index: number) => (
        <Grid item xs={12} md={4} lg={4} >

          <Box sx={innerBox}>
          
            {/* <Box>{Face3OutlinedIcon}</Box> */}
            <Box > {detail.class_rome_name} </Box>

            <Box >
              {" "}
              {detail.start_time}- {detail.end_time}{" "}
            </Box>
            <Box > {detail.course_name}</Box>
            <Box > {detail.name} </Box>
            <Box >{detail.lesson_name}</Box>
            <Box >{detail.teacher_name}</Box>            
            <Box >{detail.gender}</Box>
            <Box >{detail.education_level}</Box>
          </Box>
        </Grid>
      ))}
    </>
  );
};

export default InnerBox;
