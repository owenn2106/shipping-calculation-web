import { call, put, all, takeLatest } from "redux-saga/effects";
import {
  addProduk,
  getJenisProduk,
  getProduk,
  updateJenisProduk,
  updateProduk,
} from "services/produk";
import actions from "./actions";

function* GET_PRODUK() {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loadingProduk: true,
    },
  });

  const { data, error } = yield call(getProduk);

  if (data) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loadingProduk: false,
        produk: data,
      },
    });
  }

  if (error) {
    console.log(error);
    yield put({
      type: actions.SET_STATE,
      payload: {
        loadingProduk: false,
      },
    });
  }
}

function* ADD_PRODUK(input) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loadingUpdate: true,
    },
  });

  const { data, error } = yield call(addProduk, input.payload.data);
  if (data) {
    yield put({
      type: actions.GET_PRODUK,
    });

    yield put({
      type: actions.SET_STATE,
      payload: {
        loadingUpdate: false,
        alert: {
          type: "success",
          message: "Produk berhasil diinput.",
        },
      },
    });
  }

  if (error) {
    console.log(error);
    yield put({
      type: actions.SET_STATE,
      payload: {
        loadingUpdate: false,
        alert: {
          type: "error",
          message: error.message || "Error occured.",
        },
      },
    });
  }
}

function* UPDATE_PRODUK(input) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loadingUpdate: true,
    },
  });

  const { data, error } = yield call(updateProduk, input.payload.data);
  if (data) {
    yield put({
      type: actions.GET_PRODUK,
    });

    yield put({
      type: actions.SET_STATE,
      payload: {
        loadingUpdate: false,
        alert: {
          type: "success",
          message: "Produk berhasil diperbarui.",
        },
      },
    });
  }

  if (error) {
    console.log(error);
    yield put({
      type: actions.SET_STATE,
      payload: {
        loadingUpdate: false,
        alert: {
          type: "error",
          message: error.message || "Error occured.",
        },
      },
    });
  }
}

function* GET_JENIS_PRODUK() {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loadingJenisProduk: true,
    },
  });

  const { data, error } = yield call(getJenisProduk);

  if (data) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loadingJenisProduk: false,
        jenisProduk: data,
      },
    });
  }

  if (error) {
    console.log(error);
    yield put({
      type: actions.SET_STATE,
      payload: {
        loadingJenisProduk: false,
      },
    });
  }
}

function* UPDATE_JENIS_PRODUK(input) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loadingUpdate: true,
    },
  });

  const { data, error } = yield call(updateJenisProduk, input.payload.data);
  if (data) {
    yield put({
      type: actions.GET_JENIS_PRODUK,
    });

    yield put({
      type: actions.SET_STATE,
      payload: {
        loadingUpdate: false,
        alert: {
          type: "success",
          message: "Jenis produk berhasil diperbarui.",
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
    takeLatest(actions.GET_PRODUK, GET_PRODUK),
    takeLatest(actions.ADD_PRODUK, ADD_PRODUK),
    takeLatest(actions.UPDATE_PRODUK, UPDATE_PRODUK),
    takeLatest(actions.GET_JENIS_PRODUK, GET_JENIS_PRODUK),
    takeLatest(actions.UPDATE_JENIS_PRODUK, UPDATE_JENIS_PRODUK),
  ]);
}
