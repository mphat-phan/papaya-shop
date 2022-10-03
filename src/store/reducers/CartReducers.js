import {
    CART_OPEN_DRAWER_PREVIEW
} from '../constants/CartContants';

export const cartOpenDrawerReducer = (state = false, action) => {
    if (action.type === CART_OPEN_DRAWER_PREVIEW) {
        return action.payload;
    }
    return state;
}