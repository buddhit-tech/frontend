import type { FC } from "react";
import { theme } from "antd";
import useLayout from "../../../hooks/useLayout";
import SidebarMenu from "../menu/SidebarMenu";
import BrandLogo from "./BrandLogo";
import UserProfile from "./UserProfile";
import SidebarToggleButton from "./SidebarToggleButton";
import { SidebarContainer, SidebarHeader, SidebarContent } from "./styled";

const Sidebar: FC = () => {
  const { collapsed, isDark } = useLayout();
  const { token } = theme.useToken();

  return (
    <SidebarContainer
      $collapsed={collapsed}
      $borderColor={token.colorBorder}
      style={{
        backgroundColor: isDark ? "#19181a" : "#f9f9f9",
      }}
    >
      <SidebarHeader
        $borderColor={isDark ? "#19181a" : "#D2D5D9"}
        className="sidebar-header"
        style={{
          backgroundColor: isDark ? "#19181a" : "#f9f9f9",
        }}
      >
        <BrandLogo />
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu collapsed={collapsed} />
      </SidebarContent>

      <UserProfile />
      <SidebarToggleButton />
    </SidebarContainer>
  );
};

export default Sidebar;
