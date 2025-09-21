import styled from "styled-components";

export const FixedMessageComposerContainer = styled.div<{
  $isDark: boolean;
  $collapsed: boolean;
}>`
  position: fixed;
  bottom: 0;
  z-index: 50;
  padding: 1rem;
  border-top: 1px solid ${(props) => (props.$isDark ? "#404040" : "#e5e7eb")};
  background-color: ${(props) =>
    props.$isDark ? "rgba(33,33,33, 0.8)" : "rgba(255,255,255, 0.8)"};
  box-shadow: ${(props) =>
    props.$isDark
      ? "0 -4px 20px rgba(0, 0, 0, 0.3)"
      : "0 -4px 20px rgba(0, 0, 0, 0.1)"};
  left: ${(props) => (props.$collapsed ? "80px" : "256px")};
  right: 0;
  backdrop-filter: blur(12px);
  transition: all 0.3s ease, background-color 0.3s ease, border-color 0.3s ease,
    box-shadow 0.3s ease, left 0.3s ease;
`;
