import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Proivder } from "./provider";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Proivder>
        <App />
      </Proivder>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
