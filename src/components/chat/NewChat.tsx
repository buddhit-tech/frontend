import type { FC } from "react";
import DashboardPageWrapper from "../page/DashboardPageWrapper";
import MessageComposer from "./MessageComposer";
import WelcomeHeader from "./WelcomeHeader";

const NewChat: FC = () => {
  return (
    <DashboardPageWrapper showHeader={false} title="New Chat">
      <div className="w-full h-full flex flex-col items-center justify-center min-w-0 overflow-x-hidden">
        <div className="flex flex-col items-center justify-center w-full max-w-5xl min-w-0 px-4">
          <div className="max-w-3xl w-full mb-4 min-w-0">
            <WelcomeHeader />
          </div>
          <div className="w-full min-w-0">
            <MessageComposer placeholder="Message Buddhit..." />
          </div>
        </div>
      </div>
    </DashboardPageWrapper>
  );
};

export default NewChat;
