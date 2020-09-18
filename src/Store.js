import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  productListReducers,
  productDetailReducers,
} from "./reducers/productListReducers";
import { cartReducers } from "./reducers/cartReducers";

const initialState = {};
const reducer = combineReducers({
  productList: productListReducers,
  productDetails: productDetailReducers,
  cart: cartReducers,
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
