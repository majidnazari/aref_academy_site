import { useContext, useState } from "react";
import { AuthContext } from "../../components/AppContext";
import { setToken } from "../../utils/auth";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { faIR } from "@mui/material/locale";
import bg from "../../assets/img/login-ng.jpeg";
import logo from "../../assets/img/aref-logo.svg";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { saveUserData } from "../../utils/user";
import { LOGIN_MUTATION } from "./gql";
import { useMutation } from "@apollo/client";
//import MessageDialogs from '../../components/MessageDialogs';

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"کپی رایت © "}
      <Link color="inherit" href="https://aref-group.ir/">
        موسسه آموزشی عارف
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}
// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

let theme = createTheme(
  {
    typography: {
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        "VazirFarsiNumbers",
      ].join(","),
    },
    direction: "rtl",
    palette: {
      mode: "light",
    },
  },
  faIR
);

const SigninScreen = () => {
  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPassword(event.target.value);
  };
  const loginHandler = async () => {
    setLoading(true);
    login()
      .then((res) => {
        saveUserData(res.data.login.user);
        setToken(res.data.login.access_token);
        authContext.login(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      username: email,
      password: password,
    },
    fetchPolicy: "no-cache",
  });

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />

          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* <Avatar sx={{ m: 1 ,width: 56, height: 56 }} src={logo} variant="square" /> */}
              <img
                src={logo}
                alt="logo"
                style={{ width: 40, marginBottom: 10 }}
              />

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
                  value={email}
                  onChange={handleEmailChange}
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
                  value={password}
                  onChange={handlePasswordChange}
                  onKeyPress={(ev) => {
                    if (ev.key === "Enter") {
                      loginHandler();
                    }
                  }}
                />

                <Button
                  onClick={loginHandler}
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  sx={{ mt: 3, mb: 2 }}
                >
                  {loading ? (
                    <CircularProgress size={15} color="primary" />
                  ) : null}
                  ورود
                </Button>
                <Grid container></Grid>
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
              backgroundImage: "url(" + bg + ")",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </Grid>
        {/* {tmpComponent?.props?.open && tmpComponent} */}
      </ThemeProvider>
    </CacheProvider>
  );
};

export default SigninScreen;
