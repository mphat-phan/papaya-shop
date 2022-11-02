import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  productCommentCreateReducer,
  productTopRatedReducer,
  productLatestReducer,
  productSaleReducer,
  productRelatedReducer,
  productSortByPriceReducer,
  productShopReducer,
  productCommentReplyCreateReducer,
  productReviewReplyCreateReducer
} from './reducers/productReducers.js';
import { cartOpenDrawerReducer, cartReducer } from './reducers/cartReducers';
import { snackbarReducer } from './reducers/snackbarReducers';
import { filterReducer } from './reducers/filterReducers';
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyReducer,
  orderListReducer,
  orderDeliverReducer,
  revenueReducer,
  sellingProductReducer,
  orderCancelReducer,
  orderConfirmReducer,
  orderDeliveringReducer
} from './reducers/orderReducers';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers';

const reducers = combineReducers({
  productShop: productShopReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  productCommentCreate: productCommentCreateReducer,
  productCommentReplyCreate: productCommentReplyCreateReducer,
  productReviewReplyCreate: productReviewReplyCreateReducer,
  productTopRated: productTopRatedReducer,
  productLatest: productLatestReducer,
  productSale: productSaleReducer,
  productRelated: productRelatedReducer,
  productSortByPrice: productSortByPriceReducer,
  cart: cartReducer,
  cartOpenDrawer: cartOpenDrawerReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderDelivering: orderDeliveringReducer,
  orderCancel: orderCancelReducer,
  orderConfirm: orderConfirmReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  revenueList: revenueReducer,
  sellingProduct: sellingProductReducer,
  snackbarState: snackbarReducer,
  filter: filterReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middlewares = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
