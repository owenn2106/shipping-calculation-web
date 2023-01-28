import { call, put, all, takeLatest } from "redux-saga/effects";
import actions from "./actions";
import { getSupplier, addSupplier, updateSupplier } from "services/supplier";

function* GET_SUPPLIER() {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loaidngSupplier: true,
    },
  });

  const { data, error } = yield call(getSupplier);

  if (data) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loadingSupplier: false,
        suppliers: data,
      },
    });
  }

  if (error) {
    console.log(error);
    yield put({
      type: actions.SET_STATE,
      payload: {
        loadingSupplier: false,
      },
    });
  }
}

function* ADD_SUPPLIER(input) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loadingUpdate: true,
    },
  });

  const { data, error } = yield call(addSupplier, input.payload.data);
  if (data) {
    yield put({
      type: actions.GET_SUPPLIER,
    });

    yield put({
      type: actions.SET_STATE,
      payload: {
        loadingUpdate: false,
        alert: {
          type: "success",
          message: "Supplier berhasil diinput.",
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

function* UPDATE_SUPPLIER(input) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loadingUpdate: true,
    },
  });

  const { data, error } = yield call(updateSupplier, input.payload.data);
  if (data) {
    yield put({
      type: actions.GET_SUPPLIER,
    });

    yield put({
      type: actions.SET_STATE,
      payload: {
        loadingUpdate: false,
        alert: {
          type: "success",
          message: "Supplier berhasil diperbarui.",
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
    takeLatest(actions.GET_SUPPLIER, GET_SUPPLIER),
    takeLatest(actions.ADD_SUPPLIER, ADD_SUPPLIER),
    takeLatest(actions.UPDATE_SUPPLIER, UPDATE_SUPPLIER),
  ]);
}
