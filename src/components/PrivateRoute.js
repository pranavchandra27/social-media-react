import { Route, Redirect } from "react-router-dom";
import { useData } from "../provider";

const PrivateRoute = ({ children, ...rest }) => {
  const {
    state: { user },
  } = useData();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
