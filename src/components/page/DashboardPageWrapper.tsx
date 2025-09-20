import type { FC, PropsWithChildren } from "react";
import PageHeader from "../../components/page/PageHeader";
import useLayout from "../../hooks/useLayout";
import clsx from "clsx";
import ChatHeader from "./ChatHeader";

type DashboardPageWrapperProps = PropsWithChildren & {
  title: string;
  subtitle?: string;
  showHeader?: boolean;
  isChatHeader?: boolean;
};

const DashboardPageWrapper: FC<DashboardPageWrapperProps> = ({
  children,
  showHeader = false,
  isChatHeader = false,
  ...restProps
}) => {
  const { darkMode } = useLayout();
  const isDark = darkMode === "dark";

  return (
    <div className="flex flex-col h-[100vh]">
      {showHeader && <PageHeader {...restProps} />}
      {isChatHeader && <ChatHeader {...restProps} />}
      <div
        className={clsx(
          "flex-1 overflow-y-auto py-8 px-5",
          isDark ? "bg-[#212121]" : "bg-[#fff]"
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default DashboardPageWrapper;
