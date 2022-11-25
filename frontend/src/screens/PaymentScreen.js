import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";
import Meta from "../components/Meta";
import {
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  FormControl,
  FormHelperText,
  Breadcrumbs,
  Link,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { ReactComponent as Banner } from "../assets/images/payment.svg";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, FormProvider, Controller } from "react-hook-form";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import queryString from "query-string";
const useStyles = makeStyles((theme) => ({
  breadcrumbsContainer: {
    ...theme.mixins.customize.breadcrumbs,
  },
  content: {
    padding: "8px 32px",
    boxShadow: "0 10px 31px 0 rgba(0,0,0,0.05)",
    [theme.breakpoints.down("sm")]: {
      padding: 32,
    },
  },
  form: {
    marginTop: 16,
    "& > *": {
      marginBottom: 16,
    },
  },
  banner: {
    width: "100%",
    height: 380,
  },
  payment: {
    ...theme.mixins.customize.centerFlex(),
  },
}));

const PaymentScreen = ({ location, history }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const methods = useForm();
  const { handleSubmit, control } = methods;

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress.address) {
    history.push("/shipping");
  }

  const submitHandler = ({ paymentMethod }) => {
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { redirectHome = "/admin/dashboard-revenue" } = queryString.parse(
    location.search
  );
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      history.push(redirectHome);
    }
    if (!userInfo) {
      history.push(`/login?redirect=payment`);
    }
  }, [history, userInfo, redirectHome]);

  return (
    <Container maxWidth="xl" style={{ marginBottom: 48 }}>
      <Meta title="Payment | FashionShop" />
      <Grid container className={classes.breadcrumbsContainer}>
        <Grid item xs={12}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            style={{ marginBottom: 24 }}
          >
            <Link color="inherit" component={RouterLink} to="/">
              Trang chủ
            </Link>
            <Link color="textPrimary" component={RouterLink} to="/payment">
              Thanh toán
            </Link>
          </Breadcrumbs>
          <CheckoutSteps step={2} />
        </Grid>
      </Grid>
      <Paper elevation={0} className={classes.content}>
        <Grid container spacing={0} alignItems="center">
          <Grid item xs={12} md={4} className={classes.payment}>
            <div>
              <Typography variant="h5" gutterBottom>
                Phương thức thanh toán
              </Typography>
              <FormProvider {...methods}>
                <form
                  className={classes.form}
                  onSubmit={handleSubmit(submitHandler)}
                >
                  <Controller
                    name="paymentMethod"
                    defaultValue={"PayPal"}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <FormControl component="fieldset" error={error} fullWidth>
                        <FormLabel component="legend">
                          Chọn phương thức:
                        </FormLabel>
                        <RadioGroup {...field}>
                          <FormControlLabel
                            value="PayPal"
                            control={<Radio />}
                            label="PayPal hoặc thẻ tín dụng"
                          />
                          <FormControlLabel
                            value="Cash"
                            control={<Radio />}
                            label="Tiền mặt"
                          />
                        </RadioGroup>
                        {error && (
                          <FormHelperText style={{ maxWidth: 200 }}>
                            {error.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    )}
                    rules={{
                      required: "(*) Vui lòng chọn phương thức thanh toán",
                    }}
                  />
                  <Button type="submit" variant="contained" color="secondary">
                    Bước kế tiếp
                  </Button>
                  <Button
                    variant="contained"
                    component={RouterLink}
                    to="/shipping"
                    style={{ marginLeft: 8 }}
                  >
                    Trở lại
                  </Button>
                </form>
              </FormProvider>
            </div>
          </Grid>
          <Grid item xs={12} md={8}>
            <Banner className={classes.banner} />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default PaymentScreen;
