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
  setInvoicesListener,
  addInvoice,
  updateInvoice,
} from "services/invoices";
import actions from "./actions";

function* SUBSCRIBE_TO_INVOICES() {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loadingInvoices: true,
      invoices: [],
    },
  });

  const channel = yield call(setInvoicesListener);

  yield fork(function* () {
    yield take(actions.UNSUBSCRIBE_FROM_INVOICES);
    channel.close();
  });

  try {
    while (true) {
      const invoices = yield take(channel);
      yield put({
        type: actions.SET_STATE,
        payload: {
          invoices,
          loadingInvoices: false,
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
          loadingInvoices: false,
        },
      });
    }
  }
}

function* ADD_INVOICE(input) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loadingUpdate: true,
    },
  });

  const { data, error } = yield call(addInvoice, input.payload);
  if (data) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loadingUpdate: false,
        alert: {
          type: "success",
          message: "Invoice berhasil disimpan.",
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

function* UPDATE_INVOICE(input) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loadingUpdate: true,
    },
  });

  const { data, error } = yield call(updateInvoice, input.payload.data);
  if (data) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loadingUpdate: false,
        alert: {
          type: "success",
          message: "Invoice berhasil diperbarui.",
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
    takeLatest(actions.SUBSCRIBE_TO_INVOICES, SUBSCRIBE_TO_INVOICES),
    takeLatest(actions.ADD_INVOICE, ADD_INVOICE),
    takeLatest(actions.UPDATE_INVOICE, UPDATE_INVOICE),
  ]);
}
