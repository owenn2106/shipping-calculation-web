import { call, put, all, takeLatest } from "redux-saga/effects";
import {
  logInWithEmailAndPassword,
  logout,
  getUserClaims,
  getAuthToken,
  getCurrentUser,
} from "services/auth";
import actions from "./actions";

export function* LOGIN(input) {
  const { email, password } = input.payload;
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true,
    },
  });

  try {
    const user = yield call(logInWithEmailAndPassword, email, password);

    if (user) {
      yield put({
        type: actions.SET_STATE,
        payload: {
          user: user?.user.uid,
          loading: false,
        },
      });
    } else {
      yield put({
        type: actions.SET_STATE,
        payload: {
          loading: false,
          user: undefined,
        },
      });
    }
  } catch (e) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        user: undefined,
        loading: false,
      },
    });
  }
}

export function* LOGOUT() {
  yield call(logout);
  yield put({
    type: actions.SET_STATE,
    payload: {
      user: undefined,
      authClaims: undefined,
    },
  });
}

export function* GET_USER_CLAIMS() {
  try {
    const authClaims = yield call(getUserClaims);
    if (authClaims) {
      yield put({
        type: actions.SET_STATE,
        payload: {
          authClaims: authClaims,
        },
      });
    }
  } catch (e) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        authClaims: undefined,
      },
    });
  }
}

export function* GET_CURRENT_USER() {
  try {
    const user = yield call(getCurrentUser);
    if (user) {
      yield put({
        type: actions.SET_STATE,
        payload: {
          user: user.uid,
        },
      });
    }
  } catch (e) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        user: undefined,
      },
    });
  }
}

export function* GET_AUTH_TOKEN() {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loadingToken: true,
    },
  });

  const token = yield call(getAuthToken);
  if (token.data) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        token,
        loadingToken: false,
      },
    });
  } else {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loadingToken: false,
      },
    });
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(actions.LOGIN, LOGIN),
    takeLatest(actions.LOGOUT, LOGOUT),
    takeLatest(actions.GET_USER_CLAIMS, GET_USER_CLAIMS),
    takeLatest(actions.GET_CURRENT_USER, GET_CURRENT_USER),
    takeLatest(actions.GET_AUTH_TOKEN, GET_AUTH_TOKEN),
  ]);
}
