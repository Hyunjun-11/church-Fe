import ReactDOM from "react-dom/client";
import Modal from "react-modal";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

// 모달이 속한 앱의 루트 DOM 요소를 지정
import ReactModal from "react-modal";
ReactModal.setAppElement("#root");
// 최상위 컴포넌트 렌더링
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
