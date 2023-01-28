import { call, put, all, takeLatest } from "redux-saga/effects";
import actions from "./actions";
import {
  addEkspedisi,
  addKargo,
  getEkspedisi,
  getKargo,
  getLokasi,
  getPelayaran,
  updateEkspedisi,
  updateKargo,
  updateLokasi,
  updatePelayaran,
} from "services/lokasi-kargo";

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

function* GET_PELAYARAN() {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loadingPelayaran: true,
    },
  });

  const { data, error } = yield call(getPelayaran);

  if (data) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loadingPelayaran: false,
        pelayaran: data,
      },
    });
  }

  if (error) {
    console.log(error);
    yield put({
      type: actions.SET_STATE,
      payload: {
        loadingPelayaran: false,
      },
    });
  }
}

function* UPDATE_PELAYARAN(input) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loadingUpdate: true,
    },
  });

  const { data, error } = yield call(updatePelayaran, input.payload.data);
  if (data) {
    yield put({
      type: actions.GET_PELAYARAN,
    });

    yield put({
      type: actions.SET_STATE,
      payload: {
        loadingUpdate: false,
        alert: {
          type: "success",
          message: "Pelayaran berhasil diperbarui.",
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

function* GET_EKSPEDISI() {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loadingEkspedisi: true,
    },
  });

  const { data, error } = yield call(getEkspedisi);

  if (data) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loadingEkspedisi: false,
        ekspedisi: data,
      },
    });
  }

  if (error) {
    console.log(error);
    yield put({
      type: actions.SET_STATE,
      payload: {
        loadingEkspedisi: false,
      },
    });
  }
}

function* ADD_EKSPEDISI(input) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loadingUpdate: true,
    },
  });

  const { data, error } = yield call(addEkspedisi, input.payload.data);
  if (data) {
    yield put({
      type: actions.GET_EKSPEDISI,
    });

    yield put({
      type: actions.SET_STATE,
      payload: {
        loadingUpdate: false,
        alert: {
          type: "success",
          message: "Ekspedisi berhasil diinput.",
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

function* UPDATE_EKSPEDISI(input) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loadingUpdate: true,
    },
  });

  const { data, error } = yield call(updateEkspedisi, input.payload.data);
  if (data) {
    yield put({
      type: actions.GET_EKSPEDISI,
    });

    yield put({
      type: actions.SET_STATE,
      payload: {
        loadingUpdate: false,
        alert: {
          type: "success",
          message: "Ekspedisi berhasil diperbarui.",
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

function* GET_KARGO() {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loadingKargo: true,
    },
  });

  const { data, error } = yield call(getKargo);

  if (data) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loadingKargo: false,
        kargo: data,
      },
    });
  }

  if (error) {
    console.log(error);
    yield put({
      type: actions.SET_STATE,
      payload: {
        loadingKargo: false,
      },
    });
  }
}

function* ADD_KARGO(input) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loadingUpdate: true,
    },
  });

  const { data, error } = yield call(addKargo, input.payload.data);
  if (data) {
    yield put({
      type: actions.GET_KARGO,
    });

    yield put({
      type: actions.SET_STATE,
      payload: {
        loadingUpdate: false,
        alert: {
          type: "success",
          message: "Kargo berhasil diinput.",
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

function* UPDATE_KARGO(input) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loadingUpdate: true,
    },
  });

  const { data, error } = yield call(updateKargo, input.payload.data);
  if (data) {
    yield put({
      type: actions.GET_KARGO,
    });

    yield put({
      type: actions.SET_STATE,
      payload: {
        loadingUpdate: false,
        alert: {
          type: "success",
          message: "Kargo berhasil diperbarui.",
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

export default function* rootSaga() {
  yield all([
    takeLatest(actions.GET_LOKASI, GET_LOKASI),
    takeLatest(actions.UPDATE_LOKASI, UPDATE_LOKASI),
    takeLatest(actions.GET_PELAYARAN, GET_PELAYARAN),
    takeLatest(actions.UPDATE_PELAYARAN, UPDATE_PELAYARAN),
    takeLatest(actions.GET_EKSPEDISI, GET_EKSPEDISI),
    takeLatest(actions.ADD_EKSPEDISI, ADD_EKSPEDISI),
    takeLatest(actions.UPDATE_EKSPEDISI, UPDATE_EKSPEDISI),
    takeLatest(actions.GET_KARGO, GET_KARGO),
    takeLatest(actions.ADD_KARGO, ADD_KARGO),
    takeLatest(actions.UPDATE_KARGO, UPDATE_KARGO),
  ]);
}
