import { Typography } from "antd";
import type { FC, ReactNode } from "react";
import clsx from "clsx";

type HeaderTitleProps = {
  title: ReactNode;
  subtitle?: string;
  isDark: boolean;
  titleSizeClass?: string;
};

const HeaderTitle: FC<HeaderTitleProps> = ({
  title,
  subtitle,
  isDark,
  titleSizeClass = "text-xl",
}) => {
  return (
    <div className="flex flex-col gap-[1px]">
      <div className="flex items-center gap-2">
        <Typography.Text className="m-0 p-0">
          <span
            className={clsx(
              titleSizeClass,
              "transition-colors duration-200 ease-in-out",
              isDark ? "text-white" : "text-[#19181a]"
            )}
          >
            {title}
          </span>
        </Typography.Text>
      </div>
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
  );
};

export default HeaderTitle;
