/**
 * @fileoverview Main entry point for the TL;DR React application
 * Sets up the React application with StrictMode for development checks
 */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

/**
 * Initialize and render the React application
 * Uses React 18's createRoot API for improved concurrent features
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
