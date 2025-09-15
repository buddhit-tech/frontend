import { type FC } from "react";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, theme } from "antd";
import useLayout from "../../hooks/useLayout";
import {
  CaretLeftIcon,
  CaretRightIcon,
  MoonIcon,
  SunIcon,
} from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import SidebarMenu from "./menu/SidebarMenu";
import ThemeAwareDropdown from "../common/ThemeAwareDropdown";

const BrandLogo: FC = () => {
  const { token } = theme.useToken();
  const { collapsed, darkMode } = useLayout();

  const imageUrl =
    "https://static.vecteezy.com/system/resources/previews/022/227/364/non_2x/openai-chatgpt-logo-icon-free-png.png";

  if (!collapsed) {
    return (
      <div
        className="flex items-center justify-between p-2 transition-colors duration-200 ease-in-out"
        style={{
          backgroundColor: darkMode === "dark" ? "#19181a" : "#f9f9f9",
          borderBottom: `1px solid ${token.colorBorder}`,
        }}
      >
        <div className="flex items-center gap-2">
          <img
            alt="Buddhit"
            src={imageUrl}
            className="w-8 h-8 shrink-0 object-contain"
          />
          <span className="font-bold" style={{ color: token.colorText }}>
            Buddhit
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative flex items-center justify-center h-10 p-2 transition-colors duration-200 ease-in-out"
      style={{
        backgroundColor: darkMode === "dark" ? "#19181a" : "#f9f9f9",
        borderBottom: `1px solid ${token.colorBorder}`,
      }}
    >
      <img alt="Buddhit" src={imageUrl} className="w-10 h-10 object-contain" />
    </div>
  );
};

const UserProfile: FC = () => {
  const navigate = useNavigate();
  const { collapsed, darkMode, toggleMode } = useLayout();
  const { token } = theme.useToken();
  const { logoutUser } = useAuth();

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
        logoutUser();
        navigate("/auth/login", { replace: true });
        break;
    }
  };

  if (collapsed) {
    return (
      <div
        className="flex justify-center p-2 border-t border-r transition-all duration-200 ease-in-out"
        style={{
          backgroundColor: darkMode === "dark" ? "#19181a" : "#f9f9f9",
          borderColor: token.colorBorder,
        }}
      >
        <ThemeAwareDropdown
          trigger={["click"]}
          placement="topRight"
          menuItems={userMenuItems}
          onMenuClick={handleMenuClick}
          minWidth="256px"
          maxWidth="280px"
        >
          <Avatar
            size={48}
            icon={<UserOutlined />}
            className="cursor-pointer hover:opacity-80 transition-opacity"
            style={{
              backgroundColor: token.colorPrimary,
            }}
          />
        </ThemeAwareDropdown>
      </div>
    );
  }

  return (
    <div
      className="p-3 border-t border-r transition-all duration-200 ease-in-out"
      style={{
        backgroundColor: darkMode === "dark" ? "#19181a" : "#f9f9f9",
        borderColor: token.colorBorder,
      }}
    >
      <ThemeAwareDropdown
        menuItems={userMenuItems}
        onMenuClick={handleMenuClick}
        placement="topRight"
        trigger={["click"]}
        minWidth="256px"
        maxWidth="280px"
      >
        <div
          className="flex items-center gap-3 cursor-pointer rounded-lg p-2 transition-colors"
          style={{
            backgroundColor: "transparent",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = token.colorFill;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          <Avatar
            size={48}
            icon={<UserOutlined />}
            className="shrink-0"
            style={{
              backgroundColor: token.colorPrimary,
            }}
          />
          <div className="flex-1 min-w-0">
            <div
              className="text-sm font-medium truncate"
              style={{ color: token.colorText }}
            >
              John Doe
            </div>
            <div
              className="text-xs truncate"
              style={{ color: token.colorTextSecondary }}
            >
              john.doe@example.com
            </div>
          </div>
        </div>
      </ThemeAwareDropdown>
    </div>
  );
};

const SidebarToggleButton: FC = () => {
  const { toggleCollapse, collapsed } = useLayout();
  const { token } = theme.useToken();

  const Icon = collapsed ? CaretRightIcon : CaretLeftIcon;

  return (
    <div className="absolute top-[15px] right-[-12px] z-10">
      <div
        onClick={toggleCollapse}
        className="h-[28px] w-[28px] rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-110 shadow-lg border backdrop-blur-sm"
        style={{
          backgroundColor: token.colorPrimary,
          borderColor: token.colorPrimary + "30",
          boxShadow: `0 4px 12px ${token.colorPrimary}20`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = token.colorPrimaryHover;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = token.colorPrimary;
        }}
      >
        <Icon
          size={16}
          weight="bold"
          color="white"
          className="transition-transform duration-200 ease-in-out"
        />
      </div>
    </div>
  );
};

const Sidebar: FC = () => {
  const { collapsed, darkMode } = useLayout();
  const { token } = theme.useToken();

  if (collapsed) {
    return (
      <div
        className="relative w-[80px] h-[100vh] flex flex-col transition-all duration-200 ease-in-out"
        style={{
          backgroundColor: token.colorBgLayout,
          borderRight: `1px solid ${token.colorBorder}`,
        }}
      >
        <div
          className="p-2 transition-all duration-200 ease-in-out"
          style={{
            backgroundColor: darkMode === "dark" ? "#19181a" : "#f9f9f9",
          }}
        >
          <BrandLogo />
        </div>
        <SidebarMenu collapsed={true} />
        <UserProfile />
        <SidebarToggleButton />
      </div>
    );
  }

  return (
    <div
      className="relative w-[256px] h-[100vh] flex flex-col transition-all duration-200 ease-in-out"
      style={{
        backgroundColor: token.colorBgLayout,
        borderRight: `1px solid ${token.colorBorder}`,
      }}
    >
      <div
        className="p-2 transition-all duration-200 ease-in-out"
        style={{
          backgroundColor: darkMode === "dark" ? "#19181a" : "#f9f9f9",
        }}
      >
        <BrandLogo />
      </div>
      <SidebarMenu collapsed={false} />
      <UserProfile />
      <SidebarToggleButton />
    </div>
  );
};

export default Sidebar;
