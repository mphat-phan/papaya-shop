import React from 'react';
import { 
  CircularProgress
} from '@mui/material';
const Loader = ({ my }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        marginTop: my,
        marginBottom: my,
      }}
    >
      <CircularProgress color='secondary' />
    </div>
  );
};

Loader.defaultProps = {
  my: 40,
};

export default Loader;
