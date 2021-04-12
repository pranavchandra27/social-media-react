import React from "react";
import { Alert } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";

import { useData } from "../provider";

const Toast = () => {
  const { snackbar, setSnackbar } = useData();

  const closeSnackbar = () => {
    setSnackbar({ msg: null, type: null, open: false });
  };

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={4000}
      onClose={closeSnackbar}
    >
      <Alert
        onClose={closeSnackbar}
        elevation={5}
        variant="filled"
        severity={snackbar.type}
      >
        {snackbar.msg}
      </Alert>
    </Snackbar>
  );
};
export default Toast;
