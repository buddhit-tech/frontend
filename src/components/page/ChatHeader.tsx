import { Avatar, Button } from "antd";
import type { FC } from "react";
import { useState } from "react";
import clsx from "clsx";
import useLayout from "../../hooks/useLayout";
import useChat from "../../hooks/useChat";
import { ChatIcon, InfoIcon } from "@phosphor-icons/react";
import UserInfoModal from "./UserInfoModal";
import useAuth from "../../hooks/useAuth";
import { AccessType } from "../../contexts/Auth/types";
import HeaderTitle from "./HeaderTitle";
import StudentInfoDrawer from "./StudentInfoDrawer";

type ChatHeaderProps = {
  subtitle?: string;
};

const ChatHeader: FC<ChatHeaderProps> = ({ subtitle }) => {
  const { user } = useAuth();
  const { isDark } = useLayout();
  const { currentChatUser } = useChat();
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  if (user?.accessType === AccessType.STUDENT) {
    return (
      <nav
        className={clsx(
          "w-full h-[75px] border-b flex items-center justify-between shadow-sm px-8 transition-colors duration-200 ease-in-out",
          isDark
            ? "border-[#303030] bg-[#212121]"
            : "border-[#f0f0f0] bg-[#fff]"
        )}
      >
        <HeaderTitle
          title={"Lorem ipsum dolor sit amet consectetur adipisicing"}
          subtitle={subtitle}
          isDark={isDark}
          titleSizeClass="text-xl"
        />
        <Button
          size="large"
          shape="circle"
          type="text"
          onClick={() => setIsInfoOpen(true)}
        >
          <ChatIcon size={24} />
        </Button>
        <StudentInfoDrawer
          open={isInfoOpen}
          onClose={() => setIsInfoOpen(false)}
          isDark={isDark}
        />
      </nav>
    );
  }

  return (
    <nav
      className={clsx(
        "w-full h-[75px] border-b flex items-center justify-between shadow-sm px-8 transition-colors duration-200 ease-in-out",
        isDark ? "border-[#303030] bg-[#212121]" : "border-[#f0f0f0] bg-[#fff]"
      )}
    >
      <div className="flex items-center gap-2">
        <Avatar size={48} src={currentChatUser?.avatar} />
        <HeaderTitle
          title={currentChatUser?.name || ""}
          subtitle={subtitle}
          isDark={isDark}
          titleSizeClass="text-2xl"
        />
      </div>
      <Button
        size="large"
        shape="circle"
        type="text"
        onClick={() => setIsInfoOpen(true)}
      >
        <InfoIcon size={24} />
      </Button>
      <UserInfoModal
        open={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
        isDark={isDark}
        chatUser={currentChatUser}
      />
    </nav>
  );
};

export default ChatHeader;
