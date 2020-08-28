import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux'
import Routes from "./Routes";
import "./index.css";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById("root")
);
