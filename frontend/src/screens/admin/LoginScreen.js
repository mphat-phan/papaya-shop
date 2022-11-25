import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin, resendOTP } from "../../actions/userActions";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { ReactComponent as LoginImage } from "../../assets/images/login-illu.svg";
import logo from "../../assets/images/logo.png";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import InputController from "../../components/InputController";
import backgroundImage from "../../assets/images/background.jpg";
import { useForm, FormProvider } from "react-hook-form";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { BiArrowBack } from "react-icons/bi";
import { useRef } from "react";
const theme = createMuiTheme({
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.mixins.customize.centerFlex(),
    height: "100vh",
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    fontFamily: "Poppins, sans-serif",
  },
  container: {
    height: "85vh",
    width: "70%",
    backgroundColor: theme.palette.background.paper,
    overflow: "hidden",
    boxShadow: "0px 0px 25px -18px rgba(0,0,0,0.75)",
    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
  },
  image: {
    objectFit: "cover",
    height: "100%",
    width: "100%",
    backgroundColor: "rgb(227, 65, 85, 0.08)",
  },
  content: {
    position: "relative",
    ...theme.mixins.customize.flexMixin("flex-start", "center", "column"),
    padding: "24px 20%",
    height: "100%",
    [theme.breakpoints.down("xs")]: {
      padding: "24px 10%",
    },
  },
  form: {
    paddingTop: theme.spacing(6),
  },
  backIcon: {
    position: "absolute",
    top: 5,
    left: 0,
  },
  logo: {
    width: "120px",
    marginTop: 8,
  },
}));

const AdminLoginScreen = ({ location, history }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const methods = useForm();
  const { handleSubmit } = methods;
  const dispatch = useDispatch();
  const classes = useStyles();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo, isVerified, message } = userLogin;

  const { redirectHome = "/admin/dashboard-revenue" } = queryString.parse(
    location.search
  );
  useEffect(() => {
    if (userInfo) {
      if (!userInfo.verified) {
      } else {
        history.push(redirectHome);
      }
    }
  }, [history, userInfo, redirectHome]);

  const submitHandler = ({ email, password, otpCode }) => {
    setEmail(email);
    if (isVerified === false) {
      dispatch(loginAdmin(email, password, otpCode));
    } else {
      dispatch(loginAdmin(email, password));
    }
  };
  const submitResendOTP = () => {
    //console.log(email);
    dispatch(resendOTP(email));
  };
  return (
    <ThemeProvider theme={theme}>
      <Paper className={classes.root} square>
        <Grid container component={Paper} className={classes.container}>
          <Grid item sm={12} md={6}>
            <Box className={classes.content}>
              <Button
                component={RouterLink}
                to="/"
                startIcon={<BiArrowBack />}
                className={classes.backIcon}
              />
              <img src={logo} alt="" className={classes.logo} />
              <FormProvider {...methods}>
                <form
                  className={classes.form}
                  onSubmit={handleSubmit(submitHandler)}
                >
                  <FormControl fullWidth style={{ marginBottom: 16 }}>
                    <InputController
                      name="email"
                      label="Email"
                      required
                      rules={{
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Địa chỉ email không hợp lệ",
                        },
                      }}
                      disabled={isVerified === false ? true : false}
                    />
                  </FormControl>
                  <FormControl fullWidth style={{ marginBottom: 8 }}>
                    <InputController
                      type={showPassword ? "text" : "password"}
                      name="password"
                      label="Password"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              onMouseDown={(e) => e.preventDefault()}
                            >
                              {showPassword ? <VscEye /> : <VscEyeClosed />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      required
                      rules={{
                        minLength: {
                          value: 6,
                          message: "Mật khẩu phải hơn 6 ký tự",
                        },
                      }}
                    />
                  </FormControl>
                  {isVerified === false && (
                    <Grid
                      container
                      spacing={2}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Grid item xs={8}>
                        <FormControl style={{ marginBottom: 16 }}>
                          <InputController
                            name="otpCode"
                            label="OTP Code"
                            required
                            rules={{
                              pattern: {
                                value: /^\d{4}$/,
                                message: "Nhập mã OTP gồm 4 chữ số",
                              },
                            }}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={4}>
                        <Button
                          onClick={submitResendOTP}
                          variant="contained"
                          color="secondary"
                          style={{ height: 30, fontSize: 8 }}
                        >
                          Re-send OTP
                        </Button>
                      </Grid>
                    </Grid>
                  )}

                  <Box display="flex" justifyContent="flex-end" pb={3} pt={1}>
                    <Link component={RouterLink} to="/forgot-password">
                      Quên mật khẩu?
                    </Link>
                  </Box>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    fullWidth
                  >
                    Đăng nhập
                  </Button>
                </form>
              </FormProvider>
              <Box my={4}>
                Tài khoản mới?{" "}
                <Link
                  component={RouterLink}
                  to={`/register?redirect=${redirectHome}`}
                >
                  Tạo tài khoản mới
                </Link>
              </Box>
              {loading && <Loader my={0} />}
              {error && <Message mt={0}>{error}</Message>}
              {isVerified === false && (
                <Message
                  mt={0}
                >{`Tài khoản email của bản đã được gửi OTP vui lòng nhập OTP để xác nhận!!`}</Message>
              )}
              {message && <Message mt={0}>{message}</Message>}
            </Box>
          </Grid>
          <Hidden smDown>
            <Grid item xs={6}>
              <LoginImage className={classes.image} />
            </Grid>
          </Hidden>
        </Grid>
      </Paper>
    </ThemeProvider>
  );
};

export default AdminLoginScreen;
