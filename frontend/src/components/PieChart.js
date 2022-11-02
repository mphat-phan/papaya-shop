import React, { useState } from 'react';
import {
  Typography,
} from '@material-ui/core';
import { Pie } from 'react-chartjs-2';
const PieChart = ({year, data}) => {
  return(
    <div>
        <Typography
        variant='h5'
        component='h1'
        style={{ textAlign: 'center' }}
        >
        Thống kê sản phẩm bán chạy năm {year}
        </Typography>
        <Pie data={data} />
    </div>
  );
  
};

export default PieChart;
