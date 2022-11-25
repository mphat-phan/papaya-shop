import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "../actions/productActions.js";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import { updateToCart } from "../actions/cartActions";
import { openSnackbar } from "../actions/snackbarActions";
import Meta from "../components/Meta";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Loader from "../components/Loader";
import Message from "../components/Message";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Typography,
  MenuItem,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { FiShoppingBag } from "react-icons/fi";
import { FaTags } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
import ProductReview from "../components/Product/ProductReview.js";
import ProductRelated from "../components/Product/ProductRelated.js";
import ProductComment from "../components/Product/ProductComment.js";
import ShareButtons from "../components/ShareButtons.js";

const useStyles = makeStyles((theme) => ({
  breadcrumbsContainer: {
    ...theme.mixins.customize.breadcrumbs,
  },
  productInfo: {
    [theme.breakpoints.down("sm")]: {
      paddingTop: "0 !important",
    },
  },
  price: {
    fontSize: "1.6rem",
    fontWeight: 600,
    color: (props) => props.sale > 0 && "#f50057",
  },
  rootPrice: {
    fontSize: "1.3rem",
    textDecoration: "line-through",
  },
  description: {
    whiteSpace: "pre-wrap",
    fontSize: 15,
    color: theme.palette.grey[700],
  },
  sizeFormControl: {
    margin: "25px 0 25px",
  },
  sizeFormGroup: {
    flexDirection: "row",
  },
  label: {
    fontSize: 18,
    color: "#2a2a2a",
  },
  button: {
    marginTop: 30,
    height: 48,
    width: 250,
    marginRight: 15,
  },
  socialGroup: {
    ...theme.mixins.customize.flexMixin("center", "center"),
  },
  socialIcon: {
    fontSize: 18,
    margin: "0 10px",
    color: "#929292",
    transition: "transform .3s",
    "&:hover": {
      transform: "translateY(-1px)",
      color: theme.palette.secondary.main,
    },
  },
  sale: {
    position: "absolute",
    top: 20,
    left: 20,
    padding: "2px 8px",
    color: "#fff",
    fontSize: 14,
    fontWeight: 500,
    textTransform: "uppercase",
    lineHeight: 1.5,
    backgroundColor: theme.palette.secondary.main,
    zIndex: 1,
  },
}));

const ProductScreen = ({ history, match }) => {
  const { handleSubmit, control } = useForm();

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { status } = useSelector((state) => state.cart);
  const { loading, error, product } = productDetails;

  const classes = useStyles(product);

  if (status === true) {
    dispatch(openSnackbar("Cập nhật số lượng thành công", "success"));
  }
  if (status === false) {
    dispatch(openSnackbar("Sản phẩm đã hết hàng", "error"));
  }

  const addToCartHandler = ({ qty }) => {
    dispatch(updateToCart(match.params.id, qty));
  };

  useEffect(() => {
    dispatch(fetchProductDetails(match.params.id));
  }, [dispatch, match.params.id]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [match.params.id]);

  return (
    <>
      <Container maxWidth="xl" className={classes.wrapper}>
        {loading ? (
          <Loader my={200} />
        ) : error ? (
          <Message mt={100}>{error}</Message>
        ) : (
          <>
            <Meta title={product.name} />
            <Grid container className={classes.breadcrumbsContainer}>
              <Grid item>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                  <Link color="inherit" component={RouterLink} to="/">
                    Trang chủ
                  </Link>
                  <Link color="inherit" component={RouterLink} to="/">
                    Sản phẩm
                  </Link>
                  <Link
                    color="textPrimary"
                    component={RouterLink}
                    to={`/product/${product._id}`}
                  >
                    {product?.name || "Không tìm thấy sản phẩm"}
                  </Link>
                </Breadcrumbs>
              </Grid>
            </Grid>
            <Grid container spacing={8}>
              <Grid item xs={12} md={5}>
                <Carousel
                  showIndicators
                  showArrows
                  showThumbs
                  swipeable={false}
                  showStatus={false}
                  animationHandler="fade"
                  className="product-screen-carousel"
                >
                  {product.images?.map((image, i) => (
                    <div className="slide-product-image" key={i}>
                      {product.sale > 0 && (
                        <div
                          className={classes.sale}
                        >{`- ${product.sale}% `}</div>
                      )}
                      <img src={image} alt="" />
                    </div>
                  ))}
                </Carousel>
              </Grid>
              <Grid item xs={12} md={7} className={classes.productInfo}>
                <Typography variant="h4" component="h1" gutterBottom>
                  {product.name}
                </Typography>
                <Box display="flex" alignItems="center" mb={1}>
                  <Rating
                    name="read-only"
                    value={product.rating}
                    precision={0.5}
                    readOnly
                  />
                  <Typography component="span" style={{ marginLeft: 5 }}>
                    {`(${product.numReviews} đánh giá) | `}
                  </Typography>
                  <Typography
                    component="span"
                    style={{ marginLeft: 5 }}
                    color={product.countInStock > 0 ? "primary" : "secondary"}
                  >
                    {`Trạng thái: ${
                      product.countInStock > 0 ? "Còn Hàng" : "Hết hàng"
                    }`}
                  </Typography>
                </Box>
                <Typography
                  variant="h6"
                  color="textPrimary"
                  component="div"
                  className={classes.price}
                  gutterBottom
                >
                  {product.sale ? (
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      component="span"
                      className={classes.rootPrice}
                    >
                      {new Intl.NumberFormat("de-DE", {
                        style: "currency",
                        currency: "VND",
                      }).format(product.price)}
                    </Typography>
                  ) : null}
                  {"  "}
                  {new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.price * (1 - product.sale / 100))}
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  className={classes.description}
                >
                  {product.description}
                </Typography>
                <form>
                  <FormControl
                    variant="outlined"
                    style={{ width: 250, marginTop: 18 }}
                  >
                    <FormLabel
                      className={classes.label}
                      style={{ marginBottom: 16 }}
                    >
                      Số lượng
                    </FormLabel>
                    <Controller
                      name="qty"
                      control={control}
                      defaultValue={1}
                      render={({ field }) => (
                        <TextField
                          select
                          label="Chọn số lượng"
                          variant="outlined"
                          error={!product.countInStock}
                          helperText={!product.countInStock && "Hết hàng"}
                          {...field}
                        >
                          {Array(product.countInStock)
                            .fill()
                            .map((item, index) => (
                              <MenuItem value={index + 1} key={index + 1}>
                                {index + 1}
                              </MenuItem>
                            ))}
                        </TextField>
                      )}
                    />
                  </FormControl>
                </form>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<FiShoppingBag />}
                  className={classes.button}
                  disabled={product.countInStock === 0}
                  onClick={handleSubmit(addToCartHandler)}
                >
                  Thêm vào giỏ hàng
                </Button>
                {/* <Button
                  variant='contained'
                  color='primary'
                  startIcon={<FiHeart />}
                  className={classes.button}
                  disabled={product.countInStock === 0}
                >
                  Add to Wishlist
                </Button> */}
                <Divider style={{ marginTop: 30 }} />
                <Box display="flex" alignItems="center" my={2}>
                  <Box
                    mr={1}
                    color="text.secondary"
                    display="flex"
                    alignItems="center"
                  >
                    <FaTags />
                  </Box>
                  <Typography className={classes.label}>Thể loại:</Typography>
                  <Box ml={2}>
                    <Chip
                      size="small"
                      label={product.category}
                      style={{ marginRight: 8 }}
                    />
                  </Box>
                </Box>
                <Divider />
                <Box display="flex" alignItems="center" my={2}>
                  <Box
                    mr={1}
                    color="text.secondary"
                    display="flex"
                    alignItems="center"
                  >
                    <FaShareAlt />
                  </Box>
                  <Typography className={classes.label}>Chia sẻ:</Typography>
                  <Box ml={1}>
                    <div className={classes.socialGroup}>
                      <ShareButtons
                        url={
                          "https://changfashion.herokuapp.com/product/" +
                          product._id
                        }
                      />
                    </div>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <ProductReview
                  reviews={product.reviews}
                  productId={match.params.id}
                />
              </Grid>
              <Grid item xs={12}>
                <ProductComment
                  comments={product.comments}
                  productId={match.params.id}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <ProductRelated category={product.category} />
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </>
  );
};

export default ProductScreen;
