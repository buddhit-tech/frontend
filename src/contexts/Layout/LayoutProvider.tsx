import { useMemo, type FC, type PropsWithChildren } from "react";
import { useLocalStorage } from "usehooks-ts";
import { ConfigProvider } from "antd";
import type { MenuTheme, ThemeConfig } from "antd";
import LayoutContext from "./context";
import createAntdTheme from "../../styles/antdTheme";

const LayoutProvider: FC<PropsWithChildren> = ({ children }) => {
  const [darkMode, setTheme] = useLocalStorage<MenuTheme>(
    "layout:theme",
    "dark"
  );
  const [collapsed, setCollapsed] = useLocalStorage<boolean>(
    "layout:collapsed",
    false
  );

  const toggleMode = (value: boolean) => {
    setTheme(value ? "dark" : "light");
  };

  const isDark = useMemo<boolean>(() => darkMode === "dark", [darkMode]);

  const textColor = useMemo<string>(
    () => (isDark ? "text-white" : "text-[#19181a]"),
    [isDark]
  );

  const bgColor = useMemo<string>(
    () => (isDark ? "#202020" : "#f3f4f6"),
    [isDark]
  );

  const toggleCollapse = () => setCollapsed(!collapsed);

  const antdTheme = useMemo<ThemeConfig>(() => {
    return createAntdTheme(isDark);
  }, [isDark]);

  return (
    <LayoutContext.Provider
      value={{
        isDark,
        darkMode,
        collapsed,
        toggleMode,
        toggleCollapse,
        textColor,
        bgColor,
      }}
    >
      <ConfigProvider theme={antdTheme}>{children}</ConfigProvider>
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;
