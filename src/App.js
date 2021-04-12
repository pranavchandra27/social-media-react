import Router from "./Router";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { useData } from "./provider";
import { Toast } from "./components";

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
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
