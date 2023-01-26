import actions from "./actions";

export const initialState = {
  loadingUpdate: false,
  loadingLokasi: false,
  loadingPelayaran: false,
  loadingEkspedisi: false,
  lokasi: [],
  kargo: [],
  pelayaran: [],
  ekspedisi: [],
  alert: null,
};

// eslint-disable-next-line default-param-last
export default function lokasiKargoReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
