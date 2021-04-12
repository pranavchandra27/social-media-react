import jwt_decode from "jwt-decode";
import { SET_USER, SET_DARK_MODE } from "./actionTypes";

const token = localStorage.getItem("graphQl_jwt_token");

export const intialState = {
  user: null,
  isDarkMode: false,
};

if (token) {
  const decodedToken = jwt_decode(token);
  decodedToken.exp * 1000 < Date.now()
    ? localStorage.removeItem("graphQl_jwt_token")
    : (intialState.user = decodedToken);
}

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_DARK_MODE:
      return { ...state, isDarkMode: action.payload };
    default:
      return state;
  }
};

export default reducer;
