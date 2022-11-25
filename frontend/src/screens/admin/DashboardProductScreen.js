import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSellingProduct } from "../../actions/orderActions";
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
import PieChart from "../../components/PieChart";
import VerticalBar from "../../components/VerticalBar";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Biểu đồ cột",
    },
  },
};
const listYear = [2019, 2020, 2021, 2022];
const listTop = [1, 3, 5, 10, 15, 20, 25, 50];
const listMonth = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
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

const DashboardProductScreen = ({ history }) => {
  const [expanded, setExpanded] = useState(["listYear"]);
  const [checkedYear, setcheckedYear] = useState(2022);
  const [checkedTop, setcheckedTop] = useState(5);
  const [checkedMonth, setcheckedMonth] = useState(5);
  const addYearsHandler = (year) => {
    setcheckedYear(year);
    dispatch(getSellingProduct(checkedTop, year, checkedMonth));
  };
  const addTopHandler = (top) => {
    setcheckedTop(top);
    dispatch(getSellingProduct(top, checkedYear, checkedMonth));
  };
  const addMonthHandler = (month) => {
    setcheckedMonth(month);
    dispatch(getSellingProduct(checkedTop, checkedYear, month));
  };
  const classes = useStyles();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  if (!userInfo || !userInfo.isAdmin) {
    history.push("/admin");
  }
  const sellingProductList = useSelector((state) => state.sellingProduct);
  let { loading, error, sellingProduct = [] } = sellingProductList;
  const label = [];
  const sellData = [];
  sellingProduct.map((elm) => {
    label.push(elm.product.name);
    sellData.push(elm.count);
  });
  const data = {
    labels: label,
    datasets: [
      {
        label: "# of Votes",
        data: sellData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getSellingProduct(5, 2022, 0));
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  return (
    <Container maxWidth="xl" style={{ marginBottom: 48 }}>
      <Meta title="Dashboard | Selling Products" />
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
                    Năm {checkedYear}
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
                          checkedYear === year && classes.isSelected
                        )}
                      >
                        {"Năm " + year}
                        {index !== listYear.length - 1 && (
                          <span style={{ margin: "0 8px" }}>/</span>
                        )}
                      </Button>
                    ))}
                  </Box>
                </AccordionDetails>
                <AccordionDetails>
                  <Box className={classes.listYear} color="text.secondary">
                    {listMonth.map((month, index) => (
                      <Button
                        disableElevation
                        disableFocusRipple
                        disableRipple
                        key={month}
                        onClick={() => addMonthHandler(month)}
                        className={clsx(
                          checkedMonth === month && classes.isSelected
                        )}
                      >
                        {month === 0
                          ? "Không lọc theo tháng "
                          : "Tháng " + month}
                        {index !== listMonth.length - 1 && (
                          <span style={{ margin: "0 8px" }}>/</span>
                        )}
                      </Button>
                    ))}
                  </Box>
                </AccordionDetails>
                <AccordionDetails>
                  <Box className={classes.listYear} color="text.secondary">
                    {listTop.map((top, index) => (
                      <Button
                        disableElevation
                        disableFocusRipple
                        disableRipple
                        key={top}
                        onClick={() => addTopHandler(top)}
                        className={clsx(
                          checkedTop === top && classes.isSelected
                        )}
                      >
                        {"Top " + top}
                        {index !== listTop.length - 1 && (
                          <span style={{ margin: "0 8px" }}>/</span>
                        )}
                      </Button>
                    ))}
                  </Box>
                </AccordionDetails>
              </Accordion>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: "10vh" }}
              >
                <PieChart data={data} year={checkedYear} />
              </Grid>

              <VerticalBar data={data} year={checkedYear} options={options} />
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardProductScreen;
