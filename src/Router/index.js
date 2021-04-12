import { Switch, Route, Redirect, useLocation } from "react-router-dom";

import { Login, Home, Signup } from "../screens";
import { Layout, PrivateRoute } from "../components";
import { useData } from "../provider";
import { AnimatePresence } from "framer-motion";

const Router = () => {
  const {
    state: { user },
  } = useData();
  const location = useLocation();

  const redirect = (Component) => {
    return !user ? <Component /> : <Redirect to="/" />;
  };

  return (
    <Layout>
      <AnimatePresence exitBeforeEnter initial={false}>
        <Switch key={location.key} location={location}>
          <PrivateRoute exact path="/">
            <Home />
          </PrivateRoute>
          <Route exact path="/signin" render={() => redirect(Login)} />
          <Route exact path="/signup" render={() => redirect(Signup)} />
        </Switch>
      </AnimatePresence>
    </Layout>
  );
};

export default Router;
