import type { FC } from "react";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import useLayout from "../../../hooks/useLayout";

const SidebarToggleButton: FC = () => {
  const { toggleCollapse, collapsed, darkMode } = useLayout();

  const Icon = collapsed ? CaretRightIcon : CaretLeftIcon;
  const isDark = darkMode === "dark";

  return (
    <div
      onClick={toggleCollapse}
      className={clsx(
        "absolute h-[70px] w-[20px] top-[50%] translate-y-[-50%] right-[-18px] z-[30] cursor-pointer",
        "rounded-tr-[15px] rounded-br-[15px]",
        "border-l-0 border-solid border-[1px]",
        "flex items-center justify-center",
        isDark
          ? "bg-[#19181a] hover:bg-[#2a2930]"
          : "bg-[#f9f9f9] hover:bg-[#e9e9e9]",
        isDark ? "border-[#19181a]" : "border-[#D2D5D9]"
      )}
    >
      <Icon size={28} weight="fill" color={isDark ? "#f5f5f5" : "#262626"} />
    </div>
  );
};

export default SidebarToggleButton;
