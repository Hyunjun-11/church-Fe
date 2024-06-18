import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ReactModal from "react-modal";
import store from "./Store/store";
import App from "./App";
import "./index.css";

// 모달이 속한 앱의 루트 DOM 요소를 지정
ReactModal.setAppElement("#root");

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
