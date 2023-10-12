import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TitleBox from "components/TitleBox";
import GroupIcon from "@mui/icons-material/Group";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import ClassIcon from "@mui/icons-material/Class";
import LogoutIcon from "@mui/icons-material/Logout";
import ShowWeeklyReport from "./components/ShowWeeklyReport";


const ConsultantStudentManager = () => {
  const navigate = useNavigate();

  // const [pageInfo, setPageInfo] = useState<PaginatorInfo>({
  //   count: 0,
  //   currentPage: 1,
  //   firstItem: 0,
  //   hasMorePages: false,
  //   lastItem: 0,
  //   lastPage: 1,
  //   perPage: 10,
  //   total: 0,
  // }); 
  
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={2}>
        
        <Grid item xs={12} md={4} lg={4}>
          <Box
            sx={{
              backgroundColor: "info.main",
              color: "white",
              borderRadius: "5px",
              boxShadow: 3,
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              py: 2,
            }}
            onClick={() => {
              navigate("students/consultant_manager");
            }}
          >
            <TitleBox
              title="مدیریت دانش‌آموزان"
              number=""
              icon={<GroupIcon sx={{ mt: 1 }} fontSize="large" />}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Box
            sx={{
              backgroundColor: "text.secondary",
              color: "white",
              borderRadius: "5px",
              boxShadow: 3,
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              py: 2,
            }}
            onClick={() => {
              navigate("/signout");
            }}
          >
            <TitleBox
              title="خروج"
              number=""
              icon={<LogoutIcon sx={{ mt: 1 }} fontSize="large" />}
            />
          </Box>
        </Grid>
      </Grid>

      <Grid item xs={12} md={12} lg={12}>
        <Box
          sx={{
            backgroundColor: "white",
            color: "white",
            borderRadius: "5px",
            boxShadow: 3,
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            py: 2,
            mt: 1,
          }}
        >
          <ShowWeeklyReport ></ShowWeeklyReport>
        </Box>
      </Grid>
    </Container>
  );
};

export default ConsultantStudentManager;
