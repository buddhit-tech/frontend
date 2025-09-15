import type { FC } from "react";
import { theme, Typography } from "antd";
import ChatTile from "./ChatTile";
import useLayout from "../../../hooks/useLayout";
import useChat from "../../../hooks/useChat";

const ClassRoomSidebar: FC = () => {
  const { isDark } = useLayout();
  const { token } = theme.useToken();
  const { allChatUsers, updateChatUserAndChat } = useChat();

  return (
    <div
      className="h-full w-[220px] shrink-0 border-solid border-l-0 border-y-0 border-[1px] px-2 py-2"
      style={{
        borderColor: token.colorBorder,
        backgroundColor: isDark ? "#19181a" : "#f7f7f7",
      }}
    >
      <div className="px-1 py-2">
        <Typography.Text strong style={{ color: token.colorTextSecondary }}>
          Chats
        </Typography.Text>
      </div>
      {(allChatUsers ?? []).map((student) => (
        <ChatTile
          name={student.name}
          key={student.chatId}
          chatId={student.chatId}
          avatar={student.avatar}
          status={student.status}
          onClick={() => updateChatUserAndChat(student.chatId, student.userId)}
          subItems={[
            {
              id: "notes",
              label: "Notes",
              onClick: () => console.log("Notes"),
            },
            {
              id: "assignments",
              label: "Assignments",
              onClick: () => console.log("Assignments"),
            },
            {
              id: "assignments",
              label: "Assignments",
              onClick: () => console.log("Assignments"),
            },
            {
              id: "assignments",
              label: "Assignments",
              onClick: () => console.log("Assignments"),
            },
            {
              id: "assignments",
              label: "Assignments",
              onClick: () => console.log("Assignments"),
            },
            {
              id: "assignments",
              label: "Assignments",
              onClick: () => console.log("Assignments"),
            },
          ]}
        />
      ))}
    </div>
  );
};

export default ClassRoomSidebar;
