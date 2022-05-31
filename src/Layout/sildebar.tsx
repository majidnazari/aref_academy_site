import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { MainListItems, SecondaryListItems } from './listItems';
import Typography from '@mui/material/Typography';
import { getUserData } from '../utils/user'

const drawerWidth: number = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

interface SidebarProps {
    toggleDrawer: Function;
    open: boolean;
}


const Sidebar = ({ toggleDrawer, open = true }: SidebarProps) => {
    const userInfo = getUserData();
    return (<Drawer variant="permanent" open={open}>
        <Toolbar
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: [1],
            }}
        >

            <Typography component="h3" sx={{
                color: 'info.main',
                pl: [7]
            }} >
                {userInfo.first_name} {userInfo.last_name}
            </Typography>

            <IconButton onClick={() => toggleDrawer()}>
                <ChevronRightIcon />
            </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav" >
            <MainListItems />
            <Divider sx={{ my: 1 }} />
            <SecondaryListItems />
        </List>
    </Drawer >)
}

export default Sidebar;