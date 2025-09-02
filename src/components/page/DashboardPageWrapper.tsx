import type { FC, PropsWithChildren } from "react";
import PageHeader from "../../components/page/PageHeader";

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
  return (
    <div className="flex flex-col h-[100vh]">
      {showHeader && <PageHeader {...restProps} />}
      <div className="flex-1 overflow-y-auto px-8 py-8 bg-[#f6f6f6]">
        {children}
      </div>
    </div>
  );
};

export default DashboardPageWrapper;
