import React, { useEffect } from "react";
import * as XLSX from "xlsx";
import { useDispatch, useSelector } from "react-redux";
// import { listOrders } from "../../actions/cartActions.js";
import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  Breadcrumbs,
  Link,
  InputLabel,
  InputBase,
  FormControl,
  FormHelperText,
  Box,
  CardMedia,
} from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { MdCloudUpload, MdClose } from "react-icons/md";
import { BiCommentDetail } from "react-icons/bi";
// import { ReactComponent as Banner } from "../../assets/images/shipping.svg";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Meta from "../../components/Meta";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { saveShippingAddressRecept } from "../../actions/productActions";
import { makeStyles, withStyles, fade } from "@material-ui/core/styles";
import {
  listShopProduct,
  fetchProductDetails,
} from "../../actions/productActions";
import { listProducts } from "../../actions/productActions";
import SearchBox from "../../components/SearchBox";
import CheckoutSteps from "../../components/CheckoutStepsRecept";
import ReceptBanner from "../../assets/images/20946018.jpg";
import queryString from "query-string";
const handleImagesUpload = (e) => {
  const files = e.target.files;
  const reader = new FileReader();
  reader.onload = (evt) => {
    const bstr = evt.target.result;
    const wb = XLSX.read(bstr, { type: "binary" });
    const wsname = wb.SheetNames[0];
    const ws = wb.Sheets[wsname];
    const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
    console.log(data);
  };
  reader.readAsBinaryString(files);
};

const useStyles = makeStyles((theme) => ({
  dataGrid: {
    boxShadow: "0 10px 31px 0 rgba(0,0,0,0.05)",
  },
  breadcrumbsContainer: {
    ...theme.mixins.customize.breadcrumbs,
  },
  form: {
    "& > *": {
      marginBottom: 16,
    },
  },
  content: {
    padding: 24,
    boxShadow: "0 10px 31px 0 rgba(0,0,0,0.05)",
  },
  contentInfo: {
    padding: 24,
    marginTop: 16,
    boxShadow: "0 10px 31px 0 rgba(0,0,0,0.05)",
  },
  banner: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
}));

const ReceptDetailScreen = ({ location, history }) => {
  const Input = withStyles((theme) => ({
    root: {
      "label + &": {
        marginTop: theme.spacing(3),
      },
      "&.Mui-error $input": {
        borderColor: "#f44336",
      },
    },
    input: {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.common.white,
      border: "1px solid #ced4da",
      fontSize: 16,
      padding: "10px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      "&:focus": {
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }))(InputBase);

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      width: 160,
    },
    {
      field: "price",
      headerName: "Price",
      width: 120,
    },
    {
      field: "countInStock",
      headerName: "Quantity",
      width: 160,
      editable: true,
      // ignoreModifications: true,
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 100,
      renderCell: (params) => {
        const id = params.getValue(params.id, "_id") || "";
        return <></>;
      },
    },
  ];

  const dispatch = useDispatch();
  const classes = useStyles();
  const methods = useForm();
  const { handleSubmit, control } = methods;
  const productRecept = useSelector((state) => state.productRecept);
  const { shippingAddressRecept } = productRecept;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const query = queryString.parse(location.search);
  let { sort_by = "default", page: pageNumber = 1 } = query;

  const productList = useSelector((state) => state.productList);
  let { loading, error, products = [] } = productList;
  products = products.map((product) => ({ ...product, id: product._id }));
  console.log(products);

  const productDetails = useSelector((state) => state.productDetails);
  let { product } = productDetails;
  console.log(product);
  const filter = useSelector((state) => state.filter);
  const { searchTerm } = filter;
  console.log(searchTerm);
  console.log();
  useEffect(() => {
    if (!userInfo) {
      history.push(`/login?redirect=receptDetail`);
    }
    if (searchTerm) {
      dispatch(listShopProduct(sort_by, pageNumber, searchTerm));
      dispatch(fetchProductDetails(searchTerm));
    }
  }, [dispatch, , sort_by, pageNumber, searchTerm]);

  const onSubmit = ({ address, city, postalCode, country, phoneNumber }) => {
    dispatch(
      saveShippingAddressRecept({
        address,
        city,
        postalCode,
        country,
        phoneNumber,
      })
    );
    history.push("/admin/receptDetail");
  };

  return (
    <Container maxWidth="xl" style={{ marginBottom: 48 }}>
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
              to="/admin/productlist"
            >
              Nhập hàng
            </Link>
          </Breadcrumbs>
          <CheckoutSteps step={2} />
        </Grid>
      </Grid>

      <Paper mt={16} className={classes.contentInfo}>
        <Typography variant="h5" gutterBottom>
          Thông tin sản phẩm
        </Typography>
        <SearchBox role="searchDrawer" />
        {loading ? (
          <Loader></Loader>
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <Grid container>
            <Grid
              item
              xs={12}
              component={Paper}
              className={classes.dataGrid}
              elevation={0}
            >
              <DataGrid
                rows={products}
                columns={columns}
                pageSize={10}
                autoHeight
                // components={{
                //   Toolbar: () => (
                //     <GridToolbarContainer>
                //       <GridToolbarExport />
                //     </GridToolbarContainer>
                //   ),
                // }}
              />
            </Grid>
          </Grid>
        )}
      </Paper>

      <InputLabel style={{ marginBottom: 8 }}>Upload excel</InputLabel>
      <input
        id="contained-button-file"
        onChange={handleImagesUpload}
        type="file"
        hidden
      />
      <label htmlFor="contained-button-file">
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="secondary"
            startIcon={<MdCloudUpload />}
            component="span"
          >
            Nhập hàng
          </Button>
        </Box>
      </label>
    </Container>
  );
};

export default ReceptDetailScreen;
