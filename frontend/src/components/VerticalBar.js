import React, { useState } from 'react';
import {
  Typography,
} from '@material-ui/core';
import { Bar } from 'react-chartjs-2';
const VerticalBar = ({year, data, options}) => {
  return(
    <div>
        <Typography
        variant='h5'
        component='h1'
        style={{ textAlign: 'center' }}
        >
        </Typography>
        <Bar options={options} data={data} />
    </div>
  );
  
};

export default VerticalBar;
