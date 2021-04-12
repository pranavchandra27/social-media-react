import React from "react";
import { Navbar } from ".";
import { Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    minHeight: "100vh",
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <main className={classes.root}>
      <Navbar />
      <Container>{children}</Container>
    </main>
  );
};

export default Layout;
