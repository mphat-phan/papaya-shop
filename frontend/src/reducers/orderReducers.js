import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_RESET,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_RESET,
  ORDER_CANCEL_FAIL,
  ORDER_CANCEL_REQUEST,
  ORDER_CANCEL_RESET,
  ORDER_CANCEL_SUCCESS,
  ORDER_CONFIRM_FAIL,
  ORDER_CONFIRM_REQUEST,
  ORDER_CONFIRM_RESET,
  ORDER_CONFIRM_SUCCESS,
  ORDER_DELIVERING_FAIL,
  ORDER_DELIVERING_REQUEST,
  ORDER_DELIVERING_RESET,
  ORDER_DELIVERING_SUCCESS,
  REVENUE_FAIL,
  REVENUE_REQUEST,
  REVENUE_SUCCESS,
  SELLING_PRODUCT_FAIL,
  SELLING_PRODUCT_REQUEST,
  SELLING_PRODUCT_SUCCESS,
} from '../constants/orderConstants';

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      };
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return {
        loading: true,
      };
    case ORDER_DELIVER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_DELIVER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_DELIVER_RESET:
      return {};
    default:
      return state;
  }
};

export const orderCancelReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CANCEL_REQUEST:
      return {
        loading: true,
      };
    case ORDER_CANCEL_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_CANCEL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_CANCEL_RESET:
      return {};
    default:
      return state;
  }
};

export const orderConfirmReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CONFIRM_REQUEST:
      return {
        loading: true,
      };
    case ORDER_CONFIRM_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_CONFIRM_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_CONFIRM_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDeliveringReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVERING_REQUEST:
      return {
        loading: true,
      };
    case ORDER_DELIVERING_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_DELIVERING_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_DELIVERING_RESET:
      return {};
    default:
      return state;
  }
};



export const orderListMyReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_MY_REQUEST:
      return {
        loading: true,
      };
    case ORDER_LIST_MY_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case ORDER_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_LIST_MY_RESET:
      return { orders: [] };
    default:
      return state;
  }
};

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return {
        loading: true,
      };
    case ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const revenueReducer = (state = { revenue: [] }, action) => {
  switch (action.type) {
    case REVENUE_REQUEST:
      return {
        loading: true,
      };
    case REVENUE_SUCCESS:
      return {
        loading: false,
        revenue: action.payload,
      };
    case REVENUE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const sellingProductReducer = (state = { sellingProduct: [] }, action) => {
  switch (action.type) {
    case SELLING_PRODUCT_REQUEST:
      return {
        loading: true,
      };
    case SELLING_PRODUCT_SUCCESS:
      return {
        loading: false,
        sellingProduct: action.payload,
      };
    case SELLING_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};