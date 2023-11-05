import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TitleBox from "components/TitleBox";
import GroupIcon from "@mui/icons-material/Group";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import ClassIcon from "@mui/icons-material/Class";
import LogoutIcon from "@mui/icons-material/Logout";
import ShowWeeklyReport from "./components/ShowWeeklyReport";


const ConsultantManagerDashboardIndex = () => {
  const navigate = useNavigate();
  
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} lg={4}>
          <Box
            sx={{
              backgroundColor: "success.main",
              color: "white",
              borderRadius: "5px",
              boxShadow: 3,
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              py: 2,
            }}
            onClick={() => {
              navigate("/consultant/show-all");
            }}
          >
            <TitleBox
              title="برنامه روزانه"
              number=""
              icon={<ClassIcon sx={{ mt: 1 }} fontSize="large" />}
            />
          </Box>
        </Grid>

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
              navigate("/students/consultant_manager");
            }}
          >
            <TitleBox
              title=" مدیریت دانش آموزان"
              number=""
              icon={<GroupIcon sx={{ mt: 1 }} fontSize="large" />}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Box
            sx={{
              backgroundColor: "orange",
              color: "white",
              borderRadius: "5px",
              boxShadow: 3,
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              py: 2,
            }}
            onClick={() => {
              navigate("/consultant");
            }}
          >
            <TitleBox
              title=" زمانبندی مشاوران "
              number=""
              icon={<GroupIcon sx={{ mt: 1 }} fontSize="large" />}
            />
          </Box>
        </Grid>
        
        {/* <Grid item xs={12} md={4} lg={4}>
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
              navigate("users");
            }}
          >
            <TitleBox
              title="خروج"
              number=""
              icon={<LogoutIcon sx={{ mt: 1 }} fontSize="large" />}
            />
          </Box>
        </Grid> */}
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
          {/* <ShowWeeklyReport ></ShowWeeklyReport> */}
        </Box>
      </Grid>
    </Container>
  );
};

export default ConsultantManagerDashboardIndex;
