import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import NextLink from 'next/link';
import Image from "next/image";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/actions/userActions';
import {
    styled,
    createTheme,
    ThemeProvider,
} from '@mui/material/styles';
import LoginImage from '../assets/images/login-illu.svg';
import logo from '../assets/images/logo.png';
import { 
    Box, 
    Button, 
    Paper, 
    Grid, 
    Link, 
    FormControl, 
    InputAdornment, 
    IconButton,
    Hidden,
} from '@mui/material';


import Loader from '../components/Loader';
import Message from '../components/Message';
import InputController from '../components/InputController';
import backgroundImage from '../assets/images/background.jpg';
import { useForm, FormProvider } from 'react-hook-form';
import { VscEyeClosed, VscEye } from 'react-icons/vsc';
import { BiArrowBack } from 'react-icons/bi';
import { useRouter } from 'next/router'
const PaperCustom = styled(Paper)(({ theme })=>({
    ...theme.mixins.customize.centerFlex(),
    height: '100vh',
    // backgroundImage: `url(${backgroundImage})`,
    backgroundColor: 'pink',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    fontFamily: 'Poppins, sans-serif',
}))

const GridContainer = styled(Grid)(({ theme }) => ({
    height: '85vh',
    width: '70%',
    backgroundColor: theme.palette.background.paper,
    overflow: 'hidden',
    boxShadow: '0px 0px 25px -18px rgba(0,0,0,0.75)',
    [theme.breakpoints.down('xs')]: {
    width: '90%',
    },
}))

const BoxCustom = styled(Grid)(({ theme }) => ({
    position: 'relative',
    ...theme.mixins.customize.flexMixin('flex-start', 'center', 'column'),
    padding: '24px 20%',
    height: '100%',
    [theme.breakpoints.down('xs')]: {
    padding: '24px 10%',
    },
}))

const Form = styled('form')(({ theme }) => ({
    paddingTop: theme.spacing(6),
}))

const BackIcon = styled(Button)(({ theme }) => ({
    position: 'absolute',
    top: 5,
    left: 0,
}))

const ImageCustom = styled(Image)(({ theme }) => ({
    objectFit: 'cover',
    height: '100%',
    width: '100%',
    backgroundPosition: 'center',
    backgroundColor: 'rgb(227, 65, 85, 0.08)',
}))

const Login = ({}) => {
    const router = useRouter()

    const [showPassword, setShowPassword] = useState(false);

    const methods = useForm();
    const { handleSubmit } = methods;

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;
    //const { redirect = '/' } = queryString.parse(location.search);

    useEffect(() => {
        if (userInfo) {
            router.push('/')
        }
    }, [userInfo]);

    const submitHandler = ({ email, password }) => {
        dispatch(login(email, password));
    };

    return (
        
        <PaperCustom
            square
        >
            <GridContainer container component={Paper}>
                <Grid item sm={12} md={6}>
                    <BoxCustom>
                    <NextLink
                        href="/"
                        passHref
                    >
                        <BackIcon
                            startIcon={<BiArrowBack />}
                        />
                    </NextLink>
                    
                    {/* <Image src={logo} alt='' className={classes.logo} /> */}
                    <FormProvider {...methods}>
                        <Form
                        onSubmit={handleSubmit(submitHandler)}
                        >
                        <FormControl fullWidth style={{ marginBottom: 16 }}>
                            <InputController
                            name='email'
                            label='Email'
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
                            label='Password'
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
                            required
                            rules={{
                                minLength: {
                                value: 6,
                                message: 'Mật khẩu phải hơn 6 ký tự',
                                },
                            }}
                            />
                        </FormControl>
                        <Box display='flex' justifyContent='flex-end' pb={3} pt={1}>
                            <NextLink
                                href='/forgot-pasword'
                            >
                                Quên mật khẩu?
                            </NextLink>
                        </Box>
                        <Button
                            type='submit' 
                            variant='contained'
                            color='secondary'
                            fullWidth
                        >
                            Đăng nhập
                        </Button>
                        </Form>
                    </FormProvider>
                    <Box my={4}>
                        Tài khoản mới?{' '}
                        <NextLink
                                href={`/register`}
                        >
                            Tạo tài khoản mới
                        </NextLink>
                    </Box>
                    {loading && <Loader my={0} />}
                    {error && <Message mt={0}>{error}</Message>}
                    </BoxCustom>
                </Grid>
                <Hidden smDown>
                    <Grid item xs={6}
                        
                    >
                    <ImageCustom
                        src={LoginImage}
                    />
                    </Grid>
                </Hidden>
            </GridContainer>
        </PaperCustom>
       
    );
};

export default Login;
