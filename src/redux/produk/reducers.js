import actions from "./actions";

export const initialState = {
  loadingUpdate: false,
  loadingProduk: false,
  loadingJenisProduk: false,
  produk: [],
  jenisProduk: [],
  alert: null,
};

// eslint-disable-next-line default-param-last
export default function produkReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
