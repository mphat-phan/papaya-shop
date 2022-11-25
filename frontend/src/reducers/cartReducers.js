import {
  CART_ADD_ITEM,
  CART_CLEAR_ITEMS,
  CART_OPEN_DRAWER_PREVIEW,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_ADD_ITEM_RESET,
  CART_UPDATE_ITEM
} from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      //Item vừa thêm vào
      const item = action.payload;
      if(item.countInStock===0){
        return {
          ...state,
          cartItems: [...state.cartItems],
          status:false
        };
      }
      //Item đã tồn tại trước đó
      const existItem = state.cartItems.find((x) => x.product === item.product);
      
      if (existItem) {
        if(existItem.qty >= item.countInStock){
          return {
            ...state,
            cartItems: [...state.cartItems],
            status:false
          };
        }
        item.qty = existItem.qty + 1;
        
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
          status:true
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
          status:true
        };
      }
    case CART_UPDATE_ITEM:
      //Item vừa thêm vào
      const item2 = action.payload;
      if(item2.countInStock===0){
        return {
          ...state,
          cartItems: [...state.cartItems],
          status:false
        };
      }
      //Item đã tồn tại trước đó
      const existItem2 = state.cartItems.find((x) => x.product === item2.product);
      
      if (existItem2) {
        if(existItem2.qty > item2.countInStock){
          return {
            ...state,
            cartItems: [...state.cartItems],
            status:false
          };
        }
        //item2.qty = existItem2.qty + 1;
        
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem2.product ? item2 : x
          ),
          status:true
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item2],
          status:true
        };
      }
    case CART_ADD_ITEM_RESET:
      return {
        ...state,
        cartItems: [...state.cartItems],
        status: ''
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload
        ),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case CART_CLEAR_ITEMS:
      return { cartItems: [] };
    default:
      return state;
  }
};

export const cartOpenDrawerReducer = (state = false, action) => {
  if (action.type === CART_OPEN_DRAWER_PREVIEW) {
    return action.payload;
  }
  return state;
};
