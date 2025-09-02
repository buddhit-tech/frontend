import { Typography } from "antd";
import type { FC } from "react";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
};

const PageHeader: FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <nav className="w-full h-[75px] border-b border-gray-200 flex items-center justify-between shadow-sm px-8">
      <div className="flex flex-col gap-[1px]">
        <Typography.Text className="m-0 p-0">
          <span className="text-[#19181a] text-2xl">{title}</span>
        </Typography.Text>
        {subtitle && (
          <Typography.Text className="m-0 p-0">
            <span className="text-[#464A56]">{subtitle}</span>
          </Typography.Text>
        )}
      </div>
    </nav>
  );
};

export default PageHeader;
