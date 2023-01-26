import { combineReducers } from "redux";
import lokasiKargo from "./lokasi-kargo/reducers";

const rootReducer = () =>
  combineReducers({
    lokasiKargo,
  });

export default rootReducer;
