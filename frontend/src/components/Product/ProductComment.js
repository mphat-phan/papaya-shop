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
  import ProductReply from './ProductReply';
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
  
  const ProductComment = ({ comments, productId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
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
  
    const productCommentCreate = useSelector((state) => state.productCommentCreate);
    const {
      success: successProductComment,
      loading: loadingProductComment,
      error: errorProductComment,
    } = productCommentCreate;
    
    const productCommentReplyCreate = useSelector((state) => state.productCommentReplyCreate);
    const {
      success: successProductCommentReply,
      loading: loadingProductCommentReply,
      error: errorProductCommentReply,
    } = productCommentReplyCreate;

    const handleCommentChange = (e) => {
      setComment(e.target.value);
      if (comment.trim()) {
        setMessage('');
      }
    };
  
    const handleSubmitComment = (e) => {
      e.preventDefault();
      if (comment.trim()) {
        dispatch(
          createProductComment(productId, {
            comment,
            avatar:userInfo.avatar,
            name:userInfo.name,
            id: userInfo._id
          })
        );
      } else {
        setMessage('Hãy viết một bình luận!');
      }
    };
    const handleSubmitReply = (e, commentId) => {
      e.preventDefault();
      const reply = e.target[0].value;
      const avatar = userInfo.avatar;
      if(reply){
        dispatch(
          createCommentReply(productId, commentId, avatar, reply)
        );
        e.target[0].value = '';
      }
      else{
        alert('Nhập reply');
      }
    };
    useEffect(() => {
      if (successProductComment) {
        setComment('');
      }
      if (!productId) {
        dispatch({ type: PRODUCT_CREATE_COMMENT_RESET });
      }
    }, [dispatch, successProductComment, productId]);
   
    useEffect(() => {
      if (successProductCommentReply) {
        setComment('');
      }
      if (!productId) {
        dispatch({ type: PRODUCT_CREATE_REPLY_RESET });
      }
    }, [dispatch, successProductCommentReply, productId]);

    return (
      <>
        <Box my={3}>
          <Typography variant='h5'>Bình luận</Typography>
        </Box>
        <Paper style={{ padding: 20, margin: '24px 0' }} elevation={0}>
          {
            (comments === undefined) ?  
            (<div className={classes.root}>{"This div's text looks like that of a button."}</div>) :
            (comments.map((cmt) => (
                <>
                <Grid container wrap='nowrap' spacing={2} key={cmt._id}>
                    <Grid item>
                    <Avatar
                        src={cmt.avatar ? cmt.avatar : `https://ui-avatars.com/api/?background=random&color=fff&name=${cmt.name}`}                       
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
                          {cmt.name}
                          </h4>
                          <p style={{ margin: 0, textAlign: 'left', color: 'gray' }}>
                          { cmt.createdAt ? cmt.createdAt.substring(0, 10) : ''}
                          </p>
                      </Box>
                      <p style={{ textAlign: 'left', marginTop: 5 }}>
                          {cmt.comment}
                      </p>
                      <ProductReply reply={cmt.reply}></ProductReply>
                      <Divider variant='fullWidth' style={{ margin: '10px 0' }} />
                      <Grid item xs={12}>
                        {loadingProductCommentReply && <Loader />}
                        {errorProductCommentReply && <Message>{errorProductCommentReply}</Message>}
                        {userInfo
                        ? (
                          <form onSubmit={(e) => handleSubmitReply(e,cmt._id)} className={classes.form}>
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
                          </form>
                        ) : (
                          <Message severity='info'>
                            Hãy{' '}
                            <Link
                              component={RouterLink}
                              to={`/login?redirect=/product/${productId}`}
                            >
                              đăng nhập
                            </Link>{' '}
                            để viết 1 bài bình luận
                          </Message>
                        )}
                      </Grid>
                    </Grid>
                </Grid>
                <Divider variant='fullWidth' style={{ margin: '30px 0' }} />
                </>
            )))
          }
          <Grid container>
            <Grid item xs={12}>
              {loadingProductComment && <Loader />}
              {errorProductComment && <Message>{errorProductComment}</Message>}
              {userInfo ? (
                <form onSubmit={handleSubmitComment} className={classes.form}>
                  <Typography variant='h5'>Viết một bình luận</Typography>
                  <TextField
                    variant='outlined'
                    label='Bình luận'
                    multiline
                    fullWidth
                    value={comment}
                    error={!!message}
                    helperText={message}
                    onChange={handleCommentChange}
                  ></TextField>
                  <Button variant='contained' color='secondary' type='submit'>
                    Đăng
                  </Button>
                </form>
              ) : (
                <Message severity='info'>
                  Hãy{' '}
                  <Link
                    component={RouterLink}
                    to={`/login?redirect=/product/${productId}`}
                  >
                    đăng nhập
                  </Link>{' '}
                  để viết 1 bài bình luận
                </Message>
              )}
            </Grid>
          </Grid>
        </Paper>
      </>
    );
  };
  
  export default ProductComment;
  