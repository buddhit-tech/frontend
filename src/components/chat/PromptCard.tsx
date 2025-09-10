import type { FC } from "react";
import { Card, Space, Tag, Typography } from "antd";
import clsx from "clsx";
import useLayout from "../../hooks/useLayout";

const { Text } = Typography;

export interface PromptData {
  icon: React.ReactNode;
  title: string;
  description: string;
  category: string;
}

interface PromptCardProps {
  prompt: PromptData;
  onClick?: (description: string) => void;
}

const PromptCard: FC<PromptCardProps> = ({ prompt, onClick }) => {
  const { isDark } = useLayout();
  const handleClick = () => onClick?.(prompt.description);

  return (
    <Card hoverable size="small" className="h-full" onClick={handleClick}>
      <Space align="start" size="small">
        <div
          className={clsx(
            "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
            isDark ? "bg-[#177ddc]/20" : "bg-[#1890ff]/10"
          )}
        >
          <div className={clsx(isDark ? "text-[#177ddc]" : "text-[#1890ff]")}>
            {prompt.icon}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Text strong className="!text-sm">
              {prompt.title}
            </Text>
            <Tag color={isDark ? "blue" : "blue"}>{prompt.category}</Tag>
          </div>
          <Text type="secondary" className="!text-xs">
            {prompt.description}
          </Text>
        </div>
      </Space>
    </Card>
  );
};

export default PromptCard;
