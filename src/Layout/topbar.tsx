import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useQuery } from '@apollo/client';
import { GET_COURSES_STUDENTS } from './gql/query';
import { generateQueryOptions } from "utils/utils";
import { useNavigate } from "react-router-dom";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

interface TopbarProps {
    toggleDrawer: Function;
    open: boolean;
    isDarkTheme: boolean;
    setDarktheme: (inp: boolean) => void;
}

const Topbar = ({ toggleDrawer, open = true, isDarkTheme = false, setDarktheme }: TopbarProps) => {
    const navigate = useNavigate();
    const { data } = useQuery(GET_COURSES_STUDENTS, {
        variables: {
            first: 100000,
            page: 1,
            ...generateQueryOptions(),
        }
    });

    return (<AppBar position="absolute" open={open}>
        <Toolbar
            sx={{
                pr: '24px', // keep right padding when drawer closed
            }}
        >
            <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={() => toggleDrawer()}
                sx={{
                    marginRight: '36px',
                    ...(open && { display: 'none' }),
                }}
            >
                <MenuIcon />
            </IconButton>
            <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
            >
                آکادمی عارف
            </Typography>
            <IconButton
                color="inherit"
                onClick={() => {
                    navigate('/alarms/consultant-financial');
                }}
            >
                <Badge badgeContent={
                    data?.getCourseStudents?.paginatorInfo.total || 0
                } color="secondary">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <IconButton
                color="inherit"
                onClick={() => {
                    navigate('/alarms/student-courses');
                }}
            >
                <Badge badgeContent={
                    data?.getCourseStudents?.paginatorInfo.total || 0
                } color="secondary">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            {isDarkTheme ? <IconButton
                onClick={() => {
                    setDarktheme(false);
                }}
            >
                <LightModeIcon sx={{ color: "#fff" }} />
            </IconButton> :
                <IconButton
                    onClick={() => {
                        setDarktheme(true);
                    }}>
                    <DarkModeIcon sx={{ color: "#fff" }} />
                </IconButton>}

        </Toolbar>
    </AppBar >)
}

export default Topbar;