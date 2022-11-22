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
import Rating from '@material-ui/lab/Rating';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { getUserDetails } from '../../actions/userActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../../constants/productConstants.js';
import { createProductReview, createCommentReviewReply } from '../../actions/productActions.js';

import Message from '../Message';
import Loader from '../Loader';

const useStyles = makeStyles((theme) => ({
  form: {
    ...theme.mixins.customize.flexMixin('center', 'flex-start', 'column'),
    '& > *': {
      marginBottom: 16,
    },
  },
}));

const ProductReview = ({ reviews, productId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;
  const { userInfo } = userLogin;
 
  var avatar = ''
  if(userInfo){
    avatar = userInfo.avatar
  }

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  const handleCommentChange = (e) => {
    // setComment(e.target.value);
    // if (comment.trim()) {
    //   setMessage('');
    // }
  };

  const handleSubmitReview = (e, reviewId) => {
    e.preventDefault();
    const reply = e.target[0].value;
    console.log(reply, reviewId);
    if(reply){
      dispatch(
        createCommentReviewReply(productId, reviewId, reply)
      );
      e.target[0].value = '';
    }
    else{
      alert('Nhập reply');
    }
    // if (comment.trim()) {
    //   dispatch(
    //     createProductReview(productId, {
    //       rating,
    //       comment,
    //     })
    //   );
    // } else {
    //   setMessage('Hãy viết một bình luận!');
    // }
  };

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment('');
    }
    if (!productId) {
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
  }, [dispatch, successProductReview, productId]);
 console.log(reviews)
  return (
    <>
      <Box my={3}>
        <Typography variant='h5'>Đánh giá</Typography>
      </Box>
      <Paper style={{ padding: 20, margin: '24px 0' }} elevation={0}>
        {reviews.map((review) => (
          
          <>
            <Grid container wrap='nowrap' spacing={2}>
              <Grid item>
                <Avatar
                  src={review.avatar !== "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" ? review.avatar : `https://ui-avatars.com/api/?background=random&color=fff&name=${review.name}`}                       
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
                    {review.name}
                  </h4>
                  <p style={{ margin: 0, textAlign: 'left', color: 'gray' }}>
                    {review.createdAt.substring(0, 10)}
                  </p>
                </Box>
                <Rating
                  name='rating'
                  value={review.rating}
                  precision={0.5}
                  readOnly
                  size='small'
                />
                <p style={{ textAlign: 'left', marginTop: 5 }}>
                  {review.comment}
                </p>
                {review.reply && (
                  <>
                    <Divider variant='fullWidth' style={{ margin: '10px 0' }} />
                    <Grid container wrap='nowrap' spacing={2}>
                        <Grid item>
                            <Avatar
                                src={`https://ui-avatars.com/api/?background=random&color=fff&name=Admin`}                       
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
                                Admin
                                </h4>
                                <p style={{ margin: 0, textAlign: 'left', color: 'gray' }}>
                                
                                </p>
                            </Box>
                            <p style={{ textAlign: 'left', marginTop: 5 }}>
                                {review.reply}
                            </p>

                        </Grid>
                    </Grid>
                  </>
                  
                )}
                

                {loadingProductReview && <Loader />}
              {errorProductReview && <Message>{errorProductReview}</Message>}
              {userInfo && userInfo.isAdmin 
              && !review.reply &&
                (<form onSubmit={(e) => handleSubmitReview(e,review._id)} className={classes.form}>
                  <TextField
                    variant='outlined'
                    label='Reply'
                    multiline
                    fullWidth
                    error={!!message}
                    helperText={message}
                  ></TextField>
                  <Button variant='contained' color='secondary' type='submit'>
                    Reply
                  </Button>
                </form>)
              }
              </Grid>
            </Grid>
            <Divider variant='fullWidth' style={{ margin: '30px 0' }} />
          </>
        ))}
      </Paper>
    </>
  );
};

export default ProductReview;
