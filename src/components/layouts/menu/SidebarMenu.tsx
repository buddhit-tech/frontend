import { type FC, useEffect, useMemo } from "react";
import { Menu } from "antd";
import clsx from "clsx";
import useLayout from "../../../hooks/useLayout";
import { DefaultMenuItems } from "./menuData.tsx";
import SidebarMenuItemWithFixedOption from "./SidebarMenuItemWithFixedOption";
import DeleteableMenuItem from "./DeleteableMenuItem";
import { v4 } from "uuid";
import { eventBus } from "../../../utils/eventBus.ts";
import useChat from "../../../hooks/useChat.tsx";
import useAuth from "../../../hooks/useAuth.tsx";
import { AccessType } from "../../../contexts/Auth/types.ts";

const injectMenuStyles = () => {
  const styleId = "custom-menu-styles";
  if (document.getElementById(styleId)) return;

  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    .custom-menu-light.ant-menu-light {
      background-color: #f9f9f9 !important;
      transition: background-color 0.3s ease !important;
    }
    .custom-menu-light.ant-menu-light .ant-menu-item {
      background-color: #f9f9f9 !important;
      transition: background-color 0.3s ease, color 0.3s ease !important;
    }
    .custom-menu-light.ant-menu-light .ant-menu-submenu {
      background-color: #f9f9f9 !important;
      transition: background-color 0.3s ease, color 0.3s ease !important;
    }
    .custom-menu-light.ant-menu-light .ant-menu-sub {
      background-color: #f9f9f9 !important;
      transition: background-color 0.3s ease !important;
    }
    .custom-menu-light.ant-menu-light .ant-menu-submenu-title {
      background-color: #f9f9f9 !important;
      transition: background-color 0.3s ease, color 0.3s ease !important;
    }
    
    .custom-menu-dark.ant-menu-dark {
      background-color: #19181a !important;
      transition: background-color 0.3s ease !important;
    }
    .custom-menu-dark.ant-menu-dark .ant-menu-item {
      background-color: #19181a !important;
      transition: background-color 0.3s ease, color 0.3s ease !important;
    }
    .custom-menu-dark.ant-menu-dark .ant-menu-submenu {
      background-color: #19181a !important;
      transition: background-color 0.3s ease, color 0.3s ease !important;
    }
    .custom-menu-dark.ant-menu-dark .ant-menu-sub {
      background-color: #19181a !important;
      transition: background-color 0.3s ease !important;
    }
    .custom-menu-dark.ant-menu-dark .ant-menu-submenu-title {
      background-color: #19181a !important;
      transition: background-color 0.3s ease, color 0.3s ease !important;
    }
    .custom-menu-dark.ant-menu-dark .ant-menu-item-selected {
      background-color: #19181a !important;
      transition: background-color 0.3s ease, color 0.3s ease !important;
    }
    .custom-menu-dark.ant-menu-dark .ant-menu-submenu-selected {
      background-color: #19181a !important;
      transition: background-color 0.3s ease, color 0.3s ease !important;
    }
    .custom-menu-dark.ant-menu-dark .ant-menu-submenu-open {
      background-color: #19181a !important;
      transition: background-color 0.3s ease, color 0.3s ease !important;
    }
  `;
  document.head.appendChild(style);
};

interface SidebarMenuProps {
  collapsed: boolean;
}

const SidebarMenu: FC<SidebarMenuProps> = ({ collapsed }) => {
  const { user } = useAuth();
  const { darkMode } = useLayout();
  const { updateActiveChatRoom } = useChat();

  useEffect(() => {
    injectMenuStyles();
  }, []);

  const handleOptionClick = (chatRoomId: string) => {
    if (user?.accessType === AccessType.TEACHER) {
      eventBus.emit("teacherAction", {
        action: "optionClicked",
        data: { chatRoomId, userType: user?.accessType },
      });
      updateActiveChatRoom(chatRoomId);
    } else {
      // Just open the specific chat of the user with the teacher
    }
  };

  const menuItems = useMemo(() => {
    return DefaultMenuItems.map((item: any) => {
      if (item.children) {
        return {
          ...item,
          children: item.children.map((child: any) => {
            if (child.isDeletable) {
              return {
                ...child,
                label: <DeleteableMenuItem label={child.label} />,
              };
            } else if (child.hasOptions) {
              return {
                ...child,
                chatRoomId: v4(),
                label: <SidebarMenuItemWithFixedOption label={child.label} />,
              };
            }
            return child;
          }),
        };
      }
      return item;
    });
  }, []);

  const handleMenuClick = ({ item }: any) => {
    handleOptionClick(item?.props?.chatRoomId ?? "");
  };

  return (
    <Menu
      mode="inline"
      theme={darkMode}
      inlineCollapsed={collapsed}
      items={menuItems}
      onClick={handleMenuClick}
      defaultOpenKeys={["sub1"]}
      defaultSelectedKeys={["1"]}
      className={clsx(
        "flex-1 border-0 [&_.ant-menu]:border-0 [&_.ant-menu-inline]:border-0 transition-all duration-200 ease-in-out",
        collapsed ? "w-[80px]" : "w-[256px]",
        darkMode === "dark" ? "custom-menu-dark" : "custom-menu-light"
      )}
    />
  );
};

export default SidebarMenu;
