import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  FormControl,
  Breadcrumbs,
  Link,
  Box,
  Badge,
  Avatar,
  InputAdornment,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import {
  getUserDetails,
  updateUserProfile,
  logout,
} from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";
import { openSnackbar } from "../actions/snackbarActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useForm, FormProvider } from "react-hook-form";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { FaTimes } from "react-icons/fa";
import OrderStatus from "../components/OrderStatus";
// import userPlaceholder from '../assets/images/userPlaceholder.png';
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import InputController from "../components/InputController";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { MdCloudUpload, MdClose } from "react-icons/md";
import { jwt } from "jsonwebtoken";

const StyledBadge = withStyles((theme) => ({
  root: {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  breadcrumbsContainer: {
    ...theme.mixins.customize.breadcrumbs,
    paddingBottom: 0,
    "& .MuiBreadcrumbs-ol": {
      justifyContent: "flex-start",
    },
  },
  content: {
    padding: 24,
    boxShadow: "0 10px 31px 0 rgba(0,0,0,0.05)",
  },
  paper: {
    // minHeight: 527,
    padding: 20,
    borderRadius: 10,
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
  },
  largeAvatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  profile: {
    position: "relative",
    ...theme.mixins.customize.flexMixin("center", "center", "column"),
    backgroundColor: "#F8F9FD",
    padding: 20,
    marginTop: theme.spacing(4),
    borderRadius: 10,
  },
  btnAvatar: {
    ...theme.mixins.customize.flexMixin("center", "center", "column"),
    marginTop: theme.spacing(1),
  },
  form: {
    padding: theme.spacing(2),
    "& .MuiInput-underline:before": {
      borderColor: "rgba(224, 224, 224, 1)",
    },
    "& .MuiInput-input": {
      fontFamily: "Poppins, sans-serif",
      fontSize: 13,
    },
  },
}));

const ChangePasswordScreen = ({ history }) => {
  const classes = useStyles();
  const methods = useForm();
  const { handleSubmit, getValues, setValue } = methods;
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const passwordError = userDetails.success;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  console.log(userInfo);

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;
  
  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  const [avatar, setAvatar] = useState(userInfo.avatar);

  console.log(userDetails);
  const uploadAvatar = (avt) => {
    if (avt === null) {
      setAvatar(null);
    }

    if (avt.type === "image/jpeg" || avt.type === "image/png") {
      const data = new FormData();
      data.append("file", avt);
      data.append("upload_preset", "fashion");
      data.append("cloud_name", "dnkhiiz0b");
      fetch("https://api.cloudinary.com/v1_1/dnkhiiz0b/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setAvatar(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return "";
    }
  };

  const removeAvatar = () => {
    if (avatar !== null) {
      setAvatar(
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
      );
    }
  };

  useEffect(() => {
    if (!userInfo) {
      dispatch(logout());
      history.push("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setValue("password", '');
        setValue("confirmPassword", '');
        setValue("oldPassword", '');
      }
    }
  }, [dispatch, setValue, history, userInfo, user, success]);

  useEffect(() => {
    if (success) {
      dispatch(
        openSnackbar("Đổi mật khẩu thành công", "success")
      );
    }
    if(passwordError === false){
      dispatch(
        openSnackbar("Đổi mật khẩu không thành công", "error")
      );
    }
  }, [dispatch, success, passwordError]);

  const submitHandler = ({
    password,
    oldPassword
  }) => {
    dispatch(
      updateUserProfile({
        id: user._id,
        password,
        oldPassword,
      })
    );
  };

  return (
    <Container maxWidth="xl" style={{ marginBottom: 48 }}>
      <Meta title="Profile" />
      <Grid container className={classes.breadcrumbsContainer}>
        <Grid item xs={12}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            style={{ marginBottom: 24 }}
          >
            <Link color="inherit" component={RouterLink} to="/">
              Trang Chủ
            </Link>
            <Link color="inherit" component={RouterLink} to="/profile">
              Thông Tin Cá Nhân
            </Link>
            <Link color="textPrimary" component={RouterLink} to="/change-password">
              Đổi mật khẩu
            </Link>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} lg={6}>
          <Paper className={classes.paper} elevation={0}>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message>{error}</Message>
            ) : (
              <>
                
                <FormProvider {...methods}>
                  <form
                    className={classes.form}
                    onSubmit={handleSubmit(submitHandler)}
                  >
                    <FormControl fullWidth style={{ marginBottom: 12 }}>
                      <InputController
                        type="password"
                        name="oldPassword"
                        label="Mật khẩu cũ"
                        required
                        rules={{
                          minLength: {
                            value: 6,
                            message: "Password must be more than 6 characters",
                          },
                        }}
                      />
                    </FormControl>
                    <FormControl fullWidth style={{ marginBottom: 12 }}>
                      <InputController
                        type={showPassword ? "text" : "password"}
                        name="password"
                        label="Mật khẩu mới"
                        required
                        rules={{
                          minLength: {
                            value: 6,
                            message: "Password must be more than 6 characters",
                          },
                        }}
                      />
                    </FormControl>
                    <FormControl fullWidth style={{ marginBottom: 12 }}>
                      <InputController
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        label="Xác nhận mật khẩu"
                        required
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
                        rules={{
                          validate: {
                            matchPassword: (value) =>
                              value !== getValues("password")
                                ? "Password do not match"
                                : true,
                          },
                        }}
                      />
                    </FormControl>
              
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      fullWidth
                      style={{ marginTop: 16 }}
                    >
                      Đổi mật khẩu
                    </Button>
                  </form>
                </FormProvider>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChangePasswordScreen;
