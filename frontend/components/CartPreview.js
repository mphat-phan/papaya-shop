import React from 'react';
import Image from 'next/image';
import { 
    SwipeableDrawer, 
    Typography,
    IconButton,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import emptyGif from '../public/Empty.gif';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenCartDrawer } from '../store/actions/CartActions';
const useStyles = () => ({
    root: {
        width: 400,
        height: '100%',
        padding: 20,
    },
    title: {

    },
    large: {
        width: 12,
        height: 15,
    },
    priceTotal: {
        padding: '10px 0',
    },
    button: {
        margin: '10px 0',
        '& + $button': {
        marginTop: 2,
        },
    },
    empty: {
        marginTop: 30,
    },
})

const CartPreview = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const isOpenDrawer = useSelector((state) => state.cartOpenDrawer);

    const onDrawerOpen = () => {
        dispatch(setOpenCartDrawer(true));
    };

    const onDrawerClose = () => {
        dispatch(setOpenCartDrawer(false));
    };

    return (
        <SwipeableDrawer
            anchor='right'
            open={isOpenDrawer}
            onClose={onDrawerClose}
            onOpen={onDrawerOpen}
            >
            <div className={classes.root}>
                <div className={classes.title}>
                <Typography variant='h5' component='h2' gutterBottom>
                    Giỏ hàng
                </Typography>
                <IconButton color='secondary' onClick={onDrawerClose}>
                    <ClearIcon />
                </IconButton>
                </div>
               
                <div className={classes.empty}>
                    <Typography variant='subtitle1' color='secondary'>
                    Giỏ của bạn trống.{' '}
                    </Typography>
                    <Image src={emptyGif} alt='empty' />
                </div>
            </div>
        </SwipeableDrawer>
    );
};

export default CartPreview;