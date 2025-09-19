import type { FC } from "react";
import { Tooltip } from "antd";
import {
  ThumbsUpIcon,
  ThumbsDownIcon,
  CopyIcon,
  ChalkboardTeacherIcon,
} from "@phosphor-icons/react";
import type { ChatMessage } from "../types";
import IconButton from "./IconButton";
import {
  MessageWrapper,
  MessageContent,
  FlatMessageContainer,
  MessageText,
  MessageTime,
  ActionButtonsContainer,
  StyledAvatar,
} from "./styled";

type AIMessageBubbleProps = {
  message: ChatMessage;
  isDark: boolean;
};

const AIMessageBubble: FC<AIMessageBubbleProps> = ({ message, isDark }) => {
  const handleThumbsUp = () => {
    // TODO: Implement thumbs up functionality
    console.log("Thumbs up:", message.text);
  };

  const handleThumbsDown = () => {
    // TODO: Implement thumbs down functionality
    console.log("Thumbs down:", message.text);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
  };

  const handleShare = () => {
    // TODO: Implement share functionality
    console.log("Share:", message.text);
  };

  return (
    <MessageWrapper $isUser={false}>
      <Tooltip title={message.author} placement="right">
        <StyledAvatar $isDark={isDark} $isUser={false} size={32}>
          AI
        </StyledAvatar>
      </Tooltip>
      <MessageContent $isUser={false}>
        <FlatMessageContainer $isDark={isDark}>
          <MessageText $isDark={isDark}>{message.text}</MessageText>
        </FlatMessageContainer>
        <MessageTime $isDark={isDark}>{message.time}</MessageTime>
        <ActionButtonsContainer $isUser={false}>
          <IconButton
            icon={<ThumbsUpIcon size={16} />}
            tooltip="Good response"
            onClick={handleThumbsUp}
            isDark={isDark}
          />
          <IconButton
            icon={<ThumbsDownIcon size={16} />}
            tooltip="Poor response"
            onClick={handleThumbsDown}
            isDark={isDark}
          />
          <IconButton
            icon={<CopyIcon size={16} />}
            tooltip="Copy message"
            onClick={handleCopy}
            isDark={isDark}
          />
          <IconButton
            icon={<ChalkboardTeacherIcon size={16} />}
            tooltip="Teacher Review"
            onClick={handleShare}
            isDark={isDark}
          />
        </ActionButtonsContainer>
      </MessageContent>
    </MessageWrapper>
  );
};

export default AIMessageBubble;
