import type { FC } from "react";
import { Typography } from "antd";
import { ChatCircleTextIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import useLayout from "../../hooks/useLayout";

const { Title, Text } = Typography;

interface WelcomeHeaderProps {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

const WelcomeHeader: FC<WelcomeHeaderProps> = ({
  title = "How can I help you today?",
  subtitle = "Start a conversation with Buddhit AI to get help with any task",
  icon,
}) => {
  const { isDark, textColor } = useLayout();

  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-4">
        <div
          className={clsx(
            "w-16 h-16 rounded-full flex items-center justify-center",
            isDark ? "bg-[#177ddc]" : "bg-[#1890ff]"
          )}
        >
          {icon || <ChatCircleTextIcon size={32} weight="bold" color="white" />}
        </div>
      </div>
      <Title level={1} className="!mb-2 !text-3xl">
        <span className={clsx(textColor)}>{title}</span>
      </Title>
      <Text type="secondary" className="text-base">
        <span className={clsx(textColor)}>{subtitle}</span>
      </Text>
    </div>
  );
};

export default WelcomeHeader;
