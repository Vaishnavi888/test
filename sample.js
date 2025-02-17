// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Ensure the path matches your file structure

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
