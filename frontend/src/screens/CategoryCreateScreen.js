import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { openSnackbar } from "../actions/snackbarActions";
import { createCategory } from "../actions/categoryActions";
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

const CategoryCreateScreen = ({ history }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [name, setName] = useState("");

  const categoryCreate = useSelector((state) => state.categoryCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = categoryCreate;

  useEffect(() => {
    if (successCreate) {
      dispatch(openSnackbar("Category has been created!", "success"));
      history.push("/admin/categorylist");
    }
  }, [dispatch, history, successCreate]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const category = {
      name,
    };
    dispatch(createCategory(category));
  };

  return (
    <Container maxWidth="xl" style={{ marginBottom: 48 }}>
      <Meta title="Create Category" />
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
              Admin thống kê
            </Link>
            <Link
              color="inherit"
              component={RouterLink}
              to="/admin/categorytlist"
            >
              Thể loại
            </Link>
            <Link
              color="textPrimary"
              component={RouterLink}
              to={`/admin/category/create`}
            >
              Thêm mới
            </Link>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <Grid
        xs={9}
        container
        component={Paper}
        elevation={0}
        spacing={8}
        className={classes.container}
      >
        <Grid item xs={12} lg={12}>
          <Typography
            variant="h5"
            component="h1"
            gutterBottom
            style={{ textAlign: "center" }}
          >
            Thêm thể loại
          </Typography>
          {loadingCreate && <Loader />}
          {errorCreate && <Message>{errorCreate}</Message>}
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
      </Grid>
    </Container>
  );
};

export default CategoryCreateScreen;
