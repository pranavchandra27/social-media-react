import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { Menu, Brightness4, Home } from "@material-ui/icons";
import { useLocation, Link } from "react-router-dom";
import { useData } from "../provider";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  themeButton: {
    marginLeft: theme.spacing(2),
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const {
    state: { user },
    logoutUser,
    setDarkMode,
  } = useData();
  const { pathname } = useLocation();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link to="/">
              <IconButton color="inherit">
                <Home />
              </IconButton>
            </Link>
          </Typography>
          {!user ? (
            <Link to={pathname === "/signin" ? "/signup" : "/signin"}>
              <Button color="inherit">
                {pathname === "/signin" ? "Sign up" : "Sign in"}
              </Button>
            </Link>
          ) : (
            <Button onClick={logoutUser} color="inherit">
              Sign out
            </Button>
          )}
          <Tooltip title="Toggle Dark/Light Theme">
            <IconButton
              className={classes.themeButton}
              edge="end"
              color="inherit"
              aria-label="toggle theme"
              onClick={setDarkMode}
            >
              <Brightness4 />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
