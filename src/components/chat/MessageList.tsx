import type { FC } from "react";
import type { ChatMessage } from "./types";
import MessageBubble from "./MessageBubble";

type MessageListProps = {
  messages: ChatMessage[];
};

const MessageList: FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="space-y-1">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </div>
  );
};

export default MessageList;
