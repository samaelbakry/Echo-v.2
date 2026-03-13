import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "./index.css";
import App from "./App.tsx";
import TokenContextProvider from "./context/TokenContextProvider.tsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ThemeContextProvider from "./context/themeContextProvider.tsx";

const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TokenContextProvider>
      <ThemeContextProvider>
      <QueryClientProvider client={queryClient}>
      <App />
      </QueryClientProvider>
     </ThemeContextProvider>
      <ToastContainer />
    </TokenContextProvider>
  </StrictMode>,
);
