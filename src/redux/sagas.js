import { all } from "redux-saga/effects";
import lokasiKargo from "./lokasi-kargo/sagas";
import supplier from "./supplier/sagas";
import produk from "./produk/sagas";
import auth from "./auth/sagas";

export default function* rootSaga() {
  yield all([lokasiKargo(), supplier(), produk(), auth()]);
}
