import type { FC } from "react";
import { theme } from "antd";
import useLayout from "../../../hooks/useLayout";
import SidebarMenu from "../menu/SidebarMenu";
import BrandLogo from "./BrandLogo";
import UserProfile from "./UserProfile";
import SidebarToggleButton from "./SidebarToggleButton";
import { SidebarContainer, SidebarHeader, SidebarContent } from "./styled";

const Sidebar: FC = () => {
  const { collapsed, darkMode } = useLayout();
  const { token } = theme.useToken();

  return (
    <SidebarContainer
      $collapsed={collapsed}
      style={{
        backgroundColor: token.colorBgLayout,
        borderRight: `1px solid ${token.colorBorder}`,
      }}
    >
      <SidebarHeader
        style={{
          backgroundColor: darkMode === "dark" ? "#19181a" : "#f9f9f9",
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
