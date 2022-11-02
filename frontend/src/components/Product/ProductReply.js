import {
    Avatar,
    Box,
    Divider,
    Grid,
    Paper,
    Typography,
    TextField,
    Link,
    Button,
  } from '@material-ui/core';
  import React, { useState, useEffect } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import { Link as RouterLink } from 'react-router-dom';
  import { makeStyles } from '@material-ui/core/styles';
  import { getUserDetails } from '../../actions/userActions';
  import { PRODUCT_CREATE_COMMENT_RESET,PRODUCT_CREATE_REPLY_RESET } from '../../constants/productConstants.js';
  import { createProductComment,createCommentReply } from '../../actions/productActions.js';
  import Message from '../Message';
  import Loader from '../Loader';
  
  const useStyles = makeStyles((theme) => ({
    form: {
      ...theme.mixins.customize.flexMixin('center', 'flex-start', 'column'),
      '& > *': {
        marginBottom: 16,
      },
    },
    root: {
        ...theme.typography.button,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1),
    },
  }));
  
    const ProductReply = ({ reply }) => {
    return (
        <>
        {
            (reply.map((elm)=>(
            <>
                <Divider variant='fullWidth' style={{ margin: '10px 0' }} />
                <Grid container wrap='nowrap' spacing={2} key={elm._id}>
                    <Grid item>
                        <Avatar
                            src={elm.avatar ? elm.avatar : `https://ui-avatars.com/api/?background=random&color=fff&name=${elm.name}`}                       
                        />        
                    </Grid>
                    <Grid item xs zeroMinWidth>
                        <Box display='flex' alignItems='center'>
                            <h4
                            style={{ 
                                margin: '0 8px 0 0',
                                textAlign: 'left',
                                display: 'inline-block',
                            }}
                            >
                            {elm.name}
                            </h4>
                            <p style={{ margin: 0, textAlign: 'left', color: 'gray' }}>
                            { elm.createdAt ? elm.createdAt.substring(0, 10) : ''}
                            </p>
                        </Box>
                        <p style={{ textAlign: 'left', marginTop: 5 }}>
                            {elm.reply}
                        </p>

                    </Grid>
                </Grid>
            </>
            )))
        }
        </>
    );
    };
  
  export default ProductReply;
  