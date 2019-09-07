import React from "react";
import ReactDOM from "react-dom";
import "normalize.css";
import { ThemeProvider } from "styled-components";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const theme = {
  "color-primary": "#476B7F",
  "color-secondary": "#EEFFCC"
}; // https://www.styled-components.com/docs/advanced#the-theme-prop

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
