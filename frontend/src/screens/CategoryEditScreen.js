import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { openSnackbar } from "../actions/snackbarActions";
import {
  fetchCategoryDetails,
  updateCategory,
} from "../actions/categoryActions";
import { CATEGORY_UPDATE_RESET } from "../constants/categoryContants";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Paper,
  TextField,
  Container,
  Button,
  Link,
  Box,
  Grid,
  Breadcrumbs,
  InputAdornment,
  InputLabel,
  IconButton,
  MenuItem,
} from "@material-ui/core";
import Meta from "../components/Meta";
import ProductCard from "../components/Product/ProductCard";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { MdCloudUpload, MdClose } from "react-icons/md";
import categories from "../assets/data/categories";

const useStyles = makeStyles((theme) => ({
  breadcrumbsContainer: {
    ...theme.mixins.customize.breadcrumbs,
    "& .MuiBreadcrumbs-ol": {
      justifyContent: "flex-start",
    },
  },
  form: {
    "& > *": {
      marginBottom: 16,
    },
    "& .MuiInput-underline:before": {
      borderColor: "rgba(224, 224, 224, 1)",
    },
  },
  container: {
    marginBottom: 64,
    boxShadow: "0 10px 31px 0 rgba(0,0,0,0.05)",
  },
  size: {
    marginTop: 8,
    "& > div": {
      display: "flex",
      flexBasis: "25%",
      "& > div + div": {
        marginLeft: 16,
      },
      marginTop: 16,
    },
    "& > label": {
      flexBasis: "100%",
    },
  },
  imagePreview: {
    position: "relative",
    marginTop: 8,
    marginRight: 16,
    "& > img": {
      width: 120,
      height: 160,
      objectFit: "cover",
      borderRadius: 6,
    },
    "& .MuiIconButton-root": {
      position: "absolute",
      top: 5,
      right: 5,
    },
  },
  preview: {
    backgroundColor: theme.palette.background.default,
    "& img.MuiCardMedia-media": {
      height: "100%",
    },
  },
}));

const CategoryEditScreen = ({ match, history }) => {
  const categoryId = match.params.id;
  console.log(categoryId);
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const classes = useStyles();

  const categoryDetails = useSelector((state) => state.categoryDetails);
  const { loading, error, category } = categoryDetails;
  console.log(category);
  const categoryUpdate = useSelector((state) => state.categoryUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = categoryUpdate;

  useEffect(() => {
    console.log(1);
    if (successUpdate) {
      console.log(2);
      dispatch({ type: CATEGORY_UPDATE_RESET });
      dispatch(openSnackbar("Product has been updated!", "success"));
      history.push("/admin/categorylist");
    } else {
      console.log(3);
      if (!category.name || category._id !== categoryId) {
        console.log(4);
        dispatch(fetchCategoryDetails(categoryId));
      } else {
        setName(category.name);
      }
    }
  }, [dispatch, history, categoryId, category, successUpdate]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const category = {
      _id: categoryId,
      name,
    };
    dispatch(updateCategory(category));
  };

  return (
    <Container maxWidth="xl" style={{ marginBottom: 48 }}>
      <Meta title="Edit Product" />
      <Grid container className={classes.breadcrumbsContainer}>
        <Grid item xs={12}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            style={{ marginBottom: 24 }}
          >
            <Link color="inherit" component={RouterLink} to="/">
              Trang chủ
            </Link>
            <Link color="inherit" component={RouterLink} to="/">
              Admin Thống kê
            </Link>
            <Link
              color="inherit"
              component={RouterLink}
              to="/admin/categorylist"
            >
              Sản phẩm
            </Link>
            <Link
              color="textPrimary"
              component={RouterLink}
              to={`/category/${category._id}`}
            >
              {category._id || ""}
            </Link>
            <Link
              color="textPrimary"
              component={RouterLink}
              to={`/admin/category/${category._id}/edit`}
            >
              Chỉnh sửa
            </Link>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <Grid
        container
        component={Paper}
        elevation={0}
        spacing={8}
        className={classes.container}
      >
        {loading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <>
            <Grid item xs={12} lg={9}>
              <Typography
                variant="h5"
                component="h1"
                gutterBottom
                style={{ textAlign: "center" }}
              >
                Chỉnh sửa sản phẩm
              </Typography>
              {loadingUpdate && <Loader />}
              {errorUpdate && <Message>{errorUpdate}</Message>}
              <form onSubmit={submitHandler} className={classes.form}>
                <TextField
                  variant="outlined"
                  required
                  name="name"
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                />

                <Button type="submit" variant="contained" color="secondary">
                  Xác nhận
                </Button>
              </form>
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
};

export default CategoryEditScreen;
