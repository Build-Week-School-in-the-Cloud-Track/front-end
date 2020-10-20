import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";

ReactDOM.render(
  <Router>
    <App />
  </Router>
  ,document.getElementById("root")
);
