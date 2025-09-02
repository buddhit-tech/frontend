import type { FC, PropsWithChildren } from "react";
import Sidebar from "./Sidebar";
import useAuth from "../../hooks/useAuth";

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return (
    <main className="h-[100vh] w-[100vw] flex">
      {isLoggedIn && <Sidebar />}
      <div className="flex-1">{children}</div>
    </main>
  );
};

export default AppLayout;
