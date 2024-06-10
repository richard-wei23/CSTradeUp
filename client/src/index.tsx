import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import App from "./App";

const main: HTMLElement|null = document.getElementById('root');
if (main === null)
  throw new Error("Uh oh! HTML is missing 'root' element");
const root = createRoot(main);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);