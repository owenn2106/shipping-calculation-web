import actions from "./actions";

const initialState = {
  user: undefined,
  authClaims: undefined,
  loading: false,
  loadingToken: false,
  token: undefined,
  error: null,
};

// eslint-disable-next-line default-param-last
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
