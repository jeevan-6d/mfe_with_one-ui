import React from "react";
// import ReactDOM from "react-dom/client";
import { render } from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import { createRoot } from "react-dom/client";

const root = document.getElementById("root");
// const root = ReactDOM.createRoot(document.getElementById("root"));
render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  root
);

reportWebVitals();
