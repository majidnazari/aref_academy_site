import { useContext } from 'react';
import { AuthContext } from '../../components/AppContext';
import { setToken } from '../../utils/auth';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { faIR } from '@mui/material/locale';
import bg from '../../assets/img/login-ng.jpeg';
import logo from '../../assets/img/aref-logo.svg';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'کپی رایت © '}
            <Link color="inherit" href="https://aref-group.ir/">
                موسسه آموزشی عارف
            </Link>{' '}
            {new Date().getFullYear()}
        </Typography>
    );
}
// Create rtl cache
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

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


const SigninScreen = () => {
    const authContext = useContext(AuthContext);
    const loginHandler = () => {
        authContext.login(true);
        setToken("asdasdasdasdasdasdasd32132");
    }


    return (
        <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <CssBaseline />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            {/* <Avatar sx={{ m: 1 ,width: 56, height: 56 }} src={logo} variant="square" /> */}
                            <img src={logo} alt="logo" style={{ width: 40, marginBottom: 10 }} />

                            <Typography component="h1" variant="h5">
                                ورود به سامانه آکادمی عارف
                            </Typography>
                            <Box component="form" noValidate sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="نام کاربری"
                                    name="email"
                                    autoComplete="number"
                                    autoFocus
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="گذرواژه"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />

                                <Button
                                    onClick={loginHandler}
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    ورود
                                </Button>
                                <Grid container>

                                </Grid>
                                <Copyright sx={{ mt: 5 }} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage: 'url(' + bg + ')',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />

                </Grid>
            </ThemeProvider>
        </CacheProvider>
    );
}

export default SigninScreen;