import { call, put, all, takeLatest } from "redux-saga/effects";
import actions from "./actions";
import { getLokasi, updateLokasi } from "services/lokasi-kargo";

function* GET_LOKASI() {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loadingLokasi: true,
    },
  });

  const { data, error } = yield call(getLokasi);

  if (data) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loadingLokasi: false,
        lokasi: data,
      },
    });
  }

  if (error) {
    console.log(error);
    yield put({
      type: actions.SET_STATE,
      payload: {
        loadingLokasi: false,
      },
    });
  }
}

function* UPDATE_LOKASI(input) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loadingUpdate: true,
    },
  });

  const { data, error } = yield call(updateLokasi, input.payload.data);
  if (data) {
    yield put({
      type: actions.GET_LOKASI,
    });

    yield put({
      type: actions.SET_STATE,
      payload: {
        loadingUpdate: false,
        alert: {
          type: "success",
          message: "Lokasi berhasil diperbarui.",
        },
      },
    });
  }

  if (error) {
    console.log(error);
    yield put({
      type: actions.SET_STATE,
      payload: {
        loadingLokasi: false,
        alert: {
          type: "error",
          message: error.message || "Error occured.",
        },
      },
    });
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(actions.GET_LOKASI, GET_LOKASI),
    takeLatest(actions.UPDATE_LOKASI, UPDATE_LOKASI),
  ]);
}
