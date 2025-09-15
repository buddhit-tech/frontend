import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import LayoutProvider from "./contexts/Layout/LayoutProvider.tsx";
import AuthProvider from "./contexts/Auth/AuthProvider.tsx";
import ChatProvider from "./contexts/Chat/ChatProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <LayoutProvider>
        <ChatProvider>
          <App />
        </ChatProvider>
      </LayoutProvider>
    </AuthProvider>
  </StrictMode>
);
