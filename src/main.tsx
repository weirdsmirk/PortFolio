import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./app/App.tsx";
import "./styles/index.css";
import { initSecurity } from "./security";

// Initialize anti-theft and DevTools protections
initSecurity();

if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

if (window.location.pathname === "/") {
  window.scrollTo(0, 0);
  if (window.location.hash) {
    window.history.replaceState(null, "", window.location.pathname);
  }
}

const root = document.getElementById("root");

if (!root) {
  throw new Error("Application root was not found.");
}

createRoot(root).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);

