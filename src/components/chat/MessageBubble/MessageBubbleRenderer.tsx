import type { FC } from "react";
import type { ChatMessage } from "../types";
import UserMessageBubble from "./UserMessageBubble";
import AIMessageBubble from "./AIMessageBubble";

type MessageBubbleRendererProps = {
  type: "user" | "AI";
  message: ChatMessage;
  isDark: boolean;
};

const MessageBubbleRenderer: FC<MessageBubbleRendererProps> = ({
  type,
  message,
  isDark,
}) => {
  const bubbleComponents = {
    user: <UserMessageBubble message={message} isDark={isDark} />,
    AI: <AIMessageBubble message={message} isDark={isDark} />,
  };

  return bubbleComponents[type] || bubbleComponents.AI;
};

export default MessageBubbleRenderer;
