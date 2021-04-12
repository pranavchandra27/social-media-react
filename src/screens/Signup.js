import React from "react";
import {
  makeStyles,
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { Lock } from "@material-ui/icons";
import { gql, useMutation } from "@apollo/client";
import { useFormik } from "formik";
import * as yup from "yup";

import { useData } from "../provider";

const useStyles = makeStyles((theme) => ({
  avatarBg: { background: theme.palette.text.secondary },
  text: { color: theme.palette.text.primary },
}));

const REGISTER_USER = gql`
  mutation register(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    register(
      registerInput: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
      }
    ) {
      firstName
      lastName
      email
      token
    }
  }
`;

const validationSchema = yup.object({
  firstName: yup.string("Enter first name").required("First name is required"),
  lastName: yup.string("Enter last name").required("Last name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Signup = () => {
  const classes = useStyles();
  const { loginUser, openSnackbar } = useData();
  const [register, { loading, error }] = useMutation(REGISTER_USER);

  // Handle Submit
  const handleSubmit = async (values) => {
    await register({
      variables: values,
    })
      .then((res) => {
        loginUser(res.data.register);
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
        <Grid item xs={12} sm={2} md={4}></Grid>
        <Grid item xs={12} sm={8} md={4}>
          <Box flexDirection="column" marginTop={10}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Avatar className={classes.avatarBg}>
                <Lock />
              </Avatar>
              <Typography className={classes.text} variant="h5" component="h2">
                Sign up
              </Typography>
            </Box>
            <form onSubmit={formik.handleSubmit} autoComplete="off" noValidate>
              <Box marginY={3}>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={6} md={6}>
                    <TextField
                      required
                      fullWidth
                      name="firstName"
                      variant="outlined"
                      size="small"
                      label="First Name"
                      onChange={formik.handleChange}
                      value={formik.values.firstName}
                      error={
                        formik.touched.firstName &&
                        Boolean(formik.errors.firstName)
                      }
                      helperText={
                        formik.touched.firstName && formik.errors.firstName
                      }
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6}>
                    <TextField
                      required
                      fullWidth
                      name="lastName"
                      variant="outlined"
                      size="small"
                      label="Last Name"
                      onChange={formik.handleChange}
                      value={formik.values.lastName}
                      error={
                        formik.touched.lastName &&
                        Boolean(formik.errors.lastName)
                      }
                      helperText={
                        formik.touched.lastName && formik.errors.lastName
                      }
                    />
                  </Grid>
                </Grid>
              </Box>
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
              <Box marginY={3}>
                <Button
                  disabled={loading}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  {loading ? <CircularProgress size={22} /> : "Sign up"}
                </Button>
              </Box>
            </form>
          </Box>
        </Grid>
        <Grid item xs={12} sm={2} md={4}></Grid>
      </Grid>
    </Box>
  );
};

export default Signup;
