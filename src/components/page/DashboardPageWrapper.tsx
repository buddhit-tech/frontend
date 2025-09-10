import type { FC, PropsWithChildren } from "react";
import PageHeader from "../../components/page/PageHeader";
import useLayout from "../../hooks/useLayout";
import clsx from "clsx";

type DashboardPageWrapperProps = PropsWithChildren & {
  title: string;
  subtitle?: string;
  showHeader?: boolean;
};

const DashboardPageWrapper: FC<DashboardPageWrapperProps> = ({
  children,
  showHeader = false,
  ...restProps
}) => {
  const { darkMode } = useLayout();
  const isDark = darkMode === "dark";

  return (
    <div className="flex flex-col h-[100vh]">
      {showHeader && <PageHeader {...restProps} />}
      <div
        className={clsx(
          "flex-1 overflow-y-auto py-8",
          isDark ? "bg-[#212121]" : "bg-[#fff]"
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default DashboardPageWrapper;
