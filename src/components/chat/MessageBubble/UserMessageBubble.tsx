import type { FC } from "react";
import { Tooltip } from "antd";
import type { ChatMessage } from "../types";
import {
  MessageWrapper,
  MessageContent,
  MessageBubbleCard,
  MessageText,
  MessageTime,
  ActionButtonsContainer,
  StyledAvatar,
} from "./styled";

type UserMessageBubbleProps = {
  message: ChatMessage;
  isDark: boolean;
};

const UserMessageBubble: FC<UserMessageBubbleProps> = ({ message, isDark }) => {
  return (
    <MessageWrapper $isUser={true}>
      <MessageContent $isUser={true}>
        <MessageBubbleCard $isDark={isDark} $isUser={true}>
          <MessageText $isDark={isDark}>{message.text}</MessageText>
        </MessageBubbleCard>
        <MessageTime $isDark={isDark}>{message.time}</MessageTime>
        <ActionButtonsContainer $isUser={true}></ActionButtonsContainer>
      </MessageContent>
      <Tooltip title={message.author} placement="left">
        <StyledAvatar $isDark={isDark} $isUser={true} size={32}>
          You
        </StyledAvatar>
      </Tooltip>
    </MessageWrapper>
  );
};

export default UserMessageBubble;
