import type { MenuTheme } from "antd";

export type LayoutContextType = {
  darkMode: MenuTheme;
  collapsed: boolean;
  toggleCollapse: () => void;
  toggleMode: (value: boolean) => void;
};
