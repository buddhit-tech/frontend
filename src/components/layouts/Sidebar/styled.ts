import styled from "styled-components";

// Sidebar Container Components
export const SidebarContainer = styled.div<{ $collapsed: boolean }>`
  position: relative;
  width: ${(props) => (props.$collapsed ? "80px" : "256px")};
  height: 100vh;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
`;

export const SidebarHeader = styled.div`
  padding: 8px;
  transition: all 0.3s ease;
`;

export const SidebarContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const SidebarFooter = styled.div`
  border-top: 1px solid;
  border-right: 1px solid;
  transition: all 0.3s ease;
`;

// Brand Logo Components
export const BrandLogoContainer = styled.div<{ $collapsed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.$collapsed ? "center" : "space-between"};
  padding: 8px;
  transition: all 0.3s ease;
  border-bottom: 1px solid;
`;

export const BrandLogoContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const BrandImage = styled.img<{ $collapsed: boolean }>`
  width: ${(props) => (props.$collapsed ? "40px" : "32px")};
  height: ${(props) => (props.$collapsed ? "40px" : "32px")};
  object-fit: contain;
  flex-shrink: 0;
`;

export const BrandText = styled.span`
  font-weight: bold;
  transition: color 0.3s ease;
`;

// User Profile Components
export const UserProfileContainer = styled.div`
  padding: 12px;
  border-top: 1px solid;
  border-right: 1px solid;
  transition: all 0.3s ease;
`;

export const UserProfileContent = styled.div<{ $collapsed: boolean }>`
  display: flex;
  justify-content: ${(props) => (props.$collapsed ? "center" : "flex-start")};
  padding: ${(props) => (props.$collapsed ? "8px" : "12px")};
`;

export const UserProfileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  border-radius: 8px;
  padding: 8px;
  transition: all 0.3s ease;
  background-color: transparent;
`;

export const UserInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const UserName = styled.div`
  font-size: 14px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: color 0.3s ease;
`;

export const UserEmail = styled.div`
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: color 0.3s ease;
`;

// Toggle Button Components
export const ToggleButtonContainer = styled.div`
  position: absolute;
  top: 50%;
  right: -15px;
  transform: translateY(-50%);
  z-index: 10;
`;

export const ToggleButton = styled.div<{ $isDark: boolean }>`
  width: 30px;
  height: 75px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border: none;
  background: ${(props) => (props.$isDark ? "#19181a" : "#f9f9f9")};
  position: relative;
  overflow: visible;

  &:hover {
    transform: translateX(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    background: ${(props) => (props.$isDark ? "#2a2930" : "#e9e9e9")};
  }

  &:active {
    transform: translateX(0px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
`;

export const ToggleIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  pointer-events: none;
  width: 100%;
  height: 100%;
`;
