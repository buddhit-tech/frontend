import { useState } from "react";
import type { FC } from "react";
import { Microphone, Waveform } from "@phosphor-icons/react";
import { theme } from "antd";
import clsx from "clsx";
import MessageInput from "./MessageInput";
import SendButton from "./SendButton";
import AttachmentButton from "./AttachmentButton";

type MessageComposerProps = {
  placeholder?: string;
};

const MessageComposer: FC<MessageComposerProps> = ({
  placeholder = "Ask anything",
}) => {
  const { token } = theme.useToken();
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);

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

  const handleVoiceClick = () => {
    setIsVoiceActive(!isVoiceActive);
    console.log("Voice input toggled:", !isVoiceActive);
  };

  const handleAttachmentSelect = (key: string) => {
    console.log("Attachment selected:", key);
    // Handle different attachment types
    switch (key) {
      case "add-photos-files":
        console.log("Add photos & files");
        break;
      case "add-google-drive":
        console.log("Add from Google Drive");
        break;
      case "study-learn":
        console.log("Study and learn");
        break;
      case "create-image":
        console.log("Create image");
        break;
      case "think-longer":
        console.log("Think longer");
        break;
      case "deep-research":
        console.log("Deep research");
        break;
      case "web-search":
        console.log("Web search");
        break;
      case "canvas":
        console.log("Canvas");
        break;
      case "connect-onedrive":
        console.log("Connect OneDrive");
        break;
      case "connect-sharepoint":
        console.log("Connect Sharepoint");
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <div
        className={clsx(
          "relative rounded-2xl border transition-all duration-200 group",
          "hover:shadow-lg focus-within:shadow-lg",
          isFocused && "shadow-lg"
        )}
        style={{
          backgroundColor: token.colorBgContainer,
          borderColor: token.colorBorder,
          boxShadow: isFocused ? token.boxShadow : "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = token.colorBorderSecondary;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = token.colorBorder;
        }}
      >
        <div className="flex items-center gap-3 px-4 py-3">
          {/* Attachment Button with Dropdown */}
          <AttachmentButton onAttachmentSelect={handleAttachmentSelect} />

          {/* Message Input */}
          <div className="flex-1">
            <MessageInput
              value={message}
              onChange={setMessage}
              placeholder={placeholder}
              onKeyDown={handleKeyPress}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </div>

          {/* Voice and Send Buttons */}
          <div className="flex items-center gap-2">
            {/* Voice Button */}
            <button
              onClick={handleVoiceClick}
              className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: isVoiceActive
                  ? token.colorFill
                  : "transparent",
                color: isVoiceActive
                  ? token.colorText
                  : token.colorTextSecondary,
              }}
              onMouseEnter={(e) => {
                if (!isVoiceActive) {
                  e.currentTarget.style.backgroundColor = token.colorFill;
                  e.currentTarget.style.color = token.colorText;
                }
              }}
              onMouseLeave={(e) => {
                if (!isVoiceActive) {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = token.colorTextSecondary;
                }
              }}
            >
              <Microphone
                size={16}
                weight={isVoiceActive ? "fill" : "regular"}
              />
            </button>

            {/* Sound Wave Icon (when voice is active) */}
            {isVoiceActive && (
              <div
                className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200"
                style={{
                  backgroundColor: token.colorFillSecondary,
                  color: token.colorText,
                }}
              >
                <Waveform size={16} weight="fill" />
              </div>
            )}

            {/* Send Button */}
            <SendButton hasMessage={!!message.trim()} onSend={handleSend} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageComposer;
