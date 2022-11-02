import React from 'react';
import { getOrderById, payOrder, deliverOrder, cancelOrder, confirmOrder, deliveringOrder } from '../actions/orderActions';
import {
  Box,
  Button,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
const OrderButton = ({status,order}) => {
  const dispatch = useDispatch();
  const deliverHandler = () => {
    dispatch(deliverOrder(order));
    window.location.reload(false);
  };

  const cancelHandler = () => {
    dispatch(cancelOrder(order));
    window.location.reload(false);
  };

  const confirmHandler = () => {
    dispatch(confirmOrder(order));
    window.location.reload(false);
  };

  const deliveringHandler = () => {
    dispatch(deliveringOrder(order));
    window.location.reload(false);
  };
  
  switch(status){
    case 0:
      return(
        <Box>
          <Button
            variant='contained'
            color='disabled'
            fullWidth
          >
            Đơn hàng đã hủy
          </Button>
        </Box>
      )
    case 1:
        return(
          <>
            <Box m={2}>
              <Button
                variant='contained'
                color='secondary'
                fullWidth
                onClick={confirmHandler}
              >
                Mark As Confirm
              </Button>
            </Box>
            <Box m={2}>
              <Button
                variant='contained'
                color='danger'
                fullWidth
                onClick={cancelHandler}
              >
                Hủy đơn hàng
              </Button>
            </Box>
          </>
        )
    case 2:
      return(
        <Box>
          <Button
            variant='contained'
            color='secondary'
            fullWidth
            onClick={deliveringHandler}
          >
            Mark As Delivering
          </Button>
        </Box>
      )
    case 3:
      return(
        <Box>
          <Button
            variant='contained'
            color='secondary'
            fullWidth
            onClick={deliverHandler}
          >
            Mark As Delivered
          </Button>
        </Box>
    )
    default:
      return(
        <>
          <Box m={2}>
            <Button
              variant='contained'
              color='danger'
              fullWidth
              onClick={cancelHandler}
            >
              Hủy đơn hàng
            </Button>
          </Box>
        </>
      )
  }
};

export default OrderButton;
