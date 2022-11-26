import React, { useState, useEffect } from "react";
import axios from "axios";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderById,
  payOrder,
  deliverOrder,
  cancelOrder,
  confirmOrder,
  deliveringOrder,
} from "../actions/orderActions";
import { Link as RouterLink } from "react-router-dom";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Breadcrumbs,
  Link,
  Divider,
  ListItemText,
  ListItem,
  List,
  ListItemIcon,
  Avatar,
  Box,
  Hidden,
  ListItemAvatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";
import { GrLocation, GrCreditCard, GrProjects, GrUser } from "react-icons/gr";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Meta from "../components/Meta";
import paypalImage from "../assets/images/paypal.png";
import OrderSteps from "../components/OrderSteps";
import OrderButton from "../components/OrderButton";
import { createProductReview } from "../actions/productActions";
const useStyles = makeStyles((theme) => ({
  breadcrumbsContainer: {
    ...theme.mixins.customize.breadcrumbs,
    paddingBottom: 0,
  },
  content: {
    padding: 24,
    boxShadow: "0 10px 31px 0 rgba(0,0,0,0.05)",
    [theme.breakpoints.down("sm")]: {
      padding: 32,
    },
  },
  orderItems: {
    flexWrap: "wrap",
    paddingRight: 0,
  },
  items: {
    flexBasis: "100%",
    marginLeft: 56,
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
    "& .MuiTableCell-root": {
      paddingLeft: 0,
    },
    "& .MuiTableCell-head": {
      color: "rgba(0, 0, 0, 0.54)",
      fontWeight: 400,
    },
  },
  largeImage: {
    width: theme.spacing(6),
    height: theme.spacing(8),
  },
  empty: {
    ...theme.mixins.customize.centerFlex("column wrap"),
    marginTop: 30,
  },
  cartTotalWrapper: {
    marginTop: 22,
    padding: 20,
    fontSize: 16,
    backgroundColor: "#F4F4F4",
  },
  cartTotal: {
    fontSize: 18,
    marginBottom: 8,
    "&:nth-child(2)": {
      color: theme.palette.secondary.main,
    },
  },
  divider: {
    margin: "8px 0",
    width: 80,
    height: 2,
    backgroundColor: "#2a2a2a",
  },
  itemName: {
    ...theme.mixins.customize.textClamp(2),
  },
  form: {
    ...theme.mixins.customize.flexMixin("center", "flex-start", "column"),
    "& > *": {
      marginBottom: 16,
    },
  },
}));

const OrderScreen = ({ match, history }) => {
  const classes = useStyles();
  const orderId = match.params.id;
  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [message, setMessage] = useState("");

  if (!loading && order) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order?.orderItems.reduce(
        (acc, item) => acc + item.priceSale * item.qty,
        0
      )
    );
  }

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderById(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, history, orderId, successPay, successDeliver, order, userInfo]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  const cancelHandler = () => {
    dispatch(cancelOrder(order));
  };

  const confirmHandler = () => {
    dispatch(confirmOrder(order));
  };

  const deliveringHandler = () => {
    dispatch(deliveringOrder(order));
  };
  const handleCommentChange = (e) => {
    // setComment(e.target.value);
    // if (comment.trim()) {
    //   setMessage('');
    // }
  };

  const handleSubmitReview = (e, productId, orderID, orderItem) => {
    e.preventDefault();

    const comment = e.target[10].value;
    let rating = 0;
    const target = e.target;
    for (let i = 0; i <= 9; i++) {
      if (target[i].checked) {
        rating = target[i]._wrapperState.initialValue;
      }
    }
    if (comment) {
      dispatch(
        createProductReview(productId, {
          rating,
          comment,
          orderID,
          orderItem,
          avatar:userInfo.avatar,
          userId:userInfo._id,
          name:userInfo.name,
        })
      );
      window.location.reload();
    }
    else{
      alert('Nhập đánh giá!!')
    }
  };

  return loading ? (
    <Loader my={200} />
  ) : error ? (
    <Message mt={100}>{error}</Message>
  ) : (
    <Container maxWidth="xl" style={{ marginBottom: 48 }}>
      <Meta title="Order | Chang Fashion Shop" />
      <Grid container className={classes.breadcrumbsContainer}>
        <Grid item xs={12}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            style={{ marginBottom: 24 }}
          >
            <Link color="inherit" component={RouterLink} to="/">
              Trang chủ
            </Link>
            <Link color="textPrimary" component={RouterLink} to="/order">
              Thông tin chi tiết đơn hàng
            </Link>
          </Breadcrumbs>
          {order.status ? (
            <OrderSteps step={order.status}></OrderSteps>
          ) : (
            <OrderSteps step={0}></OrderSteps>
          )}
        </Grid>
      </Grid>
      <Paper elevation={0} className={classes.content}>
        <Grid container spacing={8}>
          <Grid item xs={12} lg={8}>
            <List>
              <ListItem divider>
                <ListItemText
                  primary={`Order`}
                  secondary={`id: ${order._id}`}
                />
              </ListItem>
              <ListItem divider>
                <ListItemIcon>
                  <GrUser fontSize={22} />
                </ListItemIcon>
                <ListItemText
                  primary="Receiver"
                  secondary={`${order.user.name}, email: ${order.user.email}`}
                />
              </ListItem>
              <ListItem divider style={{ flexWrap: "wrap" }}>
                <ListItemIcon>
                  <GrLocation fontSize={22} />
                </ListItemIcon>
                <ListItemText
                  primary="Shipping"
                  secondary={Object.values(order.shippingAddress).join(", ")}
                />
                {order.isDelivered ? (
                  <Message severity="success" mt={8}>
                    Đã Vận chuyển vào {new Date(order.deliveredAt).toUTCString()}
                  </Message>
                ) : (
                  <Message mt={8}>Chưa vận chuyển</Message>
                )}
              </ListItem>
              <ListItem divider style={{ flexWrap: "wrap" }}>
                <ListItemIcon>
                  <GrCreditCard fontSize={22} />
                </ListItemIcon>
                <ListItemText
                  primary="Payment Method"
                  secondary={order.paymentMethod}
                />
                <ListItemAvatar>
                  <img src={paypalImage} alt="" width="80px" height="30px" />
                </ListItemAvatar>
                {order.isPaid ? (
                  <Message severity="success" mt={8}>
                    Đã thanh toán vào {new Date(order.paidAt).toUTCString()}
                  </Message>
                ) : (
                  <Message mt={8}>Chưa thanh toán</Message>
                )}
              </ListItem>
              <ListItem className={classes.orderItems}>
                <ListItemIcon>
                  <GrProjects fontSize={22} />
                </ListItemIcon>
                <ListItemText primary="Order Items" />
                {order.orderItems.length > 0 ? (
                  <div className={classes.items}>
                    <TableContainer component={Paper} elevation={0}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Sản phẩm</TableCell>
                            <Hidden smDown>
                              <TableCell align="right">Giá</TableCell>
                            </Hidden>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {order.orderItems.map((item) => (
                            <>
                              <TableRow key={item.name}>
                                <TableCell component="th" scope="item">
                                  <ListItem disableGutters>
                                    <ListItemAvatar>
                                      <Avatar
                                        variant="square"
                                        src={item.images && item.images[0]}
                                        alt="product image"
                                        className={classes.largeImage}
                                      ></Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                      primary={item.name}
                                      className={classes.itemName}
                                      style={{ marginLeft: 16 }}
                                    />
                                  </ListItem>
                                  <Hidden mdUp>
                                    <Box
                                      display="flex"
                                      justifyContent="space-between"
                                      alignItems="center"
                                      mt={2}
                                    >
                                      <Box textAlign="center">
                                        {`${item.qty} x ${new Intl.NumberFormat(
                                          "de-DE",
                                          { style: "currency", currency: "VND" }
                                        ).format(
                                          item.priceSale
                                        )} = ${new Intl.NumberFormat("de-DE", {
                                          style: "currency",
                                          currency: "VND",
                                        }).format(item.qty * item.priceSale)}`}
                                      </Box>
                                    </Box>
                                  </Hidden>
                                </TableCell>
                                <Hidden smDown>
                                  <TableCell align="right">
                                    {`${item.qty} x ${new Intl.NumberFormat(
                                      "de-DE",
                                      { style: "currency", currency: "VND" }
                                    ).format(
                                      item.priceSale
                                    )} = ${new Intl.NumberFormat("de-DE", {
                                      style: "currency",
                                      currency: "VND",
                                    }).format(item.qty * item.priceSale)}`}
                                  </TableCell>
                                </Hidden>
                              </TableRow>

                              {!item.rating &&
                              userInfo &&
                              !userInfo.isAdmin &&
                              order.isDelivered ? (
                                <Box marginTop={2}>
                                  <form
                                    onSubmit={(e) =>
                                      handleSubmitReview(
                                        e,
                                        item.product,
                                        orderId,
                                        item._id
                                      )
                                    }
                                    className={classes.form}
                                  >
                                    <Typography variant="h6">
                                      Viết một đánh giá
                                    </Typography>
                                    <Rating
                                      name={"rating-value-" + item.name}
                                      precision={0.5}
                                    />
                                    <TextField
                                      variant="outlined"
                                      label="Reply"
                                      multiline
                                      fullWidth
                                      error={!!message}
                                      helperText={message}
                                    ></TextField>
                                    <Button
                                      variant="contained"
                                      color="secondary"
                                      type="submit"
                                    >
                                      Reply
                                    </Button>
                                  </form>
                                </Box>
                              ) : (
                                <>
                                  <Grid item xs zeroMinWidth>
                                    <Rating
                                      name="rating"
                                      value={item.rating}
                                      precision={0.5}
                                      readOnly
                                    />
                                    <p
                                      style={{
                                        textAlign: "left",
                                        marginTop: 5,
                                      }}
                                    >
                                      {item.comment}
                                    </p>
                                  </Grid>
                                </>
                              )}
                            </>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                ) : (
                  <div className={classes.empty}>
                    <Typography variant="subtitle1" color="secondary">
                      Giỏ hàng của bạn đang trống.{" "}
                      <Link to="/" component={RouterLink} color="primary">
                        Mua ngay!
                      </Link>
                    </Typography>
                  </div>
                )}
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Paper elevation={0} className={classes.cartTotalWrapper}>
              <Typography variant="h4" style={{ fontSize: 23 }}>
                Tổng tiền
              </Typography>
              <Divider className={classes.divider} />
              <List style={{ padding: "10px 20px 20px" }}>
                <ListItem divider disableGutters>
                  <ListItemText primary="Items:" />
                  <Typography>
                    {new Intl.NumberFormat("de-DE", {
                      style: "currency",
                      currency: "VND",
                    }).format(order.itemsPrice)}
                  </Typography>
                </ListItem>
                <ListItem divider disableGutters>
                  <ListItemText primary="Shipping:" />
                  <Typography>
                    {new Intl.NumberFormat("de-DE", {
                      style: "currency",
                      currency: "VND",
                    }).format(order.shippingPrice)}
                  </Typography>
                </ListItem>
                <ListItem disableGutters>
                  <ListItemText primary="Total:" />
                  <Typography color="secondary">
                    {new Intl.NumberFormat("de-DE", {
                      style: "currency",
                      currency: "VND",
                    }).format(order.totalPrice)}
                  </Typography>
                </ListItem>
              </List>
              {!order.isPaid && order.paymentMethod === "PayPal" && (
                <Box fullWidth>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.USD}
                      onSuccess={successPaymentHandler}
                      style={{ width: "100%" }}
                    />
                  )}
                </Box>
              )}
              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                (order.isPaid || order.paymentMethod === "Cash") &&
                !order.isDelivered && (
                  <OrderButton
                    status={order.status}
                    order={order}
                  ></OrderButton>
                )}
              {userInfo &&
                !userInfo.isAdmin &&
                order.status !== 0 &&
                !order.isDelivered && (
                  <OrderButton status={5} order={order}></OrderButton>
                )}
              {userInfo &&
                !userInfo.isAdmin &&
                order.status === 0 &&
                !order.isDelivered && (
                  <OrderButton status={0} order={order}></OrderButton>
                )}
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default OrderScreen;
