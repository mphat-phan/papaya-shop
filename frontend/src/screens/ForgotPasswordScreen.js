import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sendOTPPassword, forgotPassword, changePassword } from '../actions/userActions';
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import { ReactComponent as LoginImage } from '../assets/images/login-illu.svg';
import logo from '../assets/images/logo.png';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Loader from '../components/Loader';
import Message from '../components/Message';
import InputController from '../components/InputController';
import backgroundImage from '../assets/images/background.jpg';
import { useForm, FormProvider } from 'react-hook-form';
import { VscEyeClosed, VscEye } from 'react-icons/vsc';
import { BiArrowBack } from 'react-icons/bi';
import { USER_CHANGEPASSWORD_RESET } from '../constants/userConstants.js';
import {useRef} from 'react';
const theme = createMuiTheme({
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.mixins.customize.centerFlex(),
    height: '100vh',
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    fontFamily: 'Poppins, sans-serif',
  },
  container: {
    height: '85vh',
    width: '70%',
    backgroundColor: theme.palette.background.paper,
    overflow: 'hidden',
    boxShadow: '0px 0px 25px -18px rgba(0,0,0,0.75)',
    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  image: {
    objectFit: 'cover',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgb(227, 65, 85, 0.08)',
  },
  content: {
    position: 'relative',
    ...theme.mixins.customize.flexMixin('flex-start', 'center', 'column'),
    padding: '24px 20%',
    height: '100%',
    [theme.breakpoints.down('xs')]: {
      padding: '24px 10%',
    },
  },
  form: {
    paddingTop: theme.spacing(6),
  },
  backIcon: {
    position: 'absolute',
    top: 5,
    left: 0,
  },
  logo: {
    width: '120px',
    marginTop: 8,
  },
}));

const ForgotPasswordScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const methods = useForm();
  const { handleSubmit, getValues } = methods;
  
  const dispatch = useDispatch();
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  
  const { loading, error, message, userInfo, status } = userLogin;
  const { redirectHome = '/' } = queryString.parse(location.search);

  if(status === 'SUCCESS'){
    history.push(`/login`);
    dispatch({
      type: USER_CHANGEPASSWORD_RESET,
    });
  }
  const submitHandler = ({ email }) => {
    setEmail(email);
    dispatch(sendOTPPassword(email))
  };

  const verifyOTPHandler = ({ email, otpCode }) => {
    dispatch(forgotPassword(email, otpCode))
  };

  const submitResendOTP = () => {
    dispatch(sendOTPPassword(email))
  }

  const submitChangePassword = ({password}) => {
    dispatch(changePassword(password,userInfo))
  }
  return (
    <ThemeProvider theme={theme}>
      <Paper className={classes.root} square>
        <Grid container component={Paper} className={classes.container}>
          <Grid item sm={12} md={6}>
            <Box className={classes.content}>
              <Button
                component={RouterLink}
                to='/'
                startIcon={<BiArrowBack />}
                className={classes.backIcon}
              />
              <img src={logo} alt='' className={classes.logo} />
              
                
                  {userInfo ? 
                  //Nếu có user info thì giao diện đổi mật khẩu
                  <>
                  <FormProvider {...methods}>
                  <form
                    className={classes.form}
                    onSubmit={handleSubmit(submitChangePassword)}
                  >
                  <FormControl fullWidth style={{ marginBottom: 8 }}>
                    <InputController
                      type={showPassword ? 'text' : 'password'}
                      name='password'
                      label='Mật khẩu'
                      defaultValue=""
                      required
                      rules={{
                        minLength: {
                          value: 6,
                          message: 'Password phải hơn 6 ký tự',
                        },
                      }}
                    />
                  </FormControl>
                  <FormControl fullWidth style={{ marginBottom: 8 }}>
                    <InputController
                      type={showPassword ? 'text' : 'password'}
                      name='confirmPassword'
                      label='Xác nhận mật khẩu'
                      required
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
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
                            value !== getValues('password')
                              ? 'Password không khớp'
                              : true,
                        },
                      }}
                    />
                  </FormControl>
                  
                  <Button
                    type='submit'
                    variant='contained'
                    color='secondary'
                    fullWidth
                  >
                    Đổi mật khẩu
                  </Button>
                  </form>
                  </FormProvider>
                  </>
                  :
                  //Nếu chưa có user info
                  <>
                  <FormProvider {...methods}>
                  <form
                    className={classes.form}
                    onSubmit={email ? handleSubmit(verifyOTPHandler) : handleSubmit(submitHandler)}
                  >
                    <FormControl fullWidth style={{ marginBottom: 16 }}>
                      <InputController
                        name='email'
                        label='Email'
                        required
                        disabled={email && true}
                        rules={{
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Địa chỉ email không hợp lệ',
                          },
                        }}
                      />
                    </FormControl>
                    {email &&
                      <Grid 
                      container 
                      spacing={2}
                      justifyContent="center"
                      alignItems="center"
                      >
                        <Grid item xs={8}>
                            <FormControl style={{ marginBottom: 16 }}>
                              <InputController
                                name='otpCode'
                                label='OTP Code'
                                required
                                rules={{
                                  pattern: {
                                    value: /^\d{4}$/,
                                    message: 'Nhập mã OTP gồm 4 chữ số',
                                  },
                                }}
                              />
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                          <Button
                            onClick={submitResendOTP}
                            variant='contained'
                            color='secondary'
                            style={{height: 30,fontSize:8}}
                          >
                            Re-send OTP
                          </Button>
                        </Grid>
                      </Grid>
                    }
                    
                    <Button
                      type='submit'
                      variant='contained'
                      color='secondary'
                      fullWidth
                    >
                      Xác nhận
                    </Button>
                  </form>
                  </FormProvider>
                  </>
                  }
              <Box my={2}>
                Đã có tài khoản?{' '}
                <Link component={RouterLink} to={`/login?redirect=${redirectHome}`}>
                  Đăng nhập
                </Link>
              </Box>
              {loading && <Loader my={0} />}
              {error && <Message mt={0}>{error}</Message>}
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

export default ForgotPasswordScreen;
