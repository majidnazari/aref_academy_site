import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TitleBox from 'components/TitleBox';
import GroupIcon from '@mui/icons-material/Group';
import { Box } from '@mui/material';
import { useNavigate } from "react-router-dom"
import ClassIcon from '@mui/icons-material/Class';
import LogoutIcon from '@mui/icons-material/Logout';

const DashboardScreen = () => {
    const navigate = useNavigate();
    return (<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }} >
        <Grid container spacing={2}>
            <Grid item xs={12} md={4} lg={4}>
                <Box
                    sx={{
                        backgroundColor: "success.main",
                        color: "white",
                        borderRadius: "5px",
                        boxShadow: 3,
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'center',
                        py: 2
                    }}
                    onClick={() => {
                        navigate('courses');
                    }}
                >
                    <TitleBox title="مدیریت کلاسها" number="" icon={<ClassIcon sx={{ mt: 1 }} fontSize="large" />} />
                </Box>
            </Grid>

            <Grid item xs={12} md={4} lg={4}>
                <Box
                    sx={{
                        backgroundColor: "info.main",
                        color: "white",
                        borderRadius: "5px",
                        boxShadow: 3,
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'center',
                        py: 2
                    }}
                    onClick={() => {
                        navigate('students');
                    }}
                >
                    <TitleBox title="مدیریت دانش‌آموزان" number="" icon={<GroupIcon sx={{ mt: 1 }} fontSize="large" />} />
                </Box>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
                <Box
                    sx={{
                        backgroundColor: "text.secondary",
                        color: "white",
                        borderRadius: "5px",
                        boxShadow: 3,
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'center',
                        py: 2
                    }}
                    onClick={() => {
                        navigate('users');
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
    </Container>)
}

export default DashboardScreen;