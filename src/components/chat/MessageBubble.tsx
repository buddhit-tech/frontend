import type { FC } from "react";
import { Avatar, Tooltip, Typography } from "antd";
import clsx from "clsx";
import type { ChatMessage } from "./types";
import useLayout from "../../hooks/useLayout";

type MessageBubbleProps = {
  message: ChatMessage;
};

const MessageBubble: FC<MessageBubbleProps> = ({ message }) => {
  const isMe = message.role === "me";
  const { darkMode } = useLayout();
  const isDark = darkMode === "dark";

  return (
    <div
      className={clsx(
        "w-full flex mb-4",
        isMe ? "justify-end" : "justify-start"
      )}
    >
      {isMe ? (
        <div className="flex items-end gap-3 max-w-[80%]">
          <div className="flex flex-col items-end flex-1 min-w-0">
            <div
              className={clsx(
                "relative px-4 py-3 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl",
                "rounded-br-md",
                isDark ? "bg-[#323232] text-white" : "bg-[#e9e9e9] text-white"
              )}
            >
              <Typography.Text className="whitespace-pre-wrap break-words text-white text-sm leading-relaxed">
                <span
                  className={clsx(isDark ? "text-gray-100" : "text-gray-800")}
                >
                  {message.text}
                </span>
              </Typography.Text>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 rotate-45 bg-blue-500" />
            </div>
            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 px-1">
              {message.time}
            </div>
          </div>
          <Tooltip title={message.author} placement="left">
            <Avatar
              size={32}
              className={clsx(
                "shadow-md ring-2 transition-all duration-200 hover:scale-105 flex-shrink-0",
                isDark ? "ring-blue-400/30" : "ring-blue-500/30"
              )}
            >
              You
            </Avatar>
          </Tooltip>
        </div>
      ) : (
        <div className="flex items-start gap-3 max-w-[85%]">
          <Tooltip title={message.author} placement="right">
            <Avatar
              size={32}
              className={clsx(
                "shadow-md ring-2 transition-all duration-200 hover:scale-105 flex-shrink-0",
                isDark ? "ring-gray-600/30" : "ring-gray-300/30"
              )}
            >
              AI
            </Avatar>
          </Tooltip>
          <div className="flex flex-col flex-1 min-w-0">
            <div>
              <Typography.Text
                className={clsx(
                  "whitespace-pre-wrap break-words text-sm leading-relaxed"
                )}
              >
                <span
                  className={clsx(isDark ? "text-gray-100" : "text-gray-800")}
                >
                  {message.text}
                </span>
              </Typography.Text>
            </div>
            <div
              className={clsx(
                "mt-1 text-xs px-1",
                isDark ? "text-gray-400" : "text-gray-500"
              )}
            >
              {message.time}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
