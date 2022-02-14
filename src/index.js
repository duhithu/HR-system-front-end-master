import React from "react";
import ReactDOM from "react-dom";
import Main from "./Entryfile/Main";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers/rootReducer";
import axios from "axios";

const store = createStore(rootReducer);
// axios.defaults.baseURL = "http://localhost:8000/api/";
axios.defaults.withCredentials = true;
ReactDOM.render(<Provider store={store}><Main /></Provider>, document.getElementById("app"));

if (module.hot) {
  // enables hot module replacement if plugin is installed
  module.hot.accept();
}
