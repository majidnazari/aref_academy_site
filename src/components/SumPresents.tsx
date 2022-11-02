import { Box } from "@mui/material";
import StudentCoursesType from "interfaces/studentCourses.interface";

const SumPresents = ({ element }: { element: Partial<StudentCoursesType> }) => {
  return (
    <Box>
      {element.total_present
        ? element.total_present
        : 0 +
          (element.total_dellay15 ? element.total_dellay15 : 0) +
          (element.total_dellay30 ? element.total_dellay30 : 0) +
          (element.total_dellay45 ? element.total_dellay45 : 0) +
          (element.total_dellay60 ? element.total_dellay60 : 0)}
    </Box>
  );
};

export default SumPresents;
