import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  produtReducer,
  produtDetailsReducer,
} from "./reducers/productReducers";

import { userReducer } from "./reducers/userReducers";
const reducer = combineReducers({
  products: produtReducer,
  productDetails: produtDetailsReducer,
  user : userReducer
});
let initialState = {};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
//While working with redux remember 3 things : 
// 1. Reducers
// 2. Actions
// 3. Constants