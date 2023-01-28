import actions from "./actions";

export const initialState = {
  loadingUpdate: false,
  loadingSupplier: false,
  suppliers: [],
  alert: null,
};

// eslint-disable-next-line default-param-last
export default function supplierReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
