import type { FC } from "react";
import { Button, Tooltip } from "antd";
import { ArrowUp, PaperPlaneRight } from "@phosphor-icons/react";
import clsx from "clsx";
import useLayout from "../../hooks/useLayout";

type SendButtonProps = {
  hasMessage: boolean;
  onSend: () => void;
};

const SendButton: FC<SendButtonProps> = ({ hasMessage, onSend }) => {
  const { darkMode } = useLayout();
  const isDark = darkMode === "dark";

  return (
    <Tooltip title="Send message" placement="top">
      <Button
        type="primary"
        size="small"
        icon={
          hasMessage ? (
            <ArrowUp size={16} weight="fill" />
          ) : (
            <PaperPlaneRight size={16} weight="fill" />
          )
        }
        onClick={onSend}
        disabled={!hasMessage}
        className={clsx(
          "!h-8 !w-8 !rounded-lg !border-0 transition-all duration-200",
          "hover:!scale-105 disabled:!scale-100",
          hasMessage
            ? "!bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 !shadow-md hover:!shadow-lg"
            : clsx(
                "!shadow-none",
                isDark
                  ? "!bg-gray-700/50 !text-gray-500"
                  : "!bg-gray-200/50 !text-gray-400"
              )
        )}
      />
    </Tooltip>
  );
};

export default SendButton;
