import React from 'react';
import {
  Box,
  Button,
} from '@material-ui/core';

const OrderStatus = ({status}) => {
  switch(status){
    case 0:
      return(
          'Đã hủy'
      )
    case 1:
        return(
            'Chưa xác nhận'
        )
    case 2:
        return(
            'Đã xác nhận'
        )
    case 3:
        return(
            'Đang giao'
        )
    case 4:
        return(
            'Hoàn tất'
        )
    default:

  }
};

export default OrderStatus;
