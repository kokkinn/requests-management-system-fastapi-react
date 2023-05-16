import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./contexts/authContext";
import { LoaderContextProvider } from "./contexts/loaderContext";
import { RefreshContextProvider } from "./contexts/refreshContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter basename="/">
    <LoaderContextProvider>
      <AuthContextProvider>
        <RefreshContextProvider>
          <App />
        </RefreshContextProvider>
      </AuthContextProvider>
    </LoaderContextProvider>
  </BrowserRouter>
);
