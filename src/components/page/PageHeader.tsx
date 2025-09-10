import { Typography } from "antd";
import type { FC } from "react";
import clsx from "clsx";
import useLayout from "../../hooks/useLayout";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
};

const PageHeader: FC<PageHeaderProps> = ({ title, subtitle }) => {
  const { darkMode } = useLayout();
  const isDark = darkMode === "dark";

  return (
    <nav
      className={clsx(
        "w-full h-[75px] border-b flex items-center justify-between shadow-sm px-8 transition-colors duration-200 ease-in-out",
        isDark ? "border-[#303030] bg-[#212121]" : "border-[#f0f0f0] bg-[#fff]"
      )}
    >
      <div className="flex flex-col gap-[1px]">
        <Typography.Text className="m-0 p-0">
          <span
            className={clsx(
              "text-2xl transition-colors duration-200 ease-in-out",
              isDark ? "text-white" : "text-[#19181a]"
            )}
          >
            {title}
          </span>
        </Typography.Text>
        {subtitle && (
          <Typography.Text className="m-0 p-0">
            <span
              className={clsx(
                "transition-colors duration-200 ease-in-out",
                isDark ? "text-[#8c8c8c]" : "text-[#464A56]"
              )}
            >
              {subtitle}
            </span>
          </Typography.Text>
        )}
      </div>
    </nav>
  );
};

export default PageHeader;
