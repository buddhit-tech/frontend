import { type FC } from "react";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu, Dropdown, Avatar } from "antd";
import useLayout from "../../hooks/useLayout";
import {
  AtomIcon,
  CaretLeftIcon,
  CaretRightIcon,
  ChatCircleDotsIcon,
  DotsThreeVerticalIcon,
  InfinityIcon,
  MoonIcon,
  NotebookIcon,
  SunIcon,
} from "@phosphor-icons/react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const injectMenuStyles = () => {
  const styleId = "custom-menu-styles";
  if (document.getElementById(styleId)) return;

  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    .custom-menu-light.ant-menu-light {
      background-color: #f9f9f9 !important;
    }
    .custom-menu-light.ant-menu-light .ant-menu-item {
      background-color: #f9f9f9 !important;
    }
    .custom-menu-light.ant-menu-light .ant-menu-submenu {
      background-color: #f9f9f9 !important;
    }
    .custom-menu-light.ant-menu-light .ant-menu-sub {
      background-color: #f9f9f9 !important;
    }
    .custom-menu-light.ant-menu-light .ant-menu-submenu-title {
      background-color: #f9f9f9 !important;
    }
    
    .custom-menu-dark.ant-menu-dark {
      background-color: #19181a !important;
    }
    .custom-menu-dark.ant-menu-dark .ant-menu-item {
      background-color: #19181a !important;
    }
    .custom-menu-dark.ant-menu-dark .ant-menu-submenu {
      background-color: #19181a !important;
    }
    .custom-menu-dark.ant-menu-dark .ant-menu-sub {
      background-color: #19181a !important;
    }
    .custom-menu-dark.ant-menu-dark .ant-menu-submenu-title {
      background-color: #19181a !important;
    }
    .custom-menu-dark.ant-menu-dark .ant-menu-item-selected {
      background-color: #19181a !important;
    }
    .custom-menu-dark.ant-menu-dark .ant-menu-submenu-selected {
      background-color: #19181a !important;
    }
    .custom-menu-dark.ant-menu-dark .ant-menu-submenu-open {
      background-color: #19181a !important;
    }
  `;
  document.head.appendChild(style);
};

const DefaultMenuItems = [
  {
    key: "1.1",
    label: "New Chat",
    icon: <ChatCircleDotsIcon weight="bold" />,
  },
  {
    key: "1",
    label: "Discover",
    icon: <InfinityIcon weight="bold" />,
  },
  {
    key: "my_space",
    label: "My Space",
    icon: <AtomIcon weight="bold" />,
    children: [
      { key: "5", label: "Option 5" },
      { key: "6", label: "Option 6" },
      { key: "7", label: "Option 7" },
      { key: "8", label: "Option 8" },
    ],
  },
  {
    key: "my_subjects",
    label: "My Subjects",
    icon: <NotebookIcon weight="bold" />,
    children: [
      {
        key: "9",
        label: (
          <div className="flex items-center justify-between">
            <span>Option 9</span>
            <div className="p-1 flex items-center justify-center">
              <DotsThreeVerticalIcon size={16} weight="bold" />
            </div>
          </div>
        ),
      },
      {
        key: "10",
        label: (
          <div className="flex items-center justify-between">
            <span>Option 10</span>
            <div className="p-1 flex items-center justify-center">
              <DotsThreeVerticalIcon size={16} weight="bold" />
            </div>
          </div>
        ),
      },
    ],
  },
];

const BrandLogo: FC = () => {
  const { collapsed, darkMode } = useLayout();

  const imageUrl =
    "https://static.vecteezy.com/system/resources/previews/022/227/364/non_2x/openai-chatgpt-logo-icon-free-png.png";

  if (!collapsed) {
    return (
      <div
        className={clsx(
          "flex items-center justify-between p-2 transition-colors duration-200 ease-in-out",
          darkMode === "dark" ? "bg-[#19181a]" : "bg-[#f9f9f9]"
        )}
      >
        <div className="flex items-center gap-2">
          <img
            alt="Buddhit"
            className="w-8 h-8 shrink-0 object-contain"
            src={imageUrl}
          />
          <span
            className={clsx(
              "font-bold",
              darkMode === "dark" ? "text-white" : "text-[#262626]"
            )}
          >
            Buddhit
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "relative flex items-center justify-center h-10 p-2 transition-colors duration-200 ease-in-out",
        darkMode === "dark" ? "bg-[#19181a]" : "bg-[#f9f9f9]"
      )}
    >
      <img alt="Buddhit" src={imageUrl} className="w-10 h-10 object-contain" />
    </div>
  );
};

const UserProfile: FC = () => {
  const navigate = useNavigate();
  const { collapsed, darkMode, toggleMode } = useLayout();

  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
    },
    {
      key: "mode",
      icon: darkMode === "dark" ? <SunIcon /> : <MoonIcon />,
      label: darkMode === "dark" ? "Light Mode" : "Dark Mode",
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      danger: true,
    },
  ];

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    switch (key) {
      case "profile":
        navigate("/profile");
        break;
      case "settings":
        console.log("Settings clicked");
        break;
      case "mode":
        toggleMode(darkMode === "dark" ? false : true);
        break;
      case "logout":
        console.log("Logout clicked");
        break;
    }
  };

  if (collapsed) {
    return (
      <div
        className={clsx(
          "flex justify-center p-2 border-t border-r transition-all duration-200 ease-in-out",
          darkMode === "dark"
            ? "border-[#303030] bg-[#19181a]"
            : "border-[#f0f0f0] bg-[#f9f9f9]"
        )}
      >
        <Dropdown
          trigger={["click"]}
          placement="topRight"
          menu={{ items: userMenuItems, onClick: handleMenuClick }}
          overlayStyle={{ width: "256px" }}
        >
          <Avatar
            size={48}
            icon={<UserOutlined />}
            className={clsx(
              "cursor-pointer hover:opacity-80 transition-opacity",
              darkMode === "dark" ? "bg-[#177ddc]" : "bg-[#1890ff]"
            )}
          />
        </Dropdown>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "p-3 border-t border-r transition-all duration-200 ease-in-out",
        darkMode === "dark"
          ? "border-[#303030] bg-[#19181a]"
          : "border-[#f0f0f0] bg-[#f9f9f9]"
      )}
    >
      <Dropdown
        menu={{ items: userMenuItems, onClick: handleMenuClick }}
        placement="topRight"
        trigger={["click"]}
        overlayStyle={{ width: "256px" }}
      >
        <div
          className={clsx(
            "flex items-center gap-3 cursor-pointer rounded-lg p-2 transition-colors",
            darkMode === "dark"
              ? "hover:bg-[#177ddc] hover:bg-opacity-20"
              : "hover:bg-[#f5f5f5]"
          )}
        >
          <Avatar
            size={48}
            icon={<UserOutlined />}
            className={clsx(
              "shrink-0",
              darkMode === "dark" ? "bg-[#177ddc]" : "bg-[#1890ff]"
            )}
          />
          <div className="flex-1 min-w-0">
            <div
              className={clsx(
                "text-sm font-medium truncate",
                darkMode === "dark" ? "text-white" : "text-[#262626]"
              )}
            >
              John Doe
            </div>
            <div
              className={clsx(
                "text-xs truncate",
                darkMode === "dark" ? "text-[#8c8c8c]" : "text-[#595959]"
              )}
            >
              john.doe@example.com
            </div>
          </div>
        </div>
      </Dropdown>
    </div>
  );
};

const SidebarToggleButton: FC = () => {
  const { darkMode, toggleCollapse, collapsed } = useLayout();

  const Icon = collapsed ? CaretRightIcon : CaretLeftIcon;

  return (
    <div className="absolute top-[15px] right-[-12px] z-10">
      <div
        onClick={toggleCollapse}
        className={clsx(
          "h-[28px] w-[28px] rounded-full flex items-center justify-center cursor-pointer",
          "transition-all duration-200 ease-in-out transform hover:scale-110",
          "shadow-lg border backdrop-blur-sm",
          darkMode === "dark"
            ? "bg-[#177ddc] hover:bg-[#1e88e5] border-[#177ddc]/30 shadow-[#177ddc]/20"
            : "bg-white hover:bg-[#f8f9fa] border-[#e0e0e0] shadow-[#000000]/10"
        )}
      >
        <Icon
          size={16}
          weight="bold"
          color={darkMode === "dark" ? "white" : "#177ddc"}
          className="transition-transform duration-200 ease-in-out"
        />
      </div>
    </div>
  );
};

const Sidebar: FC = () => {
  const { collapsed, darkMode } = useLayout();

  useEffect(() => {
    injectMenuStyles();
  }, []);

  if (collapsed) {
    return (
      <div
        className={clsx(
          "relative w-[80px] h-[100vh] flex flex-col transition-all duration-200 ease-in-out",
          darkMode === "dark" ? "bg-[#212121]" : "bg-[#f9f9f9]"
        )}
      >
        <div
          className={clsx(
            "p-2 border-r transition-all duration-200 ease-in-out",
            darkMode === "dark"
              ? "border-[#303030] bg-[#19181a]"
              : "border-[#f0f0f0] bg-[#f9f9f9]"
          )}
        >
          <BrandLogo />
        </div>
        <Menu
          mode="inline"
          theme={darkMode}
          inlineCollapsed={true}
          items={DefaultMenuItems}
          defaultOpenKeys={["sub1"]}
          defaultSelectedKeys={["1"]}
          className={clsx(
            "flex-1 w-[80px] border-0 [&_.ant-menu]:border-0 [&_.ant-menu-inline]:border-0 transition-all duration-200 ease-in-out",
            darkMode === "dark" ? "custom-menu-dark" : "custom-menu-light"
          )}
        />
        <UserProfile />
        <SidebarToggleButton />
      </div>
    );
  }

  return (
    <div className="relative w-[256px] h-[100vh] flex flex-col transition-all duration-200 ease-in-out">
      <div
        className={clsx(
          "p-2 border-r transition-all duration-200 ease-in-out",
          darkMode === "dark"
            ? "border-[#303030] bg-[#19181a]"
            : "border-[#f0f0f0] bg-[#f9f9f9]"
        )}
      >
        <BrandLogo />
      </div>
      <Menu
        mode="inline"
        theme={darkMode}
        items={DefaultMenuItems}
        className={clsx(
          "flex-1 w-[256px] border-0 [&_.ant-menu]:border-0 [&_.ant-menu-inline]:border-0 transition-all duration-200 ease-in-out",
          darkMode === "dark" ? "custom-menu-dark" : "custom-menu-light"
        )}
        inlineCollapsed={false}
        defaultOpenKeys={["sub1"]}
        defaultSelectedKeys={["1"]}
      />
      <UserProfile />
      <SidebarToggleButton />
    </div>
  );
};

export default Sidebar;
