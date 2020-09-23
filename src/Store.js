import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Cookie from "js-cookie";
import {
  productListReducers,
  productDetailReducers,
} from "./reducers/productListReducers";
import { cartReducers } from "./reducers/cartReducers";
import { userSiginReducer } from "./reducers/userReducer";

const cartItems = Cookie.getJSON("cartItems") || [];

const initialState = { cart: { cartItems } };
const reducer = combineReducers({
  productList: productListReducers,
  productDetails: productDetailReducers,
  cart: cartReducers,
  userSignin: userSiginReducer,
});

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
