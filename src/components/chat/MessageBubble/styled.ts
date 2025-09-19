import styled from "styled-components";
import { Avatar, Typography, Button, Space, Card } from "antd";

// Container Components
export const MessageContainer = styled.div<{ $isUser: boolean }>`
  display: flex;
  width: 100%;
  margin-bottom: 16px;
  min-width: 0;
  justify-content: ${(props) => (props.$isUser ? "flex-end" : "flex-start")};
  transition: all 0.3s ease;
`;

export const MessageWrapper = styled.div<{ $isUser: boolean }>`
  display: flex;
  align-items: ${(props) => (props.$isUser ? "flex-end" : "flex-start")};
  gap: 12px;
  max-width: ${(props) => (props.$isUser ? "80%" : "85%")};
  min-width: 0;
  transition: all 0.3s ease;
`;

export const MessageContent = styled.div<{ $isUser: boolean }>`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  align-items: ${(props) => (props.$isUser ? "flex-end" : "flex-start")};
  transition: all 0.3s ease;
`;

// Message Bubble Components
export const MessageBubbleCard = styled(Card)<{
  $isDark: boolean;
  $isUser: boolean;
}>`
  position: relative;
  border-radius: ${(props) =>
    props.$isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px"};
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
  background: ${(props) => (props.$isDark ? "#323232" : "#e9e9e9")};
  max-width: 100%;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  .ant-card-body {
    padding: 12px 16px;
    transition: all 0.3s ease;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -4px;
    ${(props) => (props.$isUser ? "right: -4px;" : "left: -4px;")}
    width: 12px;
    height: 12px;
    transform: rotate(45deg);
    background: #1890ff;
    z-index: 1;
    transition: background-color 0.3s ease;
  }
`;

// Flat message container for AI messages (no card)
export const FlatMessageContainer = styled.div<{ $isDark: boolean }>`
  background: transparent;
  border: none;
  box-shadow: none;
  max-width: 100%;
  padding: 0;
  transition: all 0.3s ease;
`;

// Text Components
export const MessageText = styled(Typography.Text)<{ $isDark: boolean }>`
  white-space: pre-wrap;
  word-break: break-words;
  font-size: 14px;
  line-height: 1.5;
  color: ${(props) => (props.$isDark ? "#f5f5f5" : "#262626")};
`;

export const MessageTime = styled.div<{ $isDark: boolean }>`
  margin-top: 4px;
  font-size: 12px;
  padding: 0 4px;
  color: ${(props) => (props.$isDark ? "#8c8c8c" : "#8c8c8c")};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// Action Components
export const ActionButtonsContainer = styled(Space)<{ $isUser?: boolean }>`
  margin-top: 8px;
  margin-left: ${(props) => (props.$isUser ? "auto" : "0")};
`;

export const ActionButton = styled(Button)<{ $isDark: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  border-radius: 0;
  box-shadow: none;
  transition: all 0.2s ease;
  color: ${(props) => (props.$isDark ? "#8c8c8c" : "#8c8c8c")};
  background: transparent;

  &:hover {
    color: ${(props) => (props.$isDark ? "#f5f5f5" : "#262626")};
    background: transparent;
    transform: none;
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

export const StyledAvatar = styled(Avatar)<{
  $isDark: boolean;
  $isUser: boolean;
}>`
  box-shadow: none;
  border: none;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    transform: none;
  }
`;
