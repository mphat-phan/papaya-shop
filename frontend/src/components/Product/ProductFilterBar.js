import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import {
  Typography,
  Button,
  Box,
  Divider,
  Slider,
  RadioGroup,
  Radio,
  Hidden,
  FormControl,
  FormControlLabel,
  AccordionSummary,
  AccordionDetails,
  Accordion,
  useMediaQuery,
} from "@material-ui/core";
import {
  addRangePrice,
  addCategories,
  addBrands,
} from "../../actions/filterActions";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SearchBox from "../SearchBox";
import categories from "../../assets/data/categories";
import brands from "../../assets/data/brands";
import { listCategorys } from "../../actions/categoryActions";

const INITIAL_RANGE_PRICE = [10000, 10000000];

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(2, 0),
    [theme.breakpoints.down("sm")]: {
      margin: "4px 0",
    },
  },
  title: {
    color: "#4D4D4D",
    fontSize: 18,
    [theme.breakpoints.down("lg")]: {
      fontSize: 16,
    },
  },
  category: {
    ...theme.mixins.customize.flexMixin("flex-start", "flex-start", "column"),
    "& > .MuiBox-root + .MuiBox-root": {
      marginTop: theme.spacing(2),
    },
    "& > .MuiBox-root": {
      cursor: "pointer",
    },
  },
  brands: {
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
}));

const ProductFilterBar = ({ products, filter }) => {
  const categoryList = useSelector((state) => state.categoryList);
  let { loading, error, categorys = [] } = categoryList;
  categorys = categorys.map((category) => ({ ...category, id: category._id }));
  console.log(categorys);
  const classes = useStyles();
  const dispatch = useDispatch();
  const onMobile = useMediaQuery("(max-width:740px)");
  const [expanded, setExpanded] = useState([
    "priceRange",
    "categories",
    "brands",
  ]);
  const [price, setPrice] = useState(INITIAL_RANGE_PRICE);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(
      isExpanded ? [...expanded, panel] : expanded.filter((x) => x !== panel)
    );
  };

  const handlePriceChange = (e, newValue) => {
    setPrice(newValue);
  };

  const addCategoriesHandler = (category) => {
    dispatch(addCategories(category));
  };
  const addBrandsHandler = (brand) => {
    dispatch(addBrands(brand));
  };

  useEffect(() => {
    dispatch(listCategorys("", "", "all"));
    if (price) {
      const timer = setTimeout(
        () =>
          dispatch(
            addRangePrice({
              priceMin: price[0],
              priceMax: price[1],
            })
          ),
        1000
      );
      return () => clearTimeout(timer);
    }
  }, [dispatch, price]);

  useEffect(() => {
    if (onMobile) {
      setExpanded([]);
    }
  }, [onMobile]);

  return (
    <>
      <SearchBox />
      <Hidden smDown>
        <Divider className={classes.divider} />
      </Hidden>
      <Accordion
        className={classes.accordion}
        expanded={expanded.indexOf("priceRange") >= 0}
        onChange={handleAccordionChange("priceRange")}
        defaultExpanded={true}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Lọc theo giá
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Slider
            value={price}
            onChange={handlePriceChange}
            max={10000000}
            min={10000}
            color="secondary"
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
          />
          <Box
            display="flex"
            justifyContent="space-between"
            color="text.secondary"
          >
            <span>Lọc</span>
            <span>{`Giá ${new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "VND",
            }).format(price[0])} - ${new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "VND",
            }).format(price[1])}`}</span>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Divider className={classes.divider} />
      <Accordion
        className={classes.accordion}
        expanded={expanded.indexOf("categories") >= 0}
        onChange={handleAccordionChange("categories")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Thể loại
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box className={classes.category} color="text.secondary">
            {categorys.map((category) => (
              <Box
                display="flex"
                justifyContent="space-between"
                width="100%"
                key={category._id}
                className={clsx(
                  filter.categories.indexOf(category.name) >= 0 &&
                    classes.isSelected
                )}
                onClick={() => addCategoriesHandler(category.name)}
              >
                <span>{category.name}</span>
              </Box>
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>
      <Divider className={classes.divider} />
      <Accordion
        className={classes.accordion}
        expanded={expanded.indexOf("brands") >= 0}
        onChange={handleAccordionChange("brands")}
      >
        <AccordionDetails></AccordionDetails>
      </Accordion>
    </>
  );
};

export default ProductFilterBar;
