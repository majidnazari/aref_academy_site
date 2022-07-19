import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LogoutIcon from '@mui/icons-material/Logout';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ClassIcon from '@mui/icons-material/Class';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import {
    Link,
    useNavigate
} from "react-router-dom"
import { getUserData } from '../utils/user';
import { } from '@mui/material/colors';



interface MenuItem {
    href: string;
    icon: string;
    id: string;
    name: string;
    slug: string;
}

const Components: any = {
    DashboardIcon: DashboardIcon,
    ShoppingCartIcon: ShoppingCartIcon,
    PeopleIcon: PeopleIcon,
    BarChartIcon: BarChartIcon,
    AssignmentIcon: AssignmentIcon,
    ClassIcon: ClassIcon,
    ReceiptLongIcon: ReceiptLongIcon,
    NewReleasesIcon: NewReleasesIcon,
    AddBusinessIcon: AddBusinessIcon,
    MeetingRoomIcon: MeetingRoomIcon,
    MenuBookIcon: MenuBookIcon
};
const loadIcon = (input: any) => {
    return React.createElement(Components[input], {});
}

const GenerateMenuItems = () => {
    const navigate = useNavigate();
    const userData = getUserData();
    const menus = userData.group ? userData.group.menus : [];
    return menus?.map((menu: MenuItem) => {
        // return (
        //     <ListItemButton
        //         key={menu.id}
        //         onClick={() => navigate(menu.href)}
        //     >
        //         <ListItemIcon>
        //             {loadIcon(menu.icon)}
        //         </ListItemIcon>
        //         <ListItemText primary={menu.name} />
        //     </ListItemButton>
        // )
        return (
            <Link
                key={menu.id}
                to={menu.href}
                style={{
                    textDecoration: 'none',
                    display: 'flex',
                    paddingRight: 15,
                    marginTop: 12,
                    marginBottom: 12,
                }}
                color="primary"
                rel="noopener noreferrer"
            >
                <ListItemIcon>
                    {loadIcon(menu.icon)}
                </ListItemIcon>
                <ListItemText primary={menu.name} />
            </Link>
        )
    })
}

export const MainListItems = () => {
    let navigate = useNavigate();
    return <>
        <GenerateMenuItems />
        <ListItemButton onClick={() => navigate('/signout')}>
            <ListItemIcon>
                <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="خروج" />
        </ListItemButton>
    </>
};

export const SecondaryListItems = () => {
    //let navigate = useNavigate();
    return (process.env.REACT_APP_DEVELEP_MOD === "0" ? null : (
        <React.Fragment>
            <ListSubheader component="div" inset >
                منوهای تستی
            </ListSubheader>

            <Link
                to='/students'
                style={{
                    textDecoration: 'none',
                    display: 'flex',
                    paddingRight: 15,
                }}
                color="primary"
                rel="noopener noreferrer"
            >
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="ثبت تماس مراجعان" />
            </Link>

            <ListItemButton>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="فهرست تماس های امروز" />
            </ListItemButton>

            <ListItemButton>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="تاییدهای مدیر" />
            </ListItemButton>

            <ListItemButton>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="درج سوابق مالی" />
            </ListItemButton>

            <ListItemButton>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary=" گزارش های مالی" />
            </ListItemButton>

        </React.Fragment >)
    )
};