import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

const main: HTMLElement | null = document.getElementById('root');
if (main === null)
  throw new Error("Uh oh! HTML is missing 'root' element");
const root = createRoot(main);
root.render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
);