import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "./index.css";
import App from "./App.tsx";
import TokenContextProvider from "./context/TokenContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TokenContextProvider>
      <App />
      <ToastContainer />
    </TokenContextProvider>
  </StrictMode>,
);
