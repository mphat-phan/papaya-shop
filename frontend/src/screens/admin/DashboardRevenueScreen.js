import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRevenue } from "../../actions/orderActions";
import {
  Button,
  Container,
  Grid,
  Typography,
  Breadcrumbs,
  Link,
  Box,
  AccordionSummary,
  AccordionDetails,
  Accordion,
} from "@material-ui/core";

import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Meta from "../../components/Meta";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import clsx from "clsx";
import LineChart from "../../components/LineChart";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};
const listYear = [2019, 2020, 2021, 2022];
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
  accordion: {
    "&::before": {
      display: "none",
    },
    boxShadow: "none",
    "& .MuiAccordionSummary-root": {
      padding: 0,
    },
    "& .MuiAccordionDetails-root": {
      display: "block",
      padding: 0,
    },
  },
  isSelected: {
    color: "#111 !important",
  },
  listYear: {
    "& > button": {
      paddingLeft: 0,
      paddingRight: 0,
      minWidth: 0,
      textTransform: "capitalize",
      color: "rgba(0, 0, 0, 0.54)",
    },
    "& > button:hover": {
      backgroundColor: "transparent",
    },
  },
}));

const ProductListScreen = ({ history }) => {
  const [expanded, setExpanded] = useState(["listYear"]);
  const [checkedYear, setcheckedYear] = useState([2021, 2022]);

  const addYearsHandler = (brand) => {
    if (checkedYear.indexOf(brand) >= 0) {
      for (var i = 0; i < checkedYear.length; i++) {
        if (checkedYear[i] === brand) {
          checkedYear.splice(i, 1);
        }
      }
    } else {
      checkedYear.push(brand);
    }
    setcheckedYear([...checkedYear]);
    dispatch(getRevenue([...checkedYear]));
  };
  const classes = useStyles();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  if (!userInfo || !userInfo.isAdmin) {
    history.push("/login");
  }
  const revenueList = useSelector((state) => state.revenueList);
  const labels = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];
  let { loading, error, revenue = [] } = revenueList;

  const data = {
    labels,
    datasets: [...revenue],
  };
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getRevenue([2021, 2022]));
    } else {
      history.push("/admin");
    }
  }, [dispatch, history, userInfo]);

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
              Admin Thống kê
            </Link>
            <Link color="textPrimary" component={RouterLink} to="/userlist">
              Thống kê doanh thu
            </Link>
          </Breadcrumbs>
          {loading ? (
            <Loader></Loader>
          ) : error ? (
            <Message>{error}</Message>
          ) : (
            <>
              <Accordion
                className={classes.accordion}
                expanded={expanded.indexOf("listYear") >= 0}
              >
                <AccordionSummary>
                  <Typography
                    variant="h6"
                    gutterBottom
                    className={classes.title}
                  >
                    Năm
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box className={classes.listYear} color="text.secondary">
                    {listYear.map((year, index) => (
                      <Button
                        disableElevation
                        disableFocusRipple
                        disableRipple
                        key={year}
                        onClick={() => addYearsHandler(year)}
                        className={clsx(
                          checkedYear.indexOf(year) >= 0 && classes.isSelected
                        )}
                      >
                        {year}
                        {index !== listYear.length - 1 && (
                          <span style={{ margin: "0 8px" }}>/</span>
                        )}
                      </Button>
                    ))}
                  </Box>
                </AccordionDetails>
              </Accordion>
              <LineChart options={options} data={data} />
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductListScreen;
