import type { FC } from "react";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, theme, Typography } from "antd";
import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import useLayout from "../../../hooks/useLayout";
import useAuth from "../../../hooks/useAuth";
import ThemeAwareDropdown from "../../common/ThemeAwareDropdown";
import {
  UserProfileContainer,
  UserProfileContent,
  UserProfileInfo,
  UserInfo,
} from "./styled";

const { Text } = Typography;

const UserProfile: FC = () => {
  const navigate = useNavigate();
  const { collapsed, darkMode, toggleMode, isDark } = useLayout();
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
        toggleMode(isDark ? false : true);
        break;
      case "logout":
        logoutUser();
        navigate("/auth/login", { replace: true });
        break;
    }
  };

  if (collapsed) {
    return (
      <UserProfileContainer
        $mode={darkMode}
        $collapsed={collapsed}
        $borderColor={isDark ? "#19181a" : "#D2D5D9"}
        style={{
          backgroundColor: isDark ? "#19181a" : "#f9f9f9",
        }}
      >
        <UserProfileContent $collapsed={collapsed}>
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
                borderRadius: "50%",
                flexShrink: 0,
              }}
            />
          </ThemeAwareDropdown>
        </UserProfileContent>
      </UserProfileContainer>
    );
  }

  return (
    <UserProfileContainer
      $mode={darkMode}
      $borderColor={token.colorBorder}
      style={{
        backgroundColor: darkMode === "dark" ? "#19181a" : "#f9f9f9",
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
        <UserProfileInfo
          className={clsx(
            "hover:bg-opacity-80 transition-all duration-200",
            "rounded-lg p-2"
          )}
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
              borderRadius: "50%",
              flexShrink: 0,
            }}
          />
          <UserInfo>
            <Text
              className={clsx(
                "text-sm font-medium block overflow-hidden text-ellipsis whitespace-nowrap",
                "transition-colors duration-200"
              )}
              style={{ color: token.colorText }}
            >
              John Doe
            </Text>
            <Text
              className={clsx(
                "text-xs block overflow-hidden text-ellipsis whitespace-nowrap",
                "transition-colors duration-200"
              )}
              style={{ color: token.colorTextSecondary }}
            >
              john.doe@example.com
            </Text>
          </UserInfo>
        </UserProfileInfo>
      </ThemeAwareDropdown>
    </UserProfileContainer>
  );
};

export default UserProfile;
