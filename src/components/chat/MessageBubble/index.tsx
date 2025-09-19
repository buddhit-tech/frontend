import type { FC } from "react";
import type { ChatMessage } from "../types";
import useLayout from "../../../hooks/useLayout";
import { MessageContainer } from "./styled";
import MessageBubbleRenderer from "./MessageBubbleRenderer";

type MessageBubbleProps = {
  message: ChatMessage;
};

const MessageBubble: FC<MessageBubbleProps> = ({ message }) => {
  const { darkMode } = useLayout();
  const isDark = darkMode === "dark";
  const isUser = message.role === "me";

  return (
    <MessageContainer $isUser={isUser}>
      <MessageBubbleRenderer
        type={isUser ? "user" : "AI"}
        message={message}
        isDark={isDark}
      />
    </MessageContainer>
  );
};

export default MessageBubble;
