import React from "react";
import * as XLSX from "xlsx";
import { useDispatch, useSelector } from 'react-redux';
import { listOrders } from '../actions/orderActions';
import { Link as RouterLink } from 'react-router-dom';
import {
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  Breadcrumbs,
  Link,
  InputLabel,
} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { MdCloudUpload, MdClose } from 'react-icons/md';
import { makeStyles } from '@material-ui/core/styles';
import { BiCommentDetail } from 'react-icons/bi';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Meta from '../components/Meta';
import Loader from '../components/Loader';
import Message from '../components/Message';

const useStyles = makeStyles((theme) => ({
    button: {
      padding: '6px 0',
      minWidth: '50px',
      '& .MuiButton-startIcon': {
        margin: 0,
      },
    },
    breadcrumbsContainer: {
      ...theme.mixins.customize.breadcrumbs,
      paddingBottom: 0,
      '& .MuiBreadcrumbs-ol': {
        justifyContent: 'flex-start',
      },
    },
    dataGrid: {
      boxShadow: '0 10px 31px 0 rgba(0,0,0,0.05)',
    },
    form: {
      '& > *': {
        marginBottom: 16,
      },
      '& .MuiInput-underline:before': {
        borderColor: 'rgba(224, 224, 224, 1)',
      },
    },
    container: {
      marginBottom: 64,
      boxShadow: '0 10px 31px 0 rgba(0,0,0,0.05)',
    },
    size: {
      marginTop: 8,
      '& > div': {
        display: 'flex',
        flexBasis: '25%',
        '& > div + div': {
          marginLeft: 16,
        },
        marginTop: 16,
      },
      '& > label': {
        flexBasis: '100%',
      },
    },
    imagePreview: {
      position: 'relative',
      marginTop: 8,
      marginRight: 16,
      '& > img': {
        width: 120,
        height: 160,
        objectFit: 'cover',
        borderRadius: 6,
      },
      '& .MuiIconButton-root': {
        position: 'absolute',
        top: 5,
        right: 5,
      },
    },
    preview: {
      backgroundColor: theme.palette.background.default,
      '& img.MuiCardMedia-media': {
        height: '100%',
      },
    },
}));
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
const ReceptScreen = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  return (
    <Container maxWidth='xl' style={{ marginBottom: 48 }}>
    <Grid container className={classes.breadcrumbsContainer}>
        <Grid item xs={12}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize='small' />}
            style={{ marginBottom: 24 }}
          >
            <Link color='inherit' component={RouterLink} to='/'>
              Trang chủ
            </Link>
            <Link color='inherit' component={RouterLink} to='/'>
              Admin Dashboard
            </Link>
            <Link
              color='inherit'
              component={RouterLink}
              to='/admin/productlist'
            >
              Nhập hàng
            </Link>
            <Link
              color='textPrimary'
              component={RouterLink}
              to={`/admin/product/create`}
            >
              Create
            </Link>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <InputLabel style={{ marginBottom: 8 }}>Upload excel</InputLabel>
      <input
        id='contained-button-file'
        onChange={handleImagesUpload}
        type='file'
        hidden
      />
      <label htmlFor='contained-button-file'>
        <Button
          variant='contained'
          color='secondary'
          startIcon={<MdCloudUpload />}
          component='span'
        >
          Upload
        </Button>
      </label>
    </Container>
  )
}

export default ReceptScreen;

