import React, { useState } from 'react';
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
import CoPresentIcon from '@mui/icons-material/CoPresent';
import {
    Link,
    useNavigate
} from "react-router-dom"
import { getUserData } from '../utils/user';
import { getDarktheme } from '../utils/utils';
import { Collapse, List } from '@mui/material';
import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import InboxIcon from '@mui/icons-material/MoveToInbox';

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
    MenuBookIcon: MenuBookIcon,
    CoPresentIcon: CoPresentIcon
};
const loadIcon = (input: any) => {
    return React.createElement(Components[input], {});
}

const GenerateMenuItems = () => {
    const userData = getUserData();
    const menus = userData.group ? userData.group.menus : [];
    const [activeMenu, setActiveMenu] = useState<string>("");
    return menus?.map((menu: MenuItem) => {
        return (
            <Link
                key={menu.id}
                to={menu.href}
                style={{
                    textDecoration: 'none',
                    display: 'flex',
                    paddingRight: 15,
                    paddingTop: 8,
                    paddingBottom: 8,
                    color: 'inherit',
                }}
                onClick={() => {
                    setActiveMenu(menu.id);
                }}
                className={activeMenu === menu.id ? getDarktheme() ? "activeMenuDark" : "activeMenuLight" : ""}
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
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (process.env.REACT_APP_DEVELEP_MOD === "0" ? null : (
        <React.Fragment>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Starred" />
                    </ListItemButton>
                </List>
            </Collapse>

            <ListSubheader component="div" inset >
                منوهای تستی
            </ListSubheader>

            <Link
                to='/reports/absence-presences'
                style={{
                    textDecoration: 'none',
                    display: 'flex',
                    paddingRight: 15,
                    color: 'inherit'
                }}
            >
                <ListItemIcon>
                    <CoPresentIcon />
                </ListItemIcon>
                <ListItemText primary="گزارش حضور و غیاب" />
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