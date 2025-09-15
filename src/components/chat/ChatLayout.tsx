import type { FC } from "react";
import DashboardPageWrapper from "../page/DashboardPageWrapper";
import MessageList from "./MessageList";
import MessageComposer from "./MessageComposer";
import NewChat from "./NewChat";
import clsx from "clsx";
import useChat from "../../hooks/useChat";

const ChatLayout: FC = () => {
  const { currentChatMessages: messages } = useChat();

  if (messages.length === 0) {
    return <NewChat />;
  }

  return (
    <DashboardPageWrapper showHeader={false} isChatHeader={true} title="Chat">
      <div className="w-full h-full flex flex-col relative min-w-0 overflow-x-hidden">
        <div className={clsx("absolute inset-0 transition-all duration-500")} />
        <div className="relative z-10 flex flex-col h-full min-w-0">
          <div
            className={clsx(
              "flex-1 overflow-y-auto px-6 py-6 transition-all duration-300",
              "scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent"
            )}
          >
            <div className="max-w-4xl w-full min-w-0 mx-auto">
              <MessageList messages={messages} />
            </div>
          </div>
          <MessageComposer />
        </div>
      </div>
    </DashboardPageWrapper>
  );
};

export default ChatLayout;
