import styled from "styled-components";

// Sidebar Container Components
export const SidebarContainer = styled.div<{
  $collapsed: boolean;
  $borderColor: string;
}>`
  position: relative;
  width: ${(props) => (props.$collapsed ? "80px" : "256px")};
  height: 100vh;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
`;

export const SidebarHeader = styled.div<{ $borderColor: string }>`
  transition: all 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
  border-right: 1px solid ${(props) => props.$borderColor};
  border-bottom: 1px solid ${(props) => props.$borderColor};
`;

export const SidebarContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

export const SidebarFooter = styled.div<{ $borderColor: string }>`
  border-top: 1px solid ${(props) => props.$borderColor};
  border-right: 1px solid ${(props) => props.$borderColor};
  transition: all 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
`;

export const BrandLogoContainer = styled.div<{
  $collapsed: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.$collapsed ? "center" : "space-between"};
  padding-left: ${(props) => (props.$collapsed ? "none" : "16px")};
  height: 74px;
  transition: all 0.3s ease, background-color 0.3s ease, color 0.3s ease;
`;

export const BrandLogoContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

export const BrandImage = styled.img<{ $collapsed: boolean }>`
  width: 40px;
  height: 40px;
  object-fit: contain;
  flex-shrink: 0;
  transition: all 0.3s ease, filter 0.3s ease;
`;

export const BrandText = styled.span`
  font-weight: bold;
  transition: color 0.3s ease;
`;

// User Profile Components
export const UserProfileContainer = styled.div<{
  $borderColor: string;
  $collapsed?: boolean;
  $mode?: "dark" | "light";
}>`
  padding: 12px;
  border-right: 1px solid
    ${(props) => (props.$mode === "dark" ? "none" : props.$borderColor)} !important;
  border-top: 1px solid
    ${(props) => (props.$mode === "dark" ? "none" : props.$borderColor)} !important;
  transition: all 0.3s ease, background-color 0.3s ease, border-color 0.3s ease,
    color 0.3s ease;
`;

export const UserProfileContent = styled.div<{ $collapsed: boolean }>`
  display: flex;
  justify-content: ${(props) => (props.$collapsed ? "center" : "flex-start")};
  padding: ${(props) => (props.$collapsed ? "8px" : "12px")};
  transition: all 0.3s ease, background-color 0.3s ease, color 0.3s ease;
`;

export const UserProfileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  border-radius: 8px;
  padding: 8px;
  transition: all 0.3s ease, background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease;
  background-color: transparent;
`;

export const UserInfo = styled.div`
  flex: 1;
  min-width: 0;
  transition: color 0.3s ease, background-color 0.3s ease;
`;

// Toggle Button Components
export const ToggleButtonContainer = styled.div`
  position: absolute;
  top: 50%;
  right: -10px;
  transform: translateY(-50%);
  z-index: 10;
  cursor: pointer;
  width: 20px;
  height: 50px;
  transition: all 0.3s ease, background-color 0.3s ease, color 0.3s ease;
`;

export const ToggleButton = styled.div<{ $isDark: boolean }>`
  overflow: visible;
  border: none;
  transition: all 0.3s ease, background-color 0.3s ease, color 0.3s ease,
    fill 0.3s ease, stroke 0.3s ease;
`;

export const ToggleIcon = styled.div`
  /* Styles are now handled by Tailwind classes */
  transition: all 0.3s ease, color 0.3s ease, fill 0.3s ease, stroke 0.3s ease;
`;
