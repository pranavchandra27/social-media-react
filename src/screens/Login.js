import React from "react";
import { gql, useMutation } from "@apollo/client";
import {
  Avatar,
  Box,
  Button,
  Grid,
  CircularProgress,
  TextField,
  Typography,
  makeStyles,
  Switch,
  FormControlLabel,
} from "@material-ui/core";
import { Lock } from "@material-ui/icons";
import { useFormik } from "formik";
import * as yup from "yup";

import { useData } from "../provider";

const useStyles = makeStyles((theme) => ({
  avatarBg: { background: theme.palette.text.secondary },
  text: { color: theme.palette.text.primary },
}));

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      firstName
      lastName
      email
      token
    }
  }
`;

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string("Enter your password").required("Password is required"),
});

const Login = () => {
  const classes = useStyles();
  const { loginUser, openSnackbar } = useData();
  const [login, { loading, error }] = useMutation(LOGIN_USER);

  const handleSubmit = async (values) => {
    await login({
      variables: values,
    })
      .then((res) => {
        loginUser(res.data.login);
      })
      .catch(() => {
        openSnackbar(error.message, "error", true);
      });
  };

  const formik = useFormik({
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  return (
    <Box>
      <Grid container>
        <Grid item xs={12} sm={3} md={4}></Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box flexDirection="column" marginTop={10}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Avatar className={classes.avatarBg}>
                <Lock />
              </Avatar>
              <Typography variant="h5" className={classes.text}>
                Sign in
              </Typography>
            </Box>
            <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
              <Box marginY={3}>
                <TextField
                  fullWidth
                  required
                  variant="outlined"
                  size="small"
                  type="email"
                  name="email"
                  label="Email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Box>
              <Box marginY={3}>
                <TextField
                  fullWidth
                  required
                  variant="outlined"
                  size="small"
                  type="password"
                  name="password"
                  label="Password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Box>
              <Box>
                <FormControlLabel
                  className={classes.text}
                  label="Remeber Me"
                  control={<Switch />}
                />
              </Box>
              <Box marginY={3}>
                <Button
                  disabled={loading}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  {loading ? <CircularProgress size={22} /> : "Sign in"}
                </Button>
              </Box>
            </form>
          </Box>
        </Grid>
        <Grid item xs={12} sm={3} md={4}></Grid>
      </Grid>
    </Box>
  );
};

export default Login;
