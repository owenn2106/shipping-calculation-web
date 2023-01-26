import { all } from "redux-saga/effects";
import lokasiKargo from "./lokasi-kargo/sagas";

export default function* rootSaga() {
  yield all([lokasiKargo()]);
}
