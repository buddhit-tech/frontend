import type { FC } from "react";
import { Button, Space } from "antd";
import {
  SparkleIcon,
  HeartIcon,
  GameControllerIcon,
} from "@phosphor-icons/react";

export interface QuickAction {
  key: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

interface QuickActionsProps {
  actions?: QuickAction[];
  className?: string;
}

const defaultActions: QuickAction[] = [
  {
    key: "gpt4",
    label: "Try GPT-4",
    icon: <SparkleIcon size={16} weight="bold" />,
  },
  {
    key: "examples",
    label: "Browse examples",
    icon: <HeartIcon size={16} weight="bold" />,
  },
  {
    key: "playground",
    label: "Playground",
    icon: <GameControllerIcon size={16} weight="bold" />,
  },
];

const QuickActions: FC<QuickActionsProps> = ({
  actions = defaultActions,
  className = "px-6 py-4 border-t border-gray-200 dark:border-gray-700",
}) => {
  return (
    <div className={className}>
      <div className="max-w-3xl mx-auto">
        <Space size="large" className="w-full justify-center">
          {actions.map((action) => (
            <Button
              key={action.key}
              type="text"
              icon={action.icon}
              size="small"
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          ))}
        </Space>
      </div>
    </div>
  );
};

export default QuickActions;
