import { useState } from "react";
import type { FC } from "react";
import { Space } from "antd";
import clsx from "clsx";
import useLayout from "../../hooks/useLayout";
import AttachmentButton from "./AttachmentButton";
import MessageInput from "./MessageInput";
import VoiceButton from "./VoiceButton";
import MoreOptionsButton from "./MoreOptionsButton";
import SendButton from "./SendButton";

type MessageComposerProps = {
  placeholder?: string;
};

const MessageComposer: FC<MessageComposerProps> = ({
  placeholder = "Message ChatGPT...",
}) => {
  const { darkMode } = useLayout();
  const isDark = darkMode === "dark";
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAttachmentSelect = (type: string) => {
    console.log("Attachment selected:", type);
  };

  const handleEmojiClick = () => {
    console.log("Emoji picker clicked");
  };

  const handleVoiceClick = () => {
    console.log("Voice input clicked");
  };

  const handleMoreOptionsClick = () => {
    console.log("More options clicked");
  };

  return (
    <div className={clsx("transition-all duration-300 relative")}>
      <div className={clsx("absolute inset-0 pointer-events-none")} />
      <div className="relative z-10 px-4 py-4 max-w-4xl mx-auto">
        <div
          className={clsx(
            "relative rounded-2xl border transition-all duration-200 group",
            "hover:shadow-lg focus-within:shadow-lg",
            isFocused && "shadow-lg",
            isDark
              ? "border-gray-700/50 hover:border-gray-500/50 focus-within:border-gray-500/50"
              : "border-gray-200/50 hover:border-gray-300/50 focus-within:border-gray-300/50"
          )}
        >
          <div className="flex items-end gap-4 p-3">
            <AttachmentButton onAttachmentSelect={handleAttachmentSelect} />
            <MessageInput
              value={message}
              onChange={setMessage}
              placeholder={placeholder}
              onKeyDown={handleKeyPress}
              onEmojiClick={handleEmojiClick}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <Space.Compact className="flex items-center">
              <VoiceButton onVoiceClick={handleVoiceClick} />
              <MoreOptionsButton onMoreOptionsClick={handleMoreOptionsClick} />
              <SendButton hasMessage={!!message.trim()} onSend={handleSend} />
            </Space.Compact>
          </div>
          <div
            className={clsx(
              "px-4 pb-2 text-xs transition-opacity duration-200",
              isFocused ? "opacity-100" : "opacity-0",
              isDark ? "text-gray-400" : "text-gray-500"
            )}
          >
            Press Enter to send, Shift + Enter for new line
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageComposer;
