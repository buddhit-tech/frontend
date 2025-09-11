import { type FC, type ReactNode } from "react";
import { SettingOutlined, LogoutOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  ChatCircleDotsIcon,
  DotsThreeVerticalIcon,
  NotebookIcon,
} from "@phosphor-icons/react";
import clsx from "clsx";
import useLayout from "../../../hooks/useLayout";
import ThemeAwareDropdown from "../../common/ThemeAwareDropdown";

interface SidebarMenuItemWithFixedOptionProps {
  label: string;
  icon?: ReactNode;
}

const SidebarMenuItemWithFixedOption: FC<
  SidebarMenuItemWithFixedOptionProps
> = ({ label, icon }) => {
  const { darkMode } = useLayout();

  const menuItems: MenuProps["items"] = [
    {
      key: "edit",
      label: "Edit",
      icon: <SettingOutlined />,
    },
    {
      key: "duplicate",
      label: "Duplicate",
      icon: <ChatCircleDotsIcon size={14} weight="bold" />,
    },
    {
      key: "rename",
      label: "Rename",
      icon: <NotebookIcon size={14} weight="bold" />,
    },
    {
      type: "divider",
    },
    {
      key: "delete",
      label: "Delete",
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    switch (key) {
      case "edit":
        console.log("Edit clicked for:", label);
        break;
      case "duplicate":
        console.log("Duplicate clicked for:", label);
        break;
      case "rename":
        console.log("Rename clicked for:", label);
        break;
      case "delete":
        console.log("Delete clicked for:", label);
        break;
    }
  };

  return (
    <div className="flex items-center justify-between">
      {icon && icon}
      <span>{label}</span>
      <ThemeAwareDropdown
        menuItems={menuItems}
        onMenuClick={handleMenuClick}
        placement="bottomRight"
        minWidth="180px"
        maxWidth="200px"
      >
        <div
          className={clsx(
            "p-1 flex items-center justify-center rounded transition-all duration-200 ease-in-out cursor-pointer",
            darkMode === "dark"
              ? "hover:bg-[#212121] hover:bg-opacity-15"
              : "hover:bg-gray-200 hover:bg-opacity-50"
          )}
        >
          <DotsThreeVerticalIcon
            size={16}
            weight="bold"
            color={darkMode === "dark" ? "white" : "#177ddc"}
          />
        </div>
      </ThemeAwareDropdown>
    </div>
  );
};

export default SidebarMenuItemWithFixedOption;
