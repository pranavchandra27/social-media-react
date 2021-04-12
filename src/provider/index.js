import { useReducer, useContext, createContext, useState } from "react";
import { SET_USER, SET_DARK_MODE } from "./actionTypes";
import reducer, { intialState } from "./reducer";

const StateContext = createContext();

export const Proivder = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intialState);
  const [snackbar, setSnackbar] = useState({
    msg: null,
    type: null,
    open: false,
  });

  const loginUser = (data) => {
    localStorage.setItem("graphQl_jwt_token", data.token);
    dispatch({
      type: SET_USER,
      payload: data,
    });
  };

  const logoutUser = () => {
    localStorage.removeItem("graphQl_jwt_token");
    dispatch({
      type: SET_USER,
      payload: null,
    });
  };

  const setDarkMode = () => {
    const { isDarkMode } = state;
    dispatch({
      type: SET_DARK_MODE,
      payload: !isDarkMode,
    });
  };

  const openSnackbar = (msg, type, open) => {
    setSnackbar({ msg, type, open });
  };

  const providerValues = {
    state,
    dispatch,
    loginUser,
    logoutUser,
    setDarkMode,
    snackbar,
    setSnackbar,
    openSnackbar,
  };

  return (
    <StateContext.Provider value={providerValues}>
      {children}
    </StateContext.Provider>
  );
};

export const useData = () => useContext(StateContext);
