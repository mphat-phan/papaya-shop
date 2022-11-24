import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';
import { Link as RouterLink } from 'react-router-dom';
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import { useForm, FormProvider } from 'react-hook-form';
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
import InputController from '../components/InputController';
import backgroundImage from '../assets/images/background.jpg';
import { VscEyeClosed, VscEye } from 'react-icons/vsc';
import { BiArrowBack } from 'react-icons/bi';
import { Avatar } from '@material-ui/core';
import { MdCloudUpload, MdClose } from 'react-icons/md';



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
    paddingTop: theme.spacing(1),
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
  lagreAvatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginTop: 12,
    
  },
  avatarCenter:{
    display: 'flex',
    alignItems: 'center',
  },
  buttonUpload: {
    margin: '0 auto',
    width: 'fit-content',
  },
  labelButton:{
    margin: '0 auto',
    width: 'fit-content',
  }
}));

const RegisterScreen = ({ location, history }) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  const methods = useForm();
  const { handleSubmit, getValues } = methods;

  const [avatar, setAvatar] = useState()

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo, message } = userRegister;

  const { redirect = '/login' } = queryString.parse(location.search);
  const uploadAvatar = (avt) => {
    if (
      avt ===
      null
    ) {
      setAvatar(null)
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
      return '';
    }
  };

  useEffect(() => {
    if (userInfo) {
      history.push(`/verify?redirect=${redirect}`);
    }
    if(avatar !== null){
        setAvatar(null)
    }
   

    }, [dispatch, history, userInfo, redirect]);
    
    const submitHandler = ({ name, email, password, address, city, postalCode, country}) => {
      
      dispatch(register(name, email, password, avatar, address, city, postalCode, country));
    };
    
    
  const removeAvatar = () =>{
    setAvatar(null)
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
              <FormProvider {...methods}>
                <form
                  className={classes.form}
                  onSubmit={handleSubmit(submitHandler)}
                >
                {/* <FormControl className={classes.avatarCenter} fullWidth style={{  marginBottom: 16  }}>
                  <input
                      accept="image/*"                      
                      style={{ display: 'none' }}
                      id="raised-button-file"
                      multiple
                      type="file"
                      onChange={(e) => uploadAvatar(e.target.files[0])}
                  />
                  <label htmlFor="raised-button-file">
                    {
                      avatar ? (
                        <Avatar className={classes.lagreAvatar} src={avatar}>
                        
                        </Avatar>
                          
                      ) :(
                        <Avatar className={classes.lagreAvatar} src={null}></Avatar>
                      )
                    }
                  </label>           
                </FormControl>
                 <FormControl fullWidth >
                  
                    {
                      avatar !== null ? (
                      <Button
                        variant='contained'
                        color='secondary'
                        startIcon={<MdClose />}
                        component='span'
                        centerRipplel
                        className={classes.buttonUpload}
                        onClick={removeAvatar}
                      >
                        XÓA ẢNH
                      </Button>

                      ): avatar === null ? (
                      <label className={classes.labelButton} htmlFor="raised-button-file">
                        <Button
                          variant='contained'
                          color='secondary'
                          startIcon={<MdCloudUpload />}
                          component='span'
                          centerRipplel
                          className={classes.buttonUpload}
                        >
                          CHỌN ẢNH
                        </Button>

                      </label>
                      ) : (
                        ''
                      )
                    }
                 </FormControl> */}

                  <FormControl fullWidth style={{ marginBottom: 16 }}>
                    <InputController name='name' label='Tên' required />
                  </FormControl>
                  <FormControl fullWidth style={{ marginBottom: 16 }}>
                    <InputController
                      name='email'
                      label='Địa chỉ Email'
                      required
                      rules={{
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Địa chỉ email không hợp lệ',
                        },
                      }}
                    />
                  </FormControl>
                  <FormControl fullWidth style={{ marginBottom: 8 }}>
                    <InputController
                      type={showPassword ? 'text' : 'password'}
                      name='password'
                      label='Mật khẩu'
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
                  {/* <FormControl fullWidth style={{ marginBottom: 16 }}>
                    <InputController name='address' label='Địa chỉ' required />
                  </FormControl>
                  <FormControl fullWidth style={{ marginBottom: 16 }}>
                    <InputController name='city' label='Thành phố' required />
                  </FormControl>
                  <FormControl fullWidth style={{ marginBottom: 16 }}>
                    <InputController name='postalCode' label='Mã Bưu Điện' required />
                  </FormControl>
                  <FormControl fullWidth style={{ marginBottom: 16 }}>
                    <InputController name='country' label='Quốc Gia' required />
                  </FormControl> */}
                  <Button
                    type='submit'
                    variant='contained'
                    color='secondary'
                    fullWidth
                    style={{ marginTop: 16 }}
                  >
                    Đăng ký
                  </Button>
                </form>
              </FormProvider>
              <Box my={2}>
                Đã có tài khoản?{' '}
                <Link component={RouterLink} to={`/login?redirect=${redirect}`}>
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

export default RegisterScreen;
