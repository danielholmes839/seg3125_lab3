import { OrderProvider } from "context";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./css/custom.css";
import "./css/tailwind.css";

ReactDOM.render(
  <React.StrictMode>
    <OrderProvider>
      <App />
    </OrderProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
