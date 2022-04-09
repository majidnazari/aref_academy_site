
import * as React from 'react';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import { faIR } from '@mui/material/locale';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Sidebar from './sildebar';
import Topbar from './topbar';


let theme = createTheme({
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            'VazirFarsiNumbers',
        ].join(','),
    },
    direction: 'rtl',
    palette: {
        mode: 'light',
    },
}, faIR);
theme = responsiveFontSizes(theme);

interface childProps {
    children: any;
}

const Main = ({ children }: childProps) => {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (<ThemeProvider theme={theme} >
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            <Topbar open={open} toggleDrawer={toggleDrawer} />

            <Sidebar open={open} toggleDrawer={toggleDrawer} />

            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    </ThemeProvider>)
}

export default Main;