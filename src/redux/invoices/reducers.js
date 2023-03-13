import actions from "./actions";

export const initialState = {
  loadingInvoices: false,
  invoices: [],
  loadingUpdate: false,
  alert: null,
};

// eslint-disable-next-line default-param-last
export default function invoicesReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
