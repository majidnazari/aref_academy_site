import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import {
    useNavigate
} from "react-router-dom"

export const MainListItems = () => {
    let navigate = useNavigate();
    return (
        <React.Fragment>
            <ListItemButton onClick={() => navigate('/')}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="داشبورد" />
            </ListItemButton>

            <ListItemButton onClick={() => navigate('/users')} >
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="مدیریت کاربران" />
            </ListItemButton>

            <ListItemButton>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="فهرست دانش اموزان" />
            </ListItemButton>

            <ListItemButton>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="برنامه کلاسی" />
            </ListItemButton>

            <ListItemButton>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="ثبت تماس مراجعان" />
            </ListItemButton>

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

            <ListItemButton onClick={() => navigate('/signout')}>
                <ListItemIcon>
                    <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="خروج" />
            </ListItemButton>
        </React.Fragment>
    )
};

export const SecondaryListItems = () => {
    let navigate = useNavigate();
    return (
        <React.Fragment>
            <ListSubheader component="div" inset>
                Saved reports
            </ListSubheader>

            <ListItemButton>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="تعریف کلاس" />
            </ListItemButton>

            <ListItemButton>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="تعریف دبیر" />
            </ListItemButton>

            <ListItemButton onClick={() => navigate('/years')} >
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="سال تحصیلی فعال" />
            </ListItemButton>
        </React.Fragment>
    )
};