import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import LayoutProvider from "./contexts/Layout/LayoutProvider.tsx";
import AuthProvider from "./contexts/Auth/AuthProvider.tsx";
import ChatProvider from "./contexts/Chat/ChatProvider.tsx";

// Add theme transition class to root element for smooth theme switching
const rootElement = document.getElementById("root")!;
rootElement.classList.add("theme-transition");

createRoot(rootElement).render(
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
