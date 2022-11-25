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
import { listShopProduct } from "../../actions/productActions";
import { listProducts } from "../../actions/productActions";
import SearchBox from "../../components/SearchBox";
import CheckoutSteps from "../../components/CheckoutStepsRecept";
import ReceptBanner from "../../assets/images/20946018.jpg";

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

const ReceptScreen = ({ history }) => {
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

  // const columns = [
  //   { field: "_id", headerName: "ID", width: 220 },
  //   {
  //     field: "name",
  //     headerName: "Name",
  //     flex: 1,
  //   },
  //   {
  //     field: "category",
  //     headerName: "Category",
  //     width: 160,
  //   },
  //   {
  //     field: "price",
  //     headerName: "Price",
  //     width: 120,
  //   },
  //   {
  //     field: "quantity",
  //     headerName: "Quantity",
  //     width: 160,
  //   },
  //   {
  //     field: "action",
  //     headerName: "Action",
  //     sortable: false,
  //     width: 100,
  //     renderCell: (params) => {
  //       const id = params.getValue(params.id, "_id") || "";
  //       return <></>;
  //     },
  //   },
  // ];

  const dispatch = useDispatch();
  const classes = useStyles();
  const methods = useForm();
  const { handleSubmit, control } = methods;
  const productRecept = useSelector((state) => state.productRecept);
  const { shippingAddressRecept } = productRecept;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productList = useSelector((state) => state.productList);
  let { loading, error, products = [] } = productList;
  products = products.map((product) => ({ ...product, id: product._id }));

  const filter = useSelector((state) => state.filter);
  const { searchTerm } = filter;

  useEffect(() => {
    if (!userInfo) {
      history.push(`/login?redirect=recept`);
    }
  }, [dispatch, history]);

  const onSubmit = ({ name, address, city, postalCode, country, phoneNumber }) => {
    dispatch(
      saveShippingAddressRecept({
        name,
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
              Admin Thống kê
            </Link>
            <Link
              color="inherit"
              component={RouterLink}
              to="/admin/productlist"
            >
              Nhập hàng
            </Link>
          </Breadcrumbs>
          <CheckoutSteps step={1} />
        </Grid>
      </Grid>
      <Paper elevation={0} className={classes.content}>
        <Grid container spacing={8}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Thông tin nhà cung cấp
            </Typography>
            <FormProvider {...methods}>
              <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
              <Controller
                  name="name"
                  defaultValue={shippingAddressRecept.name || ""}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <FormControl fullWidth error={!!error}>
                      <InputLabel shrink htmlFor="name">
                        Tên nhà cung cấp
                      </InputLabel>
                      <Input {...field} id="name" fullWidth />{" "}
                      {error && (
                        <FormHelperText error>{error.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                  rules={{ required: "(*) Address is required" }}
                />
                <Controller
                  name="address"
                  defaultValue={shippingAddressRecept.address || ""}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <FormControl fullWidth error={!!error}>
                      <InputLabel shrink htmlFor="shipping-address">
                        Địa chỉ
                      </InputLabel>
                      <Input {...field} id="shipping-address" fullWidth />{" "}
                      {error && (
                        <FormHelperText error>{error.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                  rules={{ required: "(*) Address is required" }}
                />
                <Controller
                  name="city"
                  defaultValue={shippingAddressRecept.city || ""}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <FormControl fullWidth error={!!error}>
                      <InputLabel shrink htmlFor="shipping-city">
                        Thành phố
                      </InputLabel>
                      <Input {...field} id="shipping-city" fullWidth />{" "}
                      {error && (
                        <FormHelperText error>{error.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                  rules={{ required: "(*) City is required" }}
                />
                <Controller
                  name="postalCode"
                  defaultValue={shippingAddressRecept.postalCode || ""}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <FormControl fullWidth error={!!error}>
                      <InputLabel shrink htmlFor="shipping-postalCode">
                        Mã bưu điện
                      </InputLabel>
                      <Input {...field} id="shipping-postalCode" fullWidth />{" "}
                      {error && (
                        <FormHelperText error>{error.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                  rules={{ required: "(*) Postal code is required" }}
                />
                <Controller
                  name="phoneNumber"
                  defaultValue={shippingAddressRecept.phoneNumber || ""}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <FormControl fullWidth error={!!error}>
                      <InputLabel shrink htmlFor="shipping-phoneNumber">
                        Số điện thoại
                      </InputLabel>
                      <Input {...field} id="shipping-phoneNumber" fullWidth />{" "}
                      {error && (
                        <FormHelperText error>{error.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                  rules={{ required: "(*) Vui lòng nhập số điện thoại" }}
                />
                <Controller
                  name="country"
                  defaultValue={shippingAddressRecept.country || ""}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <FormControl fullWidth error={!!error}>
                      <InputLabel shrink htmlFor="shipping-country">
                        Quốc gia
                      </InputLabel>
                      <Input {...field} id="shipping-country" fullWidth />{" "}
                      {error && (
                        <FormHelperText error>{error.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                  rules={{ required: "(*) Country is required" }}
                />
                <Button type="submit" variant="contained" color="secondary">
                  Bước kế tiếp
                </Button>
              </form>
            </FormProvider>
          </Grid>
          <Grid item xs={6} md={6}>
            <img src={ReceptBanner} className={classes.banner}></img>
          </Grid>
        </Grid>
      </Paper>

      {/* <Paper mt={16} className={classes.contentInfo}>
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
      </Paper> */}

      {/* <InputLabel style={{ marginBottom: 8 }}>Upload excel</InputLabel> */}
      {/* <input
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
      </label> */}
    </Container>
  );
};

export default ReceptScreen;
