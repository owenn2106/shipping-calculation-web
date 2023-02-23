import {
  all,
  call,
  cancelled,
  fork,
  put,
  take,
  takeLatest,
} from "redux-saga/effects";
import {
  addProduk,
  batchAddProduk,
  getJenisProduk,
  setProdukListener,
  updateJenisProduk,
  updateProduk,
} from "services/produk";
import actions from "./actions";

function* SUBSCRIBE_TO_PRODUK() {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loadingProduk: true,
      produk: [],
    },
  });

  const channel = yield call(setProdukListener);

  yield fork(function* () {
    yield take(actions.UNSUBSCRIBE_FROM_PRODUK);
    channel.close();
  });

  try {
    while (true) {
      const produk = yield take(channel);
      yield put({
        type: actions.SET_STATE,
        payload: {
          produk,
          loadingProduk: false,
        },
      });
    }
  } finally {
    const c = yield cancelled();
    if (c) {
      channel.close();
      yield put({
        type: actions.SET_STATE,
        payload: {
          loadingProduk: false,
        },
      });
    }
  }
}

function* ADD_PRODUK(input) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loadingUpdate: true,
    },
  });

  const { data, error } = yield call(addProduk, input.payload);
  if (data) {
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

function* BATCH_ADD_PRODUK(input) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loadingUpdate: true,
    },
  });

  const { data, error } = yield call(batchAddProduk, input.payload.data);
  if (data) {
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
    takeLatest(actions.SUBSCRIBE_TO_PRODUK, SUBSCRIBE_TO_PRODUK),
    takeLatest(actions.ADD_PRODUK, ADD_PRODUK),
    takeLatest(actions.BATCH_ADD_PRODUK, BATCH_ADD_PRODUK),
    takeLatest(actions.UPDATE_PRODUK, UPDATE_PRODUK),
    takeLatest(actions.GET_JENIS_PRODUK, GET_JENIS_PRODUK),
    takeLatest(actions.UPDATE_JENIS_PRODUK, UPDATE_JENIS_PRODUK),
  ]);
}
