import type { MenuTheme } from "antd";

export type LayoutContextType = {
  isDark: boolean;
  collapsed: boolean;
  darkMode: MenuTheme;
  bgColor: string;
  textColor: string;
  toggleCollapse: () => void;
  toggleMode: (value: boolean) => void;
};
