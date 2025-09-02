import { useState, type FC, type PropsWithChildren } from "react";
import LayoutContext from "./context";
import type { MenuTheme } from "antd";

const LayoutProvider: FC<PropsWithChildren> = ({ children }) => {
  const [darkMode, setTheme] = useState<MenuTheme>("dark");
  const [collapsed, setCollapsed] = useState<boolean>(false);
  3;

  const toggleMode = (value: boolean) => {
    setTheme(value ? "dark" : "light");
  };

  const toggleCollapse = () => setCollapsed(!collapsed);

  return (
    <LayoutContext.Provider
      value={{
        collapsed,
        darkMode,
        toggleMode,
        toggleCollapse,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;
