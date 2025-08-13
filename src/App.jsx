import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";

const root = document.getElementById("root");


export default function App() {

  return (
    <BrowserRouter>

      <AppRoutes />

    </BrowserRouter>
  )
}
