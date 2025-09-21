import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./App.tsx";
import LayoutProvider from "./contexts/Layout/LayoutProvider.tsx";
import AuthProvider from "./contexts/Auth/AuthProvider.tsx";
import ChatProvider from "./contexts/Chat/ChatProvider.tsx";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

// Add theme transition class to root element and body for smooth theme switching
const rootElement = document.getElementById("root")!;
rootElement.classList.add("theme-transition");
document.body.classList.add("theme-transition");
document.documentElement.classList.add("theme-transition");

createRoot(rootElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LayoutProvider>
          <ChatProvider>
            <App />
          </ChatProvider>
        </LayoutProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
