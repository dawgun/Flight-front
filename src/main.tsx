import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./components/Layout/Layout.tsx";
import "@fontsource/roboto";
import "./styles/globalStyle.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Layout />
  </React.StrictMode>
);
