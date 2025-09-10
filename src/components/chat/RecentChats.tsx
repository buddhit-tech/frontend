import type { FC } from "react";
import { Button, List, Typography } from "antd";
import { ClockIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import useLayout from "../../hooks/useLayout";

const { Title, Text } = Typography;

export interface RecentChat {
  id: string;
  title: string;
  time: string;
  preview: string;
}

interface RecentChatsProps {
  chats: RecentChat[];
  title?: string;
  showViewAll?: boolean;
  onChatClick?: (chatId: string) => void;
  onViewAllClick?: () => void;
}

const RecentChats: FC<RecentChatsProps> = ({
  chats,
  title = "Recent conversations",
  showViewAll = true,
  onChatClick,
  onViewAllClick,
}) => {
  const { darkMode } = useLayout();
  const isDark = darkMode === "dark";

  if (chats.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <Title level={4} className="!mb-0">
          {title}
        </Title>
        {showViewAll && (
          <Button type="link" size="small" onClick={onViewAllClick}>
            View all
          </Button>
        )}
      </div>
      <List
        dataSource={chats}
        split={false}
        size="small"
        renderItem={(chat) => (
          <List.Item
            onClick={() => onChatClick?.(chat.id)}
            className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg px-3 py-2"
          >
            <List.Item.Meta
              avatar={
                <div
                  className={clsx(
                    "w-8 h-8 rounded-lg flex items-center justify-center",
                    isDark ? "bg-[#177ddc]/20" : "bg-[#1890ff]/10"
                  )}
                >
                  <ClockIcon
                    size={16}
                    weight="bold"
                    className={clsx(
                      isDark ? "text-[#177ddc]" : "text-[#1890ff]"
                    )}
                  />
                </div>
              }
              title={
                <div className="flex items-center justify-between">
                  <Text strong className="!text-sm">
                    {chat.title}
                  </Text>
                  <Text type="secondary" className="!text-xs">
                    {chat.time}
                  </Text>
                </div>
              }
              description={
                <Text type="secondary" className="!text-xs">
                  {chat.preview}
                </Text>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default RecentChats;
