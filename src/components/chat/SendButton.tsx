import type { FC } from "react";
import { ArrowUp } from "@phosphor-icons/react";
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
    <button
      onClick={onSend}
      disabled={!hasMessage}
      className={clsx(
        "flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200",
        "hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed",
        hasMessage
          ? clsx(
              "bg-gray-900 text-white hover:bg-gray-800 shadow-sm",
              isDark && "bg-gray-100 text-gray-900 hover:bg-gray-200"
            )
          : clsx(
              "cursor-not-allowed",
              isDark
                ? "bg-gray-700/50 text-gray-500"
                : "bg-gray-200/50 text-gray-400"
            )
      )}
    >
      <ArrowUp size={16} weight="bold" />
    </button>
  );
};

export default SendButton;
