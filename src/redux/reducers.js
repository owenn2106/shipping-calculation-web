import { combineReducers } from "redux";
import lokasiKargo from "./lokasi-kargo/reducers";
import supplier from "./supplier/reducers";
import produk from "./produk/reducers";

const rootReducer = () =>
  combineReducers({
    lokasiKargo,
    supplier,
    produk,
  });

export default rootReducer;
