import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {
    cartOpenDrawerReducer,
} from './reducers/CartReducers';

const reducers = combineReducers({
    cartOpenDrawer: cartOpenDrawerReducer,
});

const initialState = {

};

const middlewares = [thunk];

const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;