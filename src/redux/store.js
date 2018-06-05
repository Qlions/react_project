import {createStore, applyMiddleware} from "redux";
// import thunkMiddleware from "redux-thunk";
import combineReducers from "./reducers.js";

import promiseMiddleWare from "./middleware/promiseMiddleware"

let store = createStore(combineReducers, applyMiddleware(promiseMiddleWare));

export default store;