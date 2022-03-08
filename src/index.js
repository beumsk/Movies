import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import reduxStore from "./redux/store";
import App from "./App";

const store = reduxStore();

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff"
    },
    secondary: {
      main: "#000"
    },
    text: {
      primary: "#fff"
    }
  }
});

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ReduxProvider>
  </StrictMode>,
  rootElement
);
