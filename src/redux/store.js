import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import rootReducer from "./reducers";
import mySaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// create store
const store = createStore(
  rootReducer(),
  composeEnhancers(applyMiddleware(...middlewares))
);

// run saga
sagaMiddleware.run(mySaga);

export function getStoreWithState(preloadedState) {
  return createStore(
    rootReducer(),
    preloadedState,
    composeEnhancers(applyMiddleware(...middlewares))
  );
}

// store export
export default store;
