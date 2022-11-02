import React, { useState } from 'react';
import {
  Typography,
} from '@material-ui/core';
import { Line } from 'react-chartjs-2';
const LineChart = ({options, data}) => {
  return(
    <div>
      <Typography
      variant='h5'
      component='h1'
      style={{ textAlign: 'center' }}
      >
      Thống kê doanh thu
      </Typography>
      <Line options={options} data={data} />
    </div>
  );
  
};

export default LineChart;
