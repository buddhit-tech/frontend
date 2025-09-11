export const themeConfig = {
  colors: {
    light: {
      background: {
        primary: "#ffffff",
        secondary: "#f9f9f9",
        tertiary: "#f3f4f6",
        overlay: "rgba(255, 255, 255, 0.95)",
      },
      text: {
        primary: "#1f2937",
        secondary: "#6b7280",
        tertiary: "#9ca3af",
        danger: "#dc2626",
      },
      border: {
        primary: "#e5e7eb",
        secondary: "#d1d5db",
        tertiary: "#9ca3af",
      },
      hover: {
        primary: "rgba(0, 0, 0, 0.05)",
        secondary: "rgba(0, 0, 0, 0.1)",
        danger: "rgba(220, 38, 38, 0.1)",
      },
    },
    dark: {
      background: {
        primary: "#1f2937",
        secondary: "#111827",
        tertiary: "#0f172a",
        overlay: "rgba(31, 41, 55, 0.95)",
      },
      text: {
        primary: "#f9fafb",
        secondary: "#d1d5db",
        tertiary: "#9ca3af",
        danger: "#f87171",
      },
      border: {
        primary: "#374151",
        secondary: "#4b5563",
        tertiary: "#6b7280",
      },
      hover: {
        primary: "rgba(255, 255, 255, 0.1)",
        secondary: "rgba(255, 255, 255, 0.15)",
        danger: "rgba(248, 113, 113, 0.2)",
      },
    },
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.5rem",
    "2xl": "2rem",
  },
  borderRadius: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
  },
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
} as const;

export type ThemeMode = "light" | "dark";
export type ThemeColors = typeof themeConfig.colors.light;
