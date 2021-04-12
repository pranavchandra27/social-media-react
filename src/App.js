import Router from "./Router";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  HttpLink,
  concat,
} from "@apollo/client";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { useData } from "./provider";
import { Toast } from "./components";

const httpLink = new HttpLink({ uri: "http://localhost:4000" });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      Authorization:
        `Bearer ${localStorage.getItem("graphQl_jwt_token")}` || "",
    },
  });

  return forward(operation);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});

function App() {
  const {
    state: { isDarkMode },
    snackbar,
  } = useData();

  const theme = createMuiTheme({
    palette: {
      type: isDarkMode ? "dark" : "light",
    },
  });

  return (
    <>
      {snackbar.open && snackbar.msg && <Toast />}
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <Router />
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
