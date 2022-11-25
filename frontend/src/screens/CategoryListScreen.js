import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listCategorys, deleteCategory } from "../actions/categoryActions.js";
import {
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  Breadcrumbs,
  Link,
  Box,
} from "@material-ui/core";
import { openSnackbar } from "../actions/snackbarActions";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
import { CATEGORY_CREATE_RESET } from "../constants/categoryContants";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Meta from "../components/Meta";
import Loader from "../components/Loader";
import Message from "../components/Message";

const useStyles = makeStyles((theme) => ({
  button: {
    padding: "6px 0",
    minWidth: "30px",
    "& .MuiButton-startIcon": {
      margin: 0,
    },
  },
  breadcrumbsContainer: {
    ...theme.mixins.customize.breadcrumbs,
    paddingBottom: 0,
    "& .MuiBreadcrumbs-ol": {
      justifyContent: "flex-start",
    },
  },
  dataGrid: {
    boxShadow: "0 10px 31px 0 rgba(0,0,0,0.05)",
  },
}));

const CategoryListScreen = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  let { loading, error, categorys = [] } = categoryList;
  categorys = categorys.map((category) => ({ ...category, id: category._id }));

  const categoryDelete = useSelector((state) => state.categoryDelete);
  const { error: errorDelete, success: successDelete } = categoryDelete;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "name",
      headerName: "Tên",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Hành động",
      sortable: false,
      width: 100,
      renderCell: (params) => {
        const id = params.getValue(params.id, "_id") || "";
        return (
          <>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AiOutlineEdit />}
              className={classes.button}
              component={RouterLink}
              to={`/admin/category/${id}/edit`}
            />
            <Button
              variant="contained"
              color="secondary"
              style={{ marginLeft: 8 }}
              className={classes.button}
              startIcon={<AiOutlineDelete />}
              onClick={() => deleteHandler(id)}
            />
          </>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch({ type: CATEGORY_CREATE_RESET });

    // if (!userInfo || !userInfo.isAdmin) {
    //   history.push("/login");
    // }

    dispatch(listCategorys("", "", "all"));
  }, [dispatch, history, successDelete]);

  useEffect(() => {
    if (successDelete) {
      dispatch(openSnackbar("The product has been deleted", "success"));
    } else if (errorDelete) {
      dispatch(openSnackbar(errorDelete, "error"));
    }
  }, [dispatch, successDelete, errorDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteCategory(id));
    }
  };

  return (
    <Container maxWidth="xl" style={{ marginBottom: 48 }}>
      <Meta title="Dashboard | Products" />
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
            <Link color="textPrimary" component={RouterLink} to="/categorylist">
              Thể loại
            </Link>
          </Breadcrumbs>
          <div>
            <Typography
              variant="h5"
              component="h1"
              style={{ textAlign: "center" }}
            >
              Quản lý thể loại
            </Typography>
            <Box display="flex" justifyContent="flex-end" mb={2}>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<AiOutlinePlus />}
                component={RouterLink}
                to="/admin/category/create"
              >
                Tạo sản phẩm
              </Button>
            </Box>
          </div>
        </Grid>
      </Grid>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Grid justifyContent="center" alignItems="center" container>
          <Grid
            item
            xs={5}
            component={Paper}
            className={classes.dataGrid}
            elevation={0}
          >
            <DataGrid
              rows={categorys}
              columns={columns}
              pageSize={10}
              autoHeight
              components={{
                Toolbar: () => (
                  <GridToolbarContainer>
                    <GridToolbarExport />
                  </GridToolbarContainer>
                ),
              }}
            />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default CategoryListScreen;
