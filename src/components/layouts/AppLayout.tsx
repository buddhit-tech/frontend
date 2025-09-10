import type { FC, PropsWithChildren } from "react";
import Sidebar from "./Sidebar";
import useAuth from "../../hooks/useAuth";
import useLayout from "../../hooks/useLayout";
import clsx from "clsx";

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const { darkMode } = useLayout();
  return (
    <main
      className={clsx(
        "h-[100vh] w-[100vw] flex",
        darkMode === "dark" ? "bg-[#212121]" : "bg-[#f9f9f9]"
      )}
    >
      {isLoggedIn && <Sidebar />}
      <div className="flex-1">{children}</div>
    </main>
  );
};

export default AppLayout;
