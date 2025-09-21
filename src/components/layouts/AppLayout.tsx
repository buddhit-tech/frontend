import type { FC, PropsWithChildren } from "react";
import Sidebar from "./Sidebar";
import useAuth from "../../hooks/useAuth";
import useLayout from "../../hooks/useLayout";
import clsx from "clsx";
import useEventBus from "../../hooks/useEventBus";
import ClassRoomSidebar from "./classRoomSidebar";
import { useToggle } from "usehooks-ts";

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const { darkMode } = useLayout();
  const [isClassRoomSidebarOpen, _, setValue] = useToggle(false);

  useEventBus("teacherAction", (event: { action: string; data?: any }) => {
    switch (event.action) {
      case "optionClicked":
        console.log("Teacher clicked info for:", event.data?.chatId);
        setValue(true);
        break;
      default:
        console.log("Unknown teacher action:", event.action);
    }
  });

  return (
    <main
      className={clsx(
        "h-[100vh] w-full max-w-full overflow-x-hidden flex theme-transition",
        darkMode === "dark" ? "bg-[#212121]" : "bg-[#f9f9f9]"
      )}
    >
      {isLoggedIn && <Sidebar />}
      <div className="flex-1 flex items-stretch relative min-w-0 theme-transition">
        {isClassRoomSidebarOpen && <ClassRoomSidebar />}
        <div className="flex-1 min-w-0 h-full overflow-y-auto overflow-x-hidden theme-transition">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AppLayout;
