import type { FC } from "react";
import DashboardPageWrapper from "../page/DashboardPageWrapper";
import MessageComposer from "./MessageComposer";
import WelcomeHeader from "./WelcomeHeader";

const NewChat: FC = () => {
  return (
    <DashboardPageWrapper showHeader title="New Chat">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center w-[1020px]">
          <div className="max-w-3xl w-full mb-4">
            <WelcomeHeader />
          </div>
          <div className="w-full">
            <MessageComposer placeholder="Message Buddhit..." />
          </div>
        </div>
      </div>
    </DashboardPageWrapper>
  );
};

export default NewChat;
