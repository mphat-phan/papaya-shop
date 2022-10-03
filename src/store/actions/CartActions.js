import {
    CART_OPEN_DRAWER_PREVIEW,
} from '../constants/CartContants';
export const setOpenCartDrawer = (isOpen) => {
    return { type: CART_OPEN_DRAWER_PREVIEW, payload: isOpen };
};