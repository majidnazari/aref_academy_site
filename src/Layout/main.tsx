
import React, { useState } from 'react';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import { faIR } from '@mui/material/locale';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Sidebar from './sildebar';
import Topbar from './topbar';
import { Outlet } from "react-router-dom";

import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { setDarktheme, getDarktheme } from '../utils/utils';


// Create rtl cache
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

// interface childProps {
//     children: any;
// }

const Main = () => {
    const [open, setOpen] = useState(true);
    const [isDarkTheme, setIsDarkTheme] = useState(getDarktheme());

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const setDarkthemeForAll = (isDarkTheme: boolean) => {
        setIsDarkTheme(isDarkTheme);
        setDarktheme(isDarkTheme ? 'true' : 'false');
        theme.palette.mode = isDarkTheme ? 'dark' : 'light';
    }

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
            mode: isDarkTheme ? 'dark' : 'light',
        },

    }, faIR);
    theme = responsiveFontSizes(theme);


    return (
        <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme} >
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />

                    <Topbar
                        open={open}
                        toggleDrawer={toggleDrawer}
                        setDarktheme={setDarkthemeForAll}
                        isDarkTheme={isDarkTheme}
                    />

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
                        <Outlet />
                    </Box>
                </Box>
            </ThemeProvider>
        </CacheProvider>
    )
}

export default Main;