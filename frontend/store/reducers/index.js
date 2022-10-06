import { combineReducers } from "redux";
import {
    cartOpenDrawerReducer
} 
from './CartReducers';

export default combineReducers({
    cartOpenDrawer: cartOpenDrawerReducer,
});
