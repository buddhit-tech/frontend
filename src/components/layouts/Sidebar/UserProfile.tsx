import type { FC } from "react";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, theme } from "antd";
import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import useLayout from "../../../hooks/useLayout";
import useAuth from "../../../hooks/useAuth";
import ThemeAwareDropdown from "../../common/ThemeAwareDropdown";
import {
  UserProfileContainer,
  UserProfileContent,
  UserProfileInfo,
  UserInfo,
  UserName,
  UserEmail,
} from "./styled";

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
      <UserProfileContainer
        style={{
          backgroundColor: darkMode === "dark" ? "#19181a" : "#f9f9f9",
          borderColor: token.colorBorder,
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
        <UserProfileInfo
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
            <UserName style={{ color: token.colorText }}>John Doe</UserName>
            <UserEmail style={{ color: token.colorTextSecondary }}>
              john.doe@example.com
            </UserEmail>
          </UserInfo>
        </UserProfileInfo>
      </ThemeAwareDropdown>
    </UserProfileContainer>
  );
};

export default UserProfile;
